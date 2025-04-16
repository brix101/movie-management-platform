from django.urls import path
from . import views

urlpatterns = [
    path('', views.MovieListCreateView.as_view(), name='get_post_movies'),
    path('<int:pk>/', views.MovieRetrieveUpdateDestroyView.as_view(), name='get_update_delete_movie'),
]
