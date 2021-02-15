from django.contrib.auth.models import User
from django.db import models
from random import randint

from movie.models import Movie


class UserCabinet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField("Avatar", default=f"avatars/{randint(1, 25)}.jpg")
    phone = models.CharField("Phone number", default=None, blank=True, max_length=20, null=True)

    watching = models.ManyToManyField(Movie, verbose_name="Movie in presses", default=None, related_name="watching",
                                      blank=True)
    planning = models.ManyToManyField(Movie, verbose_name="Movie planning to watch", default=None,
                                      related_name="planning", blank=True)
    completed = models.ManyToManyField(Movie, verbose_name="Completed movie", default=None, related_name="completed",
                                       blank=True)
    dropped = models.ManyToManyField(Movie, verbose_name="Dropped movie", default=None, related_name="dropped",
                                     blank=True)

    tg_name = models.CharField("Telegram username", default=None, blank=True, max_length=20, null=True)
    tg_id = models.PositiveIntegerField("Telegram id", default=None, blank=True, max_length=100, null=True)

    def str(self):
        return self.user.username + " Cabinet"
