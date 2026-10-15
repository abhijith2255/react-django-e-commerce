from django.urls import path
from .views import ProductList, ProductDetail, OrderCreate # OrderCreate ചേർത്തു

urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('orders/', OrderCreate.as_view(), name='order-create'), # പുതിയ ലിങ്ക്
]