from django.urls import path
from .views import ProductList, ProductDetail, OrderCreate
from rest_framework.authtoken.views import obtain_auth_token # പുതിയത്

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('orders/', OrderCreate.as_view(), name='order-create'),
    path('login/', obtain_auth_token, name='api_token_auth'), # ലോഗിൻ ചെയ്യാനുള്ള ലിങ്ക്
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]