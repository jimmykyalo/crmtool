from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isGroup = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin','isGroup']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
    
    def get_isGroup(self, obj):
        try:
            return obj.userprofile.isGroup
        except:
            return False


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin','isGroup', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)





class ProductSerializer(serializers.ModelSerializer):
    productName = serializers.SerializerMethodField(read_only=True)
    
    

    class Meta:
        model = Product
        fields = '__all__'
    def get_productName(self, obj):
        try:
            name = obj.name
        except:
            name = ''
        try:
            type = obj.type
        except:
            type = ''
        
        return name+ ' '+type

class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'

    

# class CountySerializer(serializers.ModelSerializer):
    

#     class Meta:
#         model = County
#         fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Staff
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Supplier
        fields = '__all__'




class ExpenseSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Expense
        fields = '__all__'
    
    

class StockSerializer(serializers.ModelSerializer):
    productName = serializers.SerializerMethodField(read_only=True)
    productID = serializers.SerializerMethodField(read_only=True)
    staffName = serializers.SerializerMethodField(read_only=True)
    
    

    class Meta:
        model = Stock
        fields = '__all__'

    def get_productName(self, obj):
        try:
            name = obj.product.name
        except:
            name = '-'
        try:
            type = obj.product.type
            return name+ ' '+type
        except:
            return name
        
        


    def get_productID(self, obj):
        return obj.product._id

    
    def get_staffName(self, obj):
        try:
            return obj.staff.name
        
        except:
            return '-'
    

class SaleSerializer(serializers.ModelSerializer):
    productName = serializers.SerializerMethodField(read_only=True)
    customerName = serializers.SerializerMethodField(read_only=True)
    staffName = serializers.SerializerMethodField(read_only=True)
    productID = serializers.SerializerMethodField(read_only=True)
    stock = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Sale
        fields = '__all__'

    def get_productName(self, obj):
        try:
            name = obj.stock.product.name
        except:
            name = '-'
        try:
            type = obj.stock.product.type
            return name+ ' '+type
        except:
            return obj.stock.product.name
        
        


    def get_customerName(self, obj):
        return obj.customer.name

    
    def get_staffName(self, obj):
        try:
            return obj.staff.name
        
        except:
            return '-'
    
    

    def get_productID(self, obj):
        return obj.stock.product._id

    def get_stock(self, obj):
        serializer = StockSerializer(obj.stock, many=False)
        return serializer.data

class SalesTrendSerializer(serializers.ModelSerializer):

    totalQuantity = serializers.SerializerMethodField()
    totalCash = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()

    def get_month(self, obj):
        return obj['month']

    def get_totalCash(self, obj):
        try:
            return obj['totalCash']
        except:
            return ''

    def get_totalQuantity(self, obj):
        try:
            return obj['totalQuantity']
        except:
            return ''
    class Meta:
        model = Sale
        fields = ('month', 'totalCash', 'totalQuantity')

class SalesPerProductSerializer(serializers.ModelSerializer):

    totalQuantity = serializers.SerializerMethodField()
    totalCash = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()

    def get_product(self, obj):
        return obj['stock__product__name'] + ' ' + obj['stock__product__type']

    def get_totalCash(self, obj):
        try:
            return obj['totalCash']
        except:
            return ''

    def get_totalQuantity(self, obj):
        try:
            return obj['totalQuantity']
        except:
            return ''
    class Meta:
        model = Sale
        fields = ('product', 'totalCash', 'totalQuantity')


class ProductSalesTrendSerializer(serializers.ModelSerializer):

    totalQuantity = serializers.SerializerMethodField()
    totalCash = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()

    def get_product(self, obj):
        return obj['stock__product__name'] + ' ' + obj['stock__product__type']

    def get_month(self, obj):
        return obj['month']

    def get_totalCash(self, obj):
        try:
            return obj['totalCash']
        except:
            return ''

    def get_totalQuantity(self, obj):
        try:
            return obj['totalQuantity']
        except:
            return ''
    class Meta:
        model = Sale
        fields = ('month', 'totalCash', 'totalQuantity', 'product')


class CreditSaleSerializer(serializers.ModelSerializer):

    totalQuantity = serializers.SerializerMethodField()
    totalCash = serializers.SerializerMethodField()
    customerName = serializers.SerializerMethodField()
    product = serializers.SerializerMethodField()
    receiptNumber = serializers.SerializerMethodField()
    deposit = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    sale = serializers.SerializerMethodField(read_only=True)
    

    def get_date(self, obj):
        sale = Sale.objects.filter(receiptNumber=obj['receiptNumber']).first()
        serializer=SaleSerializer(sale, many=False)
        return serializer.data['date']

    def get_product(self, obj):
        return obj['stock__product__name'] + ' ' + obj['stock__product__type']

    def get_customerName(self, obj):
        return obj['customer__name']

    def get_deposit(self, obj):
        return obj['deposit']

    def get_totalCash(self, obj):
        try:
            return obj['totalCash']
        except:
            return ''

    def get_totalQuantity(self, obj):
        try:
            return obj['totalQuantity']
        except:
            return ''

    def get_receiptNumber(self, obj):
        try:
            
            return obj['receiptNumber']
        except:
            return ''

    def get_sale(self, obj):
        sale=Sale.objects.filter(receiptNumber=obj['receiptNumber']).first()
        serializer=SaleSerializer(sale, many=False)
        return serializer.data

    class Meta:
        model = Sale
        fields = ('customerName', 'totalCash', 'totalQuantity', 'product', 'receiptNumber', 'deposit','date', 'sale')


class InstallmentSerializer(serializers.ModelSerializer):

    productName = serializers.SerializerMethodField()
    customerName = serializers.SerializerMethodField()
    sale = serializers.SerializerMethodField(read_only=True)
    
    

    def get_productName(self, obj):
        sale = Sale.objects.filter(receiptNumber=obj.receiptNumber).first()
        serializer=SaleSerializer(sale, many=False)
        return serializer.data['productName']

    def get_customerName(self, obj):
        sale = Sale.objects.filter(receiptNumber=obj.receiptNumber).first()
        serializer=SaleSerializer(sale, many=False)
        return serializer.data['customerName']

    def get_sale(self, obj):
        sale=Sale.objects.filter(receiptNumber=obj.receiptNumber).first()
        serializer=SaleSerializer(sale, many=False)
        return serializer.data

    class Meta:
        model = Installment
        fields = '__all__'

class DamageSerializer(serializers.ModelSerializer):

    productName = serializers.SerializerMethodField(read_only=True)
    stockID = serializers.SerializerMethodField(read_only=True)
    staffName = serializers.SerializerMethodField(read_only=True)
    method = serializers.SerializerMethodField(read_only=True)
    batchNumber = serializers.SerializerMethodField(read_only=True)
    

    class Meta:
        model = Damage
        fields = '__all__'

    def get_productName(self, obj):
        try:
            name = obj.stock.product.name
        except:
            name = '-'
        try:
            type = obj.stock.product.type
        except:
            type = '-'
    
        return name+ ' '+type


    def get_stockID(self, obj):
        return obj.stock._id

    
    def get_staffName(self, obj):
        try:
            return obj.staff.name
        except:
            return '-'

    def get_method(self, obj):
        try:
            return obj.stock.method
        except:
            return '-'
    def get_batchNumber(self, obj):
        try:
            return obj.stock.batchNumber
        except:
            return '-'


class StaffPaymentSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Staff
        fields = '__all__'
    
    


    
        


    



