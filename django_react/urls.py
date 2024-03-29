from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('movie.urls')),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include('comments.urls')),
]