# 🔧 Moonlight - Technical Documentation

## 📦 TECH STACK

### Frontend
- **Framework**: Next.js 16.1 (React 19)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Context API
- **i18n**: react-i18next

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password**: Bcrypt
- **ORM**: Mongoose

### DevTools
- **Language**: TypeScript
- **Linting**: ESLint
- **Build**: Turbopack (Next.js 16)

---

## 🗄️ DATABASE SCHEMA

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required, validated),
  firstName: String (required),
  lastName: String (required),
  password: String (hashed with bcrypt, select: false),
  role: String (enum: ["user", "admin"], default: "user"),
  language: String (enum: ["en", "uz", "ru"], default: "en"),
  favorites: [ObjectId] (references Videos),
  createdAt: Date,
  updatedAt: Date
}
```

### Videos Collection
```javascript
{
  _id: ObjectId,
  title: {
    en: String,
    uz: String,
    ru: String
  },
  description: {
    en: String,
    uz: String,
    ru: String
  },
  category: String (enum: ["kino", "anime", "dorama", "multfilm"]),
  video_url: String (required),
  poster_url: String (required),
  language: [String] (array of supported languages),
  added_by: ObjectId (reference to User),
  views: Number (default: 0),
  rating: Number (min: 0, max: 10, default: 0),
  upload_date: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 AUTHENTICATION FLOW

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "64f1a2b3c4d5e6f7g8h9i0j",
  "iat": 1234567890,
  "exp": 1241975890  // 7 days later
}

Secret: process.env.JWT_SECRET
```

### Login Flow (Email OR Username)
```
User Input → Detect Type (@ = email, else = username)
    ↓
POST /api/auth/login { email or username, password }
    ↓
Database: Find user by email OR username
    ↓
Compare password with bcrypt
    ↓
Generate JWT token (7 days expiry)
    ↓
Return: { token, user: {...without password} }
    ↓
Frontend: Save token to localStorage
```

### Protected Route Access
```
Client Request → Include: Authorization: Bearer <token>
    ↓
Server: Extract token from header
    ↓
Verify JWT signature with JWT_SECRET
    ↓
Extract userId from payload
    ↓
Query user from database
    ↓
Check user.role === "admin" (for admin routes)
    ↓
✅ Grant Access OR ❌ Return 401/403
```

---

## 📡 API ENDPOINTS

### Authentication

#### POST /api/auth/signup
```json
Request:
{
  "email": "user@example.com",
  "username": "username123",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "username": "username123",
    "role": "user"
  }
}
```

#### POST /api/auth/login
```json
Request (Email):
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Request (Username):
{
  "username": "username123",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { ... }
}

Error (401):
{
  "message": "User not found" OR "Invalid password"
}
```

#### GET /api/auth/me
```
Headers: Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": { ... }
}

Error (401):
{
  "message": "Unauthorized"
}
```

### Videos

#### GET /api/videos
```
Query Params:
- category: "kino" | "anime" | "dorama" | "multfilm"
- limit: number (default: 12)
- skip: number (default: 0)

Response (200):
[ { _id, title, description, category, video_url, ... }, ... ]
```

#### GET /api/videos/:id
```
Response (200):
{
  "_id": "...",
  "title": { "en": "...", "uz": "...", "ru": "..." },
  "description": { ... },
  "category": "kino",
  "video_url": "https://...",
  "poster_url": "https://...",
  "language": ["en", "uz", "ru"],
  ...
}

Error (404):
{
  "message": "Video not found"
}
```

#### POST /api/videos
```
Headers: Authorization: Bearer <admin_token>
Content-Type: application/json

Request:
{
  "title": {
    "en": "Movie Title",
    "uz": "Film Nomi",
    "ru": "Название Фильма"
  },
  "description": { ... },
  "category": "kino",
  "video_url": "https://example.com/video.mp4",
  "poster_url": "https://example.com/poster.jpg",
  "language": ["en", "uz", "ru"]
}

Response (201):
{ ... created video ... }

Error (403):
{
  "message": "Only admins can add videos"
}
```

#### PUT /api/videos/:id
```
Headers: Authorization: Bearer <admin_token>

Request: Same as POST

Response (200):
{ ... updated video ... }

Errors:
- 401: Unauthorized
- 403: Only admins can update
- 404: Video not found
```

#### DELETE /api/videos/:id
```
Headers: Authorization: Bearer <admin_token>

Response (200):
{
  "message": "Video deleted successfully"
}

Errors:
- 401: Unauthorized
- 403: Only admins can delete
- 404: Video not found
```

---

## 🎯 COMPONENT HIERARCHY

```
RootLayout
├── AuthProvider
│   └── I18nProvider
│       ├── Navbar
│       │   ├── Navigation Links
│       │   ├── Language Selector
│       │   └── Auth Dropdown
│       ├── Pages (Dynamic)
│       └── Footer
```

### Component Files
- `Navbar.tsx` - Navigation with language selector
- `Footer.tsx` - Footer content
- `VideoCard.tsx` - Video preview card
- `VideoGrid.tsx` - Grid layout for videos

### Page Structure
```
/                    → Home (featured videos)
/auth/login          → Login page (email/username)
/auth/signup         → Sign up page
/category/:category  → Category videos
/profile             → User profile
/video/:id           → Video details
/admin               → Admin dashboard (admin only)
/admin/videos        → Manage videos (admin only)
/admin/videos/new    → Add video (admin only)
/admin/videos/:id/edit → Edit video (admin only)
```

---

## 🔄 STATE MANAGEMENT

### AuthContext
```typescript
interface AuthContextType {
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  login(emailOrUsername, password): Promise<void>,
  signup(userData): Promise<void>,
  logout(): void,
  updateUser(userData): void
}
```

**Usage**:
```tsx
const { user, login, logout, isAuthenticated } = useAuth();
```

---

## 🌍 i18n SETUP

### File Structure
```
public/locales/
├── en/common.json
├── uz/common.json
└── ru/common.json
```

### Usage in Components
```tsx
import { useTranslation } from 'react-i18next';

export default function Component() {
  const { t, i18n } = useTranslation();
  
  return <h1>{t('nav.home')}</h1>;
}
```

### Language Switching
```tsx
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem('language', lng);
};
```

### Initialization (lib/i18n.ts)
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: { en, uz, ru },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
```

---

## 🧪 ERROR HANDLING

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

### Error Response Format
```json
{
  "message": "Descriptive error message"
}
```

### Common Errors
| Error | Cause | Solution |
|-------|-------|----------|
| "User not found" | Wrong email/username | Check spelling |
| "Invalid password" | Wrong password | Reset password |
| "Unauthorized" | Missing token | Login first |
| "Only admins..." | Non-admin user | Change role in DB |
| "Video not found" | Wrong video ID | Check ID |

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Set `.env.local` with all variables
- [ ] Test login with email and username
- [ ] Test admin access and video CRUD
- [ ] Test all 3 languages load correctly
- [ ] Test language persistence across sessions
- [ ] Verify responsive design on mobile
- [ ] Check animations are smooth
- [ ] Test error handling scenarios
- [ ] Run `npm run build` successfully
- [ ] Deploy to Vercel or Render
- [ ] Test on production URL

---

## 📊 DATABASE INDEXES (Recommended)

```javascript
// For faster queries
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

db.videos.createIndex({ category: 1 });
db.videos.createIndex({ added_by: 1 });
db.videos.createIndex({ "title.en": "text", "title.uz": "text", "title.ru": "text" });
```

---

## 🔒 Security Best Practices

1. **JWT Secret**: Use strong random string (min 32 chars)
2. **Password Hashing**: Always use bcrypt (12 rounds)
3. **HTTPS**: Deploy with SSL certificate
4. **CORS**: Configure if frontend on different domain
5. **Rate Limiting**: Consider adding on auth endpoints
6. **Input Validation**: All form inputs validated
7. **SQL Injection**: Using MongoDB (not vulnerable)
8. **XSS Protection**: React escapes by default

---

## 📈 PERFORMANCE TIPS

1. **Lazy Loading**: Videos loaded on demand
2. **Pagination**: Use limit/skip for large datasets
3. **Caching**: Use browser cache for images
4. **CDN**: Host images on Cloudinary or AWS S3
5. **Database**: Create proper indexes
6. **Code Splitting**: Next.js handles automatically

---

## 🐛 DEBUGGING

### Frontend Issues
1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API failures
4. Check Application → Storage for localStorage

### Backend Issues
1. Check `console.log` output in terminal
2. Verify MongoDB connection
3. Check JWT_SECRET is set
4. Verify user role in database

### Common Issues
```bash
# Database connection failed
# → Check MONGODB_URI in .env.local

# JWT errors
# → Check JWT_SECRET is same everywhere

# 404 on API
# → Check route path matches exactly

# CORS errors
# → Check frontend/backend URLs match
```

---

**Questions? Check the Implementation Summary or User Guide!** 📚
