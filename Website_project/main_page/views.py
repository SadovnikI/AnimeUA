from django.shortcuts import render
from django.views.generic.base import View

from .bucket import create_presigned_url1
from .models import Movie, VideoName


class MovieView(View):
    def get(self, request):
        movies = [create_presigned_url1(str(movie.bucket_name), str(movie.video_name.get(id=1))) for movie in Movie.objects.all()]
        return render(request, r"movies\movie_list.html", {"movie_list": movies})


