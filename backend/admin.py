from django.contrib import admin
from django.contrib.auth.models import User

from .models import Movie, Genre, Category, Video, Bucket, Comment#, SiteUser

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Bucket)
admin.site.register(Comment)
# admin.site.register(User, SiteUser)
