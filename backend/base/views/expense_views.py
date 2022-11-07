from rest_framework import serializers
from base.models import Expense, Member
from base.serializers import ExpenseSerializer
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import dateutil.parser

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getExpenses(request):
    data = request.data
    user = request.user
    
        
    try:
        
        fromDate = dateutil.parser.parse(data['fromDate'], ignoretz = True).date()
        toDate = dateutil.parser.parse(data['toDate'], ignoretz = True).date()
        
        expenses = Expense.objects.filter(date__range=[fromDate, toDate], user=user)
    except:
        expenses = Expense.objects.filter(user=user)
    
    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createExpense(request):
    user = request.user
    data = request.data
    if data['member'] !='':    
        member = Member.objects.get(_id=int(data['member']))
        
    else:
        member=None
    expense = Expense.objects.create(
        user=user,
        name=data['name'],
        category=data['category'],
        member=member,
        amount=data['amount'],
        date=dateutil.parser.parse(data['date']).date()

    )
    serializer = ExpenseSerializer(expense, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateExpense(request):
    data = request.data

    for i in data:
        expense = Expense.objects.get(_id=i['_id'])
        setattr(expense, i['dataField'], i['value'])
        expense.save()
    
    
    return Response('Changes Saved')


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteExpense(request, pk):
    expense = Expense.objects.get(_id=pk)
    expense.delete()
    return Response('Expense Deleted')