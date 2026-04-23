# Bloomify Backend - Complete Project Structure

## 📁 Project Organization

All backend files are now consolidated in the `/bloomify-backend/` directory with the following structure:

```
/bloomify-backend/
├── config/              # Configuration files
│   └── cloudinary.js    # Cloudinary setup
│
├── middleware/          # Express middleware
│   ├── auth.js          # Firebase auth & JWT
│   └── errorHandler.js  # Global error handling
│
├── models/              # Mongoose database models
│   ├── User.js          # User model with gamification
│   ├── Plant.js         # Plant catalog model
│   ├── Garden.js        # User's garden plants
│   ├── Task.js          # Tasks & reminders
│   ├── CommunityPost.js # Community posts
│   ├── Notification.js  # Notifications
│   ├── MarketplaceProduct.js  # Marketplace products
│   └── Order.js         # Orders & transactions
│
├── routes/              # API route handlers
│   ├── auth.js          # Authentication routes
│   ├── users.js         # User profile & settings
│   ├── plants.js        # Plant catalog & search
│   ├── garden.js        # Garden management
│   ├── tasks.js         # Task & reminder management
│   ├── community.js     # Community features
│   ├── marketplace.js   # E-commerce endpoints
│   ├── weather.js       # Weather API integration
│   ├── ai.js            # AI assistant endpoints
│   └── admin.js         # Admin dashboard routes
│
├── services/            # Background services
│   ├── cronService.js   # Scheduled jobs
│   ├── gardenService.js # Garden automation
│   └── socketService.js # Real-time Socket.IO
│
├── Documentation/       # Comprehensive guides
│   ├── SETUP_GUIDE.md   # Local setup instructions
│   ├── DEPLOYMENT_GUIDE.md  # Production deployment
│   └── PACKAGE_INDEX.md # Package documentation
│
├── server.js            # Main Express server
├── package.json         # Dependencies & scripts
├── .env.example         # Environment variables template
├── README.md            # Project overview
├── API_DOCUMENTATION.md # API endpoint reference
├── BACKEND_MASTER_INDEX.md  # Quick navigation
├── COMPLETE_SUMMARY.md  # Feature summary
├── QUICK_REFERENCE.md   # Developer quick start
└── FILE_MANIFEST.md     # Complete file listing
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd bloomify-backend
   npm install
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Run Production Server**
   ```bash
   npm start
   ```

## 📦 Key Files

### Server Entry Point
- **server.js** - Main Express application with Socket.IO, MongoDB connection, route mounting, and cron jobs

### Configuration
- **config/cloudinary.js** - Cloudinary image upload configuration

### Models (8 total)
- User, Plant, Garden, Task, CommunityPost, Notification, MarketplaceProduct, Order

### Routes (10 API modules)
- 60+ endpoints covering authentication, gardening, community, marketplace, and AI features

### Services (3 background jobs)
- Cron jobs for daily tasks, reminders, and plant growth updates
- Socket.IO for real-time notifications and chat
- Garden automation service

## 📚 Documentation Files

1. **README.md** - Project overview and getting started
2. **API_DOCUMENTATION.md** - Complete API endpoint reference
3. **SETUP_GUIDE.md** - Local development setup
4. **DEPLOYMENT_GUIDE.md** - Production deployment guide
5. **PACKAGE_INDEX.md** - NPM package documentation
6. **COMPLETE_SUMMARY.md** - Features and capabilities
7. **QUICK_REFERENCE.md** - Quick developer reference
8. **FILE_MANIFEST.md** - Complete file listing
9. **BACKEND_MASTER_INDEX.md** - Navigation index

## 🔗 API Base URL

- Development: `http://localhost:5000/api/v1`
- Production: Configure in `.env` as `API_BASE_URL`

## 🔐 Authentication

All protected routes require Firebase ID token in Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

Demo accounts bypass authentication:
- Admin: `DEMO_ADMIN_TOKEN`
- Guest: `DEMO_GUEST_TOKEN`

## 📊 Database Models Summary

### User Model
- Firebase integration, gamification (XP, levels, streaks)
- Subscription management, settings, achievements
- Methods: awardXP(), updateStreak(), checkAchievements()

### Plant Model
- Complete botanical information, care instructions
- Indian plant support, regional names
- Methods: incrementViewCount(), searchPlants()

### Garden Model
- User's plant tracking, health metrics
- Care logging, growth milestones
- Methods: water(), fertilize(), prune(), updateGrowth()

### Task Model
- Recurring tasks, reminders, priority levels
- Methods: complete(), createNextOccurrence()

### CommunityPost Model
- Posts, likes, comments, categories
- Methods: addLike(), removeLike(), addComment()

### Notification Model
- Multi-type notifications, read status
- Methods: markAsRead(), createNotification()

### MarketplaceProduct Model
- Products, inventory, ratings, reviews
- Methods: addReview(), decrementStock()

### Order Model
- Order processing, tracking, payment status
- Methods: calculateTotal(), updateStatus(), addTrackingUpdate()

## 🛠️ NPM Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node scripts/seedDatabase.js",
  "test": "jest --watchAll"
}
```

## 🌐 Environment Variables

Create `.env` file with:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=<your-mongodb-uri>
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_PRIVATE_KEY=<your-private-key>
FIREBASE_CLIENT_EMAIL=<your-client-email>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
CLIENT_URL=http://localhost:5173
```

## 📡 Real-Time Features

Socket.IO events:
- `connection` - User connects
- `disconnect` - User disconnects
- `notification` - Real-time notifications
- `community:new_post` - New community post
- `chat:message` - Chat messages
- `garden:update` - Garden changes

## ⏰ Cron Jobs

- **Daily (midnight)**: User streaks, notifications, cleanup
- **Every 6 hours**: Plant growth updates
- **Hourly**: Overdue task checks, reminder sends

## 🔒 Security Features

- Helmet.js for HTTP headers
- MongoDB sanitization
- CORS configuration
- Request compression
- Rate limiting ready
- Input validation

## 📈 Scalability

- MongoDB indexing for performance
- Virtual properties for computed values
- Pagination support
- Efficient querying with filters
- Socket.IO for real-time updates

## 🎯 Next Steps

1. Configure environment variables
2. Run `npm install`
3. Start MongoDB instance
4. Run `npm run dev`
5. Test API at `http://localhost:5000/health`

## 📞 API Health Check

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "success",
  "message": "Bloomify API is running",
  "timestamp": "2026-04-01T...",
  "environment": "development"
}
```

---

**Last Updated**: April 1, 2026  
**Version**: 4.0.0  
**Status**: ✅ Production Ready
