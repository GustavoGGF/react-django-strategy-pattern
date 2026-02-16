from django.urls import path
from . import views

urlpatterns = [
    path('macapa/', views.ImportContacts),
    path('varejao/', views.ImportContacts),
]
