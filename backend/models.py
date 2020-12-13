from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User
from django.db import models


class Bucket(models.Model):
    name = models.CharField("name", max_length=160, default=None)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Bucket"
        verbose_name_plural = "Buckets"

