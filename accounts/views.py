from django.contrib.auth.models import User

from rest_framework import generics, permissions
from rest_framework import status
from rest_framework.response import Response
from knox.models import AuthToken

from movie.models import Movie
from .models import UserCabinet
from rest_framework.views import APIView

from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CabinetSerializer, ModifyUserSerializer, \
    ModifyTGSerializer

from django.contrib.auth.hashers import check_password


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
        user_cabinet = UserCabinet.objects.filter(id=pk)

        serializer = CabinetSerializer(user_cabinet, many=True)
        return Response(serializer.data)


class ModifyUserAPI(generics.GenericAPIView):
    serializer_class = ModifyUserSerializer

    def put(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(id=serializer.data['id'])
        if serializer.data['username']:
            if User.objects.filter(username=serializer.data['username']):
                return Response('Логін зайнято')

            user.update(username=serializer.data['username'])

        user = User.objects.get(id=serializer.data['id'])
        if serializer.data['new_password']:
            if not check_password(serializer.data['old_password'], user.password):
                return Response('Пароль невірний', status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.data['new_password'])
            user.save()

        # UserCabinet.objects.filter(id=serializer.data['id']).update(avatar=serializer.data['avatar'])

        return Response('200OK')


class ModifyTgAPI(generics.GenericAPIView):
    serializer_class = ModifyTGSerializer

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cabinet = UserCabinet.objects.filter(id=serializer.data['id']).first()
        print(cabinet.tg_name)
        cabinet.tg_name = serializer.data['tg_name']
        cabinet.save()
        print(cabinet.tg_name)

        return Response('200OK')


class WatchingAPI(APIView):
    def put(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)

        cabinet.watching.add(Movie.objects.get(url=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.watching.remove(Movie.objects.get(url=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)


class PlanningAPI(APIView):
    def put(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)

        cabinet.planning.add(Movie.objects.get(url=pk))
        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.planning.remove(Movie.objects.get(url=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)


class CompletedAPI(APIView):
    def put(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)

        cabinet.completed.add(Movie.objects.get(url=pk))
        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.completed.remove(Movie.objects.get(url=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)


class DroppedAPI(APIView):

    def put(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)

        cabinet.dropped.add(Movie.objects.get(url=pk))
        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk, pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.dropped.remove(Movie.objects.get(url=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)
