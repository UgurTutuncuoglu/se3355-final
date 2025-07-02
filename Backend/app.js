const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
app.use(cors());
app.use(express.json());





app.post("/api/login", async (req,res) => {
  console.log("Login request body:", req.body);
  const { email, password } = req.body;

   if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }


  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1',[email]);
    const user = result.rows[0];
    if(!user){
       console.log("hata 1 - user not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Tryingn password:",password);

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
      console.log("Wrong password");
      return res.status(401).json({message: "Invalid email or password"});
    }

    console.log("Sending user data:", {
      id: user.id,
      name: user.name,
      email: user.email
    });

  const token = jwt.sign({ id: user.id, name: user.name }, "s7f8g4h7j3kl9m1npq2r5t8v0x1z3w4y", { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, name: user.name ,email: user.email,photo: user.photo } });


  }catch(err){
     console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }



  })



app.post('/api/register', async (req, res) => {
  const { name, surname, email, password, country, city, photo } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1',[email]);
    if(existingUser.rows.length > 0){
      return res.status(409).json({error: 'Email already registered'});
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);


    const insertQuery = `
      INSERT INTO users (name,surname,email,password,country,city,photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;


    const result = await db.query(insertQuery,[
      name,surname,email,hashedPassword,country,city,photo
    ]);
    res.status(201).json({message:'User registered successfully', userId: result.rows[0].id});

  }catch(err){
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }

 
});




app.get("/api/movies", async (req,res) => {
    try {
      const result = await db.query('SELECT * FROM movies');
      
      res.json(result.rows);
    } catch(err) {
      console.error(err);
      res.status(500).send('Server error');
    }
})

app.post('/api/comments', async (req, res) => {
  const { id, user, comment, movieId } = req.body;
  if (!id || !user || !comment || !movieId) {
    return res.status(400).send({ success: false, message: 'Missing fields' });
  }

  try {

  const movieResult = await db.query('SELECT * FROM movies WHERE id = $1',[movieId]);
 if (movieResult.rowCount === 0) {
      return res.status(404).send({ success: false, message: 'Movie not found' });
 }

  const newComment = {
      id,
      user,
      comment
  };

  await db.query(`
      UPDATE movies
      SET comments = 
        CASE 
          WHEN comments IS NULL THEN to_jsonb(ARRAY[$1]::jsonb[])
          ELSE comments || to_jsonb($1)::jsonb
        END
      WHERE id = $2
    `, [newComment, movieId]);

  console.log(`Comment from user ${user} (ID: ${id}) for movie ${movieId}: ${comment}`);
  res.status(200).send({ success: true });

  }catch(err){
    console.error('Error inserting comment:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });

  }
});

app.post('/api/ratings', async (req, res) => {
  const { id, value, movieId } = req.body;
 
   if (!id || value === undefined || !movieId) {
    return res.status(400).send({ success: false, message: 'Missing fields' });
  }

  console.log("çalıştı")

  try{

       const movieResult = await db.query('SELECT * FROM movies WHERE id = $1', [movieId]);

      if (movieResult.rowCount === 0) {
            return res.status(404).send({ success: false, message: 'Movie not found' });
      }

      const newRating = {
      id,
      value
    };



    await db.query(`
      UPDATE movies
      SET user_ratings = 
        CASE 
          WHEN user_ratings IS NULL THEN to_jsonb(ARRAY[$1]::jsonb[])
          ELSE (
             SELECT coalesce(jsonb_agg(elem), '[]'::jsonb)
             FROM jsonb_array_elements(user_ratings) elem
             WHERE (elem->>'id') != $2::text
          ) || to_jsonb($1)::jsonb
        END
      WHERE id = $3
    `, [newRating,id,movieId]);


    
  console.log(`Rating from user ID ${id} for movie ${movieId}: ${value}`);
  res.status(200).send({ success: true, message: 'Rating added' });
  }catch(err){
   console.error('Error inserting rating:', err);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});


app.listen(port,function() {
    console.log(`listening on port ${port}`);
})
