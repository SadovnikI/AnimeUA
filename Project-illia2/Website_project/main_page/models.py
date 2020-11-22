from django.db import models


class Bucket(models.Model):
    name = models.CharField("name", max_length=160)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Bucket"
        verbose_name_plural = "Buckets"


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


class Serial(models.Model):
    title = models.CharField("Title", max_length=100)
    description = models.TextField("Description")
    poster = models.ImageField("Poster", upload_to="actors/")
    year = models.PositiveSmallIntegerField("Release date", default=2020)
    country = models.CharField("Country", max_length=30)
    genres = models.ManyToManyField(Genre, verbose_name="Genres")
    category = models.ForeignKey(Category, verbose_name="Category", on_delete=models.SET_NULL, null=True)
    url = models.SlugField(max_length=130, unique=True)
    rating = models.FloatField("Rating", max_length=10)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Serial"
        verbose_name_plural = "Serials"


class Video(models.Model):
    name = models.CharField("Name", max_length=160)
    bucket_id = models.ForeignKey(Bucket, on_delete=models.SET_NULL, null=True)
    video = models.FileField("Video", default=None)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Video"
        verbose_name_plural = "Videos"


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
    video = models.ForeignKey(Video, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Movie"
        verbose_name_plural = "Movies"


class ShadowUrsls(models.Model):
    title = models.CharField("Title", max_length=400)

class ShadowMovie(models.Model):
    title = models.CharField("Title", max_length=100)
    description = models.TextField("Description")
    poster = models.ImageField("Poster", upload_to="actors/")
    year = models.PositiveSmallIntegerField("Release date", default=2020)
    country = models.CharField("Country", max_length=30)
    genres = models.ManyToManyField(Genre, verbose_name="Genres")
    category = models.ForeignKey(Category, verbose_name="Category", on_delete=models.SET_NULL, null=True)
    url = models.SlugField(max_length=130, unique=True)
    rating = models.FloatField("Rating", max_length=10)
    seriaurls = models.ManyToManyField(ShadowUrsls, verbose_name="ShadowUrsl")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Serial"
        verbose_name_plural = "Serials"