from django.contrib import admin
from .models import Category, Genre, Movie, Bucket, VideoName

admin.site.register(Category)
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(Bucket)
admin.site.register(VideoName)
