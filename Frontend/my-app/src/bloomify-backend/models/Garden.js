const mongoose = require('mongoose');

const GardenSchema = new mongoose.Schema({
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Plant Reference
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  
  // Custom Name
  nickname: {
    type: String,
    trim: true
  },
  
  // Planting Information
  plantedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Location Details
  location: {
    balconyDirection: {
      type: String,
      enum: ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest'],
      required: true
    },
    floorLevel: {
      type: Number,
      required: true
    },
    dimensions: {
      length: Number,
      width: Number,
      area: Number
    },
    potSize: {
      type: String,
      enum: ['small', 'medium', 'large', 'extra-large'],
      required: true
    },
    indoorOutdoor: {
      type: String,
      enum: ['indoor', 'outdoor', 'balcony'],
      default: 'balcony'
    }
  },
  
  // Health Metrics (0-100)
  health: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  growth: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  hydration: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  happiness: {
    type: Number,
    default: 80,
    min: 0,
    max: 100
  },
  
  // Care History
  lastWatered: {
    type: Date,
    default: Date.now
  },
  lastFertilized: {
    type: Date,
    default: Date.now
  },
  lastPruned: {
    type: Date
  },
  
  // Care Log
  careLog: [{
    action: {
      type: String,
      enum: ['water', 'fertilize', 'prune', 'transplant', 'treat', 'note'],
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String,
    xpAwarded: Number
  }],
  
  // Notes
  notes: {
    type: String,
    maxlength: 1000
  },
  
  // Images
  images: [{
    url: String,
    cloudinaryId: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Growth Milestones
  milestones: [{
    type: {
      type: String,
      enum: ['planted', 'first_leaf', 'first_flower', 'first_fruit', 'mature', 'harvest']
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['healthy', 'needs_attention', 'sick', 'dormant', 'harvested', 'deceased'],
    default: 'healthy'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
GardenSchema.index({ userId: 1, isActive: 1 });
GardenSchema.index({ plantedDate: -1 });
GardenSchema.index({ health: -1 });

// Virtual: Days Since Planted
GardenSchema.virtual('daysSincePlanted').get(function() {
  return Math.floor((Date.now() - this.plantedDate) / (1000 * 60 * 60 * 24));
});

// Virtual: Hours Since Watered
GardenSchema.virtual('hoursSinceWatered').get(function() {
  return Math.floor((Date.now() - this.lastWatered) / (1000 * 60 * 60));
});

// Method: Calculate Health
GardenSchema.methods.calculateHealth = function() {
  let health = 100;
  
  // Hydration factor
  const hoursSinceWatered = this.hoursSinceWatered;
  if (hoursSinceWatered > 72) {
    health -= 40;
  } else if (hoursSinceWatered > 48) {
    health -= 20;
  } else if (hoursSinceWatered > 24) {
    health -= 10;
  }
  
  // Fertilization factor
  const daysSinceFertilized = Math.floor((Date.now() - this.lastFertilized) / (1000 * 60 * 60 * 24));
  if (daysSinceFertilized > 60) {
    health -= 15;
  } else if (daysSinceFertilized > 30) {
    health -= 10;
  }
  
  // Growth stage bonus (young plants are resilient)
  if (this.growth < 30) {
    health += 5;
  }
  
  return Math.max(0, Math.min(100, health));
};

// Method: Water Plant
GardenSchema.methods.water = async function() {
  this.lastWatered = new Date();
  this.hydration = Math.min(100, this.hydration + 30);
  this.health = this.calculateHealth();
  
  // Add to care log
  this.careLog.push({
    action: 'water',
    date: new Date(),
    xpAwarded: 50
  });
  
  await this.save();
  
  // Award XP to user
  const User = mongoose.model('User');
  const user = await User.findById(this.userId);
  if (user) {
    await user.awardXP(50, 'Watered plant');
    await user.updateStreak();
  }
  
  return this;
};

// Method: Fertilize Plant
GardenSchema.methods.fertilize = async function() {
  this.lastFertilized = new Date();
  this.growth = Math.min(100, this.growth + 15);
  this.health = Math.min(100, this.health + 10);
  
  this.careLog.push({
    action: 'fertilize',
    date: new Date(),
    xpAwarded: 75
  });
  
  await this.save();
  
  const User = mongoose.model('User');
  const user = await User.findById(this.userId);
  if (user) {
    await user.awardXP(75, 'Fertilized plant');
  }
  
  return this;
};

// Method: Prune Plant
GardenSchema.methods.prune = async function() {
  this.lastPruned = new Date();
  this.health = Math.min(100, this.health + 5);
  this.happiness = Math.min(100, this.happiness + 10);
  
  this.careLog.push({
    action: 'prune',
    date: new Date(),
    xpAwarded: 35
  });
  
  await this.save();
  
  const User = mongoose.model('User');
  const user = await User.findById(this.userId);
  if (user) {
    await user.awardXP(35, 'Pruned plant');
  }
  
  return this;
};

// Method: Update Growth
GardenSchema.methods.updateGrowth = async function(plantData) {
  const daysSincePlanted = this.daysSincePlanted;
  const lifespan = plantData.lifespan || 365;
  
  // Calculate expected growth percentage
  const expectedGrowth = Math.min(100, (daysSincePlanted / lifespan) * 100);
  this.growth = expectedGrowth;
  
  // Recalculate health
  this.health = this.calculateHealth();
  
  // Check for milestones
  if (this.growth >= 25 && !this.milestones.find(m => m.type === 'first_leaf')) {
    this.milestones.push({ type: 'first_leaf', date: new Date(), notes: 'First leaves appeared!' });
    
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (user) {
      await user.awardXP(25, 'Plant growth milestone: 25%');
    }
  }
  
  if (this.growth >= 50 && !this.milestones.find(m => m.type === 'first_flower')) {
    this.milestones.push({ type: 'first_flower', date: new Date(), notes: 'First flower bloomed!' });
    
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (user) {
      await user.awardXP(50, 'Plant growth milestone: 50%');
    }
  }
  
  if (this.growth >= 75 && !this.milestones.find(m => m.type === 'mature')) {
    this.milestones.push({ type: 'mature', date: new Date(), notes: 'Plant reached maturity!' });
    
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (user) {
      await user.awardXP(100, 'Plant growth milestone: 75%');
    }
  }
  
  await this.save();
  return this;
};

// Pre-save hook
GardenSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Update status based on health
  if (this.health < 20) {
    this.status = 'sick';
  } else if (this.health < 50) {
    this.status = 'needs_attention';
  } else {
    this.status = 'healthy';
  }
  
  next();
});

module.exports = mongoose.model('Garden', GardenSchema);
