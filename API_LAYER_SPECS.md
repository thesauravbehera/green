# Bloomify API Layer & Backend Architecture

## 1. AI Models & Data Endpoints
**IMPORTANT CONSTRAINT**: Eliminate Gemini API completely. Use OpenRouter as the primary AI fallback.

### OpenRouter API (Primary AI)
- **Key**: `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` (Note: User provided OpenAI key format, but specified OpenRouter models below)
- **Models**:
  - `openai/gpt-oss-120b:free`
  - `qwen/qwen3-next-80b-a3b-instruct:free`

### Plant Data APIs
- **Perenual**: 
  - Key: `sk-BK8D69cda8489764b16048`
  - Purpose: Regular API, Species Data (1-3000), Hardiness Map, Care Guides, Disease API.
- **Trefle.io**:
  - Key: `usr-YVwgXqxQ0BGqPIEv3yXlIWeDiLiR6RzVUY_nn4SVjP0`

### Datasets (Kaggle)
- **Plant Disease**: `emmarex/plantdisease`
- **Scene Classification**: `nitishabharathi/scene-classification`

---

## 2. Core Features & Architecture

### "The Clock" (Photoperiod Tracking)
- **Purpose**: Circadian Rhythm tracker for plants.
- **Input**: Current Time + Sunrise/Sunset data from location sync.
- **Logic**: Tracks Photoperiod (hours of light received). Triggers push notifications if light threshold isn't met before sunset.

### "Verified" Onboarding Flow
1. **Location & Micro-Climate**: Google Maps API integration to fetch environment data (Humidity, Wind).
2. **Vision Scan**: Forces upload to `POST /analyze-space` with a GSAP scanning line effect.
3. **Calendar Sync**: Google Calendar integration ("Sync with my Hustle").

---

## 3. Computer Vision & Space Analysis
**Endpoint**: `POST /analyze-space`
- Uses Multer to receive the image.
- Spawns Python process (`analyze_space.py`).
- **OpenCV Analysis**:
  - Detects lighting (high/medium/low) using grayscale histograms.
  - Person detection using YCrCb color space.
  - Space feature detection (Canny Edge).
- Returns JSON with Space Green Score (0-100) and Plant Recommendations.

*(Note: Deep Learning model using EfficientNetB0 for scene classification is planned for Phase 2 of ML).*

---

## 4. E-Commerce & Marketplace Architecture

### MongoDB Collections
- `products`: Pre-made products (soil, fertilizer, pots, tools).
- `marketplace_listings`: User-generated listings.
- `carts`: User shopping carts.
- `orders`: Order history and tracking.
- `sellers`: Seller profiles and stats.

### Features
- **Subscriptions**: 10% automatic discount for Advanced Tier members ($10/month).
- **Marketplace**: User-to-user selling.
- **Smart Cart**: Real-time updates with persistent MongoDB storage.

### REST Endpoints
- `GET /products`, `GET /products/:id`
- `GET /marketplace`, `POST /marketplace`, `GET /seller-listings/:email`
- `GET /cart/:email`, `POST /cart/:email`, `PUT /cart/:email/:productId`, `DELETE /cart/:email/:productId`
- `POST /orders`, `GET /orders/:email`, `GET /order/:orderId`, `PATCH /order/:orderId`
- `POST /sellers`, `GET /sellers/:email`
