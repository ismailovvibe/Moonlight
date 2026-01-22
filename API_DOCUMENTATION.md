# 🔌 Moonlight API Documentation

## Base URL
```
http://localhost:3000/api
```

---

## Authentication

### Signup
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securepassword123",
  "confirmPassword": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "language": "en",
    "favorites": [],
    "createdAt": "2026-01-22T...",
    "updatedAt": "2026-01-22T..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "Email or username already exists"
}
```

---

### Login
Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "language": "en",
    "favorites": [],
    "createdAt": "2026-01-22T..."
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### Get Current User
Get authenticated user information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "language": "en",
    "favorites": ["507f1f77bcf86cd799439012"],
    "createdAt": "2026-01-22T..."
  }
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## Videos

### Get All Videos
Retrieve all videos with optional filtering.

**Endpoint:** `GET /videos`

**Query Parameters:**
- `category` (string) - Filter by category: `kino`, `anime`, `dorama`, `multfilm`
- `limit` (number) - Results per page (default: 12)
- `skip` (number) - Skip N results for pagination (default: 0)

**Examples:**
```
GET /videos
GET /videos?category=anime
GET /videos?category=anime&limit=20&skip=0
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": {
        "en": "Your Name",
        "uz": "Sizning Ismingiz",
        "ru": "Твоё имя"
      },
      "description": {
        "en": "Two strangers find themselves linked in a bizarre way...",
        "uz": "Ikki noma'lum odamlar g'alayon tarzda bog'langan...",
        "ru": "Два незнакомца оказываются связаны странным образом..."
      },
      "category": "anime",
      "video_url": "https://example.com/videos/your-name.mp4",
      "poster_url": "https://example.com/posters/your-name.jpg",
      "language": ["en", "uz", "ru"],
      "views": 15234,
      "rating": 8.9,
      "added_by": "507f1f77bcf86cd799439001",
      "createdAt": "2026-01-20T...",
      "updatedAt": "2026-01-22T..."
    },
    // ... more videos
  ],
  "total": 245
}
```

**Error Response (500):**
```json
{
  "message": "Error message"
}
```

---

### Get Single Video
Get detailed information about a specific video.

**Endpoint:** `GET /videos/[id]`

**Example:**
```
GET /videos/507f1f77bcf86cd799439012
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": {
      "en": "Your Name",
      "uz": "Sizning Ismingiz",
      "ru": "Твоё имя"
    },
    "description": {
      "en": "A beautiful love story told backwards...",
      "uz": "Orqaga tomon aytilgan chiroyli sevgi hikoyasi...",
      "ru": "Прекрасная история любви, рассказанная задом наперед..."
    },
    "category": "anime",
    "video_url": "https://example.com/videos/your-name.mp4",
    "poster_url": "https://example.com/posters/your-name.jpg",
    "language": ["en", "uz", "ru"],
    "views": 15234,
    "rating": 8.9,
    "added_by": "507f1f77bcf86cd799439001",
    "createdAt": "2026-01-20T...",
    "updatedAt": "2026-01-22T..."
  }
}
```

**Error Response (404):**
```json
{
  "message": "Video not found"
}
```

---

### Add Video (Admin Only)
Create a new video entry.

**Endpoint:** `POST /videos`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": {
    "en": "New Movie",
    "uz": "Yangi Film",
    "ru": "Новый Фильм"
  },
  "description": {
    "en": "A great movie description...",
    "uz": "Ajoyib film tavsifi...",
    "ru": "Отличное описание фильма..."
  },
  "category": "kino",
  "video_url": "https://example.com/videos/new-movie.mp4",
  "poster_url": "https://example.com/posters/new-movie.jpg",
  "language": ["en", "uz", "ru"],
  "rating": 8.5
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439099",
    "title": { ... },
    "description": { ... },
    "category": "kino",
    "video_url": "https://example.com/videos/new-movie.mp4",
    "poster_url": "https://example.com/posters/new-movie.jpg",
    "language": ["en", "uz", "ru"],
    "views": 0,
    "rating": 8.5,
    "added_by": "507f1f77bcf86cd799439011",
    "createdAt": "2026-01-22T...",
    "updatedAt": "2026-01-22T..."
  }
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Authentication

### JWT Token Format

Tokens are in JWT format and expire after 7 days.

**Token Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE2MzcxNjM4MDB9.
x3K_c9eDxH4t6mL8nQ2pR1sT5vW9yZ
```

### Using Token

Include token in Authorization header:
```
Authorization: Bearer <token>
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Examples

### JavaScript Fetch

**Signup:**
```javascript
const response = await fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    username: 'username',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    confirmPassword: 'password123'
  })
});
const data = await response.json();
localStorage.setItem('token', data.token);
```

**Get Videos:**
```javascript
const response = await fetch('http://localhost:3000/api/videos?category=anime');
const { data, total } = await response.json();
console.log(`Found ${total} anime videos`);
```

**Authenticated Request:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:3000/api/auth/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const { user } = await response.json();
console.log(`Welcome, ${user.firstName}!`);
```

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, implement:
- Max requests per minute per IP
- Max requests per hour per user
- Throttling for specific endpoints

---

## Data Validation

### Required Fields

**Signup:**
- email (valid email format)
- username (min 3 chars)
- firstName (min 1 char)
- lastName (min 1 char)
- password (min 6 chars)
- confirmPassword (must match password)

**Login:**
- email (valid format)
- password (non-empty)

**Video:**
- title (must have en, uz, ru)
- category (must be kino|anime|dorama|multfilm)
- video_url (valid URL)
- poster_url (valid URL)

---

## Error Handling

### Common Errors

**Invalid Email:**
```json
{
  "message": "Invalid email format"
}
```

**Duplicate Account:**
```json
{
  "message": "Email or username already exists"
}
```

**Password Mismatch:**
```json
{
  "message": "Passwords do not match"
}
```

**Invalid Token:**
```json
{
  "message": "Invalid or expired token"
}
```

---

## Changelog

**v1.0.0** (2026-01-22)
- Initial API release
- Authentication endpoints
- Video listing
- Category filtering

---

## Support

For API issues or questions, check:
- Project README.md
- SETUP_GUIDE.md
- GitHub Issues (when available)

---

**API Version:** 1.0.0
**Last Updated:** January 22, 2026
