from django.contrib import admin

from .models import Movie, Genre, Category, Video, Bucket

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Bucket)