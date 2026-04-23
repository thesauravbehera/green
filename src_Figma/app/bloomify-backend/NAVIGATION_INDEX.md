# 🌿 Bloomify Backend - Master Navigation Index

## 📍 Quick Navigation

This is your central hub for navigating the entire Bloomify backend codebase.

---

## 🚀 Getting Started

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [README.md](./README.md) | **Start here!** Complete overview | First time setup, overview |
| [FINAL_CONSOLIDATION_SUMMARY.md](./FINAL_CONSOLIDATION_SUMMARY.md) | Consolidation status | Check what files remain to copy |
| [.env.example](./.env.example) | Environment configuration | Setting up environment |
| [consolidate-backend.sh](/consolidate-backend.sh) | Automation script | Run to copy remaining files |

---

## 📚 Documentation Library

### Core Documentation
| File | Description | Use Case |
|------|-------------|----------|
| [README.md](./README.md) | Main documentation | Overview, quick start, API summary |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | File organization | Understanding project layout |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference | Building API clients, integration |
| [CONSOLIDATION_STATUS.md](./CONSOLIDATION_STATUS.md) | File copy status | Tracking consolidation progress |

### Setup & Deployment
| File | Description | Use Case |
|------|-------------|----------|
| [Documentation/SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md) | Step-by-step setup | Local development setup |
| [Documentation/DEPLOYMENT_GUIDE.md](./Documentation/DEPLOYMENT_GUIDE.md) | Production deployment | Deploying to production |
| [Documentation/PACKAGE_INDEX.md](./Documentation/PACKAGE_INDEX.md) | NPM package docs | Understanding dependencies |

### Reference & Quick Access
| File | Description | Use Case |
|------|-------------|----------|
| [BACKEND_MASTER_INDEX.md](./BACKEND_MASTER_INDEX.md) | File navigation index | Finding specific files |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Developer quick start | Quick command reference |
| [FILE_MANIFEST.md](./FILE_MANIFEST.md) | Complete file listing | Complete file inventory |
| [COMPLETE_SUMMARY.md](./COMPLETE_SUMMARY.md) | Feature summary | Feature capabilities |

---

## 🗂️ Code Files by Category

### 1. Configuration Files
Location: `/bloomify-backend/config/`

| File | Purpose | Key Exports |
|------|---------|-------------|
| `cloudinary.js` | Cloudinary image upload config | `cloudinary` |

### 2. Middleware
Location: `/bloomify-backend/middleware/`

| File | Purpose | Exports |
|------|---------|---------|
| `auth.js` | Firebase authentication | `protect`, `requirePremium`, `authorize`, `optionalAuth` |
| `errorHandler.js` | Global error handling | `errorHandler` middleware |

### 3. Database Models
Location: `/bloomify-backend/models/`

| File | Description | Key Methods |
|------|-------------|-------------|
| `User.js` | User accounts & gamification | `awardXP()`, `updateStreak()`, `checkAchievements()` |
| `Plant.js` | Plant catalog | `incrementViewCount()`, `searchPlants()` |
| `Garden.js` | User's garden plants | `water()`, `fertilize()`, `prune()`, `updateGrowth()` |
| `Task.js` | Tasks & reminders | `complete()`, `createNextOccurrence()` |
| `CommunityPost.js` | Community posts | `addLike()`, `removeLike()`, `addComment()` |
| `Notification.js` | Notifications | `markAsRead()`, `createNotification()` |
| `MarketplaceProduct.js` | Products | `addReview()`, `decrementStock()` |
| `Order.js` | Orders | `calculateTotal()`, `updateStatus()` |

### 4. API Routes
Location: `/bloomify-backend/routes/`

| File | Base Path | Endpoints | Authentication |
|------|-----------|-----------|----------------|
| `auth.js` | `/api/v1/auth` | 5 | Public + Protected |
| `users.js` ⏳ | `/api/v1/users` | 10 | Public + Protected |
| `plants.js` ⏳ | `/api/v1/plants` | 8 | Public |
| `garden.js` ⏳ | `/api/v1/garden` | 15 | Protected |
| `tasks.js` ⏳ | `/api/v1/tasks` | 9 | Protected |
| `community.js` ⏳ | `/api/v1/community` | 12 | Public + Protected |
| `marketplace.js` ⏳ | `/api/v1/marketplace` | 14 | Public + Protected |
| `weather.js` ⏳ | `/api/v1/weather` | 4 | Protected |
| `ai.js` ⏳ | `/api/v1/ai` | 6 | Protected |
| `admin.js` ⏳ | `/api/v1/admin` | 8 | Admin only |

⏳ = Needs manual copy from `/server/routes/`

### 5. Background Services
Location: `/bloomify-backend/services/`

| File | Purpose | Key Functions |
|------|---------|---------------|
| `cronService.js` ⏳ | Scheduled jobs | `runDailyTasks()` |
| `gardenService.js` ⏳ | Plant automation | `updatePlantGrowth()` |
| `socketService.js` ⏳ | Real-time events | `initializeSocketIO()` |

⏳ = Needs manual copy from `/server/services/`

### 6. Core Application
Location: `/bloomify-backend/`

| File | Purpose | Key Features |
|------|---------|--------------|
| `server.js` ⏳ | Main Express app | Route mounting, Socket.IO, cron jobs |
| `package.json` ⏳ | Dependencies | Scripts, dependencies list |
| `.env.example` | Environment template | Configuration template |

⏳ = Needs manual copy from `/server/`

---

## 🔍 Find by Task

### Setting Up Locally
1. [README.md](./README.md) → Quick Start section
2. [Documentation/SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md)
3. [.env.example](./.env.example)
4. Run `/consolidate-backend.sh`

### Understanding the API
1. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) → Complete endpoint list
2. [README.md](./README.md) → API Modules table
3. Specific route files in `/routes/`

### Database Schema
1. [README.md](./README.md) → Database Models section
2. Individual model files in `/models/`
3. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

### Deployment
1. [Documentation/DEPLOYMENT_GUIDE.md](./Documentation/DEPLOYMENT_GUIDE.md)
2. [README.md](./README.md) → Deployment section

### Troubleshooting
1. [README.md](./README.md) → Troubleshooting section
2. [CONSOLIDATION_STATUS.md](./CONSOLIDATION_STATUS.md) → File copy status
3. [FINAL_CONSOLIDATION_SUMMARY.md](./FINAL_CONSOLIDATION_SUMMARY.md)

### Feature Development
1. [COMPLETE_SUMMARY.md](./COMPLETE_SUMMARY.md) → Feature list
2. Relevant model files
3. Relevant route files
4. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 📖 Documentation Reading Order

### For New Developers
1. [README.md](./README.md) - Overview
2. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - File layout
3. [Documentation/SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md) - Setup
4. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference

### For Backend Developers
1. [BACKEND_MASTER_INDEX.md](./BACKEND_MASTER_INDEX.md) - This file
2. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API endpoints
3. Model files in `/models/` - Database schema
4. Route files in `/routes/` - API implementation

### For DevOps
1. [README.md](./README.md) - Overview
2. [Documentation/DEPLOYMENT_GUIDE.md](./Documentation/DEPLOYMENT_GUIDE.md) - Deploy
3. [.env.example](./.env.example) - Environment vars
4. [Documentation/PACKAGE_INDEX.md](./Documentation/PACKAGE_INDEX.md) - Dependencies

### For API Consumers
1. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
2. [README.md](./README.md) → API Client Examples section
3. Specific endpoint documentation

---

## 🎯 Common Tasks & Files

### Adding a New API Endpoint
1. Create/modify route file in `/routes/`
2. Add model if needed in `/models/`
3. Update [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
4. Mount route in `server.js`

### Adding a New Model
1. Create model file in `/models/`
2. Define schema, virtuals, methods
3. Add indexes
4. Update [README.md](./README.md) → Database Models section

### Configuring Environment
1. Copy [.env.example](./.env.example) to `.env`
2. Fill in values
3. Reference [Documentation/SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md)

### Understanding Authentication
1. Read `/middleware/auth.js`
2. See [README.md](./README.md) → Authentication section
3. Check demo token usage

### Working with Real-Time Features
1. See `/services/socketService.js` ⏳
2. Read [README.md](./README.md) → Real-Time Features section
3. Check Socket.IO documentation

### Background Job Development
1. See `/services/cronService.js` ⏳
2. See `/services/gardenService.js` ⏳
3. Check cron schedules in `server.js` ⏳

---

## 📁 Directory Structure Reference

```
/bloomify-backend/
│
├── config/                     # Configuration
│   └── cloudinary.js          # ✅ Cloudinary setup
│
├── middleware/                 # Express middleware
│   ├── auth.js                # ✅ Authentication
│   └── errorHandler.js        # ✅ Error handling
│
├── models/                     # Mongoose models (8 files)
│   ├── User.js                # ✅ User & gamification
│   ├── Plant.js               # ✅ Plant catalog
│   ├── Garden.js              # ✅ User's garden
│   ├── Task.js                # ✅ Tasks & reminders
│   ├── CommunityPost.js       # ✅ Community posts
│   ├── Notification.js        # ✅ Notifications
│   ├── MarketplaceProduct.js  # ✅ Products
│   └── Order.js               # ✅ Orders
│
├── routes/                     # API routes (10 files)
│   ├── auth.js                # ✅ Authentication
│   ├── users.js               # ⏳ User management
│   ├── plants.js              # ⏳ Plant catalog
│   ├── garden.js              # ⏳ Garden management
│   ├── tasks.js               # ⏳ Task management
│   ├── community.js           # ⏳ Community features
│   ├── marketplace.js         # ⏳ Marketplace
│   ├── weather.js             # ⏳ Weather API
│   ├── ai.js                  # ⏳ AI features
│   └── admin.js               # ⏳ Admin dashboard
│
├── services/                   # Background services
│   ├── cronService.js         # ⏳ Cron jobs
│   ├── gardenService.js       # ⏳ Garden automation
│   └── socketService.js       # ⏳ Real-time Socket.IO
│
├── Documentation/              # Guides
│   ├── SETUP_GUIDE.md         # ✅ Setup instructions
│   ├── DEPLOYMENT_GUIDE.md    # ✅ Deployment guide
│   └── PACKAGE_INDEX.md       # ✅ Package docs
│
├── server.js                   # ⏳ Main Express app
├── package.json                # ⏳ Dependencies
├── .env.example                # ✅ Environment template
│
└── Documentation (*.md files)
    ├── README.md                               # ✅ Main docs
    ├── API_DOCUMENTATION.md                    # ✅ API reference
    ├── BACKEND_MASTER_INDEX.md                 # ✅ This file
    ├── PROJECT_STRUCTURE.md                    # ✅ File structure
    ├── CONSOLIDATION_STATUS.md                 # ✅ Copy status
    ├── FINAL_CONSOLIDATION_SUMMARY.md          # ✅ Consolidation summary
    ├── COMPLETE_SUMMARY.md                     # ✅ Feature summary
    ├── QUICK_REFERENCE.md                      # ✅ Quick reference
    └── FILE_MANIFEST.md                        # ✅ File listing
```

✅ = Created  
⏳ = Needs manual copy from `/server/`

---

## 🚀 Quick Commands

### Setup
```bash
cd bloomify-backend
npm install
cp .env.example .env
npm run dev
```

### Run Consolidation Script
```bash
bash consolidate-backend.sh
```

### Test API
```bash
curl http://localhost:5000/health
```

### Database Seed
```bash
npm run seed
```

---

## 📊 Project Status

**Consolidation Progress**: 60% Complete
- ✅ Config & Middleware: 3/3 (100%)
- ✅ Models: 8/8 (100%)
- ✅ Documentation: 11/11 (100%)
- ⏳ Routes: 1/10 (10%)
- ⏳ Services: 0/3 (0%)
- ⏳ Core Files: 0/2 (0%)

**Action Required**: Run `/consolidate-backend.sh` to complete file copying

---

## 📞 Need Help?

1. Check [FINAL_CONSOLIDATION_SUMMARY.md](./FINAL_CONSOLIDATION_SUMMARY.md) for next steps
2. See [README.md](./README.md) for troubleshooting
3. Review [Documentation/SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md) for detailed setup

---

**Last Updated**: April 1, 2026  
**Version**: 4.0.0  
**Maintainer**: Bloomify Team
