import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieNewComponent } from './movie-new/movie-new.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

export const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: MovieNewComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/:id/edit', component: MovieEditComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
