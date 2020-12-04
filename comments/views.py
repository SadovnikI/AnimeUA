from rest_framework.response import Response
from rest_framework.views import APIView

from backend.models import Comment
from comments.serializers import CommentSerializer


class CommentView(APIView):
    def get(self, request, pk):
        queryset = Comment.objects.filter(video_id=pk)

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)
