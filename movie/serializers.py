from rest_framework import serializers

from movie.models import Category, ShadowMovie, Movie


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'rating', 'url']


class ShadowMovieSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = ShadowMovie
        fields = [
            'title', 'description', 'poster', 'year', 'country',
            'genres', 'category', 'url', 'rating', 'video_urls'
        ]
