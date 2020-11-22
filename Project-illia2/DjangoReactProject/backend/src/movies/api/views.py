from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import MovieSerializer,ShadowMovieSerializer
from movies.models import Movie, ShadowMovie
from rest_framework.response import Response
from rest_framework.views import APIView

@permission_classes((permissions.AllowAny,))
class MovieListView(APIView):
    def get(self, request):
        movie = Movie.objects.get(id=1)
        shadow = ShadowMovie(id=1, title=movie.title, content=movie.content,seriaurls=['asd','fasd'])


        # the many param informs the serializer that it will be serializing more than a single article.
        serializer = ShadowMovieSerializer(shadow)
        return Response({"articles": serializer.data})



class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer