import { Component } from '@angular/core';
import { Movie } from '../movies/movie';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieDetailService } from './movie-detail.service';
import { NgIf } from '@angular/common';

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
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieDetailService.getMovie(+id).subscribe((data) => {
        this.movie = data;
        console.log(data);
      });
    }
  }
}
