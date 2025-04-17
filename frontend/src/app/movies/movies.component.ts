import { Component } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [RouterModule, NgFor],
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
