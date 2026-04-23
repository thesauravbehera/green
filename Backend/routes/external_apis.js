const express = require('express');
const axios = require('axios');
const router = express.Router();
const moment = require('moment-timezone');

// Configuration from environment or defaults (as provided by user)
const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY || 'sk-BK8D69cda8489764b16048';
const TREFLE_API_KEY = process.env.TREFLE_API_KEY || 'usr-YVwgXqxQ0BGqPIEv3yXlIWeDiLiR6RzVUY_nn4SVjP0';

// ----------------------------------------------------------------------
// 1. Perenual API Endpoints
// ----------------------------------------------------------------------

// Get plant species list
router.get('/perenual/species', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const q = req.query.q || '';
    let url = `https://perenual.com/api/species-list?key=${PERENUAL_API_KEY}&page=${page}`;
    if (q) url += `&q=${q}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Perenual API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch species data from Perenual' });
  }
});

// Get plant disease data
router.get('/perenual/disease', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`https://perenual.com/api/pest-disease-list?key=${PERENUAL_API_KEY}&page=${page}`);
    res.json(response.data);
  } catch (error) {
    console.error('Perenual Disease API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch disease data from Perenual' });
  }
});

// ----------------------------------------------------------------------
// 2. Trefle API Endpoints
// ----------------------------------------------------------------------

router.get('/trefle/plants', async (req, res) => {
  try {
    const q = req.query.q || '';
    let url = `https://trefle.io/api/v1/plants?token=${TREFLE_API_KEY}`;
    if (q) {
      url = `https://trefle.io/api/v1/plants/search?token=${TREFLE_API_KEY}&q=${q}`;
    }
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Trefle API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch plant data from Trefle' });
  }
});

// ----------------------------------------------------------------------
// 3. The "Clock" (Photoperiod Tracking)
// ----------------------------------------------------------------------

router.post('/photoperiod/track', async (req, res) => {
  try {
    const { plantId, plantName, lat, lng, lastWatered, lightExposureStartTime } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and Longitude are required for accurate photoperiod tracking.' });
    }

    // Call Sunrise/Sunset API for real-time circadian rhythm
    const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
    const { sunrise, sunset } = response.data.results;
    
    const now = moment();
    const sunsetTime = moment(sunset);
    
    // Calculate how many hours of light the plant actually got today
    // Assuming lightExposureStartTime is when the plant was placed in light today
    let lightHours = 0;
    if (lightExposureStartTime) {
        const start = moment(lightExposureStartTime);
        lightHours = moment.duration(now.diff(start)).asHours();
    }
    
    let notification = null;
    
    // Logic: If it is past 6 PM (or close to sunset) and plant got < 3 hours of light
    if (now.isAfter(sunsetTime.subtract(1, 'hour')) && lightHours < 3) {
      notification = `Your ${plantName || 'Plant'} is in the dark! Move it closer to the window for the last hour of light.`;
    }

    res.json({
      status: 'success',
      data: {
        sunrise,
        sunset,
        currentTime: now.toISOString(),
        calculatedLightHours: lightHours.toFixed(2),
        notification
      }
    });

  } catch (error) {
    console.error('Photoperiod API Error:', error.message);
    res.status(500).json({ error: 'Failed to calculate photoperiod' });
  }
});

// ----------------------------------------------------------------------
// 4. Shadow Mapping Endpoint
// ----------------------------------------------------------------------

router.post('/shadow-mapping', async (req, res) => {
  try {
    // In a real scenario, this would invoke OpenCV shadow_mapping.py
    // Currently, simulating the expected result as requested:
    // Detects shadows at 10 AM vs 4 PM to recommend "Partial Shade" plants
    
    const { image_10am_url, image_4pm_url } = req.body;
    
    // Mock OpenCV processing result
    const simulatedResponse = {
      analysis_type: "shadow_mapping",
      detected_lighting: {
        "10:00AM": "Direct Sunlight (High UV)",
        "16:00PM": "Deep Shadow (Low UV)"
      },
      conclusion: "The placement area experiences strong morning light but heavy afternoon shade.",
      recommendation: "Partial Shade plants are recommended.",
      suggested_plants: ["Monstera Deliciosa", "Calathea", "Peace Lily"]
    };

    res.json(simulatedResponse);
  } catch (error) {
    console.error('Shadow Mapping Error:', error.message);
    res.status(500).json({ error: 'Failed to map shadows' });
  }
});

// ----------------------------------------------------------------------
// 5. OpenRouter Next-Gen Models (Qwen / Llama) Endpoint
// ----------------------------------------------------------------------

const OPEN_ROUTER_KEY = process.env.OPENROUTER_API_KEY || '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'; // User provided OpenAi key disguised as OpenRouter

router.post('/ai/query', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'qwen/qwen3-next-80b-a3b-instruct:free', // Using free open router model as requested
      messages: [
        { role: 'system', content: 'You are the Bloomify AI, a high-tech plant care assistant.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPEN_ROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bloomify.app', // required by openrouter
        'X-Title': 'Bloomify'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    // Fallback or send error
    res.status(500).json({ error: 'Failed to query AI model' });
  }
});

module.exports = router;
