from django.contrib import admin
from accounts.models import UserCabinet
from movie.models import Movie, Genre, Category, Video
from comments.models import Comment
from .models import Bucket

admin.site.register(Movie)
admin.site.register(Genre)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Bucket)
admin.site.register(Comment)
admin.site.register(UserCabinet)

