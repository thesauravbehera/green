# 🚀 BLOOMIFY BACKEND - SETUP GUIDE

## 📋 **TABLE OF CONTENTS**

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Server](#running-the-server)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## ✅ **PREREQUISITES**

Before you begin, ensure you have:

### **Required:**
- ✅ **Node.js** v18.0.0 or higher
- ✅ **npm** v9.0.0 or higher
- ✅ **MongoDB** v6.0 or higher

### **Optional:**
- Firebase account (for Firebase auth)
- Cloudinary account (for image uploads)
- OpenWeatherMap API key (for weather)
- OpenAI API key (for AI features)

---

## 📦 **INSTALLATION**

### **Step 1: Extract Files**
```bash
unzip bloomify-backend.zip
cd bloomify-backend
```

### **Step 2: Install Dependencies**
```bash
npm install
```

This will install all required packages:
```
express, mongoose, socket.io, cloudinary,
jsonwebtoken, bcryptjs, node-cron, axios,
helmet, cors, dotenv, and more...
```

### **Step 3: Verify Installation**
```bash
npm list --depth=0
```

---

## 🔐 **CONFIGURATION**

### **Step 1: Create Environment File**
```bash
cp .env.example .env
```

### **Step 2: Edit `.env` File**

Open `.env` in your text editor and configure:

#### **Required Settings:**
```env
# General
NODE_ENV=development
PORT=5000

# Database (Choose one)
MONGODB_URI=mongodb://localhost:27017/bloomify
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomify

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Client URL
CLIENT_URL=http://localhost:5173
```

#### **Optional Settings:**

**Firebase (for Firebase Authentication):**
```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@project.iam.gserviceaccount.com
```

**Email Service (Nodemailer):**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Payment Gateway:**
```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_key
# OR Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret
```

**Weather API:**
```env
WEATHER_API_KEY=your_openweathermap_key
```

**AI Services:**
```env
OPENAI_API_KEY=sk-your_openai_key
```

---

## 🗄️ **DATABASE SETUP**

### **Option 1: Local MongoDB**

#### **Install MongoDB:**
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org

# Windows
# Download installer from mongodb.com
```

#### **Start MongoDB:**
```bash
# macOS/Linux
mongod

# Windows
net start MongoDB
```

#### **Verify Connection:**
```bash
mongo
> show dbs
> exit
```

### **Option 2: MongoDB Atlas (Cloud)**

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Access:**
   - **Database Access:** Create user with password
   - **Network Access:** Add IP (0.0.0.0/0 for development)

4. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

5. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomify?retryWrites=true&w=majority
   ```

---

## 🚀 **RUNNING THE SERVER**

### **Development Mode (with auto-restart):**
```bash
npm run dev
```

Output:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🌿 BLOOMIFY API SERVER v4.0.0                 ║
║                                                       ║
║        Environment: DEVELOPMENT                      ║
║        Port: 5000                                    ║
║        URL: http://localhost:5000                    ║
║                                                       ║
║        Status: ✅ ONLINE                             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

✅ MongoDB Connected Successfully
```

### **Production Mode:**
```bash
npm start
```

### **Access Server:**
```
http://localhost:5000
```

---

## 🧪 **TESTING**

### **Test 1: Health Check**
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Bloomify API is running",
  "timestamp": "2024-04-01T12:00:00.000Z",
  "environment": "development"
}
```

### **Test 2: API Endpoints**

**Using cURL:**
```bash
# Test login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Using Postman:**
1. Import collection (if provided)
2. Set base URL: `http://localhost:5000/api/v1`
3. Test endpoints

**Using Thunder Client (VS Code):**
1. Install Thunder Client extension
2. Create new request
3. Test endpoints

---

## 🔍 **TROUBLESHOOTING**

### **Problem: MongoDB Connection Failed**

**Error:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   ps aux | grep mongod
   ```
2. Start MongoDB:
   ```bash
   mongod
   ```
3. Verify connection string in `.env`

---

### **Problem: Port Already in Use**

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
1. Change port in `.env`:
   ```env
   PORT=5001
   ```
2. Or kill process using port:
   ```bash
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

---

### **Problem: Missing Environment Variables**

**Error:**
```
Error: JWT_SECRET is required
```

**Solution:**
1. Ensure `.env` file exists
2. Check all required variables are set
3. Restart server after changes

---

### **Problem: Firebase Authentication Error**

**Error:**
```
❌ Auth Error: Firebase app not initialized
```

**Solutions:**
1. Check Firebase credentials in `.env`
2. Ensure private key has proper line breaks
3. Use demo tokens for testing:
   ```
   DEMO_ADMIN_TOKEN
   DEMO_GUEST_TOKEN
   ```

---

### **Problem: Cloudinary Upload Error**

**Error:**
```
Cloudinary error: Invalid API key
```

**Solutions:**
1. Verify Cloudinary credentials in `.env`
2. Check dashboard: https://cloudinary.com/console
3. Ensure all three values are set:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET

---

### **Problem: npm Install Errors**

**Error:**
```
npm ERR! code ERESOLVE
```

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
2. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. Use legacy peer deps:
   ```bash
   npm install --legacy-peer-deps
   ```

---

## 📊 **VERIFY SETUP**

Run this checklist:

```bash
# 1. Dependencies installed?
npm list --depth=0

# 2. MongoDB running?
mongosh --eval "db.version()"

# 3. Environment configured?
cat .env | grep -v "^#" | grep -v "^$"

# 4. Server starts?
npm run dev

# 5. Health check passes?
curl http://localhost:5000/health
```

---

## 🎯 **NEXT STEPS**

After successful setup:

1. ✅ Read `API_DOCUMENTATION.md` for all endpoints
2. ✅ Test endpoints with Postman/Insomnia
3. ✅ Connect mobile app to backend
4. ✅ Configure optional integrations (Firebase, Cloudinary)
5. ✅ Review `DEPLOYMENT_GUIDE.md` for production

---

## 📞 **NEED HELP?**

### **Check Documentation:**
- `README.md` - Overview
- `API_DOCUMENTATION.md` - API reference
- `DEPLOYMENT_GUIDE.md` - Production setup

### **Common Issues:**
- MongoDB not running → Start MongoDB
- Port in use → Change PORT in .env
- Missing .env → Copy from .env.example
- Auth errors → Use demo tokens

### **Logs:**
Check server console output for detailed error messages.

---

## ✅ **SETUP COMPLETE!**

If you see the Bloomify ASCII logo and "✅ MongoDB Connected Successfully", you're all set!

**Next:** Start testing the API endpoints! 🚀
