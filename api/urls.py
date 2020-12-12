from django.urls import path
from api.views import MovieListView, MovieDetailView


urlpatterns = [
    path('', MovieListView.as_view()),
    path('<pk>', MovieDetailView.as_view()),
]