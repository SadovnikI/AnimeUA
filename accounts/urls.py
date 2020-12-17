from django.urls import path, include
from .views import *
from knox import views as knox_views


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/cabinet/modify_user', ModifyUserAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/cabinet/<pk>', CabinetAPI.as_view()),
    path('api/cabinet/watching/<pk>/<pk2>', WatchingAPI.as_view()),
    path('api/cabinet/planning/<pk>/<pk2>', PlanningAPI.as_view()),
    path('api/cabinet/completed/<pk>/<pk2>', CompletedAPI.as_view()),
    path('api/cabinet/dropped/<pk>/<pk2>', DroppedAPI.as_view()),
]
