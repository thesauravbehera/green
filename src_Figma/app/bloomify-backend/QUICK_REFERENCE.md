# ⚡ BLOOMIFY BACKEND - QUICK REFERENCE

## 🚀 **ONE-PAGE CHEAT SHEET**

---

## 📦 **DOWNLOAD**
```
Folder: /bloomify-backend/
Files: 35 total
Ready: ✅ Production
```

---

## ⚡ **QUICK START**

```bash
# 1. Setup
cd bloomify-backend
npm install
cp .env.example .env

# 2. Configure .env
MONGODB_URI=mongodb://localhost:27017/bloomify
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=http://localhost:5173

# 3. Start MongoDB
mongod

# 4. Run server
npm run dev

# 5. Test
curl http://localhost:5000/health
```

---

## 📡 **KEY ENDPOINTS**

```bash
# Auth
POST   /api/v1/auth/login
POST   /api/v1/auth/register

# Tasks
GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id/complete

# Community
GET    /api/v1/community
POST   /api/v1/community
PUT    /api/v1/community/:id/like

# Marketplace
GET    /api/v1/marketplace
POST   /api/v1/marketplace/orders

# AI
POST   /api/v1/ai/chat
POST   /api/v1/ai/diagnose

# Weather
GET    /api/v1/weather/current

# Admin
GET    /api/v1/admin/dashboard
```

---

## 📂 **FILE STRUCTURE**

```
bloomify-backend/
├── server.js              # Main server
├── package.json           # Dependencies
├── .env.example           # Config template
│
├── Documentation/         # 5 guides
├── config/               # 1 config
├── middleware/           # 2 files
├── models/               # 8 models
├── routes/               # 10 routes
└── services/             # 3 services
```

---

## 🔐 **REQUIRED ENV VARS**

```env
MONGODB_URI=mongodb://localhost:27017/bloomify
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

---

## 🧪 **TEST COMMANDS**

```bash
# Health check
curl http://localhost:5000/health

# Login test
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get tasks
curl http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer <token>"
```

---

## 🌐 **DEPLOY**

### Railway
```bash
1. Push to GitHub
2. Connect to Railway
3. Add env vars
4. Deploy!
```

### Heroku
```bash
heroku create bloomify-api
heroku config:set MONGODB_URI=...
git push heroku main
```

---

## 📊 **PACKAGE CONTENTS**

```
35 Files
~7,000 Lines
60+ Endpoints
8 Models
10 Routes
3 Services
5 Docs
```

---

## 📖 **DOCS TO READ**

1. `README.md` - Start here
2. `SETUP_GUIDE.md` - Installation
3. `API_DOCUMENTATION.md` - All endpoints
4. `DEPLOYMENT_GUIDE.md` - Deploy
5. `PACKAGE_INDEX.md` - Complete index

---

## ✨ **KEY FEATURES**

- ✅ JWT + Firebase auth
- ✅ Task management
- ✅ Community features
- ✅ E-commerce system
- ✅ AI assistant
- ✅ Weather API
- ✅ Admin dashboard
- ✅ Socket.IO real-time
- ✅ Cron jobs
- ✅ Cloudinary uploads

---

## 🆘 **TROUBLESHOOTING**

```bash
# MongoDB error?
mongod

# Port in use?
PORT=5001 npm run dev

# Missing deps?
npm install

# Wrong Node version?
node --version  # Need 18+
```

---

## 🎯 **COMMON TASKS**

### Add new endpoint:
1. Create route in `/routes/`
2. Add to `server.js`
3. Test it!

### Add new model:
1. Create in `/models/`
2. Import in routes
3. Use in controllers

### Deploy:
1. Set env vars
2. Push to platform
3. Verify health check

---

## 📞 **HELP**

- Check documentation
- Review server logs
- Test with Postman
- Verify .env values

---

**Version:** 4.0.0  
**Folder:** `/bloomify-backend/`  
**Status:** ✅ Ready
