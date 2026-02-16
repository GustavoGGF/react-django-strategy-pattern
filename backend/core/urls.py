from django.contrib import admin
from django.urls import path, include
from django.views.generic import (
    TemplateView,
)
from django.contrib.staticfiles.urls import (
    staticfiles_urlpatterns,
)
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name="home"),
    path('home', TemplateView.as_view(template_name='index.html'), name="home"),
    path('clients/', include('contacts.urls')),
    path('get-token/', views.GetToken),
    path('graphql/', views.SendData),
]

urlpatterns += staticfiles_urlpatterns()