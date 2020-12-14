from django.contrib.auth.models import User

from rest_framework import generics, permissions

from rest_framework.response import Response
from knox.models import AuthToken

from .models import UserCabinet
from rest_framework.views import APIView

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CabinetSerializer, ModifyUserSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # insert validation here

        user = serializer.save()
        UserCabinet.objects.create(id=user.id, user=user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class CabinetAPI(APIView):
    def get(self, request, pk):
        queryset = UserCabinet.objects.filter(id=pk)

        serializer = CabinetSerializer(queryset, many=True)
        return Response(serializer.data)


class ModifyUserAPI(generics.GenericAPIView):
    serializer_class = ModifyUserSerializer

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(id=serializer.data['id'])
        user.update(username=serializer.data['username'])

        user = User.objects.get(id=serializer.data['id'])
        user.set_password(serializer.data['password'])
        user.save()
        # UserCabinet.objects.filter(id=serializer.data['id']).update(avatar=serializer.data['avatar'])

        return Response('200OK')