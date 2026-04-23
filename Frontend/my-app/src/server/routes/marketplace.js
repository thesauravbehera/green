const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const MarketplaceProduct = require('../models/MarketplaceProduct');
const Order = require('../models/Order');

// @route   GET /api/v1/marketplace
// @desc    Get all products
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort = 'recent',
      page = 1,
      limit = 20,
      featured
    } = req.query;
    
    const query = { isActive: true };
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.amount'].$lte = parseFloat(maxPrice);
    }
    
    // Sort options
    let sortOption = { createdAt: -1 }; // Default: recent
    
    switch (sort) {
      case 'price_low':
        sortOption = { 'price.amount': 1 };
        break;
      case 'price_high':
        sortOption = { 'price.amount': -1 };
        break;
      case 'popular':
        sortOption = { purchases: -1, views: -1 };
        break;
      case 'rating':
        sortOption = { 'ratings.average': -1 };
        break;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, total] = await Promise.all([
      MarketplaceProduct.find(query)
        .populate('seller', 'name avatar')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      MarketplaceProduct.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      count: products.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: products
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/marketplace/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await MarketplaceProduct.findById(req.params.id)
      .populate('seller', 'name avatar')
      .populate('reviews.user', 'name avatar');
    
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Increment views
    product.views += 1;
    await product.save();
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/marketplace/:id/review
// @desc    Add product review
// @access  Private
router.post('/:id/review', protect, async (req, res, next) => {
  try {
    const { rating, comment, images } = req.body;
    
    if (!rating) {
      return res.status(400).json({
        success: false,
        message: 'Rating is required'
      });
    }
    
    const product = await MarketplaceProduct.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user.id
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }
    
    await product.addReview(req.user.id, rating, comment, images);
    
    await product.populate('reviews.user', 'name avatar');
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/marketplace/categories/list
// @desc    Get product categories with counts
// @access  Public
router.get('/categories/list', async (req, res, next) => {
  try {
    const categories = await MarketplaceProduct.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price.amount' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/marketplace/orders
// @desc    Create new order
// @access  Private
router.post('/orders', protect, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }
    
    // Calculate pricing
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await MarketplaceProduct.findById(item.product);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`
        });
      }
      
      if (product.inventory.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }
      
      const itemPrice = product.price.amount;
      const discountedPrice = product.discountedPrice;
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: itemPrice,
        discountedPrice: discountedPrice
      });
      
      subtotal += discountedPrice * item.quantity;
    }
    
    // Calculate shipping (free if subtotal > ₹500)
    const shipping = subtotal > 500 ? 0 : 50;
    
    // Calculate tax (18% GST)
    const tax = subtotal * 0.18;
    
    const total = subtotal + shipping + tax;
    
    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      pricing: {
        subtotal,
        shipping,
        tax,
        discount: 0,
        total
      },
      shippingAddress,
      payment: {
        method: paymentMethod,
        status: 'pending'
      }
    });
    
    // Decrement product stock
    for (const item of orderItems) {
      const product = await MarketplaceProduct.findById(item.product);
      await product.decrementStock(item.quantity);
    }
    
    await order.populate('items.product', 'name images price');
    
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/marketplace/orders/my-orders
// @desc    Get user's orders
// @access  Private
router.get('/orders/my-orders', protect, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { user: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('items.product', 'name images price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: orders
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/marketplace/orders/:id
// @desc    Get single order
// @access  Private
router.get('/orders/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check ownership
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/marketplace/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/orders/:id/cancel', protect, async (req, res, next) => {
  try {
    const { reason } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check ownership
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }
    
    // Check if order can be cancelled
    if (['delivered', 'cancelled', 'refunded'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled'
      });
    }
    
    await order.updateStatus('cancelled', {
      reason: reason || 'Cancelled by user',
      cancelledBy: 'user'
    });
    
    // Restore product stock
    for (const item of order.items) {
      const product = await MarketplaceProduct.findById(item.product);
      if (product) {
        product.inventory.stock += item.quantity;
        await product.save();
      }
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
