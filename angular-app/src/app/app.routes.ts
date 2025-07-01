import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { MovieDetailPageComponent } from './pages/movie-detail-page/movie-detail-page.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'login',component: LoginpageComponent},
    {path: 'watchlist',component: WatchlistComponent },
    {path: 'search',component: SearchpageComponent},
    {path: 'search/celebs',component: SearchpageComponent},
    {path: 'search/titles',component: SearchpageComponent},
    {path: 'search/all',component: SearchpageComponent},
    {path: 'movie/:id',component:MovieDetailPageComponent}
];
