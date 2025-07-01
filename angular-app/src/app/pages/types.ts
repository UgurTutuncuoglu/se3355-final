export interface Actor {
  name: string;
  image: string;
}

export interface Rating {
  id: number;
  value: number;
}


export interface User {
 id: number;
 name: string;
 surname: string;
 email: string;
 password: string;
 country: string;
 city: string;
 photo: string;
}



export interface Movie {
  id: number;
  title: string;
  image: string;
  imdb_score: number;
  rates: string; // belong to movie deatils
  year: number;
  popularity: string;
  popularityNumber: number;
  comments: { id: number; user: string; comment: string }[];
  actors: Actor[];
  trailer_url: string;
  inWatchlist: boolean;
  user_ratings: Rating[]; // belong to watchlist rating functionality
}
