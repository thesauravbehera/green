# 🌿 BLOOMIFY API DOCUMENTATION

## 🚀 Complete Backend System

**Version:** 4.0.0  
**Base URL:** `http://localhost:5000/api/v1`  
**Environment:** Development/Production

---

## 📋 **TABLE OF CONTENTS**

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Routes](#api-routes)
4. [Models](#models)
5. [Services](#services)
6. [Setup Instructions](#setup)
7. [Environment Variables](#environment-variables)

---

## 🎯 **OVERVIEW**

Complete RESTful API for Bloomify mobile app with:
- ✅ JWT Authentication
- ✅ Real-time Socket.IO
- ✅ MongoDB Database
- ✅ Cloudinary Integration
- ✅ Cron Jobs
- ✅ Admin Dashboard
- ✅ AI Integration Ready

---

## 🔐 **AUTHENTICATION**

### **Register User**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### **Login**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### **Get Current User**
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

---

## 📡 **API ROUTES**

### **1. TASKS** (`/api/v1/tasks`)

#### Get All Tasks
```http
GET /api/v1/tasks?status=pending&startDate=2024-01-01
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: pending | completed | overdue
- `startDate`: ISO date string
- `endDate`: ISO date string
- `plant`: Plant ID
- `priority`: low | medium | high | urgent

#### Create Task
```http
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Water Basil",
  "type": "water",
  "priority": "high",
  "dueDate": "2024-04-02T10:00:00Z",
  "dueTime": "10:00",
  "plant": "plant_id_here",
  "recurring": {
    "enabled": true,
    "frequency": "daily"
  },
  "reminder": {
    "enabled": true,
    "time": 30
  }
}
```

#### Complete Task
```http
PUT /api/v1/tasks/:id/complete
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /api/v1/tasks/stats/overview
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "completed": 30,
    "pending": 10,
    "overdue": 5,
    "dueToday": 3,
    "dueThisWeek": 8,
    "completionRate": "66.7"
  }
}
```

---

### **2. COMMUNITY** (`/api/v1/community`)

#### Get All Posts
```http
GET /api/v1/community?category=tips&sort=popular&page=1&limit=10
```

**Query Parameters:**
- `category`: general | tips | showcase | question | problem
- `tag`: String
- `author`: User ID
- `sort`: recent | popular | trending | commented
- `page`: Page number
- `limit`: Items per page

#### Create Post
```http
POST /api/v1/community
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Basil Growing Tips",
  "content": "Here are some tips...",
  "category": "tips",
  "tags": ["basil", "herbs", "tips"],
  "images": [
    {
      "url": "https://...",
      "publicId": "cloudinary_id",
      "caption": "My basil plant"
    }
  ],
  "plant": "plant_id_here"
}
```

#### Like/Unlike Post
```http
PUT /api/v1/community/:id/like
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/v1/community/:id/comment
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great tips! Thanks for sharing."
}
```

#### Upload Image
```http
POST /api/v1/community/upload
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "bloomify/community/xyz123",
    "width": 1200,
    "height": 800
  }
}
```

---

### **3. MARKETPLACE** (`/api/v1/marketplace`)

#### Get All Products
```http
GET /api/v1/marketplace?category=plants&minPrice=50&maxPrice=500&sort=popular
```

**Query Parameters:**
- `category`: plants | seeds | pots | tools | fertilizers | soil
- `search`: Search term
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `sort`: recent | price_low | price_high | popular | rating
- `featured`: true | false
- `page`: Page number
- `limit`: Items per page

#### Get Single Product
```http
GET /api/v1/marketplace/:id
```

#### Add Product Review
```http
POST /api/v1/marketplace/:id/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great product!",
  "images": ["https://..."]
}
```

#### Create Order
```http
POST /api/v1/marketplace/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+91 98765 43210",
    "addressLine1": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "postalCode": "560001",
    "country": "India"
  },
  "paymentMethod": "upi"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderNumber": "BLM240401234",
    "items": [...],
    "pricing": {
      "subtotal": 500,
      "shipping": 0,
      "tax": 90,
      "total": 590
    },
    "status": "pending"
  }
}
```

#### Get My Orders
```http
GET /api/v1/marketplace/orders/my-orders?status=pending
Authorization: Bearer <token>
```

#### Cancel Order
```http
PUT /api/v1/marketplace/orders/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Changed my mind"
}
```

---

### **4. AI ASSISTANT** (`/api/v1/ai`)

#### Chat with AI
```http
POST /api/v1/ai/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "Why are my basil leaves turning yellow?",
  "context": {
    "plantId": "...",
    "previousMessages": [...]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "I can help you diagnose...",
    "type": "diagnosis",
    "data": {
      "disease": "Leaf Yellowing",
      "confidence": 85,
      "causes": [
        {
          "name": "Overwatering",
          "probability": 70
        }
      ],
      "recommendations": [
        "Check soil moisture...",
        "Ensure proper drainage..."
      ]
    }
  }
}
```

#### Diagnose Plant Problem
```http
POST /api/v1/ai/diagnose
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,...",
  "plantId": "...",
  "symptoms": ["yellow leaves", "wilting"]
}
```

#### Identify Plant
```http
POST /api/v1/ai/identify
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "plant": {
      "name": "Basil",
      "scientificName": "Ocimum basilicum",
      "confidence": 92
    },
    "alternatives": [...],
    "careInfo": {
      "difficulty": "Easy",
      "sunlight": "Full sun",
      "water": "Regular"
    }
  }
}
```

#### Get Recommendations
```http
GET /api/v1/ai/recommendations?climate=tropical&space=balcony&experience=beginner
Authorization: Bearer <token>
```

#### Generate Smart Schedule
```http
POST /api/v1/ai/schedule
Authorization: Bearer <token>
Content-Type: application/json

{
  "plantId": "...",
  "location": "bangalore",
  "season": "summer"
}
```

#### Get Daily Tip
```http
GET /api/v1/ai/tips/daily
Authorization: Bearer <token>
```

---

### **5. WEATHER** (`/api/v1/weather`)

#### Get Current Weather
```http
GET /api/v1/weather/current?city=bangalore
```

**Or with coordinates:**
```http
GET /api/v1/weather/current?lat=12.9716&lon=77.5946
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "city": "Bangalore",
      "country": "India"
    },
    "current": {
      "temperature": 28,
      "humidity": 65,
      "windSpeed": 12,
      "uv": 7,
      "description": "Partly cloudy"
    },
    "gardening": {
      "wateringRecommendation": "Good day for watering",
      "plantingConditions": "Favorable",
      "tips": [...]
    },
    "alerts": [...]
  }
}
```

#### Get Weather Forecast
```http
GET /api/v1/weather/forecast?city=bangalore&days=7
```

#### Get Gardening Conditions
```http
GET /api/v1/weather/gardening-conditions?lat=12.9716&lon=77.5946
```

---

### **6. ADMIN** (`/api/v1/admin`)

**Note:** All admin routes require admin role.

#### Get Dashboard Statistics
```http
GET /api/v1/admin/dashboard
Authorization: Bearer <admin_token>
```

#### Get All Users
```http
GET /api/v1/admin/users?search=john&role=user&page=1
Authorization: Bearer <admin_token>
```

#### Update User
```http
PUT /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "premium",
  "isPremium": true
}
```

#### Get All Orders
```http
GET /api/v1/admin/orders?status=pending
Authorization: Bearer <admin_token>
```

#### Update Order Status
```http
PUT /api/v1/admin/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingInfo": {
    "courier": "BlueDart",
    "trackingNumber": "BD123456789"
  }
}
```

#### Get Reported Posts
```http
GET /api/v1/admin/community/reported
Authorization: Bearer <admin_token>
```

#### Moderate Post
```http
PUT /api/v1/admin/community/:id/moderate
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "action": "approve"
}
```
**Actions:** approve | hide | delete

#### Manage Products
```http
GET /api/v1/admin/products?category=plants
POST /api/v1/admin/products
PUT /api/v1/admin/products/:id
DELETE /api/v1/admin/products/:id
Authorization: Bearer <admin_token>
```

#### Get Analytics
```http
GET /api/v1/admin/analytics?startDate=2024-01-01&endDate=2024-04-01
Authorization: Bearer <admin_token>
```

---

## 📊 **DATABASE MODELS**

### **1. User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'premium' | 'admin',
  avatar: String,
  phone: String,
  preferences: {
    experience: String,
    interests: [String],
    spaceType: String,
    goals: [String]
  },
  gamification: {
    level: Number,
    xp: Number,
    badges: [String],
    streak: Number
  },
  isPremium: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **2. Task Model**
```javascript
{
  user: ObjectId (ref: User),
  plant: ObjectId (ref: Plant),
  title: String,
  description: String,
  type: 'water' | 'fertilize' | 'prune' | 'repot',
  priority: 'low' | 'medium' | 'high' | 'urgent',
  status: 'pending' | 'completed' | 'overdue',
  dueDate: Date,
  dueTime: String,
  recurring: {
    enabled: Boolean,
    frequency: String
  },
  reminder: {
    enabled: Boolean,
    time: Number,
    sent: Boolean
  },
  completedAt: Date,
  createdAt: Date
}
```

### **3. CommunityPost Model**
```javascript
{
  author: ObjectId (ref: User),
  title: String,
  content: String,
  category: String,
  tags: [String],
  images: [{
    url: String,
    publicId: String,
    caption: String
  }],
  plant: ObjectId (ref: Plant),
  likes: [{
    user: ObjectId,
    createdAt: Date
  }],
  comments: [{
    author: ObjectId,
    content: String,
    createdAt: Date
  }],
  views: Number,
  status: 'active' | 'hidden' | 'reported',
  createdAt: Date
}
```

### **4. MarketplaceProduct Model**
```javascript
{
  name: String,
  description: String,
  category: String,
  price: {
    amount: Number,
    currency: String,
    discountPercentage: Number
  },
  images: [{
    url: String,
    publicId: String
  }],
  inventory: {
    stock: Number,
    sku: String
  },
  ratings: {
    average: Number,
    count: Number
  },
  reviews: [Review],
  isFeatured: Boolean,
  isActive: Boolean,
  shipping: {
    isFree: Boolean,
    cost: Number
  },
  createdAt: Date
}
```

### **5. Order Model**
```javascript
{
  user: ObjectId (ref: User),
  orderNumber: String (unique),
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  pricing: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },
  shippingAddress: Object,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered',
  payment: {
    method: String,
    status: String,
    transactionId: String
  },
  tracking: {
    courier: String,
    trackingNumber: String,
    updates: [TrackingUpdate]
  },
  createdAt: Date
}
```

### **6. Notification Model**
```javascript
{
  user: ObjectId (ref: User),
  type: String,
  title: String,
  message: String,
  icon: String,
  priority: 'low' | 'medium' | 'high' | 'urgent',
  relatedModel: String,
  relatedId: ObjectId,
  isRead: Boolean,
  readAt: Date,
  actionUrl: String,
  createdAt: Date
}
```

---

## ⚙️ **SERVICES**

### **1. Socket Service**
Real-time communication using Socket.IO:
- User connections
- Notifications
- Task reminders
- Community events
- Typing indicators

### **2. Cron Service**
Scheduled background tasks:
- Daily tasks (midnight)
- Plant growth updates (every 6 hours)
- Overdue task checks (hourly)
- Task reminders
- Notification cleanup

### **3. Garden Service**
Plant and garden management:
- Plant growth tracking
- Health monitoring
- Watering schedules
- Task generation

---

## 🛠️ **SETUP INSTRUCTIONS**

### **1. Install Dependencies**
```bash
cd server
npm install
```

### **2. Environment Variables**
Create `.env` file in `/server/`:
```env
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/bloomify
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloomify

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client URL
CLIENT_URL=http://localhost:5173

# Firebase (Optional)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Payment (Optional - Stripe/Razorpay)
STRIPE_SECRET_KEY=your_stripe_secret
# or
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Weather API (Optional)
WEATHER_API_KEY=your_openweather_api_key

# AI API (Optional)
OPENAI_API_KEY=your_openai_key
```

### **3. Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### **4. Run Server**
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

---

## 🧪 **TESTING**

### **Health Check**
```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "success",
  "message": "Bloomify API is running",
  "timestamp": "2024-04-01T12:00:00.000Z",
  "environment": "development"
}
```

---

## 📝 **RESPONSE FORMATS**

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "page": 1,
  "pages": 5
}
```

### **Error Response**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev only)"
}
```

---

## 🔒 **SECURITY FEATURES**

- ✅ Helmet.js (HTTP headers)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Mongo sanitization
- ✅ XSS protection
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation

---

## 📚 **API FEATURES**

- ✅ RESTful architecture
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Real-time Socket.IO
- ✅ File uploads (Cloudinary)
- ✅ Pagination
- ✅ Filtering & sorting
- ✅ Search functionality
- ✅ Error handling
- ✅ Request logging
- ✅ Cron jobs
- ✅ Email notifications (ready)
- ✅ Push notifications (ready)
- ✅ Payment integration (ready)

---

## 🚀 **DEPLOYMENT**

### **Recommended Platforms:**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**
- **Railway**
- **Render**

### **Environment Setup:**
1. Set all environment variables
2. Use production MongoDB
3. Set NODE_ENV=production
4. Enable HTTPS
5. Configure domain
6. Set up monitoring

---

## 📦 **DEPENDENCIES**

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "socket.io": "^4.6.0",
  "cloudinary": "^1.41.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "node-cron": "^3.0.3",
  "axios": "^1.6.2",
  "helmet": "^7.1.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## ✨ **FEATURES COMPLETE**

✅ User Authentication  
✅ Task Management  
✅ Community Posts  
✅ Marketplace & Orders  
✅ AI Assistant  
✅ Weather Integration  
✅ Admin Dashboard  
✅ Real-time Notifications  
✅ Cron Jobs  
✅ Cloudinary Integration  
✅ Socket.IO  
✅ Email Ready  
✅ Payment Ready  

---

## 📞 **SUPPORT**

For questions or issues:
- Check this documentation
- Review error messages
- Check server logs
- Test with Postman/Insomnia

---

**Last Updated:** April 1, 2026  
**API Version:** 4.0.0  
**Status:** ✅ Production Ready
