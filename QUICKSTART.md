# 🚀 Moonlight - Quick Start

## 5-Minute Setup

### 1. Configure Environment
Edit `.env.local` and set your MongoDB URI:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/moonlight
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Start Development Server
```bash
npm run dev
```
Server runs on: **http://localhost:3000**

### 3. Test Features

**Homepage:**
- Go to http://localhost:3000
- See hero banner and video grid

**Sign Up:**
- Click "Sign Up" → Fill form → Create account

**Login:**
- Click "Login" → Use credentials → Access account

**Browse Videos:**
- Browse categories (Kino, Anime, Dorama, Multfilm)
- Click video to see details
- Add to favorites (if logged in)

**Change Language:**
- Click language button (EN, UZ, RU)

---

## Project Features

✅ Multi-language UI (EN, UZ, RU)
✅ User Authentication (Signup/Login/Logout)
✅ Video Streaming
✅ Favorites Management
✅ Admin Panel for Content Management
✅ Responsive Design
✅ Beautiful Animations
✅ Dark Mode Theme

---

## Directory Structure

```
moonlight/
├── src/
│   ├── app/          → Pages & API routes
│   ├── components/   → React components
│   ├── context/      → Auth context
│   ├── backend/      → Models & utilities
│   ├── locales/      → Translations
│   └── lib/          → Configuration
├── public/          → Static files
├── .env.local       → Environment variables
└── package.json     → Dependencies
```

---

## Common Tasks

### Build for Production
```bash
npm run build
npm start
```

### Run Linter
```bash
npm run lint
```

### Add New Page
Create file in `src/app/[name]/page.tsx`

### Add New Component
Create file in `src/components/[Name].tsx`

### Add New Translation
Edit files in `src/locales/[lang]/common.json`

---

## Database Setup

### Option 1: Local MongoDB
```bash
# Download MongoDB
# Run MongoDB server
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Add to `.env.local`

---

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

### Videos
- `GET /api/videos` - All videos
- `GET /api/videos?category=anime` - By category
- `GET /api/videos/[id]` - Single video

---

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Database connection error?**
- Check `.env.local`
- Verify MongoDB is running
- Check connection string

**Clear cache & rebuild?**
```bash
rm -rf .next
npm run build
npm run dev
```

---

## Next Steps

1. ✅ Configure MongoDB connection
2. ✅ Add sample videos
3. ✅ Build admin panel
4. ✅ Implement video upload
5. ✅ Add search functionality
6. ✅ Deploy to Vercel

---

## Useful Links

- Project Folder: `C:\Users\ismai\OneDrive\Desktop\moonlight`
- Homepage: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin
- Full Documentation: See `SETUP_GUIDE.md`

---

**Happy Streaming! 🌙🎬**
