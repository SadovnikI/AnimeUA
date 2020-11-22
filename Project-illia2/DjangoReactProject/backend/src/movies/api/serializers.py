from rest_framework import serializers
from movies.models import Movie, ShadowMovie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'content']

class ShadowMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShadowMovie
        fields = ['title', 'seriaurls','content']
