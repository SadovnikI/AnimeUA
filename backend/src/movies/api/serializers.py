from rest_framework import serializers
from movies.models import Movie, Category, Genre, ShadowMovie


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Category


class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Genre


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ['title', 'poster', 'rating', 'url', 'id']


class ShadowMovieSerializer(serializers.ModelSerializer):

    category = CategorySerializer(read_only=True)
    genres = GenreSerializer(read_only=True, many=True)

    class Meta:
        model = ShadowMovie
        fields = [
            'title', 'description', 'poster', 'year', 'country',
            'genres', 'category', 'url', 'rating', 'video_urls',
        ]
