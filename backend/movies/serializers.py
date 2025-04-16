from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'date_added', 'video_file']

