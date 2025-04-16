import { Component } from '@angular/core';
import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  title = 'Movies';
  movies: Movie[] = [];

  constructor(public movieService: MoviesService) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
      console.log(this.movies);
    });
  }
}
