import { Component } from '@angular/core';
import { MovieFormComponent } from '../components/movie-form/movie-form.component';

@Component({
  selector: 'app-movie-new',
  imports: [MovieFormComponent],
  templateUrl: './movie-new.component.html',
  styleUrl: './movie-new.component.css',
})
export class MovieNewComponent {}
