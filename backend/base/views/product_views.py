from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from base.models import Product
from base.serializers import ProductSerializer

from rest_framework import status
from django.db.models import ProtectedError


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    user=request.user
    products = Product.objects.filter(user=user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    user = request.user
    data=request.data
    
    
    product = Product.objects.create(
        user=user,
        name= data['name'],
        price=data['price'],
        type=data['type'],
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request):
    data = request.data

    for i in data:
        product = Product.objects.get(_id=i['_id'])
        setattr(product, i['dataField'], i['value'])
        product.save()
    
    # product = Product.objects.get(_id=pk)

    # product.name = data['name']
    # product.price = data['price']
    # product.brand = data['brand']
    # product.countInStock = data['countInStock']
    # product.category = data['category']
    # product.description = data['description']

    # product.save()

    # serializer = ProductSerializer(product, many=False)
    # return Response(serializer.data)
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response('Product Deleted')

    except ProtectedError:
        message = {'detail': 'Product cannot be deleted as it is linked to other records'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)





