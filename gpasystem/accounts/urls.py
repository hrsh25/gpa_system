from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path('login/', login_view, name='api_login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='api_logout'),
    path('create-account/', create_account, name='create-account'),
    path('accounts/', account_list, name='account-list'),
    path('transactions/', create_transaction, name='create-transaction'),
    path('transactions/<int:account_id>/', transaction_list_by_account, name='transaction-list'),
    path('all-transactions/', transaction_list, name='all-transactions'),
    path('accounts/<int:account_id>/balance/<str:date>/', get_balance_for_date, name='get-balance-for-date')
]
