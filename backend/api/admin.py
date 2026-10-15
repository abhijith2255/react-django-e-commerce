from django.contrib import admin
from .models import Product, Order # Order ചേർത്തു

admin.site.register(Product)
admin.site.register(Order) # പുതിയത്