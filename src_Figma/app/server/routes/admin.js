const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Plant = require('../models/Plant');
const Garden = require('../models/Garden');
const CommunityPost = require('../models/CommunityPost');
const Order = require('../models/Order');
const MarketplaceProduct = require('../models/MarketplaceProduct');
const Notification = require('../models/Notification');

// All routes require admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/v1/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private/Admin
router.get('/dashboard', async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalPlants,
      totalOrders,
      totalRevenue,
      activeUsers,
      pendingOrders,
      reportedPosts
    ] = await Promise.all([
      User.countDocuments(),
      Plant.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { 'payment.status': 'completed' } },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } }
      ]),
      User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
      Order.countDocuments({ status: 'pending' }),
      CommunityPost.countDocuments({ status: 'reported' })
    ]);
    
    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        growth: '+12%' // TODO: Calculate actual growth
      },
      plants: {
        total: totalPlants,
        averagePerUser: (totalPlants / totalUsers).toFixed(1)
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        revenue: totalRevenue[0]?.total || 0
      },
      community: {
        posts: await CommunityPost.countDocuments(),
        reported: reportedPosts
      }
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/admin/users
// @desc    Get all users with filters
// @access  Private/Admin
router.get('/users', async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) query.role = role;
    if (status) query.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/admin/users/:id
// @desc    Update user (admin)
// @access  Private/Admin
router.put('/users/:id', async (req, res, next) => {
  try {
    const { role, status, isPremium } = req.body;
    
    const updateData = {};
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (isPremium !== undefined) updateData.isPremium = isPremium;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/v1/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Delete user's data
    await Promise.all([
      Garden.deleteMany({ user: user._id }),
      Plant.deleteMany({ user: user._id }),
      CommunityPost.deleteMany({ author: user._id }),
      Order.deleteMany({ user: user._id }),
      Notification.deleteMany({ user: user._id })
    ]);
    
    await user.deleteOne();
    
    res.json({
      success: true,
      message: 'User and associated data deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email')
        .populate('items.product', 'name price')
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

// @route   PUT /api/v1/admin/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/orders/:id/status', async (req, res, next) => {
  try {
    const { status, trackingInfo } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    await order.updateStatus(status);
    
    // Update tracking info if provided
    if (trackingInfo) {
      order.tracking = {
        ...order.tracking,
        ...trackingInfo
      };
      await order.save();
    }
    
    // Notify user
    await Notification.createNotification({
      user: order.user,
      type: 'marketplace_order',
      title: `Order ${status}`,
      message: `Your order #${order.orderNumber} is now ${status}`,
      icon: '📦',
      priority: 'high',
      relatedModel: 'Order',
      relatedId: order._id,
      actionUrl: `/marketplace/orders/${order._id}`
    });
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/admin/community/reported
// @desc    Get reported posts
// @access  Private/Admin
router.get('/community/reported', async (req, res, next) => {
  try {
    const posts = await CommunityPost.find({ status: 'reported' })
      .populate('author', 'name email avatar')
      .populate('reports.user', 'name email')
      .sort({ 'reports.createdAt': -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/admin/community/:id/moderate
// @desc    Moderate community post
// @access  Private/Admin
router.put('/community/:id/moderate', async (req, res, next) => {
  try {
    const { action } = req.body; // 'approve', 'hide', 'delete'
    
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    switch (action) {
      case 'approve':
        post.status = 'active';
        post.reports = [];
        break;
      case 'hide':
        post.status = 'hidden';
        break;
      case 'delete':
        await post.deleteOne();
        return res.json({
          success: true,
          message: 'Post deleted successfully'
        });
    }
    
    await post.save();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/admin/products
// @desc    Get all marketplace products
// @access  Private/Admin
router.get('/products', async (req, res, next) => {
  try {
    const { category, status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (status) query.isActive = status === 'active';
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, total] = await Promise.all([
      MarketplaceProduct.find(query)
        .populate('seller', 'name email')
        .sort({ createdAt: -1 })
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

// @route   POST /api/v1/admin/products
// @desc    Create new product
// @access  Private/Admin
router.post('/products', async (req, res, next) => {
  try {
    const product = await MarketplaceProduct.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/admin/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/products/:id', async (req, res, next) => {
  try {
    const product = await MarketplaceProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/v1/admin/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await MarketplaceProduct.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    await product.deleteOne();
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/admin/analytics
// @desc    Get platform analytics
// @access  Private/Admin
router.get('/analytics', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    
    const filter = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};
    
    const [
      userGrowth,
      orderStats,
      revenueStats,
      popularProducts,
      activeUsers
    ] = await Promise.all([
      User.aggregate([
        { $match: filter },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalAmount: { $sum: '$pricing.total' }
          }
        }
      ]),
      Order.aggregate([
        { $match: { 'payment.status': 'completed', ...filter } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            revenue: { $sum: '$pricing.total' }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      MarketplaceProduct.find().sort({ purchases: -1 }).limit(10),
      User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
    ]);
    
    res.json({
      success: true,
      data: {
        userGrowth,
        orderStats,
        revenueStats,
        popularProducts,
        activeUsers
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
