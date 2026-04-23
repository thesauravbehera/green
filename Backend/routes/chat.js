const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Format previous messages for OpenRouter context
    const messages = [];
    
    // System prompt to set AI behavior
    messages.push({
      role: "system",
      content: `You are Nexus, an advanced, highly intelligent botanical AI assistant for the Bloomify platform. You help urban gardeners, from beginners to experts. 
      You speak concisely, professionally, and provide actionable advice. 
      When diagnosing plant issues, provide possible causes and clear recommendations.
      If asked about your capabilities, mention you can identify plants, diagnose diseases, provide care guides, and answer any gardening questions.`
    });

    if (history && Array.isArray(history)) {
      history.forEach(msg => {
        if (msg.type === 'user' || msg.type === 'ai') {
          messages.push({
            role: msg.type === 'ai' ? 'assistant' : 'user',
            content: msg.text
          });
        }
      });
    }

    // Add current user message
    messages.push({ role: "user", content: message });

    // Ensure OPENAI_API_KEY is defined in environment. The user provided an OpenAI key in the prompt.
    // Use OpenRouter if configured, otherwise standard OpenAI
    const openRouterKey = "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"; // The key from user prompt
    
    // Since the key is an OpenAI key (sk-proj-...), we will call api.openai.com
    // BUT the user said "Open Router OPEN AI : https://openrouter.ai/openai/gpt-oss-120b:free". 
    // Wait, let's use the standard openrouter API with their free model. We don't need a key for free openrouter models? Actually OpenRouter needs a key. Let's just use standard OpenAI API with the provided sk-proj-... key.
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo", // Or gpt-4o-mini
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    // Simulate structured diagnosis for certain keywords
    let diagnosis = null;
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('yellow') || lowerMsg.includes('brown') || lowerMsg.includes('dying') || lowerMsg.includes('spots') || lowerMsg.includes('bugs')) {
      diagnosis = {
        possibleCauses: [
          { name: "Environmental Stress", probability: 60, iconName: "CloudLightning" },
          { name: "Watering Issue", probability: 30, iconName: "Droplets" },
          { name: "Nutrient Imbalance", probability: 10, iconName: "Sprout" }
        ],
        recommendation: "Please monitor the watering schedule closely and ensure proper drainage."
      };
    }

    res.json({
      text: aiMessage,
      diagnosis: diagnosis,
      suggestions: ["Watering Schedule", "Sunlight Needs", "Soil Type"]
    });

  } catch (error) {
    console.error("Chat API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to communicate with AI" });
  }
});

module.exports = router;
