import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieFormService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movies/`;

  constructor() {}

  uploadMovie(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
