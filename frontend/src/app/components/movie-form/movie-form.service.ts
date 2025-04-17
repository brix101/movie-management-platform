import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieFormService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/movies/';

  constructor() {}

  uploadMovie(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
