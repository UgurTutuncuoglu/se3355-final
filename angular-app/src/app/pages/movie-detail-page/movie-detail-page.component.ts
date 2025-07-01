import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {Movie} from '../types';
import { WatchlistService } from '../watchlist/watchlist.service';
@Component({
  selector: 'movie-detail-page',
  imports: [FormsModule,CommonModule],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.css'
})
export class MovieDetailPageComponent {
  movie: any;

  hoveredMovieid: number | null = null;

  showRatingDetails = false;
  
  popularityScore: number = 0;
  popularityRank: number = 0;
  sanitizedTrailerUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchlistService: WatchlistService,
    
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['id'];
    this.movie = this.watchlistService.getMovieById(+movieId);
    //this.movie = this.watchlistService.getMovieById(+movieId);
    console.log("trailer:",this.movie.trailer_url);
   console.log(this.movie)
    if (this.movie && this.movie.trailer_url) {
      const embedUrl = this.convertToEmbedUrl(this.movie.trailer_url);
      console.log("embed url:",embedUrl);
      this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
  }

  toggleRatingDetails() {
    this.showRatingDetails = !this.showRatingDetails;
  }

  toggleWatchlist(movie: any){
   this.watchlistService.toggleWatchlist(movie.id);
  }

  
  

  convertToEmbedUrl(youtubeUrl: string): string {
  const match = youtubeUrl.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
 }

}
