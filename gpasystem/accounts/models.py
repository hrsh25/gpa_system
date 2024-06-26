from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Account(models.Model):
    account_number = models.CharField(max_length=16, unique=True)
    initial_balance = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')

    def save(self, *args, **kwargs):
        if self.initial_balance is None:
            raise ValidationError("Initial balance cannot be null.")
        if self.current_balance is None:
            raise ValidationError("Current balance cannot be null.")
        if self.current_balance < 0:
            raise ValidationError("Current balance cannot be negative.")
        if not self.user:
            raise ValidationError("An account must be associated with a user.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.account_number

class Transaction(models.Model):
    date = models.DateField(auto_now_add=True)
    transaction_type = models.CharField(max_length=2, choices=[('CR', 'Credit'), ('DR', 'Debit')])
    note = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='transactions')
    status = models.CharField(max_length=1, choices=[('S', 'Success'), ('F', 'Failure')], default='S')

    def save(self, *args, **kwargs):
        if self.amount < 0:
            raise ValidationError("Current balance cannot be negative.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"
