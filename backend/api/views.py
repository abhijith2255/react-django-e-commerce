from rest_framework import generics
from .models import Product, Order # Order ചേർത്തു
from .serializers import ProductSerializer, OrderSerializer # OrderSerializer ചേർത്തു

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# പുതിയതായി ചേർത്തത് (പുതിയ ഡാറ്റ സേവ് ചെയ്യാൻ CreateAPIView ആണ് ഉപയോഗിക്കുന്നത്)
class OrderCreate(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer