from django.db import models


class Genre(models.Model):
    name = models.CharField("Genre", max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Genre"
        verbose_name_plural = "Genres"


class Category(models.Model):
    name = models.CharField("Category", max_length=150)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class VideoName(models.Model):
    name = models.CharField("Name", max_length=160)
    video = models.FileField("Video", default=None)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Video name"
        verbose_name_plural = "Video names"


class Bucket(models.Model):
    name = models.CharField("name", max_length=160)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Bucket"
        verbose_name_plural = "Buckets"


class Movie(models.Model):
    title = models.CharField("Title", max_length=100)
    description = models.TextField("Description")
    poster = models.ImageField("Poster", upload_to="actors/")
    year = models.PositiveSmallIntegerField("Release date", default=2020)
    country = models.CharField("Country", max_length=30)
    genres = models.ManyToManyField(Genre, verbose_name="Genres")
    category = models.ForeignKey(Category, verbose_name="Category", on_delete=models.SET_NULL, null=True)
    url = models.SlugField(max_length=130, unique=True)
    rating = models.FloatField("Rating", max_length=10)

    bucket_name = models.ForeignKey(Bucket, verbose_name="Bucket", on_delete=models.SET_NULL, null=True)
    video_name = models.ManyToManyField(VideoName, verbose_name="Video name")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"

