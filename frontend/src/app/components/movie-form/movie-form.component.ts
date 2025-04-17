import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
})
export class MovieFormComponent {
  form: FormGroup;

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
      const formData = new FormData();
      formData.append('video_file', this.form.get('video_file')!.value);
      formData.append('title', this.form.get('title')!.value);
      formData.append('description', this.form.get('description')!.value);

      // ✅ Use the service here directly
      this.movieFormService.uploadMovie(formData).subscribe({
        next: (res) => {
          console.log('Movie uploaded!', res);
          this.form.reset(); // Optionally reset form

          this.snackBar.open('Movie uploaded successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.snackBar.open('Upload failed. Please try again.', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
