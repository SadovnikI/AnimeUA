import telegram
from django.contrib import admin

from accounts.models import UserCabinet
from django.conf import settings
from movie.models import Movie, Genre, Category, Video
from comments.models import Comment
from .bucket import create_presigned_url1
from .models import Bucket


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.user = request.user

        users = UserCabinet.objects.all()
        for user in users:
            for movie in user.watching.all():
                if str(movie.title) == str(obj):
                    bot = telegram.Bot(token=settings.TOKEN)
                    bot.sendPhoto(chat_id=user.tg_id,
                                  photo=create_presigned_url1('projectvideobacket', str(movie.poster)),
                                  caption=str(movie.title) + '\n' + f'http://127.0.0.1:8000/home/{movie.url}')

        super().save_model(request, obj, form, change)


admin.site.register(Genre)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Bucket)
admin.site.register(Comment)
admin.site.register(UserCabinet)
