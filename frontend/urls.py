from django.urls import path
from .views import index

urlpatterns = [
    path('home', index),
    path('home/<film>', index),
    path('home/<film>/<seria>', index),
    path('register', index),
    path('login', index),
    path('cabinet/<user>', index),
    path('cabinet/settings/<user>', index),
]
