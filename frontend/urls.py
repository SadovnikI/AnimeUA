from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('<film>', index),
    path('<film>/<seria>', index),
]