const express = require('express');
const router = express.Router();
const Garden = require('../models/Garden');
const Plant = require('../models/Plant');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/v1/garden
// @desc    Get user's garden
// @access  Private
router.get('/', async (req, res) => {
  try {
    const garden = await Garden.find({ 
      userId: req.userDoc._id,
      isActive: true 
    })
    .populate('plantId')
    .sort({ plantedDate: -1 });
    
    res.status(200).json({
      status: 'success',
      data: { garden }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   POST /api/v1/garden/add
// @desc    Add plant to garden
// @access  Private
router.post('/add', async (req, res) => {
  try {
    const { plantId, nickname, location } = req.body;
    
    // Get plant details
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }
    
    // Create garden item
    const gardenItem = await Garden.create({
      userId: req.userDoc._id,
      plantId: plantId,
      nickname: nickname || plant.name,
      location: location,
      plantedDate: new Date()
    });
    
    // Update user stats
    req.userDoc.stats.plantsOwned += 1;
    await req.userDoc.save();
    
    // Award XP
    await req.userDoc.awardXP(100, 'Added new plant');
    
    // Check achievements
    await req.userDoc.checkAchievements();
    
    // Update plant stats
    plant.addedToGardenCount += 1;
    await plant.save();
    
    // Generate care tasks
    const Task = require('../models/Task');
    await Task.generateCareTasks(req.userDoc._id, gardenItem._id, plant);
    
    // Populate plant data
    await gardenItem.populate('plantId');
    
    res.status(201).json({
      status: 'success',
      data: { gardenItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/garden/:id
// @desc    Get single garden item
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const gardenItem = await Garden.findOne({
      _id: req.params.id,
      userId: req.userDoc._id
    }).populate('plantId');
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   PUT /api/v1/garden/:id
// @desc    Update garden item
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const allowedFields = ['nickname', 'location', 'notes'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });
    
    const gardenItem = await Garden.findOneAndUpdate(
      { _id: req.params.id, userId: req.userDoc._id },
      updates,
      { new: true, runValidators: true }
    ).populate('plantId');
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   DELETE /api/v1/garden/:id
// @desc    Remove plant from garden
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const gardenItem = await Garden.findOneAndUpdate(
      { _id: req.params.id, userId: req.userDoc._id },
      { isActive: false },
      { new: true }
    );
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    // Update user stats
    req.userDoc.stats.plantsOwned = Math.max(0, req.userDoc.stats.plantsOwned - 1);
    await req.userDoc.save();
    
    // Delete associated tasks
    const Task = require('../models/Task');
    await Task.deleteMany({ gardenItemId: gardenItem._id });
    
    res.status(200).json({
      status: 'success',
      message: 'Plant removed from garden'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   POST /api/v1/garden/:id/water
// @desc    Water plant
// @access  Private
router.post('/:id/water', async (req, res) => {
  try {
    const gardenItem = await Garden.findOne({
      _id: req.params.id,
      userId: req.userDoc._id
    });
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    await gardenItem.water();
    await gardenItem.populate('plantId');
    
    // Check achievements
    await req.userDoc.checkAchievements();
    
    // Emit socket event
    const io = req.app.get('io');
    io.to(req.user.uid).emit('plant_watered', {
      plantId: gardenItem._id,
      xpAwarded: 50
    });
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem },
      message: '+50 XP - Plant watered!'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   POST /api/v1/garden/:id/fertilize
// @desc    Fertilize plant
// @access  Private
router.post('/:id/fertilize', async (req, res) => {
  try {
    const gardenItem = await Garden.findOne({
      _id: req.params.id,
      userId: req.userDoc._id
    });
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    await gardenItem.fertilize();
    await gardenItem.populate('plantId');
    
    await req.userDoc.checkAchievements();
    
    const io = req.app.get('io');
    io.to(req.user.uid).emit('plant_fertilized', {
      plantId: gardenItem._id,
      xpAwarded: 75
    });
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem },
      message: '+75 XP - Plant fertilized!'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   POST /api/v1/garden/:id/prune
// @desc    Prune plant
// @access  Private
router.post('/:id/prune', async (req, res) => {
  try {
    const gardenItem = await Garden.findOne({
      _id: req.params.id,
      userId: req.userDoc._id
    });
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    await gardenItem.prune();
    await gardenItem.populate('plantId');
    
    await req.userDoc.checkAchievements();
    
    const io = req.app.get('io');
    io.to(req.user.uid).emit('plant_pruned', {
      plantId: gardenItem._id,
      xpAwarded: 35
    });
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem },
      message: '+35 XP - Plant pruned!'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   POST /api/v1/garden/:id/photo
// @desc    Add photo to garden item
// @access  Private
router.post('/:id/photo', async (req, res) => {
  try {
    const { url, cloudinaryId, caption } = req.body;
    
    const gardenItem = await Garden.findOne({
      _id: req.params.id,
      userId: req.userDoc._id
    });
    
    if (!gardenItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Garden item not found'
      });
    }
    
    gardenItem.images.push({
      url,
      cloudinaryId,
      caption,
      uploadedAt: new Date()
    });
    
    await gardenItem.save();
    
    res.status(200).json({
      status: 'success',
      data: { gardenItem }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
