import { Component, signal } from '@angular/core';
import { Movie } from '../movies/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailService } from '../movie-detail/movie-detail.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MovieEditService } from './movie-edit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-edit',
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css',
})
export class MovieEditComponent {
  movie: Movie | null = null;
  form!: FormGroup;
  isLoading = signal(false);

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService,
    private fb: FormBuilder,
    private movieEditService: MovieEditService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.fb.group({
      video_file: [null], // optional now
      title: [this.movie?.title || ''],
      description: [this.movie?.description || ''],
    });
  }

  ngOnInit() {
    const stateMovie = history.state.movie;

    if (stateMovie) {
      this.movie = stateMovie;
    } else {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.movieDetailService.getMovieById(+id).subscribe((movie) => {
            this.movie = movie;
          });
        }
      });
    }

    this.form = this.fb.group({
      video_file: [null], // optional now
      title: [this.movie?.title || ''],
      description: [this.movie?.description || ''],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.form.patchValue({ video_file: file });
      this.form.get('video_file')?.markAsDirty();
    }
  }

  onSubmit() {
    if (this.form.valid && this.movie) {
      this.isLoading.set(true);
      const formData = new FormData();

      const videoFile = this.form.get('video_file')?.value;
      const title = this.form.get('title')?.value;
      const description = this.form.get('description')?.value;

      if (videoFile) {
        formData.append('video_file', videoFile);
      }

      if (title) {
        formData.append('title', title);
      }

      if (description) {
        formData.append('description', description);
      }

      this.movieEditService.updateMovie(this.movie.id, formData).subscribe({
        next: () => {
          this.snackBar.open('Movie updated successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          let errorMessage = '';
          for (const [key, value] of Object.entries(err?.error || {})) {
            if (Array.isArray(value)) {
              errorMessage += `${key.charAt(0).toUpperCase() + key.slice(1)} Error: ${value.join(', ')}\n`;
            }
          }
          if (!errorMessage) {
            errorMessage = 'Update failed. Please try again.';
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
          this.isLoading.set(false);
        },
      });
    }
  }

  onCancel() {
    if (this.movie) {
      this.router.navigate(['/movies', this.movie.id]);
    }
  }
}
