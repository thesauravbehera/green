const express = require('express');
const router = express.Router();
const { protect, optionalAuth } = require('../middleware/auth');
const CommunityPost = require('../models/CommunityPost');
const Notification = require('../models/Notification');
const cloudinary = require('../config/cloudinary');

// @route   GET /api/v1/community
// @desc    Get all community posts
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { category, tag, author, sort = 'recent', page = 1, limit = 10 } = req.query;
    
    const query = { status: 'active' };
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Filter by author
    if (author) {
      query.author = author;
    }
    
    // Sort options
    let sortOption = { createdAt: -1 }; // Default: recent
    
    switch (sort) {
      case 'popular':
        sortOption = { 'likes.length': -1, views: -1 };
        break;
      case 'trending':
        sortOption = { views: -1, createdAt: -1 };
        break;
      case 'commented':
        sortOption = { 'comments.length': -1 };
        break;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [posts, total] = await Promise.all([
      CommunityPost.find(query)
        .populate('author', 'name avatar level badges')
        .populate('plant', 'name species image')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit)),
      CommunityPost.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/community/:id
// @desc    Get single post
// @access  Public
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
      .populate('author', 'name avatar level badges')
      .populate('plant', 'name species image')
      .populate('comments.author', 'name avatar');
    
    if (!post || post.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/community
// @desc    Create new post
// @access  Private
router.post('/', protect, async (req, res, next) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id
    };
    
    const post = await CommunityPost.create(postData);
    
    await post.populate('author', 'name avatar level badges');
    
    // Emit socket event for new post
    const io = req.app.get('io');
    io.emit('community:new_post', post);
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/community/:id
// @desc    Update post
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
  try {
    let post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }
    
    post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('author', 'name avatar level badges');
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/v1/community/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }
    
    // Delete images from Cloudinary
    if (post.images && post.images.length > 0) {
      for (const image of post.images) {
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId);
        }
      }
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/v1/community/:id/like
// @desc    Like/Unlike post
// @access  Private
router.put('/:id/like', protect, async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    const isLiked = post.isLikedBy(req.user.id);
    
    if (isLiked) {
      await post.removeLike(req.user.id);
    } else {
      await post.addLike(req.user.id);
      
      // Notify post author
      if (post.author.toString() !== req.user.id) {
        await Notification.createNotification({
          user: post.author,
          type: 'community_like',
          title: '❤️ Someone liked your post',
          message: `${req.user.name} liked your post`,
          icon: '❤️',
          priority: 'low',
          relatedModel: 'CommunityPost',
          relatedId: post._id,
          actionUrl: `/community/${post._id}`
        });
      }
    }
    
    await post.populate('author', 'name avatar level badges');
    
    res.json({
      success: true,
      data: post,
      isLiked: !isLiked
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/community/:id/comment
// @desc    Add comment to post
// @access  Private
router.post('/:id/comment', protect, async (req, res, next) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }
    
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    await post.addComment(req.user.id, content);
    
    // Notify post author
    if (post.author.toString() !== req.user.id) {
      await Notification.createNotification({
        user: post.author,
        type: 'community_comment',
        title: '💬 New comment on your post',
        message: `${req.user.name} commented on your post`,
        icon: '💬',
        priority: 'medium',
        relatedModel: 'CommunityPost',
        relatedId: post._id,
        actionUrl: `/community/${post._id}`
      });
    }
    
    await post.populate([
      { path: 'author', select: 'name avatar level badges' },
      { path: 'comments.author', select: 'name avatar' }
    ]);
    
    // Emit socket event
    const io = req.app.get('io');
    io.emit('community:new_comment', {
      postId: post._id,
      comment: post.comments[post.comments.length - 1]
    });
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/community/:id/report
// @desc    Report post
// @access  Private
router.post('/:id/report', protect, async (req, res, next) => {
  try {
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Report reason is required'
      });
    }
    
    const post = await CommunityPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }
    
    // Check if user already reported
    const alreadyReported = post.reports.some(
      report => report.user.toString() === req.user.id
    );
    
    if (alreadyReported) {
      return res.status(400).json({
        success: false,
        message: 'You have already reported this post'
      });
    }
    
    post.reports.push({
      user: req.user.id,
      reason
    });
    
    // Auto-hide post if it has 5+ reports
    if (post.reports.length >= 5) {
      post.status = 'reported';
    }
    
    await post.save();
    
    res.json({
      success: true,
      message: 'Post reported successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/community/upload
// @desc    Upload image to Cloudinary
// @access  Private
router.post('/upload', protect, async (req, res, next) => {
  try {
    const { image } = req.body; // Base64 string
    
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }
    
    const result = await cloudinary.uploader.upload(image, {
      folder: 'bloomify/community',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
