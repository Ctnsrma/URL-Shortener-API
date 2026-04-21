# URL Shortener API

A scalable backend project that converts long URLs into short shareable links. Built to practice backend engineering and system design concepts such as REST APIs, database modeling, redirection flow, analytics, and scalable architecture.

---

##  Phase 1 (MVP)

This version includes the core functionality of a URL shortener platform.

### Features

- Create short URLs from long URLs
- Redirect users using short codes
- Track click count
- View URL statistics
- Delete short links
- Clean REST API architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- dotenv

---

##  API Endpoints

### Create Short URL

```http
POST /api/shorten
```

## Request Body
```
{
  "url": "https://example.com/very/long/link"
}
```

## Response 
```
{
  "shortCode": "ab12Cd",
  "shortUrl": "http://localhost:5000/ab12Cd"
}
```

## Redirect to Original Page
``` 
GET /:code
```
## Get URL stats
```
GET /api/stats/:code
```
## Response 
```
{
  "originalUrl": "https://example.com",
  "clickCount": 10,
  "createdAt": "2026-04-21T10:00:00Z"
}
```
## Delete URL 
```
DELETE /api/links/:code
```

## Project Structure
```
url-shortener/
│── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── schema/
│   └── app.js
│── server.js
│── drizzle.config.js
│── .env
│── package.json
```

### Installation
- Clone Repo
```
git clone https://github.com/Ctnsrma/URL-Shortener-API
cd URL-Shortener-API
```
### Install Dependencies
```
npm install
```
### Setup Environment Variables
```
PORT=8000
DATABASE_URL=your_postgresql_connection_string
BASE_URL=http://localhost:8000
```

## Database design 
Main table stores:

id
original_url
short_code
click_count
created_at

Indexed on:

short_code (unique)


## Learning Goals
This project demonstrates:

REST API design
Relational database schema design
URL redirection logic
Click analytics
Error handling
ORM integration
Scalable backend foundations


## Phase 2 (Planned)
- Redis caching
- Rate limiting
- Custom aliases
- Link expiration
- Authentication
- Dashboard UI
- Docker deployment


## Author 
Chetan Sharma \
Backend Developer | Full Stack Engineer

