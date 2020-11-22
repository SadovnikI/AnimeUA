from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import MovieSerializer
from movies.models import Movie


class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer