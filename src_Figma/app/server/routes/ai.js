const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock AI responses (replace with actual AI service like OpenAI)
const mockAIResponses = {
  diagnose: {
    disease: 'Leaf Yellowing',
    confidence: 85,
    causes: [
      { name: 'Overwatering', probability: 70 },
      { name: 'Nutrient Deficiency', probability: 20 },
      { name: 'Natural Aging', probability: 10 }
    ],
    recommendations: [
      'Check soil moisture before watering',
      'Ensure proper drainage in the pot',
      'Consider reducing watering frequency',
      'Test soil pH levels'
    ],
    preventiveMeasures: [
      'Water only when top 2 inches of soil are dry',
      'Use well-draining soil mix',
      'Ensure adequate pot drainage holes'
    ]
  },
  careGuide: {
    watering: {
      frequency: 'Every 2-3 days',
      amount: '200-300ml',
      bestTime: 'Morning',
      tips: ['Check soil moisture first', 'Water at the base', 'Avoid wetting leaves']
    },
    sunlight: {
      duration: '4-6 hours',
      type: 'Indirect bright light',
      tips: ['Place near east-facing window', 'Protect from harsh afternoon sun']
    },
    fertilizer: {
      type: 'Balanced NPK (10-10-10)',
      frequency: 'Every 2 weeks during growing season',
      application: 'Dilute to half strength'
    },
    pruning: {
      frequency: 'Monthly',
      tips: ['Remove yellow/dead leaves', 'Pinch tips for bushier growth']
    }
  }
};

// @route   POST /api/v1/ai/chat
// @desc    Chat with AI assistant
// @access  Private
router.post('/chat', protect, async (req, res, next) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // TODO: Integrate with actual AI service (OpenAI, etc.)
    // For now, return mock response based on keywords
    
    let response = {
      message: '',
      type: 'text',
      data: null
    };
    
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('yellow') || messageLower.includes('dying') || messageLower.includes('sick')) {
      response = {
        message: 'I can help you diagnose plant health issues. Let me analyze the symptoms you described.',
        type: 'diagnosis',
        data: mockAIResponses.diagnose
      };
    } else if (messageLower.includes('water') || messageLower.includes('care') || messageLower.includes('how')) {
      response = {
        message: 'Here\'s a comprehensive care guide for your plant:',
        type: 'care_guide',
        data: mockAIResponses.careGuide
      };
    } else if (messageLower.includes('hello') || messageLower.includes('hi')) {
      response = {
        message: 'Hello! I\'m your Bloomify AI assistant. I can help you with:\n\n🌱 Plant care advice\n🔍 Diagnose plant problems\n💧 Watering schedules\n☀️ Sunlight requirements\n🐛 Pest identification\n\nWhat would you like help with today?',
        type: 'text'
      };
    } else {
      response = {
        message: 'I\'m here to help with your gardening questions! You can ask me about:\n\n• Plant care and maintenance\n• Problem diagnosis\n• Watering and fertilizing schedules\n• Pest and disease identification\n• Growing tips and tricks\n\nWhat specific issue are you facing?',
        type: 'text'
      };
    }
    
    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/ai/diagnose
// @desc    Diagnose plant problem from image
// @access  Private
router.post('/diagnose', protect, async (req, res, next) => {
  try {
    const { image, plantId, symptoms } = req.body;
    
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Plant image is required'
      });
    }
    
    // TODO: Integrate with computer vision AI service
    // For now, return mock diagnosis
    
    const diagnosis = {
      ...mockAIResponses.diagnose,
      analyzedAt: new Date(),
      symptoms: symptoms || [],
      urgency: 'medium' // low, medium, high
    };
    
    res.json({
      success: true,
      data: diagnosis
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/ai/identify
// @desc    Identify plant from image
// @access  Private
router.post('/identify', protect, async (req, res, next) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Plant image is required'
      });
    }
    
    // TODO: Integrate with plant identification AI service
    // For now, return mock identification
    
    const identification = {
      plant: {
        name: 'Basil',
        scientificName: 'Ocimum basilicum',
        commonNames: ['Sweet Basil', 'Great Basil'],
        confidence: 92
      },
      alternatives: [
        { name: 'Thai Basil', scientificName: 'Ocimum basilicum var. thyrsiflora', confidence: 65 },
        { name: 'Holy Basil', scientificName: 'Ocimum tenuiflorum', confidence: 45 }
      ],
      characteristics: [
        'Aromatic herb',
        'Green leaves with serrated edges',
        'Grows 30-60 cm tall',
        'Used in cooking'
      ],
      careInfo: {
        difficulty: 'Easy',
        sunlight: 'Full sun (6-8 hours)',
        water: 'Regular, keep soil moist',
        temperature: '20-30°C',
        humidity: 'Moderate'
      }
    };
    
    res.json({
      success: true,
      data: identification
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/ai/recommendations
// @desc    Get personalized plant recommendations
// @access  Private
router.get('/recommendations', protect, async (req, res, next) => {
  try {
    const { climate, space, experience, interests } = req.query;
    
    // TODO: Use AI to generate personalized recommendations
    // For now, return mock recommendations
    
    const recommendations = [
      {
        plant: 'Basil',
        scientificName: 'Ocimum basilicum',
        reason: 'Perfect for beginners and sunny balconies',
        matchScore: 95,
        benefits: ['Culinary herb', 'Easy to grow', 'Aromatic'],
        image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7e55'
      },
      {
        plant: 'Mint',
        scientificName: 'Mentha',
        reason: 'Thrives in partial shade and requires minimal care',
        matchScore: 88,
        benefits: ['Fast growing', 'Refreshing aroma', 'Multiple uses'],
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1'
      },
      {
        plant: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        reason: 'Rewarding harvest for balcony gardens',
        matchScore: 82,
        benefits: ['Fresh produce', 'Productive', 'Satisfying to grow'],
        image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa'
      }
    ];
    
    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/v1/ai/schedule
// @desc    Generate smart watering schedule
// @access  Private
router.post('/schedule', protect, async (req, res, next) => {
  try {
    const { plantId, location, season } = req.body;
    
    // TODO: Use AI to generate personalized schedule
    // For now, return mock schedule
    
    const schedule = {
      watering: {
        frequency: 'Every 2-3 days',
        amount: '200-300ml',
        times: ['08:00', '18:00'],
        adjustments: {
          summer: '+20% frequency',
          winter: '-30% frequency',
          rainy: 'Skip if rainfall > 10mm'
        }
      },
      fertilizing: {
        frequency: 'Every 2 weeks',
        type: 'Balanced NPK (10-10-10)',
        amount: '5-10ml diluted',
        nextDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      },
      pruning: {
        frequency: 'Monthly',
        nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        tips: ['Remove yellow leaves', 'Pinch growing tips']
      }
    };
    
    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/ai/tips/daily
// @desc    Get daily gardening tip
// @access  Private
router.get('/tips/daily', protect, async (req, res, next) => {
  try {
    const tips = [
      {
        title: '💧 Morning Watering',
        tip: 'Water your plants in the morning to reduce evaporation and give them energy for the day.',
        category: 'watering'
      },
      {
        title: '🌱 Pinch for Growth',
        tip: 'Pinching the tips of herbs encourages bushier, fuller growth.',
        category: 'pruning'
      },
      {
        title: '☀️ Rotate for Even Growth',
        tip: 'Rotate your potted plants every few days so all sides get equal sunlight.',
        category: 'sunlight'
      },
      {
        title: '🍃 Mulch Benefits',
        tip: 'Add a layer of mulch to retain moisture and suppress weeds.',
        category: 'soil'
      },
      {
        title: '🐛 Natural Pest Control',
        tip: 'Neem oil is an effective and natural way to control common pests.',
        category: 'pest_control'
      }
    ];
    
    // Return random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    res.json({
      success: true,
      data: randomTip
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
