from django.contrib.auth.models import User
from django.db import models
from random import randint


class UserCabinet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField("Avatar", default=f"avatars/{randint(1, 25)}.jpg")

    def __str__(self):
        return self.user.username + " Cabinet"
