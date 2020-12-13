from django.urls import path
from movie.views import MovieListView, MovieDetailView


urlpatterns = [
    path('api/', MovieListView.as_view()),
    path('api/<pk>', MovieDetailView.as_view()),
]