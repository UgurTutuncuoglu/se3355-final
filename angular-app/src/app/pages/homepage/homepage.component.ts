import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { Router, RouterLink } from '@angular/router';
import { SearchpageComponent } from '../searchpage/searchpage.component';
import { WatchlistService } from '../watchlist/watchlist.service';
import { Movie, User } from '../types'; // adjust the path as needed
import {AuthService} from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'homepage',
  imports: [CommonModule,FormsModule,RouterLink],
  providers: [HttpClientModule,HttpClient],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
    movies: Movie[] = [];
    currentUser: any = null;
    private userSubscription?: Subscription; 
    hoveredMovieid: number | null = null;
    searchText: string = '';
    searchCategory: string = 'All';
    searchCategoryLabel: string = '';
    suggestedMovies: any[] = [];
     lang: 'en' | 'tr' = 'en';
    translations: any;
    isLoggedIn: boolean = false;
  
    constructor(private router: Router,
      private watchlistService: WatchlistService,
      private authService: AuthService
    ){
    
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      // this.currentUser = user;
      // console.log('Current user updated in HomepageComponent:', this.currentUser);
       if(user){
        this.currentUser = {
          ...user,
          profilePhoto : user.photo.replace("assets/", "")
        };
      
        console.log(this.currentUser);
        console.log(this.currentUser.name);

       
           this.isLoggedIn = true;

      } else {
        this. currentUser = null;
       }
    });
    // this.currentUser = this.authService.getCurrentUser();
    // console.log('Current user:',this.currentUser);
      
    //this.watchlistService.getMovies().subscribe(data => this.movies = data);
    
      this.watchlistService.getMovies().subscribe(data => {
      this.movies = data.sort((a, b) => a.id - b.id);
       });

      
     
    

    
    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    this.lang = browserLang;
    this.setTranslations();
    this.searchCategoryLabel = this.translations.All;
  }

  setTranslations() {
    this.translations = {
      Menu: this.lang === 'tr' ? 'Menü' : 'Menu',
      All: this.lang === 'tr' ? 'Tümü' : 'All',
      Login: this.lang === 'tr' ? 'Giriş Yap':'Sign in',
      Titles: this.lang === 'tr' ? 'Başlıklar' : 'Titles',
      TvEpisodes: this.lang === 'tr' ? 'Dizi Bölümleri' : 'Tv Episodes',
      Celebs: this.lang === 'tr' ? 'Ünlüler' : 'Celebs',
      Companies: this.lang === 'tr' ? 'Şirketler' : 'Companies',
      SearchIMDb: this.lang === 'tr' ? 'IMDb’de Ara' : 'Search IMDb',
      Watchlist: this.lang === 'tr' ? 'İzleme Listesi' : 'Watchlist',
      SignIn: this.lang === 'tr' ? 'Giriş Yap' : 'Sign In',
      Top10: this.lang === 'tr' ? 'IMDb’de Bu Hafta En Popüler 10' : 'Top 10 on IMDb this week',
      WatchOptions: this.lang === 'tr' ? 'İzleme Seçenekleri' : 'Watch Options',
      AddWatchlist: this.lang === 'tr' ? '+ İzleme Listesi' : '+ WatchList',
      Trailer: this.lang === 'tr' ? 'Fragman' : 'Trailer',
      Account: this.lang === 'tr' ? 'Hesap' : 'Account',
      Logout: this.lang === 'tr' ? 'Çıkış Yap' : 'Logout'
    };
    this.searchCategoryLabel = this.translations.All;

  }

  switchLang(lang: 'en' | 'tr') {
    this.lang = lang;
    this.setTranslations();
    this.suggestedMovies = [];
  }

      
  toggleWatchlist(movie: any) {
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }
   this.watchlistService.toggleWatchlist(movie.id);
  }

  openTrailer(url: string) {
     if(!this.isLoggedIn){
      this.router.navigate(['/login']);
      return;
    }
    console.log("movie:",this.movies);
    window.open(url, "_blank");
  }

  

  

  selectCategory(category: string, label: string) {
    this.searchCategory = category;
    this.searchCategoryLabel = label;
    console.log('Selected category:', category);
    
    this.onSearchChange(); // Re-filter when category changes
  }

  onSearchChange() {
    if (this.searchText.length < 3) {
      this.suggestedMovies = [];
      return;
    }

    const search = this.searchText.toLowerCase();

    if (this.searchCategory === 'Celebs' || this.searchCategory === 'Ünlüler') {
      // Actor-only search
      const foundActors: { actorName: string; movieTitle: string; actorImage: string;  }[] = [];
      this.movies.forEach(movie => {
        movie.actors?.forEach(actor => {
          if (actor.name.toLowerCase().includes(search)) {
            foundActors.push({
              actorName: actor.name,
              movieTitle: movie.title,
              actorImage: actor.image
            });
          }
        });
      });
      this.suggestedMovies = foundActors.slice(0, 5);
      console.log("Celebs category selected",this.suggestedMovies);
    } else {
      // Movie-only or All
      this.suggestedMovies = this.movies
        .filter(movie => {
          switch (this.searchCategory) {
            case 'Titles':
            case 'Başlıklar':
              return movie.title.toLowerCase().includes(search);
            default:
              console.log("Year",movie.year);
              return (
                movie.title.toLowerCase().includes(search) ||
                movie.actors?.some(actor => actor.name.toLowerCase().includes(search))
              );
          }
        })
        .map(movie => {
          if (this.searchCategory === 'Titles' || this.searchCategory === 'Başlıklar') {
            const result = {
              ...movie,
            };
            console.log("Return value: ",result);
            return result;
          }else {
            
              const result = {
                ...movie,
                actorNames: movie.actors?.map(actor => actor.name).join(', ')
              };
              console.log("Return value:", result);  // <-- prints the full object you will return
              return result;
          }

        }).slice(0, 5);

        
        
    }

  }

  searchSubmit(){
  
    if (this.searchText.trim().length >= 3) {
      let route = '/search'; // default route

      const label = this.searchCategoryLabel;

      if (label === 'Celebs' || label === 'Ünlüler') {
        route += '/celebs';
      } else if (label === 'All' || label === 'Tümü') {
        route += '/all';
      } else if (label === 'Titles' || label === 'Başlıklar') {
        route += '/titles';
      }

      this.router.navigate([route], { queryParams: { q: this.searchText.trim() } });
    } else {
      alert('Please enter at least 3 characters to search.');
    }


  }



  openMovieDetails(movie: any) {
    console.log('Selected:', movie);
  }

  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    this.userSubscription?.unsubscribe();
  }

  logout(){
    this.isLoggedIn = false;
    this.authService.logout();
    this.currentUser = null;
    this.watchlistService.clearWatchlist();
  }

  
  
}




  

