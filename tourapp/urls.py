from django.urls import path

from . import views

app_name = 'tourapp'
urlpatterns = [

    # ex: /tourapp/
    path('', views.home, name='home'),

    # ex: /tourapp/resto/5
    # path('search/<str:input>/', views.search, name='search'),
    path('tour/<int:card_id>/details/', views.details, name='details'),
    path('tour/<int:card_id>/detail/', views.home_details, name='detail'),
    # path('resto/details/', views.details, name='details'),
    
]