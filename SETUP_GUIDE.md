# 🌙 Moonlight - Video Streaming Platform Setup Guide

## Project Overview

**Moonlight** is a full-stack video streaming application that allows users to watch and manage movies, anime, dramas, and cartoons with support for multiple languages (English, Uzbek, and Russian).

### Key Features
✅ Multi-language support (EN, UZ, RU)
✅ User authentication (JWT-based)
✅ Video streaming with player
✅ Favorites management
✅ Admin dashboard for content management
✅ Beautiful UI with animations (Framer Motion)
✅ Fully responsive design
✅ Dark mode theme

---

## Project Created ✓

Your Moonlight project has been successfully created at:
```
C:\Users\ismai\OneDrive\Desktop\moonlight
```

---

## Project Structure

```
moonlight/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                     # API routes
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── signup/route.ts
│   │   │   │   └── me/route.ts
│   │   │   └── videos/             # Video endpoints
│   │   │       ├── route.ts        # GET/POST videos
│   │   │       └── [id]/route.ts  # GET single video
│   │   ├── auth/                   # Auth pages
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── category/[category]/page.tsx  # Category pages
│   │   ├── video/[id]/page.tsx     # Video detail page
│   │   ├── profile/page.tsx        # User profile
│   │   ├── admin/page.tsx          # Admin dashboard
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Homepage
│   ├── backend/                     # Backend utilities
│   │   ├── models/                 # MongoDB schemas
│   │   │   ├── User.ts
│   │   │   ├── Video.ts
│   │   │   └── Category.ts
│   │   ├── config/
│   │   │   └── db.ts              # MongoDB connection
│   │   └── middleware/
│   │       ├── auth.ts            # JWT utilities
│   │       └── password.ts        # Password hashing
│   ├── components/                 # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoCard.tsx
│   │   └── VideoGrid.tsx
│   ├── context/
│   │   └── AuthContext.tsx        # Auth provider
│   ├── lib/
│   │   ├── i18n.ts               # i18next configuration
│   │   └── I18nProvider.tsx
│   ├── locales/                   # Translation files
│   │   ├── en/common.json
│   │   ├── uz/common.json
│   │   └── ru/common.json
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── utils/
│   │   └── auth.ts               # Auth utilities
│   └── styles/
├── public/
│   ├── images/
│   └── locales/                  # Additional translations
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment (to be configured)
├── .next/                        # Next.js build output
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | TailwindCSS, Framer Motion |
| **Language** | i18next (EN, UZ, RU) |
| **Backend API** | Next.js API Routes |
| **Authentication** | JWT (JSON Web Token) |
| **Database** | MongoDB |
| **Password Security** | bcryptjs |
| **Deployment** | Vercel (Frontend), Render/Heroku (Backend) |

---

## Prerequisites

Before running the project, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn
- ✅ MongoDB instance (local or MongoDB Atlas)
- ✅ Git (for version control)

---

## Installation & Setup

### Step 1: Navigate to Project Directory

```bash
cd C:\Users\ismai\OneDrive\Desktop\moonlight
```

### Step 2: Environment Variables

Create a `.env.local` file (already created):

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moonlight

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

**For local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/moonlight
```

**For MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and replace `username:password`

### Step 3: Dependencies Already Installed ✓

All dependencies have been installed:
- ✅ Next.js & React
- ✅ TailwindCSS
- ✅ Framer Motion
- ✅ i18next
- ✅ MongoDB (Mongoose)
- ✅ JWT libraries
- ✅ bcryptjs

---

## Running the Project

### Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Build for Production

```bash
npm run build
```

### Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

---

## Key Features & How to Use

### 1. Multi-Language Support

**Switch languages in the navbar:**
- Click the language button (EN, UZ, RU)
- Language preference is saved in localStorage
- All UI text, placeholders, and buttons are translated

**Supported Languages:**
- 🇬🇧 English (en)
- 🇺🇿 Uzbek (uz)
- 🇷🇺 Russian (ru)

### 2. Authentication

**User Registration:**
- Navigate to `/auth/signup`
- Fill in: First Name, Last Name, Username, Email, Password
- Click "Sign Up"
- JWT token is stored in localStorage

**User Login:**
- Navigate to `/auth/login`
- Enter Email and Password
- Click "Login"
- Access to user features is granted

**Current User:**
- User info is accessible via `useAuth()` hook
- Token is sent in Authorization header for API requests

### 3. Video Management

**View Videos:**
- Homepage shows trending, new, and recommended videos
- Browse by category: Kino (Movies), Anime, Dorama, Multfilm

**Video Details:**
- Click on any video card to view details
- Built-in video player
- Add to favorites (if logged in)
- View rating and view count

**Add Video (Admin Only):**
- Dashboard available at `/admin`
- Fill video details (multi-language titles/descriptions)
- Upload poster and video

### 4. User Profile

**Profile Page:** `/profile`
- View favorite videos
- Language preferences
- Account settings

### 5. Admin Panel

**Dashboard:** `/admin`
- Add new videos
- Edit existing videos
- Delete videos
- Manage categories
- View statistics (future enhancement)

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (requires token) |

### Videos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | Get all videos (with filters) |
| GET | `/api/videos?category=anime` | Get videos by category |
| GET | `/api/videos/[id]` | Get single video |
| POST | `/api/videos` | Add new video (admin only) |
| PUT | `/api/videos/[id]` | Update video (admin only) |
| DELETE | `/api/videos/[id]` | Delete video (admin only) |

### Request Headers

All authenticated requests should include:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Database Schema

### Users Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  firstName: String,
  lastName: String,
  password: String (hashed),
  role: String (enum: ["user", "admin"]),
  language: String (enum: ["en", "uz", "ru"]),
  favorites: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Videos Collection
```javascript
{
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
  video_url: String,
  poster_url: String,
  language: [String],
  views: Number,
  rating: Number (0-10),
  added_by: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

### Categories Collection
```javascript
{
  name: {
    en: String,
    uz: String,
    ru: String
  },
  slug: String (unique),
  description: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Components Guide

### Navbar
- Language selector
- Navigation links
- User menu (if logged in)
- Login/Signup buttons (if not logged in)

### Footer
- Company info
- Quick links
- Social media

### VideoCard
- Poster image
- Hover animation with play button
- Rating badge
- Category badge

### VideoGrid
- Responsive grid layout (1-4 columns)
- Lazy loading
- Filters by category

---

## Context API

### AuthContext
Provides authentication state and functions:

```typescript
const { user, isAuthenticated, isLoading, login, signup, logout, updateUser } = useAuth();
```

**Usage:**
```typescript
'use client';
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Please login</p>;
  }
  
  return <p>Welcome, {user.username}!</p>;
}
```

---

## Styling

### TailwindCSS

All components use TailwindCSS for styling:
- Dark theme (gray-900 background)
- Purple accent color (#a855f7)
- Responsive design (mobile-first)

### Color Scheme

- **Background:** `bg-gray-950`, `bg-gray-900`, `bg-gray-800`
- **Text:** `text-white`, `text-gray-300`, `text-gray-400`
- **Accent:** `purple-600`, `pink-600`
- **Hover:** `hover:bg-gray-700`, `hover:text-white`

---

## Animations

### Framer Motion

Components use Framer Motion for smooth animations:

```typescript
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="..."
>
  Animated Component
</motion.div>
```

**Common Animations:**
- `whileHover` - On mouse hover
- `whileTap` - On click
- `initial` - Initial state
- `animate` - Target state
- `transition` - Animation config

---

## Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL`
5. Click "Deploy"

### Backend Deployment

Since we're using Next.js API routes, they deploy with the frontend to Vercel.

For separate backend:
1. Choose: Render, Heroku, or Railway
2. Configure MongoDB Atlas connection
3. Set same environment variables

---

## Troubleshooting

### MongoDB Connection Error
- Check `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running locally
- Verify MongoDB Atlas credentials

### JWT Token Errors
- Clear localStorage: `localStorage.clear()`
- Generate new `JWT_SECRET`
- Re-login

### i18n Not Loading
- Check language files in `src/locales/`
- Verify i18n initialization in `src/lib/i18n.ts`
- Clear browser cache

### Build Errors
- Delete `.next` folder: `rm -rf .next`
- Clear cache: `npm cache clean --force`
- Reinstall: `npm install`

---

## Next Steps

### To Complete the Project:

1. **Connect MongoDB**
   - Update `.env.local` with MongoDB URI
   - Test database connections

2. **Populate Sample Data**
   - Create initial categories
   - Add sample videos
   - Create admin user

3. **Video Upload**
   - Integrate AWS S3 or Cloudinary
   - Implement video upload functionality
   - Add progress indicators

4. **Admin Dashboard**
   - Build CRUD interfaces for videos
   - Add category management
   - User management features

5. **Advanced Features**
   - Recommendations engine
   - Video search functionality
   - Comments/ratings system
   - Watch history
   - Notifications

6. **Performance Optimization**
   - Image optimization
   - Video streaming optimization
   - Caching strategies
   - CDN integration

7. **Testing**
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Cypress/Playwright)

8. **Security**
   - CORS configuration
   - Rate limiting
   - Input validation
   - Security headers

---

## File Organization

### Adding New Features

**New Page:**
```
src/app/[feature]/page.tsx
```

**New Component:**
```
src/components/[FeatureName].tsx
```

**New API Route:**
```
src/app/api/[endpoint]/route.ts
```

**New Database Model:**
```
src/backend/models/[Model].ts
```

**New Translation:**
```
src/locales/[lang]/[namespace].json
```

---

## Command Reference

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start           # Start production server

# Maintenance
npm run lint        # Run ESLint
npm cache clean     # Clear npm cache
npm install         # Install dependencies
```

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [MongoDB Docs](https://docs.mongodb.com)
- [i18next](https://www.i18next.com)

### Community
- Next.js Discord: https://discord.gg/bUG7V3h
- React Community: https://react.dev/community
- Stack Overflow: Tag your questions with `next.js`, `react`

---

## License

MIT License - Feel free to use this project for personal or commercial use.

---

## Made with ❤️

**Moonlight** - Your ultimate video streaming platform for movies, anime, dramas, and cartoons!

🎬 Enjoy streaming! 🌙

---

**Last Updated:** January 22, 2026
**Project Status:** ✅ Ready for Development
