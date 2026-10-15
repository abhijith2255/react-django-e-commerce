from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200) # പ്രൊഡക്റ്റിന്റെ പേര്
    description = models.TextField() # വിവരണം
    price = models.DecimalField(max_digits=10, decimal_places=2) # വില
    image = models.ImageField(upload_to='products/', null=True, blank=True) # ചിത്രം
    stock = models.IntegerField(default=10) # സ്റ്റോക്ക് എണ്ണം

    def __str__(self):
        return self.name

class Order(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.name}"