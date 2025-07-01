import { Component } from '@angular/core';
import { WatchlistService } from './watchlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {Movie, Rating} from '../types';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'watchlist',
  imports: [FormsModule,CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
   watchlist: any[] = [];
   newComments: { [movieId: number]: string } = {};
   userRatings: {[movieId: number]: number} = {};
    currentUserId!: string;
    currentUserName!: string; 
   constructor(private watchlistService: WatchlistService,
    private router: Router,
    private http:HttpClient
   ){
        
   }

   ngOnInit(): void {
    const currentUser = localStorage.getItem('user');
    if(currentUser){
      const userObj = JSON.parse(currentUser);
      this.currentUserId = userObj.id;
      this.currentUserName = userObj.name;
    } else {
      this.currentUserId = "0";
      this.currentUserName = "Anonymous";
    }

    this.watchlist = this.watchlistService.getWatchlist();
    this.initializeUserRatings(); 
  }

   goBack(): void {
    this.router.navigate(['/']);
  }

  submitComment(movie:any): void{

    
    const text = (this.newComments[movie.id] || '').trim();
    if(text){
      const newComment = {
        id: +this.currentUserId,
        user: this.currentUserName,
        comment: text,
        movieId: movie.id
      };

       this.http.post('https://se3355-final.vercel.app/api/comments', newComment).subscribe(() => {
        if (!movie.comments) {
          movie.comments = [];
        }
        movie.comments.push(newComment);
        this.newComments[movie.id] = '';
      });

      
    }

  
  }

  getUserRating(movie: Movie): number {
  return this.userRatings[movie.id] || 0;
}

  rateMovie(movie: Movie,userId:string,value: number): void {
     if (!movie.user_ratings) movie.user_ratings = [];
      const ratingPayload = {
        id: +userId,
        value,
        movieId: movie.id
      };


    this.http.post('https://se3355-final.vercel.app/api/ratings', ratingPayload).subscribe(() => {
    const existingRating = movie.user_ratings.find(r => r.id === +userId);
    if (existingRating) {
      existingRating.value = value;
    } else {
      movie.user_ratings.push({ id: +userId, value });
    }

    this.userRatings[movie.id] = value;
  });
   

  }

  initializeUserRatings() {
    this.userRatings = {};
    this.watchlist.forEach(movie => {
    const rating = movie.user_ratings?.find((r: Rating) => r.id === +this.currentUserId);
    console.log("Rating:",rating);  
    if (rating) {
        this.userRatings[movie.id] = rating.value;
      }
    });
  }


  
  

}
