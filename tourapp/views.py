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


api_url = f"http://127.0.0.1:8080/best-tours/50"
response_data = requests.get(api_url)
response_content = json.loads(response_data.content)
data = {'tours': response_content['best_tours']}

@csrf_exempt
def home(request):
    return render(request, 'tourapp/home.html', context=data)

@csrf_exempt
def home_details(request,card_id):
    print(card_id)
    tours = data['tours']
    return render(request, 'tourapp/details.html', tours[card_id])

@csrf_exempt
def details(request, card_id):
    tour_data = request.body.decode('utf-8')
    tour_data = json.loads(tour_data)
    want_data = tour_data[card_id]
    print(want_data)
    a = render(request, 'tourapp/details.html', want_data)
    print(a)
    return a
