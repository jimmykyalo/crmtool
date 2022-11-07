from rest_framework import status
from base.models import Stock, Product, Damage, Staff, Member
from base.serializers import StockSerializer, DamageSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import dateutil.parser
from django.db.models import ProtectedError

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getStock(request):
    data = request.data
    user = request.user
           
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        stock = Stock.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        stock = Stock.objects.filter(user=user)
    
    serializer = StockSerializer(stock, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createStock(request):
    user = request.user
    data = request.data
    product = Product.objects.get(_id=int(data['product']))

    if data['member'] !='':
        member = Member.objects.get(_id=int(data['member']))
    else:
        member= None

    if data['staffID'] !='':
    
        staff = Staff.objects.get(_id=int(data['staffID']))
    else:
        staff=None
    
    stock = Stock.objects.create(
        user=user,
        product=product,
        date=dateutil.parser.parse(data['date']).date(),
        quantity=int(data['quantity']),
        countInStock=int(data['quantity']),
        method=data['method'],
        staff=staff,
        member = member
    )

    if data['batchNumber']=='':
        stock.batchNumber ='BT-'+str(stock._id)
        
    else:
        stockFrom= Stock.objects.get(_id = int(data['batchNumber']))
        stock.batchNumber = stockFrom.batchNumber
        stockFrom.countInStock -= int (data['quantity'])
        stockFrom.save()
        stock.stockFrom = int(data['batchNumber'])

        if stockFrom.member:
            stock.member = stockFrom.member
        
    stock.save()

    if int(data['damagedQuantity'])>0:
        stock.countInStock -= int (data['damagedQuantity'])
        stock.save()
        
        damage = Damage.objects.create(
            stock=stock,
            staff=staff,
            user=user,
            quantity=int(data['damagedQuantity']),
            date=dateutil.parser.parse(data['date']).date(),
            comment='Production Damage'

        )
        

    if data['method']=='Moulding' and int(data['firedQuantity'])>0:
        firedStock = Stock.objects.create(
            user=user,
            product=product,
            staff=staff,
            date=dateutil.parser.parse(data['date']).date(),
            quantity=int(data['firedQuantity']),
            countInStock=int(data['firedQuantity']),
            method='Firing',
            batchNumber = stock.batchNumber
        )
        stock.countInStock -= int(data['firedQuantity'])
        stock.save()

    

    serializer = StockSerializer(stock, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getDamages(request):
    data = request.data
    user = request.user
           
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        damages = Damage.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        damages = Damage.objects.filter(user=user)
    
    serializer = DamageSerializer(damages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createDamage(request):
    user = request.user
    data = request.data
    stock= Stock.objects.get(_id = int(data['batchNumber']))
    if data['staffID'] !='':
    
        staff = Staff.objects.get(_id=int(data['staffID']))
    else:
        staff=None
    
    damage = Damage.objects.create(
        user=user,
        date=dateutil.parser.parse(data['date']).date(),
        quantity=int(data['quantity']),
        comment=data['comment'],
        staff=staff,
        stock=stock
    )
    stock.countInStock-=int(data['quantity'])
    stock.save()

    serializer = DamageSerializer(damage, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStock(request):
    data = request.data
    print(data)
    for i in data:
        stock = Stock.objects.get(_id=i['_id'])
        if i['dataField']=='quantity':
            stock.countInStock+= int(i['value'])-stock.quantity
            if stock.stockFrom != 0:
               source=Stock.objects.get(_id=stock.stockFrom)
               source.countInStock-= int(i['value'])-stock.quantity
               source.save()
            stock.save()
            

        setattr(stock, i['dataField'], i['value'])
        stock.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteStock(request, pk):
    try:
        stock = Stock.objects.get(_id=pk)
        if stock.stockFrom != 0:
            source=Stock.objects.get(_id=stock.stockFrom)
            source.countInStock+=stock.quantity
            source.save()
        stock.delete()
        return Response('Stock Deleted')

    except ProtectedError:
        message = {'detail': 'Stock cannot be deleted as it is linked to other records'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
