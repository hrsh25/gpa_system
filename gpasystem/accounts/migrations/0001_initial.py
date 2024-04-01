# Generated by Django 4.2.11 on 2024-03-29 23:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_number', models.CharField(max_length=16, unique=True)),
                ('current_balance', models.DecimalField(decimal_places=2, max_digits=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('transaction_type', models.CharField(choices=[('CR', 'Credit'), ('DR', 'Debit')], max_length=2)),
                ('note', models.TextField(blank=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='accounts.account')),
            ],
        ),
    ]