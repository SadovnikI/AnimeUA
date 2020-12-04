from django.urls import path
from comments.views import CommentView

urlpatterns = [
    path('api/comment/<pk>', CommentView.as_view()),
]