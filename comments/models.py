from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from movie.models import Movie, Video


class Comment(models.Model):
    user_id = models.ForeignKey(User, verbose_name="User id", on_delete=models.SET_NULL, null=True, default=None)
    video_id = models.ForeignKey(Video, verbose_name="Video id", on_delete=models.SET_NULL, null=True, default=None)
    text = models.TextField('Text', default=None)
    date = models.DateTimeField('Date', default=timezone.now)
    movie_id = models.ForeignKey(Movie, verbose_name="Movie id", on_delete=models.SET_NULL, null=True, default=None)
