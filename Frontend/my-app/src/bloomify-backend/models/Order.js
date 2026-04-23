const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MarketplaceProduct',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    discountedPrice: {
      type: Number
    }
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    shipping: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  shippingAddress: {
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'upi', 'netbanking', 'cod', 'wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  tracking: {
    courier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    currentStatus: String,
    updates: [{
      status: String,
      location: String,
      timestamp: Date,
      description: String
    }]
  },
  cancellation: {
    reason: String,
    cancelledBy: {
      type: String,
      enum: ['user', 'admin', 'system']
    },
    cancelledAt: Date
  },
  deliveredAt: Date,
  notes: String
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `BLM${year}${month}${random}`;
  }
  next();
});

// Calculate total
orderSchema.methods.calculateTotal = function() {
  this.pricing.total = 
    this.pricing.subtotal + 
    this.pricing.shipping + 
    this.pricing.tax - 
    this.pricing.discount;
  return this.pricing.total;
};

// Update status
orderSchema.methods.updateStatus = function(newStatus, additionalData = {}) {
  this.status = newStatus;
  
  if (newStatus === 'delivered') {
    this.deliveredAt = new Date();
  }
  
  if (newStatus === 'cancelled' && additionalData.reason) {
    this.cancellation = {
      reason: additionalData.reason,
      cancelledBy: additionalData.cancelledBy || 'user',
      cancelledAt: new Date()
    };
  }
  
  return this.save();
};

// Add tracking update
orderSchema.methods.addTrackingUpdate = function(status, location, description) {
  if (!this.tracking.updates) {
    this.tracking.updates = [];
  }
  
  this.tracking.updates.push({
    status,
    location,
    description,
    timestamp: new Date()
  });
  
  this.tracking.currentStatus = status;
  
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
