const admin = require('firebase-admin');
const User = require('../models/User');

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Protect routes - Verify Firebase token
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route'
      });
    }
    
    // Check for demo admin token
    if (token === 'DEMO_ADMIN_TOKEN' || token === 'demo-admin-token') {
      req.user = {
        uid: 'demo-admin-id',
        email: 'admin@bloomify.io',
        role: 'admin'
      };
      
      // Get or create demo admin in database
      let dbUser = await User.findOne({ uid: 'demo-admin-id' });
      if (!dbUser) {
        dbUser = await User.create({
          uid: 'demo-admin-id',
          email: 'admin@bloomify.io',
          displayName: 'NEXUS ADMIN',
          role: 'admin',
          isDemoAccount: true,
          subscription: {
            plan: 'enterprise',
            status: 'active'
          }
        });
      }
      
      req.userDoc = dbUser;
      return next();
    }
    
    // Check for demo guest token
    if (token === 'DEMO_GUEST_TOKEN' || token === 'demo-guest-token') {
      req.user = {
        uid: 'demo-guest-id',
        email: 'guest@bloomify.io',
        role: 'user'
      };
      
      let dbUser = await User.findOne({ uid: 'demo-guest-id' });
      if (!dbUser) {
        dbUser = await User.create({
          uid: 'demo-guest-id',
          email: 'guest@bloomify.io',
          displayName: 'GUEST GARDENER',
          role: 'user',
          isDemoAccount: true
        });
      }
      
      req.userDoc = dbUser;
      return next();
    }
    
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Get user from database
    let dbUser = await User.findOne({ uid: decodedToken.uid });
    
    // Create user if doesn't exist
    if (!dbUser) {
      dbUser = await User.create({
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || decodedToken.email.split('@')[0],
        photoURL: decodedToken.picture || null,
        isEmailVerified: decodedToken.email_verified || false
      });
    } else {
      // Update last login
      await dbUser.updateStreak();
    }
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: dbUser.role
    };
    req.userDoc = dbUser;
    
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token or unauthorized'
    });
  }
};

// Check if user is premium
exports.requirePremium = async (req, res, next) => {
  if (!req.userDoc.isPremium) {
    return res.status(403).json({
      status: 'error',
      message: 'Premium subscription required',
      upgradeUrl: '/marketplace/premium'
    });
  }
  next();
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Optional auth - doesn't fail if no token
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return next();
    }
    
    // Check demo tokens
    if (token === 'DEMO_ADMIN_TOKEN' || token === 'demo-admin-token') {
      req.user = { uid: 'demo-admin-id', email: 'admin@bloomify.io', role: 'admin' };
      const dbUser = await User.findOne({ uid: 'demo-admin-id' });
      if (dbUser) req.userDoc = dbUser;
      return next();
    }
    
    if (token === 'DEMO_GUEST_TOKEN' || token === 'demo-guest-token') {
      req.user = { uid: 'demo-guest-id', email: 'guest@bloomify.io', role: 'user' };
      const dbUser = await User.findOne({ uid: 'demo-guest-id' });
      if (dbUser) req.userDoc = dbUser;
      return next();
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    const dbUser = await User.findOne({ uid: decodedToken.uid });
    
    if (dbUser) {
      req.user = { uid: decodedToken.uid, email: decodedToken.email, role: dbUser.role };
      req.userDoc = dbUser;
    }
    
    next();
  } catch (error) {
    // Silently fail - user just won't be authenticated
    next();
  }
};
