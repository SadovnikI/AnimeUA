from django_better_admin_arrayfield.models.fields import ArrayField
from django.db import models


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

    video_urls = ArrayField(models.CharField(max_length=100, default=None), default=None)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"

