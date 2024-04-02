from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Account, Transaction
import datetime
from django.core.exceptions import ValidationError

class AccountsAppTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='user@123')
        self.client = APIClient()
        
        response = self.client.post('/api/token/', {'username': 'testuser', 'password': 'user@123'})
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

        self.account = Account.objects.create(
            account_number="1234567890123456",
            current_balance=100.00,
            initial_balance=100.00,
            user=self.user
        )
        
    def test_login_view(self):
        response = self.client.post('/api/token/', {'username': 'testuser', 'password': 'user@123'})
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)

    def test_login_non_existing_user(self):
        response = self.client.post('/api/token/', {'username': 'nonuser', 'password': 'nopass'})
        self.assertEqual(response.status_code, 401)

    def test_login_wrong_password(self):
        response = self.client.post('/api/token/', {'username': 'testuser', 'password': '1234'})
        self.assertEqual(response.status_code, 401)

    def test_login_no_credentials(self):
        response = self.client.post('/api/token/', {'username': '', 'password': ''})
        self.assertEqual(response.status_code, 400)   

    def test_create_account(self):
        response = self.client.post('/create-account/', {'account_number': '9876543210987654', 'current_balance': 50})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Account.objects.count(), 2)
        
    def test_create_duplicate_account_number(self):
        self.client.post('/create-account/', {'account_number': '9876543210987654', 'current_balance': 200})
        response = self.client.post('/create-account/', {'account_number': '9876543210987654', 'current_balance': 300})
        self.assertEqual(response.status_code, 400)

    def test_create_negative_account_number(self):
        account = Account(
            account_number='9876543210987654',
            current_balance=-100.00,
        )
        with self.assertRaises(ValidationError):
            account.save()
    
    def test_account_with_null_initial_balance(self):
        with self.assertRaises(ValidationError):
            Account.objects.create(
                account_number="9876543210987654",
                initial_balance=None,
                current_balance=100,
                user=self.user
            ).save()

    def test_account_with_null_current_balance(self):
        with self.assertRaises(ValidationError):
            Account.objects.create(
                account_number="9876543210987654",
                initial_balance=100,
                current_balance=None,
                user=self.user
            ).save()
        
    def test_create_empty_request(self):
        response = self.client.post('/create-account/', {})
        self.assertEqual(response.status_code, 400)
    
    def test_empty_account_list(self):
        self.user1 = User.objects.create_user(username='testuser1', password='user@1234')
        self.client1 = APIClient()
        
        response = self.client1.post('/api/token/', {'username': 'testuser1', 'password': 'user@1234'})
        self.token1 = response.data['access']
        self.client1.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token1)
        
        response = self.client1.get('/accounts/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_account_list(self):
        response = self.client.get('/accounts/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_transaction(self):
        response = self.client.post('/transactions/', {
            'transaction_type': 'CR',
            'amount': 50.00,
            'account': self.account.id,
            'note': 'Test deposit'
        })
        self.assertEqual(response.status_code, 201)
        self.account.refresh_from_db()
        self.assertEqual(self.account.current_balance, 150.00)

    def test_create_transaction_insufficient_funds(self):
        response = self.client.post('/transactions/', {
            'transaction_type': 'DR',
            'amount': 500.00,
            'account': self.account.id,
            'note': 'Test deposit'
        })
        self.assertEqual(response.status_code, 400)
    
    def test_create_transaction_invalid_account(self):
        response = self.client.post('/transactions/', {
            'transaction_type': 'DR',
            'amount': 50.00,
            'account': 5,
            'note': 'Test deposit'
        })
        self.assertEqual(response.status_code, 400)
    
    def test_create_transaction_negative_fund(self):
        with self.assertRaises(ValidationError):
            self.client.post('/transactions/', {
                'transaction_type': 'CR',
                'amount': -50.00,
                'account': self.account.id,
                'note': 'Test deposit'
            })
    
    def test_create_transaction_invalid_transaction_type(self):
        response = self.client.post('/transactions/', {
            'transaction_type': 'DB',
            'amount': 50.00,
            'account': 1,
            'note': 'Test deposit'
        })
        self.assertEqual(response.status_code, 400)
    
    def test_transaction_list_by_account(self):
        Transaction.objects.create(
            transaction_type='CR',
            amount=20,
            account=self.account,
            note='Test deposit'
        )
        response = self.client.get(f'/transactions/{self.account.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
    
    def test_transaction_list_by_account_with_no_transactions(self):
        response = self.client.get(f'/transactions/{self.account.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_transaction_list(self):
        response = self.client.get('/all-transactions/')
        self.assertEqual(response.status_code, 200)

    def test_get_balance_for_date(self):
        Transaction.objects.create(
            transaction_type='CR',
            amount=20,
            account=self.account,
            note='Test deposit'
        )

        date = datetime.date.today().strftime("%Y-%m-%d")
        response = self.client.get(f'/accounts/{self.account.id}/balance/{date}/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("balance", response.data)
    
    def test_get_balance_for_invalid_date_format(self):
        Transaction.objects.create(
            transaction_type='CR',
            amount=20,
            account=self.account,
            note='Test deposit'
        )

        date = datetime.date.today().strftime("%d-%m-%Y")
        response = self.client.get(f'/accounts/{self.account.id}/balance/{date}/')
        self.assertEqual(response.status_code, 400)


    def tearDown(self):
        self.client.logout()
