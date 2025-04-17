import { CommonModule, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieFormService } from './movie-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-form',
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
})
export class MovieFormComponent {
  form: FormGroup;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private movieFormService: MovieFormService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      video_file: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.form.patchValue({ video_file: file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading.set(true);
      const formData = new FormData();

      formData.append('video_file', this.form.get('video_file')!.value);
      formData.append('title', this.form.get('title')!.value);
      formData.append('description', this.form.get('description')!.value);

      // ✅ Use the service here directly
      this.movieFormService.uploadMovie(formData).subscribe({
        next: () => {
          this.form.reset(); // Optionally reset form

          this.snackBar.open('Movie uploaded successfully!', 'Close', {
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
            errorMessage = 'Upload failed. Please try again.';
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
          });
          this.isLoading.set(false);
        },
      });
    }
  }
}
