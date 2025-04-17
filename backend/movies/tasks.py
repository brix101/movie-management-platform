import logging
import os
import subprocess
import uuid

from celery import shared_task
from django.conf import settings

from .models import Movie

_logger = logging.getLogger(__name__)

@shared_task
def generate_thumbnail(movie_id):
    movie = Movie.objects.get(id=movie_id)
    video_path = movie.video_file.path

    thumbnail_filename = f'{uuid.uuid4().hex}_thumb.jpg'
    thumbnail_dir = os.path.join(settings.MEDIA_ROOT, 'thumbnails')
    os.makedirs(thumbnail_dir, exist_ok=True)
    thumbnail_path = os.path.join(thumbnail_dir, thumbnail_filename)

    subprocess.run([
        'ffmpeg',
        '-ss', '00:00:01',
        '-i', video_path,
        '-frames:v', '1',
        '-q:v', '2',
        '-update', '1',
        thumbnail_path
    ])

    movie.thumbnail = f'thumbnails/{thumbnail_filename}'
    movie.save()
