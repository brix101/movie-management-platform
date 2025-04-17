import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../movies/movie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor() {}

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}/`);
  }

  deleteMovieById(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/${id}/`);
  }
}
