import json

import requests
from django.views.decorators.csrf import csrf_exempt

from .models import *
from .forms import *
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.views import generic
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
data = None
@csrf_exempt
def home(request):
    return render(request, 'tourapp/home.html')



@csrf_exempt
def details(request, card_id):
    print(card_id)
    # print(request.body.decode('utf-8'))
    tour_data = request.body.decode('utf-8')
    tour_data = json.loads(tour_data)
    want_data = tour_data[card_id]
    print(want_data)
    a = render(request, 'tourapp/details.html', want_data)
    print(a)
    return a
