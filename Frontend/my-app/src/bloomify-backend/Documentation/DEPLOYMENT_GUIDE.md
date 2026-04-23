# 🌐 BLOOMIFY BACKEND - DEPLOYMENT GUIDE

## 📋 **DEPLOYMENT OPTIONS**

This guide covers deploying to popular platforms:

1. [Heroku](#heroku) - Easiest
2. [Railway](#railway) - Modern & Free
3. [Render](#render) - Free tier available
4. [DigitalOcean](#digitalocean) - VPS
5. [AWS EC2](#aws-ec2) - Enterprise

---

## ☁️ **HEROKU**

### **Prerequisites:**
- Heroku account
- Heroku CLI installed

### **Step 1: Prepare App**

Create `Procfile` in root:
```
web: node server.js
```

### **Step 2: Create Heroku App**
```bash
heroku login
heroku create bloomify-api
```

### **Step 3: Add MongoDB**
```bash
# Option 1: MongoDB Atlas (recommended)
# Add connection string to Heroku config vars

# Option 2: Heroku MongoDB addon
heroku addons:create mongolab:sandbox
```

### **Step 4: Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret
heroku config:set CLIENT_URL=https://your-frontend.com
```

### **Step 5: Deploy**
```bash
git push heroku main
```

### **Step 6: Verify**
```bash
heroku logs --tail
heroku open
```

**Your API:** `https://bloomify-api.herokuapp.com`

---

## 🚂 **RAILWAY**

### **Prerequisites:**
- Railway account
- GitHub repository

### **Step 1: Connect Repository**
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### **Step 2: Add MongoDB**
1. Click "New"
2. Select "Database" → "MongoDB"
3. Copy connection string

### **Step 3: Configure Environment**
1. Click on your service
2. Go to "Variables"
3. Add all environment variables:
```
NODE_ENV=production
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=https://your-app.com
```

### **Step 4: Deploy**
Railway auto-deploys on git push!

**Your API:** `https://your-app.railway.app`

---

## 🎨 **RENDER**

### **Prerequisites:**
- Render account
- GitHub repository

### **Step 1: Create Web Service**
1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository

### **Step 2: Configure Build**
```yaml
Build Command: npm install
Start Command: node server.js
```

### **Step 3: Add MongoDB**
**Option 1: MongoDB Atlas**
- Use external MongoDB Atlas
- Add connection string to env vars

**Option 2: Render MongoDB**
1. Create new "Database"
2. Select "MongoDB"
3. Copy connection string

### **Step 4: Environment Variables**
Add in Render dashboard:
```
NODE_ENV=production
JWT_SECRET=...
MONGODB_URI=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=...
```

### **Step 5: Deploy**
Click "Create Web Service"

**Your API:** `https://bloomify-api.onrender.com`

---

## 💧 **DIGITALOCEAN**

### **Prerequisites:**
- DigitalOcean account
- SSH key setup

### **Step 1: Create Droplet**
1. Select Ubuntu 22.04 LTS
2. Choose plan (Basic $4/month)
3. Add SSH key
4. Create droplet

### **Step 2: Connect via SSH**
```bash
ssh root@your_droplet_ip
```

### **Step 3: Setup Server**
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install PM2
npm install -g pm2
```

### **Step 4: Deploy Application**
```bash
# Clone repository
cd /var/www
git clone https://github.com/your-username/bloomify-backend.git
cd bloomify-backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add all environment variables

# Start with PM2
pm2 start server.js --name bloomify-api
pm2 startup
pm2 save
```

### **Step 5: Setup Nginx**
```bash
# Install Nginx
apt install -y nginx

# Create configuration
nano /etc/nginx/sites-available/bloomify
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/bloomify /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### **Step 6: Setup SSL (Optional)**
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificate
certbot --nginx -d your_domain.com
```

**Your API:** `https://your_domain.com`

---

## ☁️ **AWS EC2**

### **Step 1: Launch EC2 Instance**
1. Go to AWS Console
2. Launch EC2 instance (Ubuntu 22.04)
3. Choose t2.micro (free tier)
4. Configure security group (ports 22, 80, 443, 5000)
5. Download key pair

### **Step 2: Connect**
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-ip
```

### **Step 3: Setup (Similar to DigitalOcean)**
Follow DigitalOcean steps 3-6

### **Step 4: Setup MongoDB**
**Option 1: Local MongoDB** (follow DigitalOcean steps)

**Option 2: MongoDB Atlas** (recommended)
- Use managed MongoDB service
- Better for production

---

## 🔐 **PRODUCTION CHECKLIST**

### **Security:**
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables (never commit .env)
- [ ] Enable rate limiting
- [ ] Set up firewall

### **Database:**
- [ ] Use MongoDB Atlas or managed service
- [ ] Enable backups
- [ ] Set up indexes
- [ ] Configure replica set (for high availability)

### **Monitoring:**
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure uptime monitoring (UptimeRobot)
- [ ] Set up performance monitoring (New Relic)
- [ ] Configure alerts

### **Performance:**
- [ ] Enable compression
- [ ] Configure caching (Redis)
- [ ] Optimize database queries
- [ ] Use CDN for static assets

### **Backup:**
- [ ] Automate database backups
- [ ] Store backups securely
- [ ] Test restore procedure
- [ ] Document recovery process

---

## 📊 **ENVIRONMENT VARIABLES FOR PRODUCTION**

```env
# REQUIRED FOR PRODUCTION
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=super_secret_at_least_32_chars
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# CORS
CLIENT_URL=https://your-frontend.com
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# Optional but recommended
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Payment (if using)
STRIPE_SECRET_KEY=sk_live_...
# or
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...

# Weather API
WEATHER_API_KEY=...

# AI Services
OPENAI_API_KEY=sk-...
```

---

## 🧪 **POST-DEPLOYMENT TESTING**

### **1. Health Check**
```bash
curl https://your-api.com/health
```

### **2. API Endpoints**
```bash
# Test authentication
curl -X POST https://your-api.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### **3. WebSocket**
Test Socket.IO connection from frontend

### **4. Database**
Verify MongoDB connection and data persistence

### **5. Load Testing**
```bash
# Install Apache Bench
apt install apache2-utils

# Test 1000 requests
ab -n 1000 -c 10 https://your-api.com/health
```

---

## 🔄 **CONTINUOUS DEPLOYMENT**

### **GitHub Actions Example:**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "bloomify-api"
          heroku_email: "your-email@example.com"
```

---

## 📈 **SCALING**

### **Horizontal Scaling:**
1. Load balancer (Nginx, AWS ELB)
2. Multiple server instances
3. Session management (Redis)

### **Vertical Scaling:**
1. Upgrade server resources
2. Optimize code
3. Database indexing

### **Database Scaling:**
1. MongoDB replica set
2. Sharding for large datasets
3. Read replicas

---

## 🆘 **TROUBLESHOOTING DEPLOYMENT**

### **Problem: Build Fails**
- Check Node.js version
- Verify package.json
- Review build logs

### **Problem: MongoDB Connection**
- Verify connection string
- Check IP whitelist (MongoDB Atlas)
- Test connection locally

### **Problem: Environment Variables**
- Ensure all required vars are set
- Check for typos
- Verify values in platform dashboard

### **Problem: Port Issues**
- Use PORT from environment (process.env.PORT)
- Don't hardcode port 5000

---

## ✅ **DEPLOYMENT COMPLETE!**

Your Bloomify API is now live and ready to serve your mobile app!

**Remember:**
- Monitor logs regularly
- Set up alerts
- Keep dependencies updated
- Back up your database
- Test before deploying

**Need Help?** Check platform-specific documentation or server logs.
