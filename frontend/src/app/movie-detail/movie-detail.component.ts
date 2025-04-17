import { Component } from '@angular/core';
import { Movie } from '../movies/movie';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieDetailService } from './movie-detail.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-detail',
  imports: [NgIf, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieDetailService.getMovie(+id).subscribe((data) => {
        this.movie = data;
      });
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.movie) {
        this.movieDetailService.deleteMovie(this.movie.id).subscribe({
          next: () => {
            this.snackBar.open('Movie deleted successfully!', 'Close', {
              duration: 3000, // Duration in milliseconds
            });
            this.router.navigate(['/movies']);
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
          },
        });
      }
    });
  }

  onEdit(): void {
    if (this.movie) {
      this.router.navigate(['/movies', this.movie.id, 'edit']);
    }
  }
}
