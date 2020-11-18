from django.contrib import admin
from .models import Category, Genre, Movie, Bucket, Video, Serial

admin.site.register(Category)
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(Bucket)
admin.site.register(Video)
admin.site.register(Serial)
