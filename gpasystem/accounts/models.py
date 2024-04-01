from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    account_number = models.CharField(max_length=16, unique=True)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')

    def __str__(self):
        return self.account_number

class Transaction(models.Model):
    date = models.DateField(auto_now_add=True)
    transaction_type = models.CharField(max_length=2, choices=[('CR', 'Credit'), ('DR', 'Debit')])
    note = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    status = models.CharField(max_length=1, choices=[('S', 'Success'), ('F', 'Failure')], default='S')

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"
