# 🚀 MOONLIGHT - QUICK START

## ⚡ 5-MINUTE SETUP

### Step 1: Environment Variables
Create `.env.local` in project root:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moonlight?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-chars-long
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Dev Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔐 CREATE ADMIN ACCOUNT

1. **Sign Up** at `/auth/signup`:
   - Email: `admin@example.com`
   - Username: `admin`
   - Password: `YourSecurePass123`

2. **Make Admin** (MongoDB):
   ```javascript
   // Using MongoDB Compass or Atlas
   db.users.updateOne(
     { username: "admin" },
     { $set: { role: "admin" } }
   )
   ```

3. **Login** at `/auth/login`:
   - Use: `admin` (username) or `admin@example.com` (email)
   - Password: `YourSecurePass123`

4. **Access Admin**: Go to `/admin` ✅

---

## 📱 TEST FEATURES

### Login Test (Both Work!)
```
Option 1: Email
- Email: admin@example.com
- Password: ...

Option 2: Username
- Username: admin
- Password: ...

Both login to same account! ✅
```

### Language Test
1. Click language button (EN/UZ/RU) in navbar
2. Entire UI changes instantly
3. Refresh page - language remembered ✅

### Add Video Test
1. Go to `/admin/videos/new`
2. Fill all fields:
   - English title: "The Matrix"
   - Uzbek title: "Matritsa"
   - Russian title: "Матрица"
   - Same for descriptions
   - Select "kino" category
   - Add video/poster URLs
3. Click "Add Video"
4. Visit `/admin/videos` - see your video ✅

---

## 📁 IMPORTANT FILES

### Read These:
1. `COMPLETION_REPORT.md` - Full summary
2. `USER_GUIDE.md` - How to use
3. `TECHNICAL_DOCS.md` - Technical details

### Don't Forget:
- Set `.env.local` before running!
- Create admin user via MongoDB!
- Use valid URLs for videos/posters!

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Cannot find MONGODB_URI" | Add to `.env.local` |
| "Only admins can add videos" | Make user admin in MongoDB |
| "Unauthorized" on `/admin` | Login first |
| Login doesn't work | Check email/username spelling |
| Language doesn't change | Clear cache, refresh page |

---

## ✅ FEATURE CHECKLIST

- [x] Multi-language (EN/UZ/RU) ✅
- [x] Login with email OR username ✅
- [x] Admin panel with dashboard ✅
- [x] Add videos (multi-language) ✅
- [x] Edit videos ✅
- [x] Delete videos ✅
- [x] Search & filter ✅
- [x] Responsive design ✅
- [x] Smooth animations ✅

---

## 🎬 DEMO CONTENT

### Add these for demo:

**Movie 1:**
- EN: "The Matrix" | UZ: "Matritsa" | RU: "Матрица"
- Category: kino

**Movie 2:**
- EN: "Inception" | UZ: "Xayol" | RU: "Начало"
- Category: kino

**Anime 1:**
- EN: "Attack on Titan" | UZ: "Devga Hujum" | RU: "Атака Титанов"
- Category: anime

---

## 📞 SUPPORT

**Issues?**
1. Check terminal for error messages
2. Open browser DevTools (F12)
3. Check Application → Storage → localStorage
4. Check Network tab for API failures

**Questions?**
- Read `TECHNICAL_DOCS.md`
- Check `USER_GUIDE.md`

---

**🎉 You're ready to go! Good luck! 🌙**

Next: Deploy to Vercel/Render and add real users!
