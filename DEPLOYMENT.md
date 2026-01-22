# 🚀 Moonlight Deployment Guide

Deploy your Moonlight video streaming platform to production.

---

## Deployment Overview

This guide covers deploying to:
- **Frontend:** Vercel (recommended)
- **Database:** MongoDB Atlas
- **Alternative Backend:** Render, Railway, or Heroku

---

## Prerequisites

Before deploying:
- ✅ GitHub account
- ✅ Vercel account
- ✅ MongoDB Atlas account
- ✅ All tests passing
- ✅ Environment variables ready

---

## Step 1: Prepare for Deployment

### 1.1 Build & Test Locally

```bash
# Clean build
rm -rf .next
npm run build

# No errors? ✅ Continue
# Errors? ❌ Fix locally first
```

### 1.2 Create Production Environment

Create `.env.production`:
```env
MONGODB_URI=mongodb+srv://prod_user:prod_pass@cluster.mongodb.net/moonlight
JWT_SECRET=your_super_secret_production_key
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production
```

### 1.3 Verify Configuration

- [ ] All environment variables set
- [ ] MongoDB URI tested
- [ ] JWT_SECRET is strong (min 32 chars)
- [ ] API_URL is correct domain

---

## Step 2: Frontend Deployment (Vercel)

### 2.1 Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add remote
git remote add origin https://github.com/yourusername/moonlight.git

# Add files
git add .

# Commit
git commit -m "Initial commit: Moonlight streaming platform"

# Push
git branch -M main
git push -u origin main
```

### 2.2 Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select **moonlight** project
5. Click "Import"

### 2.3 Configure Environment Variables

1. In Vercel dashboard
2. Go to "Settings" → "Environment Variables"
3. Add variables:

```
MONGODB_URI = [your MongoDB Atlas URI]
JWT_SECRET = [your secret key]
NEXT_PUBLIC_API_URL = https://yourdomain.vercel.app
NODE_ENV = production
```

4. Click "Deploy"

### 2.4 Verify Deployment

- [ ] Build completed successfully
- [ ] No errors in deployment logs
- [ ] Application opens at provided URL
- [ ] Homepage loads
- [ ] Can navigate pages

---

## Step 3: Database Setup (MongoDB Atlas)

### 3.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/Select cluster
3. Create database: `moonlight`
4. Create collections:
   - `users`
   - `videos`
   - `categories`

### 3.2 Create Database User

1. Go to "Database Access"
2. Create new user
3. Username: `moonlight_user`
4. Set strong password
5. Choose "Built-in Role: `readWriteAnyDatabase`"

### 3.3 Get Connection String

1. Go to "Databases" → "Connect"
2. Select "Connect your application"
3. Copy connection string
4. Replace:
   - `<username>` with your username
   - `<password>` with your password
   - `<cluster-name>` with your cluster name

Example:
```
mongodb+srv://moonlight_user:yourpassword@cluster.mongodb.net/moonlight
```

### 3.4 Add to Vercel

1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Set `MONGODB_URI` to connection string
4. Click "Deploy" to trigger rebuild

---

## Step 4: Seed Initial Data

### 4.1 Create Admin User

Create a script `scripts/seed.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../src/backend/models/User');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await User.create({
    username: 'admin',
    email: 'admin@moonlight.com',
    firstName: 'Admin',
    lastName: 'User',
    password: hashedPassword,
    role: 'admin'
  });
  
  console.log('Admin user created:', admin);
  await mongoose.connection.close();
}

seedAdmin();
```

Run:
```bash
node scripts/seed.js
```

### 4.2 Add Sample Videos

Create a script `scripts/addVideos.js`:

```javascript
const mongoose = require('mongoose');
const Video = require('../src/backend/models/Video');

async function addVideos() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const videos = [
    {
      title: { en: 'Sample Anime', uz: 'Namuna Anime', ru: 'Пример Anime' },
      description: { en: 'A sample anime', uz: 'Namuna anime', ru: 'Пример anime' },
      category: 'anime',
      video_url: 'https://example.com/anime.mp4',
      poster_url: 'https://example.com/anime.jpg',
      language: ['en', 'uz', 'ru'],
      rating: 8.5
    }
    // Add more videos
  ];
  
  await Video.insertMany(videos);
  console.log('Videos added');
  await mongoose.connection.close();
}

addVideos();
```

---

## Step 5: Custom Domain (Optional)

### 5.1 Purchase Domain

1. Get domain from:
   - GoDaddy
   - Namecheap
   - Google Domains
   - Vercel Domains

### 5.2 Add to Vercel

1. Go to Vercel project settings
2. Domains
3. Add domain
4. Update DNS records
5. Verify

---

## Step 6: Performance Optimization

### 6.1 Optimize Images

```bash
npm install sharp next-image-export-optimizer
```

### 6.2 Enable Caching

Edit `next.config.js`:
```javascript
const headers = [
  {
    source: '/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=3600' }
    ]
  }
];

module.exports = { headers };
```

### 6.3 Monitor Performance

1. Vercel Analytics
2. Google PageSpeed Insights
3. Lighthouse

---

## Step 7: Security Hardening

### 7.1 Set Security Headers

Edit `next.config.js`:
```javascript
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin' }
];
```

### 7.2 Enable HTTPS

- ✅ Automatic with Vercel

### 7.3 Set up WAF (Web Application Firewall)

- Optional: Use Cloudflare for additional protection

### 7.4 Configure CORS

If backend separate:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## Step 8: Monitoring & Logging

### 8.1 Error Tracking

Use Sentry:
```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 8.2 Uptime Monitoring

Use services like:
- Datadog
- New Relic
- Updown.io
- Pingdom

### 8.3 View Logs

In Vercel:
1. Project → Deployments
2. Select deployment
3. View logs
4. Filter by level (error, warning)

---

## Step 9: Continuous Deployment

### 9.1 Setup Auto-Deploy

Vercel automatically deploys on:
- Push to `main` branch
- Merge to `main` branch

### 9.2 Preview Deployments

- Every pull request creates preview
- Share preview URL with team
- Test before merging

### 9.3 Deployment Notifications

1. Go to Integrations
2. Add Slack, Discord, etc.
3. Get notifications on deploy

---

## Alternative Backend Deployment

If deploying backend separately:

### Option 1: Render

1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub
4. Select repository
5. Set environment variables
6. Deploy

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. New Project
3. Deploy from GitHub
4. Configure
5. Deploy

### Option 3: Heroku

1. Go to [heroku.com](https://www.heroku.com)
2. Create new app
3. Connect to GitHub
4. Configure buildpacks
5. Deploy

---

## Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] Database connection working
- [ ] Can create user account
- [ ] Can login
- [ ] Can view videos
- [ ] Languages switch correctly
- [ ] Responsive on mobile
- [ ] Images load
- [ ] Videos play
- [ ] Performance acceptable
- [ ] No console errors
- [ ] SSL certificate valid
- [ ] Monitoring active

---

## Rollback Procedure

If deployment fails:

### Rollback to Previous Version

Vercel:
1. Deployments → Select previous deployment
2. Click "⋮" → "Redeploy"

GitHub:
```bash
git revert HEAD
git push origin main
```

---

## Scaling Considerations

When traffic increases:

### Database
- MongoDB Atlas auto-scales
- Add read replicas if needed
- Enable backups

### Frontend
- Vercel auto-scales
- Use CDN for static content
- Implement caching

### Video Streaming
- Use CDN (CloudFront, Bunny CDN)
- Implement adaptive bitrate streaming
- Cache popular videos

---

## Maintenance Plan

### Daily
- Monitor error logs
- Check uptime status
- Monitor database performance

### Weekly
- Review analytics
- Check security alerts
- Performance review

### Monthly
- Update dependencies
- Security audit
- Backup verification
- Cost optimization

---

## Support URLs

After Deployment:
- **Production:** https://yourdomain.com
- **Admin Panel:** https://yourdomain.com/admin
- **API:** https://yourdomain.com/api
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## Troubleshooting

### Deployment Failed

1. Check build logs in Vercel
2. Fix errors locally
3. Push new commit
4. Vercel auto-redeploys

### Database Connection Error

1. Verify MongoDB URI
2. Check IP whitelist in Atlas
3. Test connection locally
4. Update environment variables

### Slow Performance

1. Check Vercel Analytics
2. Optimize images
3. Enable caching
4. Use CDN

### Static Assets Not Loading

1. Check public folder
2. Verify path references
3. Check CDN configuration
4. Clear cache

---

## Support

For deployment issues:
- Check Vercel docs: https://vercel.com/docs
- MongoDB docs: https://docs.mongodb.com
- Next.js docs: https://nextjs.org/docs

---

**Deployed! 🎉**

Your Moonlight platform is now live!

Monitor, maintain, and enjoy streaming!

🌙🎬
