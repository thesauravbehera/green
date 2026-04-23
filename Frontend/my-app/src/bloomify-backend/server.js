const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const plantRoutes = require('./routes/plants');
const gardenRoutes = require('./routes/garden');
const taskRoutes = require('./routes/tasks');
const communityRoutes = require('./routes/community');
const marketplaceRoutes = require('./routes/marketplace');
const weatherRoutes = require('./routes/weather');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const { protect } = require('./middleware/auth');

// Import services
const { initializeSocketIO } = require('./services/socketService');
const { runDailyTasks } = require('./services/cronService');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(compression());

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  process.exit(1);
});

// Initialize Socket.IO handlers
initializeSocketIO(io);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Bloomify API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/plants', plantRoutes);
app.use('/api/v1/garden', protect, gardenRoutes);
app.use('/api/v1/tasks', protect, taskRoutes);
app.use('/api/v1/community', communityRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/ai', protect, aiRoutes);
app.use('/api/v1/admin', protect, adminRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use(errorHandler);

// Cron Jobs
// Run daily tasks at midnight
cron.schedule('0 0 * * *', () => {
  console.log('🕐 Running daily cron jobs...');
  runDailyTasks();
});

// Update plant growth every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('🌱 Updating plant growth...');
  const { updatePlantGrowth } = require('./services/gardenService');
  await updatePlantGrowth();
});

// Check for overdue tasks every hour
cron.schedule('0 * * * *', async () => {
  console.log('⏰ Checking for overdue tasks...');
  const { checkOverdueTasks } = require('./services/gardenService');
  await checkOverdueTasks(io);
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🌿 BLOOMIFY API SERVER v4.0.0                 ║
║                                                       ║
║        Environment: ${(process.env.NODE_ENV || 'development').toUpperCase().padEnd(33)} ║
║        Port: ${PORT.toString().padEnd(42)} ║
║        URL: http://localhost:${PORT.toString().padEnd(25)} ║
║                                                       ║
║        Status: ✅ ONLINE                             ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

module.exports = { app, server, io };
