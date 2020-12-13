from django.urls import path
from comments.views import CommentView, CommentAPI

urlpatterns = [
    path('api/comment/<pk>', CommentView.as_view()),
    path('api/auth/addcomment', CommentAPI.as_view()),
]
