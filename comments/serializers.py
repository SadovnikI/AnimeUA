from django.contrib.auth.models import User
from rest_framework import serializers
from backend.models import Comment


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','id']



class CommentSerializer(serializers.ModelSerializer):

    user_id = UserNameSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'user_id', 'video_id', 'text', 'date')




