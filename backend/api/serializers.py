from rest_framework import serializers
from .models import Product, Order # Order കൂടി ചേർത്തു

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# പുതിയതായി ചേർത്തത്
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'