import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesComponent }, // define the route for movies
  { path: 'movies/:id', component: MovieDetailComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
