from django import forms
from django.contrib import admin
from django.contrib.postgres.forms import SplitArrayField

from .models import Movie, Genre, Category


class MovieForm(forms.ModelForm):
    videos = SplitArrayField(forms.FileField(), size=1)

    class Meta:
        model = Movie
        fields = '__all__'


class MovieAdmin(admin.ModelAdmin):
    form = MovieForm


admin.site.register(Movie, MovieAdmin)
admin.site.register(Genre)
admin.site.register(Category)
