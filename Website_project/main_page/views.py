from django.shortcuts import render
from django.views.generic.base import View

from .models import Movie


class MovieView(View):
    def get(self, request):
        movie = Movie.objects.all()
        return render(request, r"movies\movie_list.html", {"movie": movie})
