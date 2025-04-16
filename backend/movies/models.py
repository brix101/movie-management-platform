from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    vido_file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']
