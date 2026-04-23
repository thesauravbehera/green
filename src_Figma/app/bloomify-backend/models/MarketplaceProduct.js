const mongoose = require('mongoose');

const marketplaceProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  category: {
    type: String,
    enum: ['plants', 'seeds', 'pots', 'tools', 'fertilizers', 'soil', 'accessories', 'decor'],
    required: true
  },
  subcategory: {
    type: String
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  images: [{
    url: String,
    publicId: String,
    alt: String
  }],
  inventory: {
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    sku: {
      type: String,
      unique: true
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    }
  },
  specifications: {
    type: Map,
    of: String
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    images: [String],
    helpful: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  shipping: {
    isFree: {
      type: Boolean,
      default: false
    },
    cost: {
      type: Number,
      default: 0
    },
    estimatedDays: {
      min: Number,
      max: Number
    }
  },
  views: {
    type: Number,
    default: 0
  },
  purchases: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
marketplaceProductSchema.index({ category: 1, isActive: 1 });
marketplaceProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
marketplaceProductSchema.index({ 'price.amount': 1 });
marketplaceProductSchema.index({ 'ratings.average': -1 });

// Virtual for discounted price
marketplaceProductSchema.virtual('discountedPrice').get(function() {
  if (this.price.discountPercentage > 0) {
    return this.price.amount * (1 - this.price.discountPercentage / 100);
  }
  return this.price.amount;
});

// Virtual for stock status
marketplaceProductSchema.virtual('stockStatus').get(function() {
  if (this.inventory.stock === 0) return 'out_of_stock';
  if (this.inventory.stock <= this.inventory.lowStockThreshold) return 'low_stock';
  return 'in_stock';
});

// Add review
marketplaceProductSchema.methods.addReview = async function(userId, rating, comment, images = []) {
  this.reviews.push({
    user: userId,
    rating,
    comment,
    images
  });
  
  // Recalculate average rating
  this.calculateAverageRating();
  
  return this.save();
};

// Calculate average rating
marketplaceProductSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.ratings.average = 0;
    this.ratings.count = 0;
    return;
  }
  
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.ratings.average = sum / this.reviews.length;
  this.ratings.count = this.reviews.length;
};

// Decrement stock
marketplaceProductSchema.methods.decrementStock = function(quantity = 1) {
  if (this.inventory.stock >= quantity) {
    this.inventory.stock -= quantity;
    this.purchases += 1;
  } else {
    throw new Error('Insufficient stock');
  }
  return this.save();
};

module.exports = mongoose.model('MarketplaceProduct', marketplaceProductSchema);
