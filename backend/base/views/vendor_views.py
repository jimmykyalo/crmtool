from rest_framework import serializers
from base.models import Vendor
from base.serializers import VendorSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# list vendors
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendors(request):
    user = request.user
    vendors = Vendor.objects.filter(user=user)
    serializer = VendorSerializer(vendors, many=True)
    return Response(serializer.data)
    
#create Vendor
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createVendor(request):
    user = request.user
    data = request.data
    vendor = Vendor.objects.create(
        user=user,
        name=data['name'],
        location=data['location'],
        phoneNumber=data['phoneNumber'],
    )
    serializer = VendorSerializer(vendor, many=False)
    return Response(serializer.data)