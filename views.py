from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.


from rest_framework import generics, permissions

from rest_framework.response import Response
from knox.models import AuthToken

from backend.models import Comment, Movie, Video
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CommentSerializer, ModifyUserSerializer

from rest_framework.views import APIView

from backend.models import UserCabinet
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, CabinetSerializer


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


class CommentAPI(generics.GenericAPIView):
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)

        comment = Comment(movie_id=Movie.objects.get(id=serializer.data['movie_id']),
                          user_id=User.objects.get(id=serializer.data['user_id']),
                          text=serializer.data['text'],
                          date=serializer.data['date'],
                          video_id=Video.objects.get(id=serializer.data['video_id'], ))
        comment.save()
        comment_serializer = CommentSerializer(comment)
        return Response(comment_serializer.data)


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


class WatchingAPI(APIView):
    def put(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        if cabinet.planning.get(id=pk ) not None:
            return 404
        cabinet.watching.add(Movie.objects.get(id = pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self,request,pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.watching.remove(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

class PlanningAPI(APIView):
    def put(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.planning.add(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.planning.remove(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)


class CompletedAPI(APIView):
    def put(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.completed.add(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.completed.remove(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)



class DroppedAPI(APIView):
    def put(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.dropped.add(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

    def delete(self, request, pk,pk2):
        cabinet = UserCabinet.objects.get(id=pk2)
        cabinet.dropped.remove(Movie.objects.get(id=pk))

        serializer = CabinetSerializer(cabinet)
        return Response(serializer.data)

