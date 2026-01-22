# 🌙 Moonlight - User Guide

## 👤 USER FEATURES

### Login
1. Go to `/auth/login`
2. Enter **either**:
   - Email: `user@example.com`
   - OR Username: `username123`
3. Enter your password
4. Click "Login"

✅ **Works with both email and username!**

### Sign Up
1. Go to `/auth/signup`
2. Fill in:
   - First Name
   - Last Name
   - Email
   - Username
   - Password & Confirm Password
3. Click "Sign Up"

### Change Language
1. Click the language button in navbar (EN/UZ/RU)
2. Select your preferred language
3. **Entire UI updates instantly**
4. Language is remembered on next visit

### Browse Videos
1. Home page shows featured videos
2. Use category links:
   - 🎬 Movies (Kino)
   - 🎌 Anime
   - 🎭 Dramas (Dorama)
   - 🎠 Cartoons (Multfilm)
3. Click on any video card to view details

### Manage Profile
1. Click your username in navbar
2. Select "Profile"
3. View your information and favorites

---

## 🔐 ADMIN FEATURES

### Access Admin Panel
1. **Only users with admin role can access `/admin`**
2. Non-admins are redirected to home
3. Admin URL: `http://localhost:3000/admin`

### Dashboard
Shows:
- 📊 Total videos count
- ➕ Add New Video button
- 🎬 Manage Videos button

### Add Video

**Path**: `/admin/videos/new`

1. Enter titles in all 3 languages:
   - 🇬🇧 English
   - 🇺🇿 Uzbek (O'zbekcha)
   - 🇷🇺 Russian

2. Enter descriptions in all 3 languages

3. Select category:
   - kino (Movies)
   - anime (Anime)
   - dorama (Dramas)
   - multfilm (Cartoons)

4. Paste video URL
   - Format: `https://example.com/video.mp4`

5. Paste poster image URL
   - Format: `https://example.com/poster.jpg`

6. Select available languages
   - Check which languages this video supports

7. Click "Add Video"

### Manage Videos

**Path**: `/admin/videos`

#### Search
- Type video title in search box
- Results update in real-time

#### Filter by Category
- All
- 🎬 Movies (Kino)
- 🎌 Anime
- 🎭 Dramas (Dorama)
- 🎠 Cartoons (Multfilm)

#### Edit Video
1. Find video in grid
2. Click "Edit" button
3. Change any field
4. Click "Save"

#### Delete Video
1. Find video in grid
2. Click "Delete" button
3. Confirm deletion in popup

---

## 🎯 COMMON SCENARIOS

### Scenario 1: Create Admin Account
```bash
# During signup, use any email/username
# Then ask database admin to set role to "admin"
# Or use MongoDB compass to update:
db.users.updateOne(
  { username: "admin" },
  { $set: { role: "admin" } }
)
```

### Scenario 2: Add Movie in All Languages
1. Go to `/admin/videos/new`
2. Fill English title: "The Matrix"
3. Fill Uzbek title: "Matritsa"
4. Fill Russian title: "Матрица"
5. Do same for descriptions
6. Select category: "kino"
7. Add video URL
8. Add poster URL
9. Check all 3 languages
10. Click "Add Video" ✅

### Scenario 3: Edit Existing Content
1. Go to `/admin/videos`
2. Find the video
3. Click "Edit"
4. Update any field (e.g., fix typo in Uzbek title)
5. Click "Save" ✅

### Scenario 4: Delete Old Content
1. Go to `/admin/videos`
2. Find the video
3. Click "Delete"
4. Click "Yes" to confirm ✅
5. Video is removed from database

### Scenario 5: Filter by Language
- Videos show titles in **your current language**
- If video doesn't have translation, English title shows
- Admins can add translations anytime

---

## 🛠️ TROUBLESHOOTING

### "Only admins can add videos"
- ❌ Your account is not admin
- ✅ Ask database admin to update your role to "admin"

### "Unauthorized" on admin panel
- ❌ You're not logged in
- ✅ Log in first at `/auth/login`

### Video doesn't appear
- ❌ URL might be wrong
- ✅ Check video_url and poster_url are valid
- ✅ Make sure at least one language is selected

### Language not saving
- ❌ Cookie might be blocked
- ✅ Check browser privacy settings
- ✅ Clear browser cache and try again

### Can't login with username
- ❌ Wrong username/password combo
- ✅ Check spelling carefully (case-sensitive)
- ✅ Try email instead

### Edit page loads but looks empty
- ❌ Internet connection issue
- ✅ Refresh the page
- ✅ Check browser console for errors

---

## 📱 RESPONSIVE DESIGN

All pages work on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

---

## 🔒 SECURITY NOTES

1. **Never share your password**
2. **Admin accounts are powerful** - only trusted users
3. **JWT tokens expire after 7 days** - you'll need to login again
4. **Passwords are hashed** - we don't store plain passwords
5. **All videos URLs should be HTTPS** when possible

---

## 📞 SUPPORT

If something doesn't work:
1. Check browser console (F12 → Console tab)
2. Check network tab for failed requests
3. Verify all form fields are filled
4. Check that URLs are correct
5. Try refreshing the page

---

**Enjoy your Moonlight streaming platform! 🌙**
