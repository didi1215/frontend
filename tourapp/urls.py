from django.urls import path

from . import views

app_name = 'tourapp'
urlpatterns = [

    # ex: /tourapp/
    path('', views.home, name='home'),

    # ex: /tourapp/resto/5
    # path('search/<str:input>/', views.search, name='search'),
    path('resto/<int:card_id>/details/', views.details, name='details'),
    # path('resto/details/', views.details, name='details'),
    
]