from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView

from .serializers import MovieSerializer, MovieDetailSerializer
from movies.models import Movie
from rest_framework.response import Response
from rest_framework.views import APIView


@permission_classes((permissions.AllowAny,))
class MovieDetailView(APIView):
    def get(self, request, pk):
        movie = Movie.objects.get(id=pk)

        serializer = MovieDetailSerializer(Movie)
        return Response({"movie_data": serializer.data})


class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
