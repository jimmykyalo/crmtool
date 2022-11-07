from base.models import Sale, Stock, Staff, Customer, Installment, Member
from base.serializers import SaleSerializer, StockSerializer, SalesTrendSerializer, SalesPerProductSerializer, ProductSalesTrendSerializer, CreditSaleSerializer, InstallmentSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import dateutil.parser
from django.db.models.functions import TruncMonth
from django.db.models import Sum, ProtectedError

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSale(request):
    stock_list=list()
    sales_list=list()
    user = request.user
    data = request.data
    if data['customer']=='New':
        customer = Customer.objects.create(
            name=data['name'],
            type = data['type'],
            IDNumber = data['IDNumber'],
            phoneNumber = data['phoneNumber'],
            location = data['location'],
            contactPerson = data['contactPerson'],
            user=user
        )
    else:
        customer = Customer.objects.get(_id=int(data['customer']))

    if data['staffID'] !='':    
        staff = Staff.objects.get(_id=int(data['staffID']))
    else:
        staff=None
    
    if data['green']:
        stocks = Stock.objects.filter(user=user, product___id=int(data['product']), method='Moulding', countInStock__gt=0).order_by('date')
    else:
        stocks = Stock.objects.filter(user=user, product___id=int(data['product']), countInStock__gt=0).exclude(method='Moulding').order_by('date')
    
    if data['member'] !='':    
        member = Member.objects.get(_id=int(data['member']))
        stocks = stocks.filter(member=member)
    else:
        member=None

    stocks_data = StockSerializer(stocks, many=True).data
    
    for i in stocks_data:
        stock_list.append(i)
    
    initial_number = stock_list[0]['countInStock']

    if initial_number >= int(data['quantity']):
            stock=Stock.objects.get(_id=stock_list[0]['_id'])
            sale = Sale.objects.create(
                member=member,
                user=user,
                staff=staff,
                customer=customer,
                stock=stock,
                date = dateutil.parser.parse(data['date']).date(),
                quantity=int(data['quantity']),
                totalPrice=data['totalPrice'],
                unitPrice=data['unitPrice'],                
                onCredit=data['onCredit'],
                deposit=data['deposit'],       
            )
            sale.receiptNumber='SL'+str(sale._id)
            sale.save()
            stock.countInStock-=int(data['quantity'])
            stock.save()
    else:
        i=0
        quantity = int(data['quantity'])
        while initial_number < quantity:
            stock = Stock.objects.get(_id=stock_list[i]['_id'])
            sale = Sale.objects.create(
                member=member,
                user=user,
                staff=staff,
                customer=customer,
                stock=stock,
                date = dateutil.parser.parse(data['date']).date(),
                quantity=initial_number,
                totalPrice=data['totalPrice'],
                unitPrice=data['unitPrice'],
                onCredit=data['onCredit'],
                deposit=data['deposit'],     
            )
            if i==0:
                serialNumber = 'SL'+str(sale._id)
            
            quantity = quantity-initial_number
            i = i + 1
            initial_number = stock_list[i]['countInStock']
            
            sales = Sale.objects.get(_id=sale._id)

            sales_obj = SaleSerializer(sales, many=False).data
            sales_list.append(sales_obj)

        if quantity > 0:
            stock = Stock.objects.get(_id=stock_list[i]['_id'])
            sale = Sale.objects.create(
                member=member,
                user=user,
                staff=staff,
                customer=customer,
                stock=stock,
                date = dateutil.parser.parse(data['date']).date(),
                quantity=quantity,
                totalPrice=float(data['unitPrice'])*float(quantity),
                unitPrice=data['unitPrice'],                
                onCredit=data['onCredit'],
                deposit=data['deposit'], 
            )
            

            sales_obj = SaleSerializer(sale, many=False).data
            sales_list.append(sales_obj)
        
        for i in sales_list:
            sale = Sale.objects.get(_id = i['_id'])
            sale.receiptNumber = serialNumber
            sale.save()

            stock = Stock.objects.get(_id=sale.stock._id)
            stock.countInStock-=sale.quantity
            stock.save()

    serializer=SaleSerializer(sale, many=False)    






    return Response(serializer.data)

    
        
    

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getSales(request):
    data = request.data
    user = request.user
           
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        sales = Sale.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        sales = Sale.objects.filter(user=user)
    
    serializer = SaleSerializer(sales, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSalesTrend(request):
    user = request.user
    sales = Sale.objects.filter(user=user).values(month=TruncMonth('date')).annotate(totalQuantity=Sum('quantity'), totalCash=Sum('totalPrice'))
    print(sales)
    serializer = SalesTrendSerializer(sales, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSalesPerProduct(request):
    user = request.user
    sales = Sale.objects.filter(user=user).values('stock__product__name', 'stock__product__type').annotate(totalQuantity=Sum('quantity'), totalCash=Sum('totalPrice'))
    print(sales)
    serializer = SalesPerProductSerializer(sales, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProductSalesTrend(request):
    user = request.user
    sales = Sale.objects.filter(user=user).values('stock__product__name', 'stock__product__type', month=TruncMonth('date')).annotate(totalQuantity=Sum('quantity'), totalCash=Sum('totalPrice'))
    print(sales)
    serializer = ProductSalesTrendSerializer(sales, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getCreditSales(request):

    data = request.data
    user = request.user
           
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        sales = Sale.objects.filter(date__range=[fromDate, toDate], user=user, onCredit=True).values('stock__product__name', 'stock__product__type', 'customer','receiptNumber','deposit', 'customer__name', 'date').annotate(totalQuantity=Sum('quantity'), totalCash=Sum('totalPrice'))
    except:
        sales = Sale.objects.filter(user=user, onCredit=True).values('stock__product__name', 'stock__product__type', 'customer','receiptNumber','deposit', 'customer__name', 'date').annotate(totalQuantity=Sum('quantity'), totalCash=Sum('totalPrice'))
    
    serializer = CreditSaleSerializer(sales, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createInstallment(request):
    user = request.user
    data = request.data
    installment = Installment.objects.create(
        user=user,
        date=dateutil.parser.parse(data['date']).date(),
        amount=data['amount'],
        receiptNumber=data['receiptNumber'],
    )
    serializer = InstallmentSerializer(installment, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getInstallments(request):
    data = request.data
    user = request.user
           
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        installments = Installment.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        installments = Installment.objects.filter(user=user)
    
    serializer = InstallmentSerializer(installments, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSale(request):
    data = request.data

    for i in data:
        sale = Sale.objects.get(_id=i['_id'])
        setattr(sale, i['dataField'], i['value'])
        if i['dataField']=='unitPrice':
            sale.totalPrice=sale.quantity*float(i['value'])
        sale.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSale(request, pk):
    sales = Sale.objects.filter(receiptNumber=pk)
    for i in sales:
        i.stock.countInStock+=i.quantity
        i.stock.save()
        i.delete()
    return Response('Sale Deleted')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateInstallment(request):
    data = request.data

    for i in data:
        installment = Installment.objects.get(_id=i['_id'])
        setattr(installment, i['dataField'], i['value'])
        installment.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteInstallment(request, pk):
    installment = Installment.objects.get(_id=pk)
    installment.delete()
    return Response('Installment Deleted')