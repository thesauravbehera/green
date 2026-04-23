# 🌿 BLOOMIFY - COMPLETE ARCHITECTURE IMPLEMENTATION PLAN
## Strict UI Preservation + Backend Enhancement Strategy

> **Status:** Implementation Roadmap  
> **Approach:** Keep ALL existing UI intact, enhance with backend infrastructure  
> **Timeline:** 15 Full-Stack Tasks  
> **Date:** March 29, 2026

---

## 🎯 IMPLEMENTATION PHILOSOPHY

### ✅ WHAT WE KEEP (UNTOUCHED)
- **ALL UI Components** - Every screen, modal, card, button
- **ALL Styling** - Premium Deep Botanical aesthetic preserved
- **ALL Animations** - Framer Motion effects stay exactly as is
- **ALL Design System** - Colors, typography, glassmorphism
- **ALL User Experience** - Navigation flow unchanged

### ✨ WHAT WE ADD (ENHANCEMENT)
- **Backend Infrastructure** - Node.js/Express server
- **Database Layer** - MongoDB schemas for all entities
- **Real-time Features** - Socket.io WebSocket integration
- **API Services** - RESTful endpoints + GraphQL
- **Security Layer** - Authentication, encryption, validation
- **Third-party Integrations** - Stripe, Cloudinary, Weather API
- **AI/ML Services** - Gemini API, OpenCV, computer vision
- **Notification System** - Push notifications, email, in-app
- **Performance Optimization** - Caching, lazy loading, CDN

---

## 📋 TASK BREAKDOWN - 15 COMPREHENSIVE TASKS

---

## **MILESTONE A: FOUNDATION & INFRASTRUCTURE** (Tasks 1-3)

### **TASK 1: Backend Server Setup & Database Modeling** ⚙️

**Duration:** 3-4 days  
**Priority:** CRITICAL  
**Stack:** Node.js, Express, MongoDB Atlas

#### What We Build:
```
/server
├── server.js                  # Express app initialization
├── config/
│   ├── db.js                 # MongoDB connection
│   ├── firebase.js           # Firebase Admin SDK
│   └── env.js                # Environment variables
├── models/
│   ├── User.js               # User schema
│   ├── Plant.js              # Plant catalog schema
│   ├── Garden.js             # User's personal garden
│   ├── EnvironmentProfile.js # 9-parameter matrix
│   ├── Task.js               # Daily care tasks
│   ├── Post.js               # Community posts
│   ├── Comment.js            # Post comments
│   ├── Product.js            # Marketplace products
│   ├── Order.js              # E-commerce orders
│   └── Notification.js       # User notifications
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── users.js              # User management
│   ├── plants.js             # Plant catalog
│   ├── garden.js             # Personal garden CRUD
│   ├── community.js          # Social features
│   ├── marketplace.js        # E-commerce
│   └── ai.js                 # AI/ML endpoints
└── middleware/
    ├── auth.js               # Firebase token verification
    ├── errorHandler.js       # Global error handling
    └── rateLimiter.js        # API rate limiting
```

#### MongoDB Schemas:

**User Schema:**
```javascript
{
  uid: String (Firebase UID),
  email: String,
  displayName: String,
  photoURL: String,
  level: Number (1-99),
  xp: Number,
  streak: Number,
  role: String (user/admin),
  subscription: {
    plan: String (free/premium),
    expiresAt: Date,
    trialEndsAt: Date
  },
  settings: {
    language: String,
    currency: String,
    notifications: Boolean,
    theme: String
  },
  stats: {
    plantsOwned: Number,
    tasksCompleted: Number,
    communityPosts: Number,
    achievements: [String]
  },
  createdAt: Date,
  lastLoginAt: Date
}
```

**Plant Schema (Catalog):**
```javascript
{
  name: String,
  scientificName: String,
  category: String,
  difficulty: String (beginner/intermediate/expert),
  description: String,
  careInstructions: {
    watering: String,
    sunlight: String,
    temperature: String,
    humidity: String,
    soil: String
  },
  environmentRequirements: {
    minTemp: Number,
    maxTemp: Number,
    minHumidity: Number,
    maxHumidity: Number,
    sunlightHours: Number,
    spaceRequired: Number
  },
  images: [String],
  lifespan: Number (days),
  tags: [String],
  isIndianPlant: Boolean,
  isMonsoonReady: Boolean
}
```

**Garden Schema (User's Plants):**
```javascript
{
  userId: ObjectId (ref: User),
  plantId: ObjectId (ref: Plant),
  nickname: String,
  plantedDate: Date,
  location: {
    balconyDirection: String,
    floorLevel: Number,
    dimensions: Object
  },
  health: Number (0-100),
  growth: Number (0-100),
  hydration: Number (0-100),
  happiness: Number (0-100),
  lastWatered: Date,
  lastFertilized: Date,
  notes: String,
  images: [String],
  isActive: Boolean
}
```

**EnvironmentProfile Schema:**
```javascript
{
  userId: ObjectId (ref: User),
  geolocation: {
    city: String,
    state: String,
    country: String,
    lat: Number,
    lng: Number
  },
  balconyDetails: {
    direction: String (N/S/E/W),
    floorLevel: Number,
    dimensions: {
      length: Number,
      width: Number,
      area: Number
    },
    type: String (open/covered),
    sunlightQuality: String (direct/indirect/shaded)
  },
  climate: {
    averageTemp: Number,
    humidity: Number,
    rainfall: Number,
    season: String
  },
  userSkill: String (beginner/intermediate),
  lifestyle: {
    timeAvailable: String,
    goals: [String]
  }
}
```

**Task Schema:**
```javascript
{
  userId: ObjectId (ref: User),
  gardenItemId: ObjectId (ref: Garden),
  type: String (water/fertilize/prune/check),
  title: String,
  description: String,
  xpReward: Number,
  dueDate: Date,
  completed: Boolean,
  completedAt: Date,
  priority: String (low/medium/high/urgent),
  recurring: Boolean,
  frequency: String (daily/weekly/monthly)
}
```

**Post Schema (Community):**
```javascript
{
  userId: ObjectId (ref: User),
  content: String,
  media: [{
    url: String,
    type: String (image/video),
    cloudinaryId: String
  }],
  location: String,
  tags: [String],
  likes: [ObjectId (ref: User)],
  commentsCount: Number,
  sharesCount: Number,
  visibility: String (public/followers/private),
  createdAt: Date
}
```

**Product Schema (Marketplace):**
```javascript
{
  name: String,
  description: String,
  category: String (plant/seed/tool/fertilizer),
  price: Number,
  originalPrice: Number,
  discount: Number,
  currency: String,
  images: [String],
  stock: Number,
  vendor: String,
  rating: Number,
  reviews: Number,
  tags: [String],
  specifications: Object,
  isActive: Boolean
}
```

#### API Endpoints Structure:
```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   └── GET /verify
├── users/
│   ├── GET /:id
│   ├── PUT /:id
│   ├── GET /:id/stats
│   └── GET /:id/achievements
├── plants/
│   ├── GET /catalog
│   ├── GET /:id
│   └── GET /search
├── garden/
│   ├── GET /
│   ├── POST /add
│   ├── PUT /:id
│   ├── DELETE /:id
│   └── POST /:id/water
├── tasks/
│   ├── GET /today
│   ├── GET /upcoming
│   ├── POST /:id/complete
│   └── GET /history
├── community/
│   ├── GET /feed
│   ├── POST /post
│   ├── POST /:id/like
│   ├── POST /:id/comment
│   └── DELETE /:id
└── marketplace/
    ├── GET /products
    ├── GET /products/:id
    ├── POST /cart
    └── POST /checkout
```

#### Implementation Steps:
1. **Set up Node.js/Express server**
2. **Connect to MongoDB Atlas (Free tier)**
3. **Create all model schemas with Mongoose**
4. **Set up route structure**
5. **Implement middleware (auth, CORS, error handling)**
6. **Test database connections**
7. **Deploy to Render/Railway**

#### Environment Variables (.env):
```env
# Server
NODE_ENV=production
PORT=5000
API_URL=https://your-backend.onrender.com

# Database
MONGODB_URI=mongodb+srv://...

# Firebase
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

# JWT
JWT_SECRET=...

# APIs (Added in later tasks)
OPENWEATHER_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
STRIPE_SECRET_KEY=...
GEMINI_API_KEY=...
```

#### Testing Checklist:
- [ ] Server starts successfully
- [ ] MongoDB connection established
- [ ] All routes return 200/404 appropriately
- [ ] CORS configured for frontend
- [ ] Error handling works globally
- [ ] Firebase token verification working

---

### **TASK 2: Authentication Security & Session Management** 🔐

**Duration:** 2-3 days  
**Priority:** CRITICAL  
**Stack:** Firebase Admin SDK, JWT, bcrypt

#### What We Build:
```
/server/middleware/auth.js
/server/routes/auth.js
/server/services/authService.js
/server/utils/tokenManager.js
```

#### Features to Implement:

**1. Firebase Token Verification Middleware:**
```javascript
// server/middleware/auth.js
const admin = require('firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Check if demo account
    if (token === 'DEMO_ADMIN_TOKEN') {
      req.user = {
        uid: 'demo-admin-id',
        email: 'admin@bloomify.io',
        role: 'admin'
      };
      return next();
    }
    
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach user to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'user'
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

**2. Role-Based Access Control:**
```javascript
// Middleware for admin-only routes
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.email !== 'admin@bloomify.io') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Middleware for premium users
const requirePremium = async (req, res, next) => {
  const user = await User.findOne({ uid: req.user.uid });
  
  if (!user.subscription || user.subscription.plan === 'free') {
    return res.status(403).json({ error: 'Premium subscription required' });
  }
  
  next();
};
```

**3. Session Management:**
```javascript
// Track user sessions in MongoDB
const SessionSchema = new Schema({
  userId: { type: ObjectId, ref: 'User' },
  token: String,
  deviceInfo: {
    browser: String,
    os: String,
    ip: String
  },
  lastActivity: Date,
  expiresAt: Date
});
```

**4. Security Features:**
- ✅ **Input Sanitization** - Prevent XSS attacks
- ✅ **SQL Injection Prevention** - MongoDB parameterized queries
- ✅ **Rate Limiting** - 100 requests/15 minutes per IP
- ✅ **CSRF Protection** - Token-based validation
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **Secure Cookies** - HttpOnly, Secure, SameSite
- ✅ **HTTPS Enforcement** - Redirect HTTP to HTTPS

**5. Auth Routes:**
```javascript
// POST /api/v1/auth/register
// POST /api/v1/auth/login
// POST /api/v1/auth/logout
// POST /api/v1/auth/refresh-token
// POST /api/v1/auth/forgot-password
// POST /api/v1/auth/reset-password
// GET /api/v1/auth/verify
```

#### Frontend Integration:
**No UI changes needed** - just update API calls:

```javascript
// lib/api/auth.ts (NEW FILE)
import { auth } from '../firebase';

export async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) return null;
  
  return await user.getIdToken();
}

export async function makeAuthenticatedRequest(endpoint, options = {}) {
  const token = await getAuthToken();
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}
```

#### Testing Checklist:
- [ ] Firebase token verification works
- [ ] Admin bypass still functions
- [ ] Guest bypass still functions
- [ ] Role-based access control works
- [ ] Rate limiting prevents abuse
- [ ] Sessions expire correctly
- [ ] Refresh tokens work

---

### **TASK 3: User Profiles & Preferences Management** 👤

**Duration:** 2 days  
**Priority:** HIGH  
**Stack:** MongoDB, Multer, Cloudinary

#### What We Build:
```
/server/routes/users.js
/server/controllers/userController.js
/server/services/userService.js
```

#### Features to Implement:

**1. User Profile CRUD:**
```javascript
// GET /api/v1/users/:id - Get user profile
// PUT /api/v1/users/:id - Update profile
// DELETE /api/v1/users/:id - Delete account
// GET /api/v1/users/:id/stats - Get user statistics
// GET /api/v1/users/:id/achievements - Get achievements
```

**2. Profile Photo Upload:**
```javascript
// POST /api/v1/users/:id/photo
// Upload to Cloudinary
// Update user photoURL
// Delete old photo from Cloudinary
```

**3. XP & Leveling System:**
```javascript
// XP Calculation Logic
const XP_PER_LEVEL = 1000;

function calculateLevel(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function xpForNextLevel(currentXP) {
  const currentLevel = calculateLevel(currentXP);
  return (currentLevel * XP_PER_LEVEL) - currentXP;
}

// Award XP
async function awardXP(userId, amount, reason) {
  const user = await User.findOne({ uid: userId });
  
  const oldLevel = user.level;
  user.xp += amount;
  user.level = calculateLevel(user.xp);
  
  await user.save();
  
  // Level up notification
  if (user.level > oldLevel) {
    await Notification.create({
      userId: user._id,
      type: 'level_up',
      title: `Level ${user.level} Achieved!`,
      message: `You've reached level ${user.level}!`,
      xpAwarded: amount
    });
  }
  
  return user;
}
```

**4. Streak Tracking:**
```javascript
// Daily login streak logic
async function updateStreak(userId) {
  const user = await User.findOne({ uid: userId });
  const today = new Date().setHours(0, 0, 0, 0);
  const lastLogin = new Date(user.lastLoginAt).setHours(0, 0, 0, 0);
  const daysSinceLogin = (today - lastLogin) / (1000 * 60 * 60 * 24);
  
  if (daysSinceLogin === 1) {
    // Consecutive day
    user.streak += 1;
  } else if (daysSinceLogin > 1) {
    // Streak broken
    user.streak = 1;
  }
  // Same day login = no change
  
  user.lastLoginAt = new Date();
  await user.save();
  
  return user.streak;
}
```

**5. Settings Management:**
```javascript
// PUT /api/v1/users/:id/settings
{
  language: 'en' | 'hi' | 'kn' | 'ta',
  currency: 'INR',
  notifications: {
    email: boolean,
    push: boolean,
    sms: boolean,
    taskReminders: boolean,
    communityActivity: boolean,
    marketplaceDeals: boolean
  },
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private',
    showGarden: boolean,
    showAchievements: boolean
  }
}
```

#### Frontend Integration:
**Update existing components** (no UI changes):

```typescript
// Update ProfileScreen.tsx to fetch from backend
useEffect(() => {
  async function loadProfile() {
    const data = await makeAuthenticatedRequest(`/api/v1/users/${user.uid}`);
    setUserData(data);
  }
  loadProfile();
}, []);

// Update Settings.tsx to save to backend
async function handleSave(settings) {
  await makeAuthenticatedRequest(`/api/v1/users/${user.uid}/settings`, {
    method: 'PUT',
    body: JSON.stringify(settings)
  });
}
```

#### Testing Checklist:
- [ ] Profile fetching works
- [ ] Profile updates save correctly
- [ ] Photo upload to Cloudinary works
- [ ] XP system calculates correctly
- [ ] Level-up notifications trigger
- [ ] Streak tracking is accurate
- [ ] Settings persist across sessions

---

## **MILESTONE B: PLANT INTELLIGENCE & ENVIRONMENT** (Tasks 4-6)

### **TASK 4: Plant Catalog API & Third-Party Integration** 🌱

**Duration:** 3-4 days  
**Priority:** HIGH  
**Stack:** Perenual API / Trefle.io, OpenWeatherMap

#### What We Build:
```
/server/routes/plants.js
/server/services/plantService.js
/server/services/weatherService.js
/server/scripts/seedPlants.js
```

#### Features to Implement:

**1. Third-Party Plant API Integration:**

**Option A: Perenual API (Recommended)**
```javascript
// Free tier: 300 requests/day
const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_BASE_URL = 'https://perenual.com/api';

async function searchPlants(query, page = 1) {
  const response = await fetch(
    `${PERENUAL_BASE_URL}/species-list?key=${PERENUAL_API_KEY}&q=${query}&page=${page}`
  );
  return response.json();
}

async function getPlantDetails(id) {
  const response = await fetch(
    `${PERENUAL_BASE_URL}/species/details/${id}?key=${PERENUAL_API_KEY}`
  );
  return response.json();
}
```

**Option B: Trefle.io**
```javascript
// Free tier: 120 requests/day
const TREFLE_API_KEY = process.env.TREFLE_API_KEY;
const TREFLE_BASE_URL = 'https://trefle.io/api/v1';

async function searchPlants(query) {
  const response = await fetch(
    `${TREFLE_BASE_URL}/plants/search?token=${TREFLE_API_KEY}&q=${query}`
  );
  return response.json();
}
```

**2. Plant Database Seeding:**
```javascript
// Seed Indian plants specifically for balcony gardening
const INDIAN_PLANTS = [
  {
    name: 'Holy Basil (Tulsi)',
    scientificName: 'Ocimum sanctum',
    category: 'Herb',
    difficulty: 'beginner',
    careInstructions: {
      watering: 'Regular, keep soil moist',
      sunlight: 'Full sun (6-8 hours)',
      temperature: '20-35°C',
      humidity: '40-60%',
      soil: 'Well-draining, rich organic'
    },
    environmentRequirements: {
      minTemp: 20,
      maxTemp: 35,
      minHumidity: 40,
      maxHumidity: 60,
      sunlightHours: 6,
      spaceRequired: 1 // sq ft
    },
    isMonsoonReady: true,
    isIndianPlant: true,
    lifespan: 365
  },
  {
    name: 'Mogra (Jasmine)',
    scientificName: 'Jasminum sambac',
    category: 'Flowering',
    difficulty: 'intermediate',
    // ... similar structure
  },
  // Add 50+ Indian plants
];

// Script to seed database
async function seedDatabase() {
  for (const plant of INDIAN_PLANTS) {
    await Plant.create(plant);
  }
}
```

**3. Weather API Integration:**
```javascript
// OpenWeatherMap API (Free tier: 1000 calls/day)
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeatherByCity(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return response.json();
}

async function getForecast(lat, lng) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
  );
  return response.json();
}

// Climate-aware recommendations
function getClimateAlerts(weather) {
  const alerts = [];
  
  if (weather.main.temp > 35) {
    alerts.push({
      type: 'heat',
      severity: 'high',
      message: 'Extreme heat! Move sensitive plants to shade.',
      icon: '🔥'
    });
  }
  
  if (weather.main.humidity > 80) {
    alerts.push({
      type: 'humidity',
      severity: 'medium',
      message: 'High humidity. Watch for fungal growth.',
      icon: '💧'
    });
  }
  
  if (weather.weather[0].main === 'Rain' && weather.rain?.['1h'] > 10) {
    alerts.push({
      type: 'monsoon',
      severity: 'high',
      message: 'Heavy rainfall expected. Ensure proper drainage.',
      icon: '🌧️'
    });
  }
  
  return alerts;
}
```

**4. Plant Recommendation Algorithm:**
```javascript
// Smart plant matching based on user's environment
async function recommendPlants(environmentProfile) {
  const {
    geolocation,
    balconyDetails,
    climate,
    userSkill
  } = environmentProfile;
  
  // Get current weather
  const weather = await getWeatherByCity(geolocation.city);
  
  // Query plants that match criteria
  const plants = await Plant.find({
    difficulty: userSkill === 'beginner' ? 'beginner' : { $in: ['beginner', 'intermediate'] },
    'environmentRequirements.minTemp': { $lte: climate.averageTemp },
    'environmentRequirements.maxTemp': { $gte: climate.averageTemp },
    'environmentRequirements.spaceRequired': { $lte: balconyDetails.dimensions.area },
    // Monsoon-ready if high rainfall
    ...(climate.rainfall > 1000 ? { isMonsoonReady: true } : {})
  })
  .limit(10)
  .sort({ rating: -1 });
  
  return plants;
}
```

**5. Plant API Endpoints:**
```javascript
// GET /api/v1/plants/catalog?page=1&limit=20
// GET /api/v1/plants/:id
// GET /api/v1/plants/search?q=tulsi
// GET /api/v1/plants/recommend (based on environment profile)
// GET /api/v1/plants/featured (Indian staples)
// GET /api/v1/plants/category/:category
```

#### Frontend Integration:
**Update existing PlantDatabase.tsx** (no UI changes):

```typescript
// Replace static data with API calls
useEffect(() => {
  async function loadPlants() {
    const response = await fetch(`${API_URL}/api/v1/plants/catalog?page=${page}`);
    const data = await response.json();
    setPlants(data.plants);
  }
  loadPlants();
}, [page]);
```

**Update Dashboard.tsx** to show climate alerts:
```typescript
useEffect(() => {
  async function loadWeather() {
    const response = await makeAuthenticatedRequest('/api/v1/weather/current');
    setWeather(response.weather);
    setAlerts(response.alerts); // Display alerts in existing UI
  }
  loadWeather();
}, []);
```

#### Testing Checklist:
- [ ] Plant API returns correct data
- [ ] Search functionality works
- [ ] Weather API fetches live data
- [ ] Climate alerts generate correctly
- [ ] Plant recommendations match environment
- [ ] Caching reduces API calls

---

### **TASK 5: My Garden Management (CRUD Operations)** 🏡

**Duration:** 3 days  
**Priority:** HIGH  
**Stack:** MongoDB, Express, Cloudinary

#### What We Build:
```
/server/routes/garden.js
/server/controllers/gardenController.js
/server/services/gardenService.js
```

#### Features to Implement:

**1. Garden CRUD Endpoints:**
```javascript
// GET /api/v1/garden - Get user's garden
async function getUserGarden(req, res) {
  const garden = await Garden.find({ userId: req.user.uid })
    .populate('plantId')
    .sort({ plantedDate: -1 });
  
  res.json({ garden });
}

// POST /api/v1/garden/add - Add plant to garden
async function addPlantToGarden(req, res) {
  const { plantId, nickname, location } = req.body;
  
  const plant = await Plant.findById(plantId);
  
  const gardenItem = await Garden.create({
    userId: req.user.uid,
    plantId: plantId,
    nickname: nickname || plant.name,
    location: location,
    plantedDate: new Date(),
    health: 100,
    growth: 0,
    hydration: 100,
    happiness: 80
  });
  
  // Award XP for adding plant
  await awardXP(req.user.uid, 100, 'Added new plant');
  
  // Generate 30-day care tasks (Task 6)
  await generateCareTasks(req.user.uid, gardenItem._id, plant);
  
  res.json({ gardenItem });
}

// PUT /api/v1/garden/:id - Update plant details
async function updateGardenPlant(req, res) {
  const { id } = req.params;
  const updates = req.body;
  
  const gardenItem = await Garden.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  ).populate('plantId');
  
  res.json({ gardenItem });
}

// DELETE /api/v1/garden/:id - Remove plant
async function removePlantFromGarden(req, res) {
  const { id } = req.params;
  
  await Garden.findByIdAndDelete(id);
  await Task.deleteMany({ gardenItemId: id }); // Clean up tasks
  
  res.json({ message: 'Plant removed' });
}
```

**2. Plant Care Actions:**
```javascript
// POST /api/v1/garden/:id/water
async function waterPlant(req, res) {
  const { id } = req.params;
  
  const gardenItem = await Garden.findById(id);
  
  gardenItem.lastWatered = new Date();
  gardenItem.hydration = Math.min(100, gardenItem.hydration + 30);
  gardenItem.health = calculateHealth(gardenItem);
  
  await gardenItem.save();
  
  // Award XP
  await awardXP(req.user.uid, 50, 'Watered plant');
  
  // Update streak
  await updateStreak(req.user.uid);
  
  res.json({ gardenItem });
}

// POST /api/v1/garden/:id/fertilize
async function fertilizePlant(req, res) {
  const { id } = req.params;
  
  const gardenItem = await Garden.findById(id);
  
  gardenItem.lastFertilized = new Date();
  gardenItem.growth = Math.min(100, gardenItem.growth + 15);
  gardenItem.health = Math.min(100, gardenItem.health + 10);
  
  await gardenItem.save();
  
  await awardXP(req.user.uid, 75, 'Fertilized plant');
  
  res.json({ gardenItem });
}

// POST /api/v1/garden/:id/prune
async function prunePlant(req, res) {
  const { id } = req.params;
  
  const gardenItem = await Garden.findById(id);
  
  gardenItem.health = Math.min(100, gardenItem.health + 5);
  gardenItem.happiness = Math.min(100, gardenItem.happiness + 10);
  
  await gardenItem.save();
  
  await awardXP(req.user.uid, 35, 'Pruned plant');
  
  res.json({ gardenItem });
}
```

**3. Health Calculation Algorithm:**
```javascript
function calculateHealth(gardenItem) {
  let health = 100;
  
  // Hydration factor
  const hoursSinceWatered = (Date.now() - gardenItem.lastWatered) / (1000 * 60 * 60);
  if (hoursSinceWatered > 48) health -= 20;
  else if (hoursSinceWatered > 72) health -= 40;
  
  // Growth stage factor
  if (gardenItem.growth < 30) health += 5; // Young plants are resilient
  
  // Fertilization factor
  const daysSinceFertilized = (Date.now() - gardenItem.lastFertilized) / (1000 * 60 * 60 * 24);
  if (daysSinceFertilized > 30) health -= 10;
  
  return Math.max(0, Math.min(100, health));
}
```

**4. Growth Tracking:**
```javascript
// Cron job to update plant growth daily
const cron = require('node-cron');

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  const allGardenItems = await Garden.find({ isActive: true });
  
  for (const item of allGardenItems) {
    const daysSincePlanted = (Date.now() - item.plantedDate) / (1000 * 60 * 60 * 24);
    const plant = await Plant.findById(item.plantId);
    
    // Calculate growth percentage
    const expectedGrowth = (daysSincePlanted / plant.lifespan) * 100;
    item.growth = Math.min(100, expectedGrowth);
    
    // Recalculate health
    item.health = calculateHealth(item);
    
    await item.save();
    
    // Award XP for growth milestones
    if (item.growth === 25 || item.growth === 50 || item.growth === 75 || item.growth === 100) {
      await awardXP(item.userId, 25, `Plant grew to ${item.growth}%`);
    }
  }
});
```

**5. Photo Upload:**
```javascript
// POST /api/v1/garden/:id/photo
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ storage: multer.memoryStorage() });

async function uploadPlantPhoto(req, res) {
  const { id } = req.params;
  const file = req.file;
  
  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload_stream(
    { folder: 'bloomify/garden' },
    async (error, result) => {
      if (error) return res.status(500).json({ error });
      
      // Add photo URL to garden item
      const gardenItem = await Garden.findById(id);
      gardenItem.images.push(result.secure_url);
      await gardenItem.save();
      
      res.json({ url: result.secure_url });
    }
  ).end(file.buffer);
}
```

#### Frontend Integration:
**Update MyGarden.tsx** (no UI changes):

```typescript
// Fetch garden from backend
useEffect(() => {
  async function loadGarden() {
    const data = await makeAuthenticatedRequest('/api/v1/garden');
    setGardenPlants(data.garden);
  }
  loadGarden();
}, []);

// Water plant action
async function handleWater(plantId) {
  await makeAuthenticatedRequest(`/api/v1/garden/${plantId}/water`, {
    method: 'POST'
  });
  // Refresh garden
  loadGarden();
}
```

#### Testing Checklist:
- [ ] Can add plants to garden
- [ ] Can update plant details
- [ ] Can remove plants
- [ ] Watering updates hydration
- [ ] Fertilizing boosts growth
- [ ] Health calculation is accurate
- [ ] Growth tracking works daily
- [ ] Photo upload to Cloudinary works
- [ ] XP awarded correctly

---

*This is the first 5 tasks out of 15. Would you like me to continue with the remaining tasks (6-15), or would you prefer to start implementing these first tasks?*

**Next sections will cover:**
- Task 6-9: AI/ML features, Task scheduling, Environment monitoring
- Task 10-12: Community features, Media management, Gamification
- Task 13-14: Marketplace, Payments, Shopping cart
- Task 15: Real-time notifications, Socket.io, Performance optimization

Let me know if you want me to continue writing the complete implementation guide!
