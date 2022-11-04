from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import PROTECT
# Create your models here.

class UserProfile(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    company = models.CharField(max_length=1000, blank=True, null=True)
    phoneNumber = models.IntegerField(blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    latitude = models.CharField(max_length=200, null=True, blank=True)
    logitude = models.CharField(max_length=200, null=True, blank=True)

class Product(models.Model):
    user = models.ForeignKey(User, blank=True, null=True, on_delete=PROTECT)
    _id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=1000)
    type = models.CharField(max_length=1000, blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.jpg')
    def __str__(self):
        return self.name + ' ' + self.type

class Staff(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    IDNumber = models.CharField(max_length=200, null=True, blank=True)
    phoneNumber = models.CharField(max_length=200, null=True, blank=True)
    KRAPin = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    gender = models.CharField(max_length=200, null=True, blank=True)
    paymentFrequency = models.CharField(max_length=1000, null=True, blank=True)
    hoursWorked = models.IntegerField(null=True, blank=True)
    daysWorked = models.IntegerField(null=True, blank=True)
    

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Staff'

class Customer(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    IDNumber = models.CharField(max_length=200, null=True, blank=True)
    phoneNumber = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.name

class Supplier(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    


    def __str__(self):
        return self.name


# class Income(models.Model):
#     _id = models.AutoField(primary_key=True, editable=False)
#     user = models.ForeignKey(User, on_delete=models.PROTECT, null=True) 
#     date = models.DateField()  
#     name = models.CharField(max_length=200, null=True, blank=True)
#     amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     createdAt = models.DateTimeField(auto_now_add=True)
    
    
    


#     def __str__(self):
#         return self.name

#     class Meta:
#         verbose_name_plural = 'Income'

# class Expense(models.Model):
#     _id = models.AutoField(primary_key=True, editable=False)
#     user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)    
#     date = models.DateField()
#     name = models.CharField(max_length=200, null=True, blank=True)
#     amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     createdAt = models.DateTimeField(auto_now_add=True)
    
    


#     def __str__(self):
#         return self.name


    


class Stock(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    date = models.DateField()
    product = models.ForeignKey(Product, on_delete=models.PROTECT, null=True)
    quantity = models.IntegerField(default=0)
    countInStock = models.IntegerField(default=0)
    method = models.CharField(max_length=200, null=True, blank=True)
    batchNumber = models.CharField(max_length=1000)
    createdAt = models.DateTimeField(auto_now_add=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT, null=True, blank=True)
    stockFrom = models.IntegerField(default=0)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Stock'

    def __str__(self):
        return self.batchNumber + ' --- ' + self.product.name + ' ' + self.product.type

class Damage(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    stock = models.ForeignKey(Stock, on_delete=models.PROTECT, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    quantity = models.IntegerField(default=0)    
    comment = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True, blank=True)
    
    

class Sale(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    customer =  models.ForeignKey(Customer, on_delete=models.PROTECT, null=True, blank=True)
    stock = models.ForeignKey(Stock, on_delete=models.PROTECT, null=True, blank=True)
    receiptNumber = models.CharField(max_length=1000, blank=True)
    date = models.DateField(max_length=20)
    quantity = models.IntegerField()
    unitPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    onCredit = models.BooleanField(default=False)
    deposit = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    tax=models.DecimalField(max_digits=7, decimal_places=2, default=0)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True, blank=True)

class Installment(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)
    receiptNumber = models.CharField(max_length=1000, blank=True)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    date = models.DateField()
    


class Salary(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True, blank=True)
    stock = models.ForeignKey(Stock, on_delete=models.PROTECT, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    amount = models.FloatField(default=0)
    work = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    

    class Meta:
        verbose_name_plural = 'Salaries'

class StaffPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.PROTECT, null=True)
    date = models.DateField()
    workDone = models.CharField(max_length=1000, null=True, blank=True)
    unitAmount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    per = models.CharField(max_length=1000, null=True, blank=True)
    totalAmount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    
    
    