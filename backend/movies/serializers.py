from rest_framework import serializers
from .models import Movie
from .tasks import generate_thumbnail
import logging

_logger = logging.getLogger(__name__)

class MovieSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'date_added', 'thumbnail', 'video_file']

    def validate_video_file(self, value):
        valid_mime_types = [
            'video/mp4',
            'video/avi',
            'video/quicktime',
            'video/x-matroska',  # .mkv
            'video/x-ms-wmv',
            'video/webm'
        ]
        file_mime_type = value.content_type

        if file_mime_type not in valid_mime_types:
            raise serializers.ValidationError('Unsupported file type. Please upload a valid video file.')

        return value

    def create(self, validated_data):
        movie = super().create(validated_data)
        generate_thumbnail.delay(movie.id)

        return movie

    def update(self, instance, validated_data):
        movie = super().update(instance, validated_data)

        video_file = validated_data.get('video_file', None)
        print(video_file)
        if video_file:
            generate_thumbnail.delay(movie.id)

        return movie
