from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models
from random import randint

from django.utils import timezone


class Bucket(models.Model):
    name = models.CharField("name", max_length=160, default=None)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Bucket"
        verbose_name_plural = "Buckets"


class Genre(models.Model):
    name = models.CharField("Genre", max_length=150, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Genre"
        verbose_name_plural = "Genres"


class Category(models.Model):
    name = models.CharField("Category", max_length=150, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Video(models.Model):
    name = models.CharField("Name", max_length=160, default=None)
    bucket_id = models.ForeignKey(Bucket, on_delete=models.SET_NULL, null=True, default=None)
    video = models.FileField("Video", default=None)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videos"


class Movie(models.Model):
    title = models.CharField("Title", max_length=100, default=None)
    description = models.TextField("Description", default=None)
    poster = models.ImageField("Poster", upload_to="actors/", default=None)
    year = models.PositiveSmallIntegerField("Release date", default=2020)
    country = models.CharField("Country", max_length=30, default=None)
    genres = models.ManyToManyField(Genre, verbose_name="Genres", default=None)
    category = models.ForeignKey(Category, verbose_name="Category", on_delete=models.SET_NULL, null=True, default=None)
    url = models.SlugField(max_length=130, unique=True, default=None)
    rating = models.FloatField("Rating", max_length=10, default=None)
    video = models.ManyToManyField(Video, verbose_name="Video", default=None)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"


class ShadowMovie(models.Model):
    title = models.CharField("Title", max_length=100, default=None)
    description = models.TextField("Description", default=None)
    poster = models.ImageField("Poster", upload_to="actors/", default=None)
    year = models.PositiveSmallIntegerField("Release date", default=2020)
    country = models.CharField("Country", max_length=30, default=None)
    genres = models.ManyToManyField(Genre, verbose_name="Genres", default=None)
    category = models.ForeignKey(Category, verbose_name="Category", on_delete=models.SET_NULL, null=True, default=None)
    url = models.SlugField(max_length=130, unique=True, default=None)
    rating = models.FloatField("Rating", max_length=10, default=None)
    video_urls = ArrayField(models.CharField(max_length=200, default=None), default=None)

    def __str__(self):
        return self.title


#
# class SiteUser(AbstractBaseUser):
#     avatar = models.FileField("Avatar", default=f"avatars/{randint(1, 4)}.jpg", blank=True)
#     USERNAME_FIELD = 'avatar'


class Comment(models.Model):
    user_id = models.ForeignKey(User, verbose_name="User id", on_delete=models.SET_NULL, null=True, default=None)
    video_id = models.ForeignKey(Video, verbose_name="Video id", on_delete=models.SET_NULL, null=True, default=None)
    text = models.TextField('Text', default=None)
    date = models.DateTimeField('Date', default=timezone.now)
    movie_id = models.ForeignKey(Movie, verbose_name="Movie id", on_delete=models.SET_NULL, null=True, default=None)

    def __str__(self):
        return self.text
