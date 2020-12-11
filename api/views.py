from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView

from backend.bucket import create_presigned_url1
from backend.models import Movie, ShadowMovie
from .serializers import MovieSerializer, ShadowMovieSerializer
from rest_framework.response import Response
from rest_framework.views import APIView


@permission_classes((permissions.AllowAny,))
class MovieDetailView(APIView):
    def get(self, request, pk):
        movie = Movie.objects.get(id=pk)
        genre_array = [genre for genre in movie.genres.all()]
        link_array = [create_presigned_url1(str(video.bucket_id), str(video.name)) for video in
                      movie.video.all()]

        shadow = ShadowMovie(id=1, title=movie.title, description=movie.description, poster=movie.poster,
                             year=movie.year, country=movie.country, category=movie.category,
                             url=movie.url, rating=movie.rating, video_urls=link_array, genres = genre_array)


        serializer = ShadowMovieSerializer(shadow)
        return Response(serializer.data)


class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
