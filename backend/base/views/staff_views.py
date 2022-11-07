from rest_framework import status
from base.models import Staff, StaffPayment, Member
from base.serializers import StaffSerializer,StaffPaymentSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import ProtectedError
import dateutil.parser

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStaff(request):
    user = request.user
    staff = Staff.objects.filter(user=user)
    serializer = StaffSerializer(staff, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createStaff(request):
    user = request.user
    data = request.data
    staff = Staff.objects.create(
        user=user,
        name=data['name'],
        type=data['type'],
        IDNumber=data['IDNumber'],
        phoneNumber=data['phoneNumber'],
        KRAPin=data['KRAPin'],
        daysWorked= data['daysWorked'],
        hoursWorked= data['hoursWorked']

    )
    serializer = StaffSerializer(staff, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStaff(request):
    data = request.data

    for i in data:
        staff = Staff.objects.get(_id=i['_id'])
        setattr(staff, i['dataField'], i['value'])
        staff.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteStaff(request, pk):
    try:
        staff = Staff.objects.get(_id=pk)
        staff.delete()
        return Response('Staff Deleted')
    except ProtectedError:
        message = {'detail': 'Staff cannot be deleted as it is linked to other records'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPayment(request):
    user = request.user
    data = request.data
    staff = Staff.objects.get(_id=int(data['staff']))
    if data['member'] !='':
        member = Member.objects.get(_id=int(data['member']))
    else:
        member= None
    staffPayment = StaffPayment.objects.create(
        user=user,
        staff=staff,
        date=data['date'],
        workDone=data['workDone'],
        unitAmount=data['unitAmount'],
        per=data['per'],
        totalAmount=data['totalAmount'],
        member=member
    )
    serializer = StaffPaymentSerializer(staffPayment, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStaffPayments(request):
    user = request.user
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        staffPayment = StaffPayment.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        staffPayment = StaffPayment.objects.filter(user=user)
    
    serializer = StaffPaymentSerializer(staffPayment, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateStaffPayment(request):
    data = request.data

    for i in data:
        staffPayment = StaffPayment.objects.get(_id=i['_id'])
        setattr(staffPayment, i['dataField'], i['value'])
        staffPayment.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteStaffPayment(request, pk):
    try:
        staffPayment = StaffPayment.objects.get(_id=pk)
        staffPayment.delete()
        return Response('Staff Payment Deleted')
    except ProtectedError:
        message = {'detail': 'Staff Payment cannot be deleted as it is linked to other records'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)