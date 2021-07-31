from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView


from comments.models import Comment
from comments.serializers import CommentGetSerializer, CommentPostSerializer
from movie.models import Movie, Video


class CommentView(APIView):
    def get(self, request, pk):
        queryset = Comment.objects.filter(movie_id__url=pk)

        serializer = CommentGetSerializer(queryset, many=True)
        return Response(serializer.data)


class CommentAPI(generics.GenericAPIView):
    serializer_class = CommentPostSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)

        comment = Comment(movie_id=Movie.objects.get(id=serializer.data['movie_id']),
                          user_id=User.objects.get(id=serializer.data['user_id']),
                          text=serializer.data['text'],
                          date=serializer.data['date'],
                          )
        comment.save()
        comment_serializer = CommentPostSerializer(comment)
        return Response(comment_serializer.data)
