from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly # പുതിയത്
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # ലോഗിൻ സുരക്ഷ നൽകുന്നു

# ബാക്കിയുള്ളവ പഴയതുപോലെ തന്നെ...
class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# പുതിയതായി ചേർത്തത് (പുതിയ ഡാറ്റ സേവ് ചെയ്യാൻ CreateAPIView ആണ് ഉപയോഗിക്കുന്നത്)
class OrderCreate(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer