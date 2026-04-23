const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');

// @route   GET /api/v1/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   PUT /api/v1/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.user.uid !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this profile'
      });
    }
    
    const allowedFields = ['displayName', 'photoURL', 'skillLevel'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });
    
    const user = await User.findOneAndUpdate(
      { uid: req.params.id },
      updates,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   PUT /api/v1/users/:id/settings
// @desc    Update user settings
// @access  Private
router.put('/:id/settings', protect, async (req, res) => {
  try {
    if (req.user.uid !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this profile'
      });
    }
    
    const user = await User.findOneAndUpdate(
      { uid: req.params.id },
      { settings: req.body },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/users/:id/stats
// @desc    Get user statistics
// @access  Public
router.get('/:id/stats', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    const stats = {
      level: user.level,
      xp: user.xp,
      xpForNextLevel: user.xpForNextLevel,
      streak: user.streak,
      ...user.stats
    };
    
    res.status(200).json({
      status: 'success',
      data: { stats }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/users/:id/achievements
// @desc    Get user achievements
// @access  Public
router.get('/:id/achievements', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    // Achievement definitions
    const achievementDefinitions = {
      first_plant: {
        id: 'first_plant',
        name: 'Green Thumb Beginner',
        description: 'Added your first plant',
        icon: '🌱',
        xpReward: 100
      },
      plant_collector: {
        id: 'plant_collector',
        name: 'Plant Collector',
        description: 'Own 10 or more plants',
        icon: '🌿',
        xpReward: 500
      },
      week_streak: {
        id: 'week_streak',
        name: 'Week Warrior',
        description: 'Maintained a 7-day streak',
        icon: '🔥',
        xpReward: 200
      },
      month_streak: {
        id: 'month_streak',
        name: 'Month Master',
        description: 'Maintained a 30-day streak',
        icon: '⭐',
        xpReward: 1000
      },
      task_master: {
        id: 'task_master',
        name: 'Task Master',
        description: 'Completed 100 tasks',
        icon: '✅',
        xpReward: 500
      },
      community_star: {
        id: 'community_star',
        name: 'Community Star',
        description: 'Posted 50 times in community',
        icon: '🌟',
        xpReward: 750
      }
    };
    
    const achievements = user.stats.achievements.map(id => ({
      ...achievementDefinitions[id],
      unlocked: true
    }));
    
    res.status(200).json({
      status: 'success',
      data: { achievements }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/users/leaderboard
// @desc    Get global leaderboard
// @access  Public
router.get('/leaderboard/global', async (req, res) => {
  try {
    const { limit = 100, city } = req.query;
    
    const query = { isActive: true };
    if (city) {
      query['environmentProfile.geolocation.city'] = city;
    }
    
    const users = await User.find(query)
      .select('uid displayName photoURL level xp stats.plantsOwned')
      .sort({ xp: -1, level: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      status: 'success',
      data: { leaderboard: users }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   DELETE /api/v1/users/:id
// @desc    Delete user account
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    if (req.user.uid !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this account'
      });
    }
    
    await User.findOneAndUpdate(
      { uid: req.params.id },
      { isActive: false },
      { new: true }
    );
    
    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
