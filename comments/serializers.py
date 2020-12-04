from django.contrib.auth.models import User
from rest_framework import serializers
from backend.models import Comment


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class SubComment(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id']


class CommentSerializer(serializers.ModelSerializer):

    reply_user_id = SubComment()
    user_id = UserNameSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'user_id', 'video_id', 'text', 'reply_user_id')




