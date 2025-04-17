import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieCardComponent } from '../components/movie-card/movie-card.component';
import { Movie } from './movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, NgFor, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  movies: Movie[] = [];

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }
}
