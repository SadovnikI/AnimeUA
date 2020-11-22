from django.db import models
from django.contrib.postgres.fields import ArrayField


class Serianame(models.Model):
    title = models.CharField("Title", max_length=400)


class Movie(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    def __str__(self):
        return self.title



class ShadowUrsls(models.Model):
    title = models.CharField("Title", max_length=400)

class ShadowMovie(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    seriaurls = ArrayField(models.CharField(max_length=200))

    def __str__(self):
        return self.title


