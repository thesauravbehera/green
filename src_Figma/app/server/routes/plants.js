const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const { optionalAuth } = require('../middleware/auth');

// @route   GET /api/v1/plants/catalog
// @desc    Get plant catalog with pagination
// @access  Public
router.get('/catalog', optionalAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      difficulty,
      indian,
      monsoonReady,
      search 
    } = req.query;
    
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (indian === 'true') query.isIndianPlant = true;
    if (monsoonReady === 'true') query.isMonsoonReady = true;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { scientificName: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }
    
    const plants = await Plant.find(query)
      .sort({ rating: -1, addedToGardenCount: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Plant.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      data: {
        plants,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalPlants: count
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/plants/featured
// @desc    Get featured plants
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const plants = await Plant.getFeaturedPlants();
    
    res.status(200).json({
      status: 'success',
      data: { plants }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/plants/indian
// @desc    Get Indian plants
// @access  Public
router.get('/indian', async (req, res) => {
  try {
    const plants = await Plant.getIndianPlants();
    
    res.status(200).json({
      status: 'success',
      data: { plants }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/plants/search
// @desc    Search plants
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, category, difficulty } = req.query;
    
    const filters = {};
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    
    const plants = await Plant.searchPlants(q, filters);
    
    res.status(200).json({
      status: 'success',
      data: { plants }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/plants/:id
// @desc    Get single plant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }
    
    // Increment view count
    await plant.incrementViewCount();
    
    res.status(200).json({
      status: 'success',
      data: { plant }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// @route   GET /api/v1/plants/category/:category
// @desc    Get plants by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const plants = await Plant.find({ 
      category: req.params.category,
      isActive: true 
    })
    .sort({ rating: -1 })
    .limit(20);
    
    res.status(200).json({
      status: 'success',
      data: { plants }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
