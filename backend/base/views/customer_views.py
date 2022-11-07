from rest_framework import serializers
from base.models import Customer
from base.serializers import CustomerSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomers(request):
    user= request.user
    customers = Customer.objects.filter(user=user)
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCustomer(request):
    user= request.user
    data = request.data
    if data['member'] !='':    
        member = Member.objects.get(_id=int(data['member']))
        
    else:
        member=None

    customer = Customer.objects.create(
        name=data['name'],
        type = data['type'],
        IDNumber = data['IDNumber'],
        phoneNumber = data['phoneNumber'],
        location = data['location'],
        contactPerson = data['contactPerson'],
        user=user,
        member=member
    )

    serializer = CustomerSerializer(customer, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCustomer(request):
    data = request.data

    for i in data:
        customer = Customer.objects.get(_id=i['_id'])
        setattr(customer, i['dataField'], i['value'])
        customer.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCustomer(request, pk):
    customer = Customer.objects.get(_id=pk)
    customer.delete()
    return Response('Customer Deleted')
