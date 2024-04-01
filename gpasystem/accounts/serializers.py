from rest_framework import serializers
from .models import Account, Transaction

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'current_balance', 'user']
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['initial_balance'] = validated_data.get('current_balance')
        return super().create(validated_data)

class TransactionSerializer(serializers.ModelSerializer):
    account_number = serializers.SlugRelatedField(
        read_only=True,
        source='account',
        slug_field='account_number'
    )

    class Meta:
        model = Transaction
        fields = ['id', 'date', 'transaction_type', 'note', 'amount', 'account', 'status', 'account_number']
        read_only_fields = ['date']
