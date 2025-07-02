# 🎬 SE3355 Final Project – Movie Review Portal

**👨‍💻 Developed by:** Uğur Tütüncüoğlu  
**📘 Student ID:** 20070006012

## 📌 Live Demo

- 🔗 **Frontend (Angular App)**:  
[  https://angular-9gwkvw0by-ugur-tutuncuoglus-projects.vercel.app
](https://angular-app-pi-ashy.vercel.app/)
- 🔗 **Backend API**:  
  https://se3355-final.vercel.app

---

## 📁 API Endpoints

| Method | Endpoint                                      | Description            |
|--------|-----------------------------------------------|------------------------|
| GET    | `/api/movies`                                 | Retrieve all movies    |
| POST   | `/api/login`                                  | User login             |
| POST   | `/api/register`                               | User registration      |
| POST   | `/api/comments`                               | Add a new comment      |
| POST   | `/api/ratings`                                | Submit a movie rating  |

---

## 📐 Design Overview

This project consists of a **frontend** built with **Angular** and a **backend** powered by **Express.js**, both deployed on **Vercel**.

- Users can **register**, **log in**, **view movies**, **rate**,  **comment** and **logout**.
- The frontend communicates with the backend via RESTful API endpoints.
- All components are responsive and follow a clean UI approach.

---

## 🧠 Assumptions

- Postgresql (NEON) in vercel was used.
- Basic authentication using simple POST request with token.
- Each user can post multiple rating and multiple comments per movie.

---

## 🗃️ Data Models

### 👤 User
```
{
  "id": "number",
  "username": "string",
  "surname": "string",
  "email" : "string",
  "password": "string",
  "country": "string",
  "city": "string",
  "photo": "string
}
```

### 🎬 Movie
```

{
  "id": "string",
  "title": "string",
  "image": "string",
  "imdb_score": "string",
  "rates": "string",
  "year": "number",
  "popularity": "string",
  "popularityNumber:" "number",
  "comments": Comment[],
  "actors": Actor[],
  "trailer_url": "string",
  "inWatchlist": "boolean", 
  "user_ratings": Rating[] 
  
}
```

### 💬 Comment
```

{
  "id": "number",
  "user": "string",
  "comment": "string"
}
```

### ⭐ Rating
```

{
  "id": "number",
  "value": "number"
}
```

### 👤 Actor
```
{
  "name": "string",
  "image": "string" 
}
```

## ⚠️ Problems & Challenges
Vercel’s Angular deployment required configuring proper output path (dist/angular-app/browser) and routing fallback.

Cross-origin requests (CORS) were initially blocked between Angular frontend and Express backend.

Vercel CLI and Prebuilt Builds caused issues until adjusted via correct project linking and deployment without --prebuilt.


## 📹 Project Demo Video
Watch the project walkthrough here:
👉 [Google Docs Presentation + Video](https://docs.google.com/document/d/1h65QUP_TzD-kuCvDkIB1t0rSNhozdYsoHsOVeZKrdSg/edit?usp=sharing)


📎 Repository
🔗 GitHub Repository:
[https://github.com/UgurTutuncuoglu/se3355-final/tree/main](https://github.com/UgurTutuncuoglu/se3355-final)

## ⚠️ Missing Parts
I could not do "User ratings" page 

