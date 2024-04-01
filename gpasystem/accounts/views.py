import datetime

from .models import Account, Transaction
from .serializers import AccountSerializer, TransactionSerializer

from django.db.models import Sum
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"detail": "Successfully logged in."}, status=status.HTTP_200_OK)
    return Response({"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_list(request):
    """
    List all accounts.
    """
    accounts = Account.objects.filter(user=request.user)
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        transaction = serializer.save()
        account = transaction.account

        if transaction.transaction_type == "CR":
            account.current_balance += transaction.amount
        elif transaction.transaction_type == "DR":
            if account.current_balance < transaction.amount:
                transaction.status = "F"
                transaction.save()
                return Response({"detail": "Insufficient funds."}, status=400)
            else:
                account.current_balance -= transaction.amount
        account.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_list_by_account(request, account_id):
    transactions = Transaction.objects.filter(account_id=account_id, account__user=request.user)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_list(request):
    """
    List all transactions across all accounts.
    """
    user_accounts = request.user.accounts.all()
    transactions = Transaction.objects.filter(account__in=user_accounts)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance_for_date(request, account_id, date):
    try:
        target_date = datetime.datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        return Response({"error": "Incorrect date format. Should be YYYY-MM-DD."}, status=400)

    try:
        account = Account.objects.get(id=account_id, user=request.user)
    except Account.DoesNotExist:
        return Response({"error": "Account not found."}, status=404)
    
    transactions = Transaction.objects.filter(
        account=account,
        date__lte=target_date,
        status='S'
    )

    credits = transactions.filter(transaction_type="CR").aggregate(Sum('amount'))['amount__sum'] or 0
    debits = transactions.filter(transaction_type="DR").aggregate(Sum('amount'))['amount__sum'] or 0
    balance_for_date = account.initial_balance + credits - debits

    return Response({"balance": balance_for_date})
