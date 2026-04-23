const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Firebase Auth Integration
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  photoURL: {
    type: String,
    default: null
  },
  
  // Gamification
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // User Role
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  
  // Subscription
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'trial'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days
    },
    trialEndsAt: {
      type: Date,
      default: () => new Date(+new Date() + 30*24*60*60*1000)
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String
  },
  
  // Settings
  settings: {
    language: {
      type: String,
      enum: ['en', 'hi', 'kn', 'ta'],
      default: 'en'
    },
    currency: {
      type: String,
      default: 'INR'
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      taskReminders: {
        type: Boolean,
        default: true
      },
      communityActivity: {
        type: Boolean,
        default: true
      },
      marketplaceDeals: {
        type: Boolean,
        default: true
      }
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'public'
      },
      showGarden: {
        type: Boolean,
        default: true
      },
      showAchievements: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Statistics
  stats: {
    plantsOwned: {
      type: Number,
      default: 0
    },
    tasksCompleted: {
      type: Number,
      default: 0
    },
    communityPosts: {
      type: Number,
      default: 0
    },
    communityLikes: {
      type: Number,
      default: 0
    },
    communityComments: {
      type: Number,
      default: 0
    },
    marketplacePurchases: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    achievements: [{
      type: String
    }]
  },
  
  // Skill Level
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner'
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isDemoAccount: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: {
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
UserSchema.index({ email: 1 });
UserSchema.index({ uid: 1 });
UserSchema.index({ level: -1 });
UserSchema.index({ xp: -1 });

// Virtual: XP needed for next level
UserSchema.virtual('xpForNextLevel').get(function() {
  return (this.level * 1000) - this.xp;
});

// Virtual: Is Premium
UserSchema.virtual('isPremium').get(function() {
  return this.subscription.plan !== 'free' && 
         this.subscription.status === 'active' &&
         new Date() < new Date(this.subscription.expiresAt);
});

// Method: Award XP
UserSchema.methods.awardXP = async function(amount, reason) {
  const oldLevel = this.level;
  this.xp += amount;
  this.level = Math.floor(this.xp / 1000) + 1;
  
  await this.save();
  
  // Check if leveled up
  if (this.level > oldLevel) {
    // Create level-up notification
    const Notification = mongoose.model('Notification');
    await Notification.create({
      userId: this._id,
      type: 'level_up',
      title: `Level ${this.level} Achieved!`,
      message: `Congratulations! You've reached level ${this.level}!`,
      data: {
        oldLevel,
        newLevel: this.level,
        xpAwarded: amount
      }
    });
    
    return { leveledUp: true, oldLevel, newLevel: this.level };
  }
  
  return { leveledUp: false };
};

// Method: Update Streak
UserSchema.methods.updateStreak = async function() {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastLogin = new Date(this.lastLoginAt).setHours(0, 0, 0, 0);
  const daysSinceLogin = (today - lastLogin) / (1000 * 60 * 60 * 24);
  
  if (daysSinceLogin === 1) {
    // Consecutive day
    this.streak += 1;
    await this.awardXP(25, 'Daily login streak');
  } else if (daysSinceLogin > 1) {
    // Streak broken
    this.streak = 1;
  }
  // Same day login = no change
  
  this.lastLoginAt = new Date();
  await this.save();
  
  return this.streak;
};

// Method: Check Achievement
UserSchema.methods.checkAchievements = async function() {
  const achievements = [];
  
  // First Plant
  if (this.stats.plantsOwned === 1 && !this.stats.achievements.includes('first_plant')) {
    achievements.push('first_plant');
  }
  
  // Plant Collector (10 plants)
  if (this.stats.plantsOwned >= 10 && !this.stats.achievements.includes('plant_collector')) {
    achievements.push('plant_collector');
  }
  
  // Week Streak
  if (this.streak >= 7 && !this.stats.achievements.includes('week_streak')) {
    achievements.push('week_streak');
  }
  
  // Month Streak
  if (this.streak >= 30 && !this.stats.achievements.includes('month_streak')) {
    achievements.push('month_streak');
  }
  
  // Task Master (100 tasks)
  if (this.stats.tasksCompleted >= 100 && !this.stats.achievements.includes('task_master')) {
    achievements.push('task_master');
  }
  
  // Community Star (50 posts)
  if (this.stats.communityPosts >= 50 && !this.stats.achievements.includes('community_star')) {
    achievements.push('community_star');
  }
  
  if (achievements.length > 0) {
    this.stats.achievements.push(...achievements);
    await this.save();
    
    // Award XP for each achievement
    await this.awardXP(achievements.length * 100, 'Achievements unlocked');
  }
  
  return achievements;
};

// Pre-save hook
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', UserSchema);
