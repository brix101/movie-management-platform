import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/movies/';

  constructor() {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }
}
