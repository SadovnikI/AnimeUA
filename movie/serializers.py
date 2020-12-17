from rest_framework import serializers

from movie.models import Category, ShadowMovie, Movie, Genre


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class GenresSerializer(serializers.RelatedField):
    def to_representation(self, value):
        return value.name

    class Meta:
        model = Genre


class MovieSerializer(serializers.ModelSerializer):
    genres = GenresSerializer(read_only=True, many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'rating', 'url', 'genres', 'year', 'description']


class ShadowMovieSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = ShadowMovie
        fields = [
            'title', 'description', 'poster', 'year', 'country',
            'genres', 'category', 'url', 'rating', 'video_urls', 'movie_id'
        ]


class CabinetMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'rating', 'url', 'year', 'description']