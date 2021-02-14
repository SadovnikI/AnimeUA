from django.contrib.auth.models import User
from rest_framework import serializers

from comments.models import Comment
from movie.models import Movie


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class CommentGetSerializer(serializers.ModelSerializer):
    user_id = UserNameSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'user_id', 'text', 'date', 'movie_id')


class CommentPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'user_id', 'text', 'date', 'movie_id')