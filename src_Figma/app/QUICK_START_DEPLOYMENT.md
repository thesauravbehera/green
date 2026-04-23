# 🚀 BLOOMIFY - QUICK START DEPLOYMENT GUIDE

## Get Your Backend Running in 15 Minutes

---

## STEP 1: Install Dependencies (2 minutes)

```bash
# Navigate to server directory
cd server

# Install all packages
npm install

# Or with yarn
yarn install
```

---

## STEP 2: Set Up MongoDB Atlas (5 minutes)

### Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with Google/Email

### Create Cluster
1. Choose **FREE** tier (M0 Sandbox)
2. Select **AWS** provider
3. Choose closest region (Mumbai/Singapore for India)
4. Click "Create Cluster" (takes 3-5 minutes)

### Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password

Example:
```
mongodb+srv://bloomify:YOUR_PASSWORD@cluster0.abc123.mongodb.net/bloomify?retryWrites=true&w=majority
```

---

## STEP 3: Configure Environment Variables (2 minutes)

```bash
# Copy example env file
cp .env.example .env

# Edit .env file
nano .env  # or use any editor
```

**Minimum Required Variables:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string-here

# Firebase (copy from your Firebase project settings)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
```

**Optional (can add later):**
```env
# For weather features
OPENWEATHER_API_KEY=get-from-openweathermap.org

# For image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# For payments
STRIPE_SECRET_KEY=sk_test_your-key

# For AI features
GEMINI_API_KEY=your-gemini-key
```

---

## STEP 4: Start the Server (1 minute)

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

**Expected Output:**
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🌿 BLOOMIFY API SERVER v4.0.0                 ║
║                                                       ║
║        Environment: DEVELOPMENT                       ║
║        Port: 5000                                     ║
║        URL: http://localhost:5000                     ║
║                                                       ║
║        Status: ✅ ONLINE                             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

✅ MongoDB Connected Successfully
```

---

## STEP 5: Test API Endpoints (3 minutes)

### Health Check
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Bloomify API is running",
  "timestamp": "2026-03-29T10:30:00.000Z",
  "environment": "development"
}
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer DEMO_ADMIN_TOKEN" \
  -d '{"uid": "demo-admin-id"}'
```

### Get Plant Catalog
```bash
curl http://localhost:5000/api/v1/plants/catalog
```

---

## STEP 6: Seed Database with Sample Data (2 minutes)

Create file: `/server/scripts/seedDatabase.js`

```bash
# Run seed script
node scripts/seedDatabase.js
```

This will create:
- 50+ Indian plants
- Demo admin user
- Demo guest user
- Sample products

---

## STEP 7: Connect Frontend

Update your React app's `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Update API client (create if doesn't exist):

```typescript
// src/lib/api/client.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken(); // your existing function
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
  
  return response.json();
}
```

---

## DEPLOY TO PRODUCTION (15 minutes)

### Option A: Deploy to Render (Recommended - Free Tier)

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `server` directory as root

3. **Configure**
   ```
   Name: bloomify-api
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add all variables from `.env`
   - Use MongoDB Atlas connection string

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes
   - Get your URL: `https://bloomify-api.onrender.com`

---

### Option B: Deploy to Railway

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Add environment variables
   - Railway auto-detects Node.js
   - Generates URL automatically

4. **Deploy**
   - Automatically deploys on push
   - Get URL: `https://your-app.railway.app`

---

## TROUBLESHOOTING

### Error: MongoDB Connection Failed
```
❌ MongoDB Connection Error: MongoNetworkError
```

**Solution:**
1. Check internet connection
2. Verify MongoDB Atlas IP whitelist (add `0.0.0.0/0` for testing)
3. Confirm connection string is correct
4. Check username/password

---

### Error: Firebase Admin Not Initialized
```
❌ Firebase Admin SDK has not been initialized
```

**Solution:**
1. Get Firebase credentials:
   - Go to Firebase Console
   - Project Settings → Service Accounts
   - Generate New Private Key
2. Copy values to `.env`:
   - Project ID
   - Private Key (keep the `\n` characters)
   - Client Email

---

### Error: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

### Error: Module Not Found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## VERIFY DEPLOYMENT

### Check Backend
```bash
curl https://your-api-url.onrender.com/health
```

### Check Database Connection
```bash
curl https://your-api-url.onrender.com/api/v1/plants/catalog
```

### Test Authentication
```bash
curl -X POST https://your-api-url.onrender.com/api/v1/auth/verify \
  -H "Authorization: Bearer DEMO_ADMIN_TOKEN"
```

---

## UPDATE FRONTEND

Once backend is deployed, update frontend:

```env
# Production .env
VITE_API_URL=https://your-api-url.onrender.com/api/v1
VITE_SOCKET_URL=https://your-api-url.onrender.com
```

Deploy frontend to Vercel:
```bash
# In your frontend directory
vercel deploy --prod
```

---

## MONITORING

### View Logs (Render)
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. See real-time server logs

### View Logs (Railway)
1. Go to Railway dashboard
2. Click your project
3. Logs appear automatically

### Check MongoDB Data
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. See all your data

---

## WHAT'S WORKING NOW

✅ User authentication  
✅ Plant catalog API  
✅ Garden management  
✅ XP/Level system  
✅ Leaderboards  
✅ Real-time health tracking  

## WHAT TO ADD NEXT

⏳ Weather API integration  
⏳ Community posts  
⏳ Image uploads  
⏳ Marketplace products  
⏳ Stripe payments  

---

## SUPPORT

**Backend not starting?**
- Check logs for errors
- Verify all environment variables
- Confirm MongoDB is accessible

**API returning errors?**
- Check request format (JSON)
- Verify authentication token
- Check CORS configuration

**Database queries failing?**
- Verify MongoDB connection
- Check collection names
- Confirm data exists

---

## SUCCESS CHECKLIST

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Health endpoint returns 200
- [ ] Plant catalog returns data
- [ ] Authentication works
- [ ] Garden operations work
- [ ] XP rewards being awarded
- [ ] Frontend can fetch data
- [ ] Deployed to production
- [ ] Custom domain configured (optional)

---

**Congratulations! Your backend is live! 🎉**

Next: Continue implementing remaining 9 tasks (Tasks 7-15)

---

**Created:** March 29, 2026  
**Version:** 4.0.0  
**Status:** Ready for deployment 🚀
