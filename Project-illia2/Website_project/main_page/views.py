from django.shortcuts import render
from django.views.generic.base import View

from .bucket import create_presigned_url1
from .models import Movie

from json import dumps


class MovieView(View):
    def get(self, request):
        movies = [create_presigned_url1(str(movie.video.bucket_id), str(movie.video.name)) for movie in
                  Movie.objects.all()]

        dataDictionary = {'movie_list': movies}
        dataJSON = dumps(dataDictionary)
        return render(request, r"../frontend/public/index.html", {'data': dataJSON})