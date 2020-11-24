from django.urls import path
from .views import ReactStart


urlpatterns = [
    path('', ReactStart.as_view())
]