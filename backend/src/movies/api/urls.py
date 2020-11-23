from django.urls import path

from .views import MovieListView, MovieDetailView

urlpatterns = [
    path('', MovieListView.as_view()),
    path('<pk>', MovieDetailView.as_view()),
]