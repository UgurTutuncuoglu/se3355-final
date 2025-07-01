const db = require('./db'); 
const movies = [
  {
    id: 1,
    title: '28 Days Later',
    image: 'https://m.media-amazon.com/images/M/MV5BM2I4NTI0ZGQtNGQ2ZC00ODIxLWI2N2QtMDBkNzI1NDhjYjE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    imdbScore: 7.5,
    rates: "495K",
    year: 2002,
    popularity: "yes",
    popularityNumber: 3,
    comments: [
          ],
    actors: [
      { name: "Cillian Murphy", image: "https://m.media-amazon.com/images/M/MV5BNWJjYjMzMTQtY2I2NS00YjJlLTg4YzAtNDBlZWQzNzVhMDkxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Naomie Harris", image: "https://m.media-amazon.com/images/M/MV5BMTUyMDU1MTU2N15BMl5BanBnXkFtZTgwODkyNzQ3MDE@._V1_.jpg" },
      { name: "Brent McIntyre", image: "https://b6s54eznn8xq.merlincdn.net/Uploads/People/430e5c4e-8a22-4479-bc1f-df81589bbeaa.jpg" },
      { name: "Megan Burns", image: "https://m.media-amazon.com/images/M/MV5BZTEyNjczNzUtNTkwZS00YmFkLTkzNjctZjI4YThhYTA4OGQ0XkEyXkFqcGc@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=mWEhfF27O0c',
    inWatchlist: false,
    userRatings: [
          ]
  },
  { 
    id: 2,
    title: 'We Were Liars',
    image: 'https://m.media-amazon.com/images/M/MV5BNTg5NTY0NzctOTM4OC00MDQxLTliMzItOWYyN2I0OWJjZTdkXkEyXkFqcGc@._V1_.jpg',
    imdbScore: 6.5,
    rates: "4.1K",
    year: 2025,
    popularity: "yes",
    popularityNumber: 3,
    comments: [
 ],
    actors: [
      { name: "Caitlin Fitzgerald", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzBGIaX36jzA99ygbpXaOz97mVY6CzF-UM5Q&s" },
      { name: "Mamie Gummer", image: "https://m.media-amazon.com/images/M/MV5BMTc2MDk3MTI1N15BMl5BanBnXkFtZTcwMDM0NjM1Mg@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Rahul Kohli", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wnHCUwp6KzF8uW0G-LizqQS_NxPmkN-N5g&s" },
      { name: "David Morse", image: "https://m.media-amazon.com/images/M/MV5BMTgwNjUzOTE1N15BMl5BanBnXkFtZTYwNTU4NDQ0._V1_FMjpg_UX1000_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=nTEdvVTpeA0',
    inWatchlist: false,
    userRatings: [
          
    ]
  },
  { 
    id: 3,
    title: '28 Weeks Later',
    image: 'https://m.media-amazon.com/images/M/MV5BMTUxMjc2MTcxNV5BMl5BanBnXkFtZTcwMzgzOTY0MQ@@._V1_.jpg',
    imdbScore: 6.9,
    rates: "325K",
    year: 2007,
    popularity: "yes",
    popularityNumber: 4,
    comments: [
        ],
    actors: [
      { name: "Robert Carlyle", image: "https://m.media-amazon.com/images/M/MV5BMTM2Njc1MjgyOF5BMl5BanBnXkFtZTcwMjY2NTAwNw@@._V1_.jpg" },
      { name: "Rose Byrne", image: "https://m.media-amazon.com/images/M/MV5BMTc0MDA2Njc0OF5BMl5BanBnXkFtZTcwNzc3NDU3Mw@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Jeremy Renner", image: "https://m.media-amazon.com/images/M/MV5BOTk2NDc2ODgzMF5BMl5BanBnXkFtZTcwMTMzOTQ4Nw@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Imogen Poots", image: "https://m.media-amazon.com/images/M/MV5BMTU3OTA3MzM2NV5BMl5BanBnXkFtZTcwMDczNjY0Mw@@._V1_FMjpg_UX1000_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=ljqY7qrnycw',
    inWatchlist: false,
    userRatings: [
         
    ]
  },
  {
    id: 4,
    title: 'Sinners',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDZ35ZtMalXPpw-jD69t4BHLI3YEIFZglkyw&s',
    imdbScore: 7.8,
    rates: "173K",
    year: 2025,
    popularity: "",
    popularityNumber: 5,
    comments: [
         ],
    actors: [
      { name: "Bill Pullman", image: "https://m.media-amazon.com/images/M/MV5BMTg0Mzk2MDEyM15BMl5BanBnXkFtZTgwMTczMDQzNjE@._V1_FMjpg_UX1000_.jpg" },
      { name: "Jessica Biel", image: "https://m.media-amazon.com/images/M/MV5BMTQyNjgzODI5OV5BMl5BanBnXkFtZTcwMjI5MTQ1Mw@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Alice Kremelberg", image: "https://b6s54eznn8xq.merlincdn.net/Uploads/People/e0d01767-a099-4a9f-84c1-230b3c599b6a.jpg" },
      { name: "Christopher Abbott", image: "https://m.media-amazon.com/images/M/MV5BMjI1NDYxODU5N15BMl5BanBnXkFtZTgwMDMwNTczNDM@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=bKGxHflevuk',
    inWatchlist: false,
    userRatings: [
          
    ]
  },
  {
    id: 5,
    title: 'Deep Cover',
    image: 'https://m.media-amazon.com/images/M/MV5BNjQ5ZTJjZTEtZWRiOC00NGM3LTg5NGItMTkxZmJmZjg5NzA3XkEyXkFqcGc@._V1_.jpg',
    imdbScore: 6.7,
    rates: "18K",
    year: 2025,
    popularity: "no",
    popularityNumber: 6,
    comments: [
      
         ],
    actors: [
      { name: "Bryce Dallas Howard", image: "https://m.media-amazon.com/images/M/MV5BY2YyOTZjZWQtY2I3NS00Y2YyLWJhNzctN2IxOWIwMzUzZTQ1XkEyXkFqcGc@._V1_.jpg" },
      { name: "Orlando Bloom", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg/250px-Orlando_Bloom_at_the_2024_Toronto_International_Film_Festival_%28cropped2%29.jpg" },
      { name: "Sonoya Mizuno", image: "https://m.media-amazon.com/images/M/MV5BNGUxYTgzMDEtNTcwNi00YzRjLWJmZjAtMjdmMzEwMTY5ZTNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Sean Bean", image: "https://m.media-amazon.com/images/M/MV5BMTkzMzc4MDk5OF5BMl5BanBnXkFtZTcwODg3MjUxNw@@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=1x--MaHsbEc',
    inWatchlist: false,
    userRatings: [
         
    ]
  },
  {
    id: 6,
    title: 'KPop Demon Hunters',
    image: 'https://m.media-amazon.com/images/M/MV5BNTBiYWJlMjQtOTIyMy00NTY4LWFhOWItOWZhNzc3NGMyMjc2XkEyXkFqcGc@._V1_.jpg',
    imdbScore: 7.8,
    rates: "11K",
    year: 2025,
    popularity: "yes",
    popularityNumber: 7,
    comments: [
        ],
    actors: [
      { name: "Arden Cho", image: "https://m.media-amazon.com/images/M/MV5BMTE5NzM3YTEtMDVjZi00OWUyLWIwMzItNGNmZGI1MWU3ZWE2XkEyXkFqcGc@._V1_CR1,0,1230,1845_.jpg" },
      { name: "Liza Koshy", image: "https://m.media-amazon.com/images/M/MV5BNmViZDQ4NjYtYzZjZC00YTE0LWJkZmUtODUwYTA0NDZmZWViXkEyXkFqcGc@._V1_CR33,0,1365,2047_FMjpg_UX1000_.jpg" },
      { name: "Ahn Hyo-seop", image: "https://m.media-amazon.com/images/M/MV5BMDI2YzJlOWYtY2M1NS00NjZiLWExYTItMmUzNDBkYTJiMjU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "May Hong", image: "https://m.media-amazon.com/images/M/MV5BNjk0OTdmMzgtNDNlZi00YThjLTgyOWUtMWU4ZWYwYmJlMDJjXkEyXkFqcGc@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=AzCAwdp1uIQ',
    inWatchlist: false,
    userRatings: [
          
    ]
  },
  {
    id: 7,
    title: 'Dept. Q',
    image: 'https://m.media-amazon.com/images/M/MV5BNWQ3MDQ2MGQtOGM0MC00MzlkLWE0ODQtYzE4Zjc3Mjc1ZWI5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    imdbScore: 8.3,
    rates: "49K",
    year: 2025,
    popularity: "no",
    popularityNumber: 2,
    comments: [
          ],
    actors: [
      { name: "Matthew Goode", image: "https://m.media-amazon.com/images/M/MV5BODE1NDJkYjYtOTg5NC00Y2RiLWI5YzktMjU0ZDY1YzNiZjdhXkEyXkFqcGc@._V1_.jpg" },
      { name: "Chloe Pirrie", image: "https://www.scotsman.com/jpim-static/image/2025/05/28/12/02/GettyImages-1240120783.jpeg?width=1200&enable=upscale" },
      { name: "Kelly Macdonald", image: "https://m.media-amazon.com/images/M/MV5BNDc5NTU2MzY0Nl5BMl5BanBnXkFtZTcwMzU4MjA0Ng@@._V1_.jpg" },
      { name: "Alexej Manvelov", image: "https://m.media-amazon.com/images/M/MV5BOGUyOTAxYWYtMGU4ZS00YzNlLWJiMGMtN2U3ZGEzNDVlM2Y4XkEyXkFqcGc@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=72hK6FUmm8o',
    inWatchlist: false,
    userRatings: [
          
    ]
  },
  {
    id: 8,
    title: 'Sitaare Zameen Par',
    image: 'https://m.media-amazon.com/images/M/MV5BZjdjODdiMTQtYWIwZi00NTQyLWE0YWItMzk3MTBhOGUyNDY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    imdbScore: 7.3,
    rates: "21K",
    year: 2025,
    popularity: "yes",
    popularityNumber: 27,
    comments: [
        ],
    actors: [
      { name: "Darsheel Safary", image: "https://m.media-amazon.com/images/M/MV5BOTc4NzhjYmUtMmUxNi00OGE2LWJjODktZTFlMDBiNjUxOWQ3XkEyXkFqcGc@._V1_.jpg" },
      { name: "Aamir Khan", image: "https://m.media-amazon.com/images/M/MV5BMjAwMjk3NDUzN15BMl5BanBnXkFtZTcwNjI4MTY0NA@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Tanay Chheda", image: "https://m.media-amazon.com/images/M/MV5BMjA2NTU4NTI0MV5BMl5BanBnXkFtZTgwMjU4ODkxNzE@._V1_.jpg" },
      { name: "Vipin Sharma", image: "https://b6s54eznn8xq.merlincdn.net/Uploads/People/8f9a9e57-6e13-44cd-ba09-c4ed5bc5b56e.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=YH6k5weqwy8',
    inWatchlist: false,
    userRatings: [
         
    ]
  },
  {
    id: 9,
    title: 'Warfare',
    image: 'https://m.media-amazon.com/images/M/MV5BYzAzNDFiNzctM2QwZS00NzJjLWIzZDgtZGUxZGIyZTI1NjYxXkEyXkFqcGc@._V1_.jpg',
    imdbScore: 7.3,
    rates: "56K",
    year: 2025,
    popularity: "yes",
    popularityNumber: 25,
    comments: [
        ],
    actors: [
      { name: "Will Poulter", image: "https://m.media-amazon.com/images/M/MV5BMzIwYWY0MzgtNGMxYS00NWFjLTkwZmEtYmJhMWViNWFmZjQwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Cosmo Jarvis", image: "https://m.media-amazon.com/images/M/MV5BYzUxNWQ2MGMtOWM1Zi00YzliLTgwZTItYjBkMDQ0ZTllOTNiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Joseph Quinn", image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Joseph_Quinn_by_Gage_Skidmore.jpg" },
      { name: "Kit Connor", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Kit_Connor_in_2024.jpg/960px-Kit_Connor_in_2024.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=JER0Fkyy3tw',
    inWatchlist: false,
    userRatings: [
         
    ]
  },
  {
    id: 10,
    title: 'F1: The Movie',
    image: 'https://m.media-amazon.com/images/M/MV5BOWRiOThkM2YtYzI4NS00OWViLTk0ODMtMjNlNDYyZWQ3MzNjXkEyXkFqcGc@._V1_.jpg',
    imdbScore: 7.9,
    rates: "22K",
    year: 2025,
    popularity: "yes",
    popularityNumber: 12,
    comments: [
         ],
    actors: [
      { name: "Brad Pitt", image: "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Kerry Condon", image: "https://m.media-amazon.com/images/M/MV5BMTY5NjgyNDU3OV5BMl5BanBnXkFtZTgwNzA4NDczNjE@._V1_.jpg" },
      { name: "Damson Idris", image: "https://m.media-amazon.com/images/M/MV5BYmYyYWM1OTctYWNjZS00NTcxLTkwODAtZjU4MzAwMzJkNDM1XkEyXkFqcGc@._V1_.jpg" },
      { name: "Javier Bardem", image: "https://m.media-amazon.com/images/M/MV5BMTY1NTc4NTYzMF5BMl5BanBnXkFtZTcwNDIwOTY1NA@@._V1_.jpg" }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=CT2_P2DZBR0',
    inWatchlist: false,
    userRatings: [
          
    ]
  }
];


async function seed(){
    try {
        for( const movie of movies){

            const movieInsert = await db.query (
                `INSERT INTO movies
            (title,image,imdb_score,rates,year,popularity,popularity_number,comments,actors,trailer_url,in_watchlist,user_ratings)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10,$11,$12::jsonb)
            ON CONFLICT (id) DO NOTHING`,
            [
              movie.title,
              movie.image,
              movie.imdbScore,
              movie.rates,
              movie.year,
              movie.popularity,
              movie.popularityNumber,
              JSON.stringify(movie.comments),
              JSON.stringify(movie.actors),  
              movie.trailerUrl,
              movie.inWatchlist,
              JSON.stringify(movie.userRatings)   
         ]
          );

          
          
        }
    } catch(err){
        console.error("Error inserting data: ",err);
    } finally{
        process.exit();
    }
}

seed();