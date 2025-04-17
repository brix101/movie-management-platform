import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movies/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/movies';

  constructor() {}

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}/`);
  }
}
