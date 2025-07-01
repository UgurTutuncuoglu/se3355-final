import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../watchlist/watchlist.service';
import {Movie} from '../types';
@Component({
  selector: 'searchpage',
  imports: [FormsModule,CommonModule],
  templateUrl: './searchpage.component.html',
  styleUrl: './searchpage.component.css'
})
export class SearchpageComponent {
  movies : Movie[] = [];

 query: string = '';
  titles: any[] = [];
  people: any[] = [];
  filteredMovies: any[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService
   
  ) {}
  ngOnInit(): void {
    
     this.watchlistService.getMovies().subscribe(data => {
      this.movies = data;
      
       });
    this.activatedRoute.queryParams.subscribe(params => {
    this.query = params['q'];

    if (this.query?.length >= 3) {
      const lowerQuery = this.query.toLowerCase();
      const currentUrl = this.router.url; // Get current URL

      // Filtered Movie titles
      const filteredTitles = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(lowerQuery)
      ).map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        image: movie.image,
        actors: movie.actors.map(a => a.name).join(', ')
      }));

      // Filtered People
      const actorMap = new Map<string, string>();
      this.movies.forEach(movie => {
        movie.actors.forEach(actor => {
          const actorName = actor.name?.toLowerCase().trim();
          if (actorName && actorName.includes(lowerQuery)) {
            actorMap.set(actor.name.trim(), actor.image);
          }
        });
      });
      const filteredPeople = Array.from(actorMap.entries()).map(([name, image]) => ({
        name,
        aka: 'Famous Actor',
        image
      }));

      // Show based on active route
      if (currentUrl.includes('/celebs')) {
        this.titles = [];
        this.people = filteredPeople;
      } else if (currentUrl.includes('/titles')) {
        this.titles = filteredTitles;
        this.people = [];
      } else {
        // /all or other cases
        this.titles = filteredTitles;
        this.people = filteredPeople;
      }
    } else {
      this.titles = [];
      this.people = [];
    }
  });
}


  goToMovieDetail(id:string){
      const movie = this.movies.find(m => m.id === +id);

      if(movie){
        console.log("çalıştı")
            this.router.navigate(['/movie', movie.id]);

      }
  }


}


  

