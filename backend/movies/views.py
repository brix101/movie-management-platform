from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Movie
from .serializers import MovieSerializer

class MovieListCreateView(ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    parser_classes = [MultiPartParser, FormParser]

class MovieRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()
    parser_classes = [MultiPartParser, FormParser]

