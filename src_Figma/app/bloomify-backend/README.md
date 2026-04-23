# 🌿 Bloomify Backend API

> **Centralized Balcony Gardening Smart Solution** - Premium Deep Botanical Intelligence Platform

## 📋 Overview

Bloomify Backend is a comprehensive Node.js/Express API that powers the Bloomify gardening platform with Firebase authentication, MongoDB database, real-time Socket.IO features, AI integration, marketplace functionality, and community features.

**Version**: 4.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: April 1, 2026

## 🏗️ Architecture

- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Admin SDK
- **Real-time**: Socket.IO 4.x
- **Image Upload**: Cloudinary
- **Scheduling**: Node-Cron
- **Security**: Helmet, CORS, Mongo-Sanitize

## 📁 Project Structure

```
/bloomify-backend/
├── config/              # Configuration files
├── middleware/          # Express middleware
├── models/              # 8 Mongoose models
├── routes/              # 10 API route modules
├── services/            # Background services
├── Documentation/       # Setup & deployment guides
├── server.js            # Main Express application
├── package.json         # Dependencies
├── .env.example         # Environment template
└── *.md                 # Documentation files
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed breakdown.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 5.0
- Firebase project with Admin SDK
- Cloudinary account (for image uploads)

### Installation

```bash
# 1. Navigate to backend directory
cd bloomify-backend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Start development server
npm run dev

# Or production server
npm start
```

### Verify Installation

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Bloomify API is running",
  "timestamp": "2026-04-01T...",
  "environment": "development"
}
```

## 🔑 Environment Setup

### Required Variables

```env
# Core
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bloomify
CLIENT_URL=http://localhost:5173

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@project.iam.gserviceaccount.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

See [.env.example](./.env.example) for complete configuration.

## 📡 API Documentation

### Base URL

- **Development**: `http://localhost:5000/api/v1`
- **Production**: Configure in environment variables

### Authentication

Protected routes require Firebase ID token:

```bash
Authorization: Bearer <firebase-id-token>
```

**Demo Accounts** (bypass authentication):
- Admin: `DEMO_ADMIN_TOKEN`
- Guest: `DEMO_GUEST_TOKEN`

### API Modules

| Module | Base Route | Endpoints | Description |
|--------|-----------|-----------|-------------|
| Auth | `/api/v1/auth` | 5 | Registration, login, token verification |
| Users | `/api/v1/users` | 10 | Profile, settings, stats, achievements |
| Plants | `/api/v1/plants` | 8 | Catalog, search, featured plants |
| Garden | `/api/v1/garden` | 15 | Plant management, care tracking |
| Tasks | `/api/v1/tasks` | 9 | Reminders, recurring tasks |
| Community | `/api/v1/community` | 12 | Posts, likes, comments |
| Marketplace | `/api/v1/marketplace` | 14 | Products, orders, reviews |
| Weather | `/api/v1/weather` | 4 | Forecasts, alerts |
| AI | `/api/v1/ai` | 6 | Plant doctor, suggestions |
| Admin | `/api/v1/admin` | 8 | Dashboard, user management |

**Total**: 91+ API endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete reference.

## 🗃️ Database Models

### Core Models (8 total)

1. **User** - Authentication, gamification, subscriptions
2. **Plant** - Botanical catalog with Indian plant support
3. **Garden** - User's plant tracking & health metrics
4. **Task** - Reminders & recurring care tasks
5. **CommunityPost** - Social features, likes, comments
6. **Notification** - Multi-type notifications
7. **MarketplaceProduct** - E-commerce products
8. **Order** - Order processing & tracking

### Model Features

- **Virtuals**: Computed properties (XP needed, stock status)
- **Methods**: Business logic (water(), awardXP(), addLike())
- **Statics**: Model-level operations (searchPlants(), getFeatured())
- **Hooks**: Pre/post save middleware
- **Indexes**: Optimized for performance
- **Population**: Automatic relationship loading

## ⚡ Real-Time Features

### Socket.IO Events

Server emits:
- `notification` - Real-time notifications
- `community:new_post` - New community posts
- `garden:update` - Plant health changes
- `chat:message` - Chat messages

Client events:
- `connection` - User connects
- `disconnect` - User disconnects

### Usage Example

```javascript
const socket = io('http://localhost:5000', {
  auth: { token: firebaseIdToken }
});

socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```

## ⏰ Background Jobs

### Cron Schedules

| Job | Schedule | Description |
|-----|----------|-------------|
| Daily tasks | `0 0 * * *` | Streaks, cleanup, notifications |
| Plant growth | `0 */6 * * *` | Update growth metrics |
| Overdue tasks | `0 * * * *` | Check & notify overdue tasks |

### Services

1. **cronService.js** - Scheduled task management
2. **gardenService.js** - Plant automation & growth
3. **socketService.js** - Real-time event handling

## 🔒 Security Features

- ✅ Helmet.js for HTTP headers
- ✅ CORS with whitelist
- ✅ MongoDB query sanitization
- ✅ Input validation & sanitization
- ✅ Firebase token verification
- ✅ Rate limiting ready
- ✅ Request compression
- ✅ Error handling middleware

## 🎯 Gamification System

### XP & Levels

- **Level calculation**: `level = floor(xp / 1000) + 1`
- **XP rewards**:
  - Water plant: 50 XP
  - Fertilize: 75 XP
  - Add plant: 100 XP
  - Daily login: 25 XP
  - Achievements: 100-1000 XP

### Achievements

- 🌱 Green Thumb Beginner (first plant)
- 🌿 Plant Collector (10 plants)
- 🔥 Week Warrior (7-day streak)
- ⭐ Month Master (30-day streak)
- ✅ Task Master (100 tasks)
- 🌟 Community Star (50 posts)

### Streaks

- Updates on daily login
- Resets after missing a day
- Awards 25 XP per consecutive day

## 📦 NPM Scripts

```json
{
  "start": "node server.js",           // Production server
  "dev": "nodemon server.js",          // Development with auto-reload
  "seed": "node scripts/seedDatabase.js", // Seed sample data
  "test": "jest --watchAll"            // Run tests
}
```

## 🛠️ Development Workflow

### Local Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Setup environment: `cp .env.example .env`
4. Start MongoDB
5. Run dev server: `npm run dev`
6. Test endpoints: `http://localhost:5000/health`

### Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- user.test.js

# Coverage report
npm test -- --coverage
```

### Database Seeding

```bash
npm run seed
```

Seeds the database with:
- 50+ sample plants
- 10 test users
- 20 community posts
- 30 marketplace products

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas or production database
- [ ] Setup Firebase production credentials
- [ ] Configure Cloudinary production account
- [ ] Enable HTTPS/SSL
- [ ] Setup monitoring (PM2, New Relic, etc.)
- [ ] Configure backup strategy
- [ ] Setup logging service
- [ ] Enable rate limiting
- [ ] Configure CDN for static assets

### Deployment Platforms

- **Heroku**: Ready with `Procfile`
- **Railway**: One-click deploy
- **DigitalOcean**: App Platform support
- **AWS**: EC2 or Elastic Beanstalk
- **Vercel**: API functions (with adaptation)

See [DEPLOYMENT_GUIDE.md](./Documentation/DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📊 Performance Optimization

### Database

- Indexed fields for fast queries
- Pagination on all list endpoints
- Lean queries for read operations
- Connection pooling

### API

- Response compression enabled
- Request size limits (10MB)
- Efficient population strategies
- Caching ready (Redis support)

### Monitoring

- Request logging with Morgan
- Error tracking ready
- Performance metrics endpoint
- Health check endpoint

## 🤝 API Client Examples

### cURL

```bash
# Get featured plants
curl http://localhost:5000/api/v1/plants/featured

# Get user profile (with auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/v1/auth/me
```

### JavaScript/Fetch

```javascript
// Get user garden
const response = await fetch('http://localhost:5000/api/v1/garden', {
  headers: {
    'Authorization': `Bearer ${firebaseToken}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Authorization': `Bearer ${firebaseToken}`
  }
});

// Add plant to garden
const response = await api.post('/garden/add', {
  plantId: '507f1f77bcf86cd799439011',
  nickname: 'My Basil',
  location: {
    balconyDirection: 'south',
    floorLevel: 3,
    potSize: 'medium'
  }
});
```

## 📚 Documentation Files

| File | Description |
|------|-------------|
| [README.md](./README.md) | This file - overview and quick start |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API endpoint reference |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | File organization & architecture |
| [CONSOLIDATION_STATUS.md](./CONSOLIDATION_STATUS.md) | File migration status |
| [BACKEND_MASTER_INDEX.md](./BACKEND_MASTER_INDEX.md) | Quick navigation index |
| [COMPLETE_SUMMARY.md](./COMPLETE_SUMMARY.md) | Feature summary |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Developer quick reference |
| [FILE_MANIFEST.md](./FILE_MANIFEST.md) | Complete file listing |
| [SETUP_GUIDE.md](./Documentation/SETUP_GUIDE.md) | Step-by-step setup |
| [DEPLOYMENT_GUIDE.md](./Documentation/DEPLOYMENT_GUIDE.md) | Production deployment |
| [PACKAGE_INDEX.md](./Documentation/PACKAGE_INDEX.md) | NPM package docs |

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Solution: Ensure MongoDB is running
mongosh
```

**Firebase Auth Error**
```bash
# Solution: Check Firebase credentials in .env
# Ensure private key is properly formatted with \n
```

**Port Already in Use**
```bash
# Solution: Change PORT in .env or kill process
lsof -ti:5000 | xargs kill -9
```

### Debug Mode

Enable detailed logging:
```env
NODE_ENV=development
LOG_LEVEL=debug
```

## 🔗 Related Projects

- **Frontend**: `/App.tsx` (React with Tailwind CSS)
- **Mobile App**: `/mobile-app/` (React Native/Web)
- **Admin Dashboard**: Integrated in routes

## 📧 Support & Contact

- **Issues**: Create GitHub issue
- **Email**: support@bloomify.io
- **Docs**: `/bloomify-backend/Documentation/`

## 📄 License

MIT License - See LICENSE file for details

## 🎉 Acknowledgments

Built with:
- Express.js
- MongoDB & Mongoose
- Firebase Admin SDK
- Socket.IO
- Cloudinary
- Node-Cron

---

**Made with 🌿 by the Bloomify Team**

**Status**: ✅ All backend files consolidated in `/bloomify-backend/`