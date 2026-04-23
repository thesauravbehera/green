const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,
    index: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  commonNames: [{
    type: String
  }],
  
  // Classification
  category: {
    type: String,
    required: true,
    enum: ['herb', 'flowering', 'succulent', 'vegetable', 'fruit', 'tree', 'shrub', 'vine'],
    index: true
  },
  family: {
    type: String
  },
  
  // Difficulty Level
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'expert'],
    default: 'beginner',
    index: true
  },
  
  // Description
  description: {
    type: String,
    required: true
  },
  benefits: [{
    type: String
  }],
  uses: [{
    type: String
  }],
  
  // Care Instructions
  careInstructions: {
    watering: {
      type: String,
      required: true
    },
    wateringFrequency: {
      type: String,
      enum: ['daily', 'every-2-days', 'twice-weekly', 'weekly', 'bi-weekly'],
      default: 'daily'
    },
    sunlight: {
      type: String,
      required: true
    },
    temperature: {
      type: String,
      required: true
    },
    humidity: {
      type: String,
      required: true
    },
    soil: {
      type: String,
      required: true
    },
    fertilizer: {
      type: String
    },
    pruning: {
      type: String
    }
  },
  
  // Environment Requirements
  environmentRequirements: {
    minTemp: {
      type: Number,
      required: true
    },
    maxTemp: {
      type: Number,
      required: true
    },
    minHumidity: {
      type: Number,
      required: true
    },
    maxHumidity: {
      type: Number,
      required: true
    },
    sunlightHours: {
      type: Number,
      required: true,
      min: 0,
      max: 24
    },
    sunlightType: {
      type: String,
      enum: ['direct', 'indirect', 'partial', 'shade'],
      default: 'direct'
    },
    spaceRequired: {
      type: Number, // in square feet
      required: true
    },
    potSize: {
      type: String,
      enum: ['small', 'medium', 'large', 'extra-large'],
      default: 'medium'
    }
  },
  
  // Growth Information
  lifespan: {
    type: Number, // in days
    required: true,
    default: 365
  },
  growthRate: {
    type: String,
    enum: ['slow', 'moderate', 'fast'],
    default: 'moderate'
  },
  matureHeight: {
    type: String
  },
  matureWidth: {
    type: String
  },
  
  // Seasonal Information
  bloomingSeason: [{
    type: String,
    enum: ['spring', 'summer', 'autumn', 'winter', 'year-round']
  }],
  harvestTime: {
    type: Number // days after planting
  },
  
  // Indian-Specific
  isIndianPlant: {
    type: Boolean,
    default: false,
    index: true
  },
  isMonsoonReady: {
    type: Boolean,
    default: false,
    index: true
  },
  isDroughtTolerant: {
    type: Boolean,
    default: false
  },
  regionalNames: {
    hindi: String,
    kannada: String,
    tamil: String,
    bengali: String,
    marathi: String
  },
  
  // Media
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  videoUrl: {
    type: String
  },
  
  // Tags & Search
  tags: [{
    type: String,
    lowercase: true
  }],
  
  // Rating & Reviews
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  
  // Marketplace Integration
  isAvailableForPurchase: {
    type: Boolean,
    default: false
  },
  averagePrice: {
    type: Number
  },
  
  // External API Data
  perenualId: {
    type: String
  },
  trefleId: {
    type: String
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Analytics
  viewCount: {
    type: Number,
    default: 0
  },
  addedToGardenCount: {
    type: Number,
    default: 0
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
PlantSchema.index({ name: 'text', scientificName: 'text', tags: 'text' });
PlantSchema.index({ category: 1, difficulty: 1 });
PlantSchema.index({ isIndianPlant: 1, isMonsoonReady: 1 });
PlantSchema.index({ rating: -1 });

// Virtual: Primary Image
PlantSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0]?.url || null);
});

// Method: Increment View Count
PlantSchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  await this.save();
};

// Static: Search Plants
PlantSchema.statics.searchPlants = async function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    ...filters
  };
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  return this.find(searchQuery)
    .sort({ rating: -1, addedToGardenCount: -1 })
    .limit(20);
};

// Static: Get Featured Plants
PlantSchema.statics.getFeaturedPlants = async function() {
  return this.find({ isFeatured: true, isActive: true })
    .sort({ rating: -1 })
    .limit(6);
};

// Static: Get Indian Plants
PlantSchema.statics.getIndianPlants = async function() {
  return this.find({ isIndianPlant: true, isActive: true })
    .sort({ addedToGardenCount: -1 })
    .limit(20);
};

// Pre-save hook
PlantSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Plant', PlantSchema);
