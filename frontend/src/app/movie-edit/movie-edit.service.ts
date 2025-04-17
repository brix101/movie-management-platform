import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieEditService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/movies`;

  constructor() {}

  updateMovie(id: number, formData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/`, formData);
  }
}
