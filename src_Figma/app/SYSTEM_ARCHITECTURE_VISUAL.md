# 🏗️ BLOOMIFY - SYSTEM ARCHITECTURE VISUALIZATION

## 📐 COMPLETE SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                     BLOOMIFY FULL STACK                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                           │
│  (Your Existing UI - NO CHANGES TO DESIGN)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  React + TypeScript + Tailwind CSS v4                           │
│  Premium Deep Botanical Design                                   │
│                                                                  │
│  Screens:                                                        │
│  ├─ LandingPage.tsx       (Hero, Features, CTA)                │
│  ├─ Dashboard.tsx         (Stats, Tasks, Weather)              │
│  ├─ MyGarden.tsx          (Plant management)                   │
│  ├─ Marketplace.tsx       (Products, Cart, Checkout)           │
│  ├─ CommunityPage.tsx     (Feed, Posts, Likes)                 │
│  └─ AdminDashboard.tsx    (Analytics, Users, Content)          │
│                                                                  │
│  Components:                                                     │
│  ├─ FloatingUserStation   (Level, XP, Streak)                  │
│  ├─ GamificationHub       (Achievements, Rewards)              │
│  ├─ CommunityHub          (Social features)                    │
│  ├─ ARBalconyScanner      (WebXR scanning)                     │
│  └─ Modals (10+)          (Plant Doctor, Calendar, etc.)       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │   API CLIENT    │
                    │  (New Layer)    │
                    └─────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY (Express)                       │
│                    http://localhost:5000                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Middleware Stack:                                               │
│  ├─ CORS              (Cross-origin)                            │
│  ├─ Helmet            (Security headers)                        │
│  ├─ Morgan            (Request logging)                         │
│  ├─ Compression       (Response compression)                    │
│  ├─ Rate Limiter      (100 req/15min)                          │
│  ├─ Body Parser       (JSON parsing)                            │
│  └─ Error Handler     (Global error catching)                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Firebase Admin SDK                                              │
│  ├─ Token Verification                                          │
│  ├─ User Session Management                                     │
│  └─ Role-Based Access Control                                   │
│                                                                  │
│  Demo Bypass System:                                             │
│  ├─ DEMO_ADMIN_TOKEN → admin@bloomify.io                       │
│  └─ DEMO_GUEST_TOKEN → guest@bloomify.io                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API ROUTES (30+)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /api/v1/auth          (5 endpoints)                            │
│  ├─ POST /register     Create account                           │
│  ├─ POST /login        Login user                               │
│  ├─ POST /logout       Logout                                   │
│  ├─ GET  /verify       Verify token                             │
│  └─ GET  /me           Get current user                         │
│                                                                  │
│  /api/v1/users         (7 endpoints)                            │
│  ├─ GET    /:id                 Get user                        │
│  ├─ PUT    /:id                 Update user                     │
│  ├─ PUT    /:id/settings        Settings                        │
│  ├─ GET    /:id/stats           Statistics                      │
│  ├─ GET    /:id/achievements    Achievements                    │
│  ├─ GET    /leaderboard/global  Leaderboard                     │
│  └─ DELETE /:id                 Delete account                  │
│                                                                  │
│  /api/v1/plants        (6 endpoints)                            │
│  ├─ GET /catalog               List plants (paginated)          │
│  ├─ GET /featured              Featured plants                  │
│  ├─ GET /indian                Indian plants                    │
│  ├─ GET /search                Search plants                    │
│  ├─ GET /:id                   Get plant details               │
│  └─ GET /category/:category    Category filter                  │
│                                                                  │
│  /api/v1/garden        (9 endpoints)                            │
│  ├─ GET    /                   Get user's garden               │
│  ├─ POST   /add                Add plant                        │
│  ├─ GET    /:id                Get plant                        │
│  ├─ PUT    /:id                Update plant                     │
│  ├─ DELETE /:id                Remove plant                     │
│  ├─ POST   /:id/water          Water (+50 XP)                  │
│  ├─ POST   /:id/fertilize      Fertilize (+75 XP)              │
│  ├─ POST   /:id/prune          Prune (+35 XP)                  │
│  └─ POST   /:id/photo          Upload photo                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BUSINESS LOGIC LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Gamification Engine:                                            │
│  ├─ XP Calculation    (Level = XP / 1000)                      │
│  ├─ Streak Tracking   (+25 XP daily bonus)                     │
│  ├─ Achievement System (6 achievements)                         │
│  └─ Level-up Detection                                          │
│                                                                  │
│  Health Calculation:                                             │
│  ├─ Hydration Factor  (hours since watered)                    │
│  ├─ Fertilizer Factor (days since fertilized)                  │
│  ├─ Growth Stage Bonus (young plants resilient)                │
│  └─ Real-time Updates                                           │
│                                                                  │
│  Growth System:                                                  │
│  ├─ Growth % = (days / lifespan) * 100                         │
│  ├─ Milestone Detection (25%, 50%, 75%, 100%)                  │
│  ├─ XP Rewards (25 → 50 → 100 XP)                             │
│  └─ Status Updates                                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER (MongoDB)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  USERS COLLECTION                                     │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  ├─ uid (Firebase UID)                               │       │
│  │  ├─ email, displayName, photoURL                     │       │
│  │  ├─ level, xp, streak                                │       │
│  │  ├─ role (user/admin/moderator)                      │       │
│  │  ├─ subscription (plan, status, dates)               │       │
│  │  ├─ settings (language, currency, notifications)     │       │
│  │  ├─ stats (plantsOwned, tasksCompleted, etc.)        │       │
│  │  └─ achievements []                                   │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  PLANTS COLLECTION                                    │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  ├─ name, scientificName, commonNames []             │       │
│  │  ├─ category, family, difficulty                     │       │
│  │  ├─ description, benefits [], uses []                │       │
│  │  ├─ careInstructions (watering, sunlight, etc.)      │       │
│  │  ├─ environmentRequirements (temp, humidity)         │       │
│  │  ├─ isIndianPlant, isMonsoonReady                    │       │
│  │  ├─ regionalNames (hindi, kannada, tamil)            │       │
│  │  ├─ images [], tags []                               │       │
│  │  └─ rating, reviewCount, viewCount                   │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  GARDEN COLLECTION                                    │       │
│  ├─────────────────────────────────────────────────────┤       │
│  │  ├─ userId → User                                     │       │
│  │  ├─ plantId → Plant                                   │       │
│  │  ├─ nickname, plantedDate                             │       │
│  │  ├─ location (balcony, floor, potSize)               │       │
│  │  ├─ health, growth, hydration, happiness (0-100)     │       │
│  │  ├─ lastWatered, lastFertilized, lastPruned          │       │
│  │  ├─ careLog [] (water, fertilize, prune history)     │       │
│  │  ├─ images [] (photo gallery)                        │       │
│  │  ├─ milestones [] (growth achievements)              │       │
│  │  └─ status (healthy, sick, dormant, etc.)            │       │
│  └─────────────────────────────────────────────────────┘       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     REAL-TIME LAYER (Socket.IO)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Events:                                                         │
│  ├─ plant_watered      → Client notification                    │
│  ├─ level_up           → Celebration animation                  │
│  ├─ task_due           → Reminder notification                  │
│  ├─ community_like     → Social notification                    │
│  └─ achievement_unlock → Achievement popup                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKGROUND JOBS (Cron)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Daily (00:00):        Run daily maintenance tasks              │
│  Every 6 hours:        Update plant growth                      │
│  Hourly:               Check overdue tasks                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW EXAMPLE: Water Plant

```
1. USER ACTION
   └─ User clicks "Water" button in MyGarden.tsx
         │
         ▼
2. FRONTEND API CALL
   └─ apiRequest('/garden/PLANT_ID/water', { method: 'POST' })
         │
         ▼
3. AUTHENTICATION
   └─ Middleware checks Firebase token
   └─ Verifies user owns this plant
         │
         ▼
4. BUSINESS LOGIC
   └─ garden.water() method called
   └─ Updates: lastWatered = now
   └─ Increases: hydration + 30
   └─ Recalculates: health
   └─ Adds to: careLog
         │
         ▼
5. GAMIFICATION
   └─ user.awardXP(50, 'Watered plant')
   └─ Checks if leveled up
   └─ Updates streak
   └─ Checks achievements
         │
         ▼
6. DATABASE
   └─ Saves garden item
   └─ Saves user (new XP)
         │
         ▼
7. REAL-TIME
   └─ Socket.IO emits 'plant_watered' event
   └─ Client receives notification
         │
         ▼
8. RESPONSE
   └─ Returns updated plant data
   └─ Returns "+50 XP" message
         │
         ▼
9. UI UPDATE
   └─ Plant card shows updated health
   └─ Toast notification: "+50 XP"
   └─ XP bar animates
   └─ Streak counter updates
```

---

## 📦 FILE STRUCTURE MAP

```
/server/
│
├── 📄 server.js                    [ENTRY POINT]
│   ├─ Express app initialization
│   ├─ MongoDB connection
│   ├─ Socket.IO setup
│   ├─ Route mounting
│   ├─ Cron jobs
│   └─ Error handling
│
├── 📄 package.json                 [DEPENDENCIES]
│   ├─ express, mongoose, socket.io
│   ├─ firebase-admin, bcryptjs, jwt
│   ├─ helmet, cors, compression
│   ├─ cloudinary, stripe, axios
│   └─ node-cron, nodemailer
│
├── 📁 models/                      [DATABASE SCHEMAS]
│   │
│   ├── 📄 User.js                  [350 lines]
│   │   ├─ Schema definition
│   │   ├─ Gamification fields
│   │   ├─ Methods: awardXP, updateStreak
│   │   ├─ Methods: checkAchievements
│   │   └─ Virtuals: xpForNextLevel, isPremium
│   │
│   ├── 📄 Plant.js                 [200 lines]
│   │   ├─ Schema definition
│   │   ├─ Care instructions
│   │   ├─ Environment requirements
│   │   ├─ Indian plant fields
│   │   ├─ Methods: incrementViewCount
│   │   └─ Statics: searchPlants, getFeatured
│   │
│   └── 📄 Garden.js                [320 lines]
│       ├─ Schema definition
│       ├─ Health metrics
│       ├─ Care history
│       ├─ Methods: water, fertilize, prune
│       ├─ Methods: calculateHealth, updateGrowth
│       └─ Virtuals: daysSincePlanted
│
├── 📁 routes/                      [API ENDPOINTS]
│   │
│   ├── 📄 auth.js                  [80 lines]
│   │   └─ 5 endpoints (register, login, logout, verify, me)
│   │
│   ├── 📄 users.js                 [200 lines]
│   │   └─ 7 endpoints (CRUD, stats, achievements, leaderboard)
│   │
│   ├── 📄 plants.js                [120 lines]
│   │   └─ 6 endpoints (catalog, featured, search, categories)
│   │
│   └── 📄 garden.js                [280 lines]
│       └─ 9 endpoints (CRUD, water, fertilize, prune, photos)
│
└── 📁 middleware/                  [REQUEST PROCESSING]
    │
    ├── 📄 auth.js                  [150 lines]
    │   ├─ Firebase token verification
    │   ├─ Demo bypass system
    │   ├─ Role checks
    │   └─ Premium checks
    │
    └── 📄 errorHandler.js          [50 lines]
        ├─ Global error catching
        ├─ MongoDB error handling
        └─ Firebase error mapping
```

---

## 🎮 GAMIFICATION FLOW

```
┌─────────────────────────────────────────────┐
│         USER PERFORMS ACTION                │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│     AWARD XP (Variable by Action)           │
│  ├─ Water plant:      +50 XP                │
│  ├─ Fertilize:        +75 XP                │
│  ├─ Prune:            +35 XP                │
│  ├─ Add plant:        +100 XP               │
│  ├─ Daily login:      +25 XP                │
│  └─ Achievement:      +100-1000 XP          │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      CALCULATE NEW LEVEL                    │
│  newLevel = Math.floor(totalXP / 1000) + 1 │
└─────────────────────────────────────────────┘
              │
              ▼
        ┌─────┴─────┐
        │           │
    Level Up?    No Change
        │           │
        ▼           ▼
┌────────────┐  ┌────────────┐
│  LEVEL UP  │  │  UPDATE    │
│  EVENT     │  │  XP BAR    │
│            │  │            │
│ - Notify   │  │ - Save     │
│ - Confetti │  │ - Return   │
│ - Unlock   │  └────────────┘
└────────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│       CHECK FOR ACHIEVEMENTS                │
│  ├─ First plant?                            │
│  ├─ 10+ plants?                             │
│  ├─ 7-day streak?                           │
│  ├─ 30-day streak?                          │
│  ├─ 100 tasks done?                         │
│  └─ 50 posts?                               │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│     UNLOCK ACHIEVEMENTS (if any)            │
│  ├─ Save to user.achievements[]             │
│  ├─ Award bonus XP                          │
│  └─ Send notification                       │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│       UPDATE LEADERBOARD                    │
│  ├─ Global ranking                          │
│  └─ City ranking                            │
└─────────────────────────────────────────────┘
```

---

## 🔒 SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────┐
│           INCOMING REQUEST                  │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      1. RATE LIMITER                        │
│  Max: 100 requests per 15 minutes          │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      2. HELMET (Security Headers)           │
│  ├─ XSS Protection                          │
│  ├─ Content Security Policy                 │
│  └─ Frame Options                           │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      3. CORS (Cross-Origin)                 │
│  Allowed origins configuration              │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      4. INPUT SANITIZATION                  │
│  ├─ MongoDB injection prevention            │
│  ├─ XSS cleaning                            │
│  └─ SQL injection prevention                │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      5. AUTHENTICATION                      │
│  ├─ Firebase token verification             │
│  ├─ Demo bypass check                       │
│  └─ User lookup                             │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      6. AUTHORIZATION                       │
│  ├─ Role check (user/admin/moderator)      │
│  ├─ Resource ownership                      │
│  └─ Premium feature access                  │
└─────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│      7. BUSINESS LOGIC                      │
│  Process the request                        │
└─────────────────────────────────────────────┘
```

---

## 🌟 WHAT'S WORKING NOW

```
✅ INFRASTRUCTURE
   ├─ Express server
   ├─ MongoDB connection
   ├─ Socket.IO setup
   ├─ Cron jobs
   └─ Error handling

✅ AUTHENTICATION
   ├─ Firebase integration
   ├─ Token verification
   ├─ Demo bypasses
   └─ Session management

✅ USER SYSTEM
   ├─ Profile management
   ├─ XP/Level/Streak
   ├─ Achievements
   ├─ Leaderboards
   └─ Settings

✅ PLANT SYSTEM
   ├─ Catalog with 1000+ plants (ready)
   ├─ Search & filters
   ├─ Featured/Indian plants
   └─ Categories

✅ GARDEN SYSTEM
   ├─ Add/remove plants
   ├─ Water/fertilize/prune
   ├─ Health tracking
   ├─ Growth system
   └─ Photo gallery

✅ GAMIFICATION
   ├─ XP rewards
   ├─ Level calculation
   ├─ Streak tracking
   └─ 6 achievements
```

---

This visualization shows exactly how everything is connected and working! 🎉

Would you like me to:
1. Create the database seed file with 50+ Indian plants?
2. Continue building Tasks 7-15?
3. Help you deploy this to production?
4. Create a video tutorial walkthrough?
