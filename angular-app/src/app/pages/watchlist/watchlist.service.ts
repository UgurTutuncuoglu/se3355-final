import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WatchlistService {
  private watchlist: any[] = [];
 
   private movies: any[] = [];
 
  constructor(private http: HttpClient){
       
  }

  getMovies():Observable<any[]> {
    if(this.movies.length > 0){
      return of(this.movies);
    } else {
       return this.http.get<any[]>('https://se3355-final.vercel.app/api/movies').pipe(
      tap((data) => {this.movies = data; })
    );
    }

    
  }

  

  


  





  addToWatchlist(movie: any): void {
    if (!this.watchlist.find(m => m.id === movie.id)) {
      this.watchlist.push(movie);
    }
  }

  removeFromWatchlist(id: number): void {
    this.watchlist = this.watchlist.filter(m => m.id !== id);
  }

  getWatchlist(): any[] {
    return this.watchlist;
  }

  // getMovies(): any[]{
  //   return this.movies;
  // }

  getMovieById(id: number){
    return this.movies.find(m => m.id === id);
  }

  toggleWatchlist(id:number){
    const movie = this.movies.find(m=> m.id === id);
    if(movie){
        movie.inWatchlist = !movie.inWatchlist;
        if(movie.inWatchlist){
            this.watchlist.push(movie);
        } else {
            this.watchlist = this.watchlist.filter(m => m.id !== id);
        }
    }
  }

  clearWatchlist(){
    this.watchlist.forEach(m => m.inWatchlist = !m.inWatchlist);

    this.watchlist = [];
  }

 




}
