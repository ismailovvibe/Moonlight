# 🎯 MOONLIGHT - IMPLEMENTATION ARCHITECTURE

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  RootLayout (with Navbar, Footer, Auth, i18n)          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  Public Pages:          Admin Pages:                    │  │
│  │  • Home (/)            • Dashboard (/admin)            │  │
│  │  • Login               • Add Video                      │  │
│  │  • Signup              • Manage Videos                  │  │
│  │  • Category            • Edit Video                     │  │
│  │  • Video Details                                        │  │
│  │  • Profile             (Protected by JWT + role)       │  │
│  │                                                          │  │
│  │  Global State:                                          │  │
│  │  • AuthContext (user, token, login, logout)           │  │
│  │  • i18n Context (language switching)                   │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓ HTTP (API)
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Next.js API Routes)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Authentication:                                              │
│  • POST /api/auth/signup → Email + Username + Password      │
│  • POST /api/auth/login  → Email OR Username (SMART)        │
│  • GET /api/auth/me      → Verify JWT Token                 │
│                                                               │
│  Videos (CRUD):                                              │
│  • GET /api/videos       → List all (+ filters)             │
│  • GET /api/videos/:id   → Single video details             │
│  • POST /api/videos      → Add (ADMIN ONLY + JWT)           │
│  • PUT /api/videos/:id   → Edit (ADMIN ONLY + JWT)          │
│  • DELETE /api/videos/:id → Delete (ADMIN ONLY + JWT)       │
│                                                               │
│  Security Middleware:                                        │
│  • JWT Token Verification                                    │
│  • Admin Role Check                                          │
│  • Password Hashing (Bcrypt)                                 │
│                                                               │
└─────────────────────────────────────────────────────────────────┘
                            ↓ MongoDB Driver
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE (MongoDB)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Collections:                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ users                                                    │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ • username (unique)        • password (hashed)          │ │
│  │ • email (unique)           • role (user|admin)          │ │
│  │ • firstName, lastName      • language (en|uz|ru)        │ │
│  │ • favorites [video_ids]    • timestamps                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ videos                                                   │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ • title {en, uz, ru}       • video_url, poster_url      │ │
│  │ • description {en, uz, ru} • category                   │ │
│  │ • language [en, uz, ru]    • added_by (user_id)         │ │
│  │ • views, rating            • upload_date, timestamps    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 LOGIN FLOW (Email OR Username)

```
User Input
    ↓
┌─────────────────────────────────────┐
│ Auto-detect type:                   │
│ • Contains @ → Email                │
│ • Otherwise → Username              │
└─────────────────────────────────────┘
    ↓
POST /api/auth/login { email/username, password }
    ↓
┌─────────────────────────────────────┐
│ Backend:                            │
│ db.users.findOne({                  │
│   $or: [                            │
│     { email: input },               │
│     { username: input }             │
│   ]                                 │
│ })                                  │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Check password with bcrypt.compare()│
└─────────────────────────────────────┘
    ↓
Generate JWT Token (7 days expiry)
    ↓
Return { token, user }
    ↓
Frontend: Save token to localStorage
    ↓
Redirect to Home / Dashboard
    ↓
✅ Logged In!
```

---

## 🎬 ADMIN VIDEO WORKFLOW

```
Admin Dashboard
    ↓
    ├──→ Add New Video
    │        ↓
    │    Fill Form:
    │    • Titles (EN/UZ/RU) ─────┐
    │    • Descriptions (EN/UZ/RU)│
    │    • Category dropdown      ├──→ Validate
    │    • Video URL              │
    │    • Poster URL             │
    │    • Language selection ────┘
    │        ↓
    │    POST /api/videos (with JWT + admin check)
    │        ↓
    │    Create in MongoDB
    │        ↓
    │    ✅ Redirect to Manage Videos
    │
    ├──→ Manage Videos
    │        ↓
    │    Display Grid with Search/Filter
    │        ↓
    │    ├──→ Edit Button
    │    │       ↓
    │    │    Load Video
    │    │       ↓
    │    │    Edit Fields
    │    │       ↓
    │    │    PUT /api/videos/:id
    │    │       ↓
    │    │    ✅ Update Success
    │    │
    │    └──→ Delete Button
    │            ↓
    │         Show Confirmation
    │            ↓
    │         DELETE /api/videos/:id
    │            ↓
    │         ✅ Video Removed
    │
    └──→ Filtered by Category/Search
```

---

## 🌍 LANGUAGE SYSTEM

```
┌─────────────────────────────────────────────┐
│ User Visits Site                            │
└─────────────────────────────────────────────┘
    ↓
Check localStorage.getItem('language')
    ↓
    ├─ Found → Use that language
    │
    └─ Not Found → Use browser default or 'en'
    ↓
Load i18n with language
    ↓
┌─────────────────────────────────────────────┐
│ UI Renders with Translations                │
│ • All t('key') calls resolved               │
│ • Video titles in user's language           │
└─────────────────────────────────────────────┘
    ↓
User Clicks Language Button
    ↓
i18n.changeLanguage(lang)
    ↓
Save to localStorage
    ↓
All Components Re-render with New Language
    ↓
✅ Real-time Language Switch!
    ↓
On Next Visit → Language Remembered ✅
```

---

## 🔒 SECURITY LAYERS

```
Public Routes (No Auth Required)
├── / (Home)
├── /category/:category
├── /video/:id
├── /auth/login
└── /auth/signup

Protected Routes (Login Required)
├── /profile
└── /api/auth/me

Admin Routes (Admin Role Required + JWT)
├── /admin (Dashboard)
├── /admin/videos (Manage)
├── /admin/videos/new (Add)
├── /admin/videos/:id/edit (Edit)
├── POST /api/videos (Add)
├── PUT /api/videos/:id (Edit)
└── DELETE /api/videos/:id (Delete)

Security Check Flow:
┌─────────────────────────────┐
│ Request with token          │
├─────────────────────────────┤
│ 1. Extract token            │
│ 2. Verify JWT signature     │
│ 3. Get userId from payload  │
│ 4. Query user from DB       │
│ 5. Check role (for admin)   │
│ 6. Grant/Deny access        │
└─────────────────────────────┘
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile (< 768px)
├─ 1 column grid
├─ Full-width inputs
└─ Stack buttons vertically

Tablet (768px - 1024px)
├─ 2 column grid
├─ Side-by-side buttons
└─ Better spacing

Desktop (> 1024px)
├─ 3+ column grid
├─ Full layouts
└─ Max-width container
```

---

## 🎨 COMPONENT TREE

```
App
└── RootLayout
    ├── AuthProvider
    │   └── I18nProvider
    │       ├── Navbar
    │       │   ├── Logo
    │       │   ├── Navigation Links
    │       │   ├── Language Selector
    │       │   └── Auth Dropdown
    │       │
    │       ├── Main Content (Dynamic Route)
    │       │   ├── Home (page.tsx)
    │       │   ├── Auth Pages
    │       │   │   ├── Login
    │       │   │   └── Signup
    │       │   ├── Category Pages
    │       │   ├── Video Details
    │       │   ├── Profile
    │       │   └── Admin Pages
    │       │       ├── Dashboard
    │       │       ├── Add Video
    │       │       ├── Manage Videos
    │       │       └── Edit Video
    │       │
    │       ├── VideoGrid (Reusable)
    │       ├── VideoCard (Reusable)
    │       │
    │       └── Footer
```

---

## 📈 DATA FLOW EXAMPLE

```
User Input: Video Search
    ↓
Frontend (Manage Videos Page)
    │ ├─ useState([videosData])
    │ ├─ useEffect(() → fetch /api/videos)
    │ └─ handleSearch(term) → filter local array
    ↓
Filter Applied:
    │ ├─ Search term match
    │ ├─ Category match
    │ └─ Language-aware titles
    ↓
Render VideoCard Component
    │ ├─ Image: poster_url
    │ ├─ Title: title[currentLanguage]
    │ ├─ Buttons: Edit, Delete
    │ └─ Modal: Delete Confirmation
    ↓
User Action: Delete Video
    │ ├─ Show confirmation
    │ ├─ Confirm → POST /api/videos/:id (DELETE)
    │ ├─ Server: Verify admin + JWT
    │ ├─ MongoDB: Remove document
    │ └─ Response: Success/Error
    ↓
Frontend:
    │ ├─ Update local state
    │ ├─ Remove from array
    │ └─ Re-render UI
    ↓
✅ Video Deleted!
```

---

## 🚀 DEPLOYMENT PIPELINE

```
Local Development
    ├─ npm install
    ├─ npm run dev
    └─ Test features

Build & Test
    ├─ npm run build
    └─ Check for errors

Environment Setup
    ├─ .env.local (local)
    └─ .env (production)

Deployment Options:
    ├─ Vercel (Recommended)
    │   └─ Connect GitHub → Auto deploy
    ├─ Render
    │   └─ Connect GitHub → Auto deploy
    └─ Self-Hosted
        └─ Docker or Direct server

Post-Deployment:
    ├─ Set environment variables
    ├─ Test all features
    ├─ Monitor error logs
    └─ Add monitoring (Sentry, LogRocket)
```

---

**This architecture provides:**
✅ Scalability
✅ Security
✅ Multi-language support
✅ Admin capabilities
✅ Real-time language switching
✅ Role-based access
✅ Responsive design
✅ Error handling

**Status: Production Ready! 🚀**
