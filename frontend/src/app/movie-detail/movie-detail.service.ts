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

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}/`);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${this.apiUrl}/${id}/`);
  }
}
