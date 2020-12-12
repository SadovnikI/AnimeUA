from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
from api.serializers import MovieSerializer
from backend.models import Comment

from backend.models import UserCabinet


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class CabinetSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    watching = MovieSerializer()
    planning = MovieSerializer()
    completed = MovieSerializer()
    dropped = MovieSerializer()
    class Meta:
        model = UserCabinet
        fields = ('id', 'user', 'avatar', 'watching', 'planning', 'completed', 'dropped')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ModifyUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    password = serializers.CharField()

    # avatar = serializers.FileField()

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        # instance.avatar = validated_data.get('avatar', instance.avatar)

        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'user_id', 'video_id', 'text', 'date', 'movie_id')
