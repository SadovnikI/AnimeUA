from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from accounts.models import UserCabinet


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class CabinetSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserCabinet
        fields = ('id', 'user', 'avatar')


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
    username = serializers.CharField(allow_blank=True)
    old_password = serializers.CharField()
    new_password = serializers.CharField(allow_blank=True)
    # avatar = serializers.FileField()

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.username = validated_data.get('username', instance.username)
        instance.old_password = validated_data.get('old_password', instance.password)
        instance.new_password = validated_data.get('new_password', instance.password)
        # instance.avatar = validated_data.get('avatar', instance.avatar)

        return instance

