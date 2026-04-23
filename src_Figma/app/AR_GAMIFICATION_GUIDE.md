# AR Scanner & Gamification Features Guide

## 🚀 New Features Added

This guide covers the newly implemented AR Balcony Scanner and Gamification Hub features in Bloomify.

---

## 🎯 AR Balcony Scanner

### Overview
The AR Balcony Scanner uses WebXR technology to analyze your balcony environment and provide personalized plant recommendations.

### Features

#### 1. **Real-time Scanning Interface**
- Visual scanning animation with progress tracking
- Grid overlay for spatial awareness
- Completion status with visual feedback

#### 2. **Environment Analysis**
After scanning, the system provides metrics for:
- **Sunlight Exposure**: Measures light conditions (0-100%)
- **Available Space**: Calculates usable planting area (0-100%)
- **Air Circulation**: Evaluates airflow quality (0-100%)

#### 3. **3D Plant Previews**
- Integration with Sketchfab for high-quality 3D plant models
- Three interactive plant models:
  1. Indoor Plants Pack 02 by AllQuad
  2. Houseleek Plant by matousekfoto
  3. Indoor Plant by Malek Almsri
- XR-spatial-tracking enabled for AR experiences

#### 4. **WebXR Integration**
- Google WebXR polyfill loaded via CDN
- Compatible with AR-capable devices
- Fallback UI for non-AR devices

### How to Use

1. Navigate to the **AR Scanner** section from the main navigation
2. Click **"Start AR Scan"** to begin environment analysis
3. Wait for the scan to complete (simulated progress)
4. Review your environment metrics
5. Explore 3D plant models using the model selector
6. Use the insights for plant selection

### Technical Details

**Location**: `/components/ARBalconyScanner.tsx`

**Key Technologies**:
- WebXR Polyfill from Google CDN
- Sketchfab embeds with XR support
- Motion animations for smooth transitions
- Real-time progress tracking

**Browser Support**:
- Chrome (recommended)
- Edge
- Safari (limited AR features)
- Firefox (limited AR features)

---

## 🎮 Gamification Hub

### Overview
A complete gamification system that rewards users for taking care of virtual plants, completing challenges, and maintaining daily streaks.

### Features

#### 1. **Level System**
- Progressive leveling from 1 to ∞
- Dynamic XP requirements (increases by 50% per level)
- Visual level-up animations with celebratory effects
- Trophy display for achievements

#### 2. **Green Points (GP)**
- Earn points by completing care actions:
  - **Water Plant**: +50 GP
  - **Fertilize**: +75 GP
  - **Adjust Shade**: +40 GP
- Real-time point tracking
- Floating point notifications on actions

#### 3. **Virtual Plant Growth**
- Live 3D plant models from Sketchfab
- Real-time stat tracking:
  - **Health**: Overall plant condition
  - **Growth**: Development progress
  - **Hydration**: Water level
  - **Happiness**: Overall plant wellbeing
- Automatic stat changes over time
- Multiple plants to manage (Seedling, Growing, Mature stages)

#### 4. **Alert System**
Three types of alerts:
- **Water Alerts** (Urgent): Plant needs watering
- **Heat Warnings** (Urgent): Temperature too high
- **Care Recommendations**: General maintenance needed

#### 5. **Daily Challenges**
- Water 3 plants
- Check plant health 5 times
- Progress tracking with visual bars
- Completion rewards

#### 6. **Player Statistics**
Track your progress:
- **Level**: Current gardening level
- **Green Points**: Total points earned
- **Day Streak**: Consecutive days active
- **Achievements**: Total unlocked achievements

#### 7. **Growth Timeline**
Three development stages:
1. **Seedling Stage** (Days 1-15)
2. **Growth Stage** (Days 16-40) - Current
3. **Mature Stage** (Days 41+) - Locked

### How to Use

1. Navigate to **Gamify** section from main navigation
2. Review active alerts in the left panel
3. Complete care actions to earn Green Points:
   - Click "Water Plant" when hydration is low
   - Click "Fertilize" to boost growth
   - Click "Adjust Shade" when heat warning appears
4. Watch your plant grow in real-time
5. Track your level progress
6. Complete daily challenges for bonus rewards
7. Unlock achievements as you level up

### Gameplay Mechanics

**Stat Changes**:
- Plants automatically lose hydration over time (-0.3% every 2 seconds)
- Health increases with proper hydration (+0.2% every 2 seconds)
- Health decreases if hydration falls below 30% (-0.5% every 2 seconds)
- Growth increases steadily (+0.5% every 2 seconds)

**Level Progression**:
- Level 5 → Level 6: 1,500 GP required
- Each level requires 50% more points than previous
- Automatic level-up when points threshold reached
- 3-second celebration animation

**Plant Stages**:
- **Seedling**: Days 1-15, basic care
- **Growing**: Days 16-40, moderate care
- **Mature**: Days 41+, advanced care

### Technical Details

**Location**: `/components/GamificationHub.tsx`

**Key Technologies**:
- Motion/React for animations
- Real-time state management with React hooks
- Sketchfab embeds for 3D models
- Automatic stat calculation system

**Components Used**:
- Progress bars for stat tracking
- Badges for status indicators
- Cards for organized layouts
- Motion animations for level-up effects

---

## 🔗 Navigation Integration

Both features are accessible via the main navigation:
- **Desktop**: Top navigation bar with Camera and Trophy icons
- **Mobile**: Hamburger menu with full feature list

**Navigation Items**:
1. About
2. Learn
3. Features
4. **AR Scanner** 🆕 (Camera icon)
5. **Gamify** 🆕 (Trophy icon)
6. Community
7. Contact

---

## 🎨 Design System

Both features follow the **Botanical Cosmic Theme**:
- Glass morphism effects with backdrop blur
- Gradient systems using emerald, teal, and cosmic colors
- Smooth animations using Motion/React
- Consistent card-based layouts
- Responsive design for all devices

**Color Palette**:
- Emerald: `#10b981` (Primary green)
- Teal: `#14b8a6` (Accent)
- Slate: Dark backgrounds
- Yellow/Orange: Alerts and rewards
- Purple/Pink: Special events and challenges

---

## 📱 Mobile Responsiveness

Both features are fully responsive:
- Grid layouts adapt to screen size
- Touch-friendly buttons and controls
- Optimized iframe embeds for mobile
- Condensed navigation on small screens

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔧 Development Notes

### Sketchfab Integration
```tsx
<iframe
  title="Plant Name"
  frameBorder="0"
  allowFullScreen
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  allow="autoplay; fullscreen; xr-spatial-tracking"
  xr-spatial-tracking="true"
  execution-while-out-of-viewport="true"
  execution-while-not-rendered="true"
  web-share="true"
  src="https://sketchfab.com/models/MODEL_ID/embed"
  className="w-full h-full"
/>
```

### WebXR Setup
Added to `/index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js"></script>
```

### State Management Pattern
```tsx
const [plantStats, setPlantStats] = useState<PlantStats>({
  health: 75,
  growth: 45,
  hydration: 60,
  happiness: 80
});
```

---

## 🚀 Future Enhancements

### AR Scanner
- [ ] Actual camera integration
- [ ] Real computer vision for light detection
- [ ] Space measurement using ARCore/ARKit
- [ ] Plant placement preview in AR
- [ ] Save scanned environments

### Gamification
- [ ] Multiplayer competitions
- [ ] More plant species
- [ ] Weather integration
- [ ] Seasonal events
- [ ] Achievement badges
- [ ] Leaderboards
- [ ] Social sharing
- [ ] Plant trading system

---

## 🐛 Known Limitations

1. **AR Scanner**: Currently shows simulated scanning - full AR requires device with ARCore/ARKit
2. **Gamification**: Plant stats are currently simulated - will be connected to real plant care in future
3. **3D Models**: Loading time depends on internet connection
4. **Browser Support**: Some older browsers may not support WebXR features

---

## 📚 Related Documentation

- [Firebase Setup Guide](/FIREBASE_SETUP.md)
- [Backend & AI Implementation Plan](/BACKEND_AI_IMPLEMENTATION_PLAN.md)
- [Cosmic Theme Guide](/COSMIC_THEME_GUIDE.md)
- [Community Features](/CLOUDINARY_SETUP.md)

---

## 💡 Tips for Best Experience

1. **Use Chrome or Edge** for best AR support
2. **Allow camera permissions** when prompted (future feature)
3. **Check daily** to maintain your streak
4. **Complete challenges** for maximum points
5. **Experiment with different plants** to see how they grow
6. **Keep hydration above 30%** for healthy plants
7. **Use AR scanner** before buying real plants

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: ✅ Active & Functional
