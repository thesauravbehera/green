# 📱 BLOOMIFY MOBILE WIREFRAMES
## Premium Deep Botanical Aesthetic - Mobile Experience

> **Version:** 4.0  
> **Last Updated:** March 7, 2026  
> **Device Target:** Mobile (375px - 428px width)  
> **Design System:** Premium Deep Botanical with Glassmorphism

---

## 📑 TABLE OF CONTENTS

1. [Mobile Design Philosophy](#mobile-design-philosophy)
2. [Navigation System](#navigation-system)
3. [Screen Wireframes](#screen-wireframes)
4. [Interaction Patterns](#interaction-patterns)
5. [Touch Targets](#touch-targets)
6. [Mobile-Specific Features](#mobile-specific-features)

---

## 🎯 MOBILE DESIGN PHILOSOPHY

### Design Principles

1. **Thumb-First Design**
   - Primary actions within thumb reach (bottom 60% of screen)
   - Bottom navigation for quick access
   - Large touch targets (minimum 44x44px)

2. **Vertical Scroll Priority**
   - Single column layouts
   - Infinite scroll for feeds
   - Sticky headers for context

3. **Speed & Performance**
   - Optimized images
   - Lazy loading
   - Minimal animations on low-end devices

4. **One-Handed Usability**
   - Bottom sheet modals
   - Floating action buttons
   - Accessible menu items

---

## 🧭 NAVIGATION SYSTEM

### Mobile Navigation Bar (Fixed Top)

```
┌─────────────────────────────────────┐
│  ☰  [BLOOMIFY]            🌐  👤   │ ← 64px height
└─────────────────────────────────────┘
```

**Components:**
- **Hamburger Menu** (☰) - Opens slide-out drawer
- **Logo** - BLOOMIFY wordmark
- **Language Selector** (🌐) - Quick language switch
- **User Avatar** (👤) - Profile access

**Behavior:**
- Fixed position on scroll
- Glass morphism background
- Slight shadow on scroll
- Z-index: 50

---

### Mobile Bottom Navigation (Fixed Bottom)

```
┌─────────────────────────────────────┐
│  [🏠]   [🌿]   [🛒]   [👥]   [📊]  │ ← 72px height
│  Home  Garden Market  Chat   Stats  │
└─────────────────────────────────────┘
```

**Navigation Items:**
1. **Home** - Landing/Dashboard
2. **Garden** - Virtual Plants (Gamification Hub)
3. **Market** - Marketplace
4. **Community** - Social Feed
5. **Dashboard** - User Stats

**States:**
- Active: Emerald gradient background
- Inactive: White 40% opacity
- Hover/Tap: Scale 1.1, emerald glow

---

### Hamburger Menu (Slide-Out Drawer)

```
┌─────────────────────────────┐
│                             │
│   [X]  MENU                 │
│                             │
│   ───────────────────       │
│                             │
│   🏠  Overview              │
│   📊  Dashboard             │
│   🌿  My Garden             │
│   👥  Community             │
│   🛒  Marketplace           │
│   📷  AR Scanner            │
│                             │
│   ───────────────────       │
│                             │
│   ⚙️  Settings              │
│   ℹ️  About                 │
│   🚪  Logout                │
│                             │
│   ───────────────────       │
│                             │
│   🌐  EN | HI | KN | TA     │
│                             │
└─────────────────────────────┘
```

**Slide Animation:**
- From left: 300ms ease-out
- Backdrop overlay: Black 50% opacity
- Width: 80% of screen (max 320px)

---

## 📱 SCREEN WIREFRAMES

### 1. LANDING PAGE (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🌐  👤   │ ← Fixed Header
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   PREMIUM BOTANICAL         ║  │
│  ║      ECOSYSTEM              ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│         ┏━━━━━━━━━━━━━┓          │
│         ┃  CULTIVATE  ┃          │ ← Hero Section
│         ┃ INTELLIGENT-┃          │   (Full viewport)
│         ┃     LY      ┃          │
│         ┗━━━━━━━━━━━━━┛          │
│                                   │
│  The definitive ecosystem for     │
│  high-performance urban gardening │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  START YOUR JOURNEY    →    │ │ ← Primary CTA
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  EXPLORE FEATURES           │ │ ← Secondary CTA
│  └─────────────────────────────┘ │
│                                   │
│          ↓ Scroll Down            │
│                                   │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   CORE CAPABILITIES         ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🌧️                          │ │
│  │  MONSOON READY              │ │
│  │                             │ │ ← Feature Card
│  │  Advanced drainage alerts   │ │   (Stacked)
│  │  for Indian monsoon season  │ │
│  │                             │ │
│  │  Learn More →               │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🔥                          │ │
│  │  HEAT SHIELD                │ │
│  │                             │ │
│  │  Smart temperature alerts   │ │
│  │  and shade recommendations  │ │
│  │                             │ │
│  │  Learn More →               │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🌿                          │ │
│  │  TULSI CARE                 │ │
│  │                             │ │
│  │  Specialized protocols for  │ │
│  │  sacred Indian botanicals   │ │
│  │                             │ │
│  │  Learn More →               │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More feature cards)         │
│                                   │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   THREE-TIER LEARNING       ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🌱 LEVEL 1: BEGINNER       │ │
│  │                             │ │
│  │  Essential plant care basics│ │
│  │  Simple watering schedules  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🌿 LEVEL 2: INTERMEDIATE   │ │
│  │                             │ │
│  │  Advanced techniques        │ │
│  │  Soil health management     │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🏆 LEVEL 3: EXPERT         │ │
│  │                             │ │
│  │  Disease diagnosis          │ │
│  │  Hybrid cultivation         │ │
│  └─────────────────────────────┘ │
│                                   │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   TRUSTED BY THOUSANDS      ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  ⭐⭐⭐⭐⭐                    │ │
│  │                             │ │
│  │  "Bloomify transformed my   │ │
│  │  balcony into a thriving    │ │ ← Testimonial
│  │  urban jungle!"             │ │   Card
│  │                             │ │
│  │  [👤]  ROHAN GUPTA          │ │
│  │        📍 BENGALURU         │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More testimonials)          │
│                                   │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   JOIN THE REVOLUTION       ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  Transform your balcony into a    │
│  botanical masterpiece today.     │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  GET STARTED NOW       →    │ │
│  └─────────────────────────────┘ │
│                                   │
├───────────────────────────────────┤
│                                   │
│  [FOOTER]                         │
│  © 2026 Bloomify                  │
│  About | Privacy | Terms          │
│                                   │
└───────────────────────────────────┘
```

**Key Features:**
- Full-viewport hero section
- Single column feature cards
- Scroll-triggered animations
- Sticky header
- Mobile-optimized spacing
- Large touch targets

---

### 2. DASHBOARD (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🌐  👤   │ ← Fixed Header
├───────────────────────────────────┤
│                                   │
│  COMMAND TERMINAL v4.0            │
│                                   │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  SALUTATIONS,              ┃  │ ← Greeting
│  ┃  COLLECTOR                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  🌧️ LOCAL CLIMATE          │ │
│  │  PRE-MONSOON               │ │ ← Climate Widget
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   TACTICAL STATS            ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ [🌱]  12  │ [💧]  7 DAYS   │ │ ← Stats Grid
│  │ BIO-UNITS │ STREAK         │ │   (2x2)
│  │ 98% UPTIME│ OPTIMAL FLOW   │ │
│  └───────────┴─────────────────┘ │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ [⚡] 18.7K │ [🏆]  15       │ │
│  │ BIO-POINTS│ MASTERY        │ │
│  │ +240 TODAY│ S-CLASS        │ │
│  └───────────┴─────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   ACTIVE PROTOCOLS          ║  │
│  ║   3 / 5 SYNCHRONIZED        ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ✓ Water Monstera Complex    │ │
│  │   +50 XP                    │ │ ← Task (Complete)
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ✓ Analyze Substrate Moisture│ │
│  │   +30 XP                    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ○ Check Monsoon Drainage    │ │
│  │   +40 XP      [COMPLETE]    │ │ ← Task (Pending)
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ○ Calibrate Solar Exposure  │ │
│  │   +35 XP      [COMPLETE]    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   BIO-UNIT COMMAND MATRIX   ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │   [3D Plant Model Embed]    │ │ ← Sketchfab
│  │   Monstera Deliciosa        │ │   Embed
│  │                             │ │   (16:9 ratio)
│  │   Health: 95%               │ │
│  │                             │ │
│  │  [< Prev]  1/3  [Next >]    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   ACTIVITY MONITOR          ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [💧] PROTOCOL INITIATED:    │ │
│  │      TULSI UNIT 01          │ │
│  │      02:00H AGO  │  +50 XP  │ │ ← Activity Item
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [🌿] NUTRIENT SYNC:         │ │
│  │      SNAKE PLANT ALPHA      │ │
│  │      05:00H AGO  │  +75 XP  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More activity items)        │
│                                   │
│                                   │
│                                   │ ← Bottom padding
│                                   │   for navigation
│                                   │
├───────────────────────────────────┤
│  [🏠]  [🌿]  [🛒]  [👥]  [📊]   │ ← Bottom Nav
└───────────────────────────────────┘
```

**Responsive Breakdown:**
- 2-column stats grid instead of 4-column
- Stacked task cards
- Full-width 3D model viewer
- Collapsed activity feed
- Bottom navigation for quick access

---

### 3. MARKETPLACE (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🌐  [🛒3]│ ← Cart badge
├───────────────────────────────────┤
│                                   │
│  ASSET ACQUISITION TERMINAL       │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🔍  Search assets...        │ │ ← Search bar
│  └─────────────────────────────┘ │
│                                   │
│  ┌──────┬──────┬──────┬──────┐  │
│  │ All  │Plants│Seeds │Tools │  │ ← Category
│  └──────┴──────┴──────┴──────┘  │   Tabs (H-scroll)
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ┌─────────────────────────┐ │ │
│  │ │                         │ │ │
│  │ │   [Plant Image]         │ │ │
│  │ │                         │ │ │ ← Product Card
│  │ │   -30%         ♡        │ │ │   (Full width)
│  │ │                         │ │ │
│  │ └─────────────────────────┘ │ │
│  │                             │ │
│  │  [PLANTS]                   │ │
│  │  HOLY BASIL (TULSI)         │ │
│  │                             │ │
│  │  Essential Vedic botanical  │ │
│  │  for immunity and air...    │ │
│  │                             │ │
│  │  ⭐⭐⭐⭐⭐  (842)            │ │
│  │                             │ │
│  │  ₹499  ₹249                 │ │
│  │              [ADD TO CART]  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ┌─────────────────────────┐ │ │
│  │ │                         │ │ │
│  │ │   [Plant Image]         │ │ │
│  │ │   Snake Plant Alpha     │ │ │
│  │ │                         │ │ │
│  │ │   TRENDING      ♡       │ │ │
│  │ │                         │ │ │
│  │ └─────────────────────────┘ │ │
│  │                             │ │
│  │  [PLANTS]                   │ │
│  │  SNAKE PLANT ALPHA          │ │
│  │                             │ │
│  │  Indestructible air         │ │
│  │  purification unit          │ │
│  │                             │ │
│  │  ⭐⭐⭐⭐⭐  (521)            │ │
│  │                             │ │
│  │  ₹899      [ADD TO CART]    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More product cards)         │
│                                   │
│                                   │
│                                   │ ← Bottom padding
│                                   │
├───────────────────────────────────┤
│  [🏠]  [🌿]  [🛒]  [👥]  [📊]   │ ← Bottom Nav
└───────────────────────────────────┘
```

**Shopping Cart (Bottom Sheet Modal)**

```
┌───────────────────────────────────┐
│  ═══════  CART (3 ITEMS)  ═══════ │ ← Drag handle
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [img] Holy Basil (Tulsi)    │ │
│  │       ₹249                  │ │
│  │                  [-] 1 [+]  │ │ ← Cart item
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [img] Snake Plant Alpha     │ │
│  │       ₹899                  │ │
│  │                  [-] 2 [+]  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ────────────────────────────────│
│                                   │
│  Subtotal               ₹2,047   │
│  Shipping                   FREE  │
│                                   │
│  TOTAL                  ₹2,047   │
│                                   │
│  ┌─────────────────────────────┐ │
│  │      CHECKOUT          →    │ │ ← Primary CTA
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

**Interactions:**
- Swipe down to dismiss cart
- Tap outside to close
- Product cards expand on tap
- Horizontal scroll for categories

---

### 4. COMMUNITY HUB (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🔍  [+]  │ ← Search & Post
├───────────────────────────────────┤
│                                   │
│  NEXUS COLLECTIVE                 │
│                                   │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  THE NEXUS.                ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                   │
│  ┌──────┬──────┬──────┬──────┐  │
│  │ All  │ New  │ Top  │Local │  │ ← Filter tabs
│  └──────┴──────┴──────┴──────┘  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ┌─────────────────────────┐ │ │
│  │ │                         │ │ │
│  │ │   [Community Image]     │ │ │
│  │ │                         │ │ │
│  │ │   📍 BENGALURU          │ │ │ ← Post Card
│  │ │                         │ │ │
│  │ └─────────────────────────┘ │ │
│  │                             │ │
│  │  [👤] ROHAN GUPTA           │ │
│  │       ELITE GARDENER        │ │
│  │                             │ │
│  │  Monsoon drainage matrix    │ │
│  │  looking solid in Bengaluru.│ │
│  │  Tulsi thriving with zero   │ │
│  │  senescent foliage.         │ │
│  │                             │ │
│  │  ♡ 342   💬 28   ⤴ 15      │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ┌─────────────────────────┐ │ │
│  │ │                         │ │ │
│  │ │   [Community Image]     │ │ │
│  │ │                         │ │ │
│  │ │   📍 MUMBAI             │ │ │
│  │ │                         │ │ │
│  │ └─────────────────────────┘ │ │
│  │                             │ │
│  │  [👤] ANANYA SHARMA         │ │
│  │       SYSTEM MASTER         │ │
│  │                             │ │
│  │  Mumbai humidity syncing    │ │
│  │  perfectly with the new     │ │
│  │  bio-unit protocols.        │ │
│  │                             │ │
│  │  ♡ 567   💬 45   ⤴ 23      │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More posts - infinite)      │
│                                   │
│                                   │
│  ┌─────────────────────────────┐ │
│  │          [+ POST]           │ │ ← Floating Action
│  └─────────────────────────────┘ │   Button (FAB)
│                                   │
├───────────────────────────────────┤
│  [🏠]  [🌿]  [🛒]  [👥]  [📊]   │
└───────────────────────────────────┘
```

**Post Creation (Bottom Sheet)**

```
┌───────────────────────────────────┐
│  ══════  CREATE POST  ═══════  [X]│
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐ │
│  │  [👤]  COLLECTOR             │ │
│  │        LEVEL 15              │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │  What's growing today?      │ │
│  │                             │ │ ← Caption input
│  │                             │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │    [📷 Add Photo]           │ │ ← Image upload
│  │                             │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  📍 Add Location            │ │ ← Location
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │      PUBLISH POST      →    │ │ ← Submit CTA
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

---

### 5. GAMIFICATION HUB (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🌐  👤   │
├───────────────────────────────────┤
│                                   │
│  YOUR VIRTUAL GARDEN              │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  LEVEL 5  ━━━━━━━━━━░░  69% │ │
│  │  1,250 / 1,500 XP           │ │ ← Level Progress
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  ⚡ GREEN POINTS: 1,250      │ │
│  │  🔥 STREAK: 7 DAYS          │ │ ← Stats Summary
│  │  🏆 ACHIEVEMENTS: 12        │ │
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   PLANT STATS               ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  Health      ━━━━━━━━━░░░░  75% │ │
│  Growth      ━━━━━░░░░░░░░  45% │ │ ← Progress bars
│  Hydration   ━━━━━━━━░░░░░  60% │ │
│  Happiness   ━━━━━━━━━━░░░  80% │ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │   [3D Plant Model]          │ │
│  │   Monstera Deliciosa        │ │ ← 3D Viewer
│  │   Mature - 45 days growing  │ │   (Full width)
│  │                             │ │
│  │  [< Prev]  1/3  [Next >]    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   ACTIVE ALERTS             ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ⚠️ URGENT                    │ │
│  │ Your Monstera needs water!  │ │ ← Alert card
│  │              [WATER NOW]    │ │   (Urgent)
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🌡️ WARNING                   │ │
│  │ High temperature alert      │ │
│  │ Consider shade              │ │
│  │              [DISMISS]      │ │
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   QUICK ACTIONS             ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌──────┬──────┬──────┬──────┐  │
│  │ [💧] │ [🌿] │ [✂️]  │ [📊] │  │ ← Action
│  │Water │Fertil│Prune │Stats │  │   Buttons
│  │ +50  │ +75  │ +35  │      │  │
│  └──────┴──────┴──────┴──────┘  │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   RECENT ACTIVITY           ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ✅ Watered Monstera    +50 XP   │
│  ✅ Added fertilizer    +75 XP   │
│  ✅ Plant grew 5%       +25 XP   │
│                                   │
│                                   │
├───────────────────────────────────┤
│  [🏠]  [🌿]  [🛒]  [👥]  [📊]   │
└───────────────────────────────────┘
```

**Level Up Animation (Overlay)**

```
┌───────────────────────────────────┐
│                                   │
│                                   │
│         ┏━━━━━━━━━━━━━┓          │
│         ┃             ┃          │
│         ┃   🏆 LEVEL  ┃          │
│         ┃      UP!    ┃          │
│         ┃             ┃          │
│         ┃   LEVEL 6   ┃          │
│         ┃  ACHIEVED   ┃          │
│         ┃             ┃          │
│         ┗━━━━━━━━━━━━━┛          │
│                                   │
│    New features unlocked!         │
│                                   │
│         [CONTINUE]                │
│                                   │
└───────────────────────────────────┘
```

---

### 6. AR SCANNER (Mobile)

```
┌───────────────────────────────────┐
│  [X]                              │ ← Close button
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │                             │ │
│  │    [CAMERA VIEW]            │ │
│  │    Live Video Feed          │ │ ← Camera feed
│  │                             │ │   (Full screen)
│  │    ╔════════════════╗       │ │
│  │    ║   SCAN AREA    ║       │ │ ← Scan overlay
│  │    ╚════════════════╝       │ │
│  │                             │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  Scanning Progress: 45%     │ │ ← Progress bar
│  │  ━━━━━━━━━━░░░░░░░░░░░     │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │   [⚪ START SCAN]            │ │ ← Scan button
│  └─────────────────────────────┘ │
│                                   │
│  [📷 Front] [📷 Back]             │ ← Camera toggle
│                                   │
└───────────────────────────────────┘
```

**Scan Results (After Scanning)**

```
┌───────────────────────────────────┐
│  [X]  SCAN COMPLETE           [✓] │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   ENVIRONMENTAL DATA        ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ☀️  Sunlight                     │
│  ━━━━━━━━━━━━━░░░░░░░░  65%     │
│  Moderate - Good for most plants  │
│                                   │
│  📐  Space                        │
│  ━━━━━━━━━━━░░░░░░░░░  55%      │
│  Medium balcony - 4-6 plants      │
│                                   │
│  💨  Airflow                      │
│  ━━━━━━━━━━━━━━━░░░░  75%       │
│  Excellent ventilation            │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   RECOMMENDED PLANTS        ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🌿 Snake Plant              │ │
│  │    Perfect for your space   │ │
│  │              [VIEW DETAILS] │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🌱 Holy Basil (Tulsi)       │ │
│  │    Thrives in your climate  │ │
│  │              [VIEW DETAILS] │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │   [3D PLANT PREVIEW]        │ │ ← AR preview
│  │   Place in your space       │ │
│  │   [< Prev]  1/3  [Next >]   │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  SAVE RESULTS          →    │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

---

### 7. ADMIN DASHBOARD (Mobile)

```
┌───────────────────────────────────┐
│  ☰  [BLOOMIFY]          🌐  👤   │
├───────────────────────────────────┤
│                                   │
│  🛡️ NEXUS COMMAND                │
│  SYSTEM ADMINISTRATION v4.0       │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   SYSTEM METRICS            ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ [👥]      │ [🌿]            │ │
│  │ 2,847     │ 34,562          │ │ ← Metrics
│  │ USERS     │ BIO-UNITS       │ │   (2x2 grid)
│  │ +12.5%    │ +8.2%           │ │
│  └───────────┴─────────────────┘ │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ [💬]      │ [📊]            │ │
│  │ 1,293     │ 99.7%           │ │
│  │ POSTS     │ UPTIME          │ │
│  │ +15.7%    │ OPTIMAL         │ │
│  └───────────┴─────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   SYSTEM LOGS               ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ✅ 12:45:01                  │ │
│  │ DATABASE_SYNC               │ │
│  │ PLANT_CATALOG_V2            │ │ ← Log entry
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🔐 12:44:30                  │ │
│  │ USER_AUTHENTICATION         │ │
│  │ u_88291_ALPHA [BYPASS]      │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ ⚠️ 12:40:00                  │ │
│  │ SYSTEM_ALERT                │ │
│  │ NODE_MUMBAI_04              │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More logs)                  │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   USER MANAGEMENT           ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [👤] ROHAN GUPTA            │ │
│  │      Level 45 • BENGALURU   │ │
│  │      ACTIVE • 02M AGO       │ │ ← User card
│  │                      [···]  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [👤] ANANYA SHARMA          │ │
│  │      Level 32 • MUMBAI      │ │
│  │      ACTIVE • 15M AGO       │ │
│  │                      [···]  │ │
│  └─────────────────────────────┘ │
│                                   │
│  ... (More users)                 │
│                                   │
├───────────────────────────────────┤
│  [🏠]  [🌿]  [🛒]  [👥]  [📊]   │
└───────────────────────────────────┘
```

---

### 8. MODALS & OVERLAYS (Mobile)

#### Plant of the Day Modal

```
┌───────────────────────────────────┐
│  [X]  PLANT OF THE DAY            │
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐ │
│  │ [🌿]                         │ │
│  │ Daily botanical protocol    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  HOLY BASIL (TULSI)        ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                   │
│  [BEGINNER FRIENDLY]              │
│  Lamiaceae Family                 │
│  📍 Native: Tropical Asia         │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │   [Plant Image]             │ │ ← Full-width
│  │                             │ │   image
│  └─────────────────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   CARE BASICS               ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ ☀️ LIGHT  │ 💧 WATER        │ │
│  │ Full sun  │ Regular         │ │ ← Care grid
│  └───────────┴─────────────────┘ │   (2x2)
│                                   │
│  ┌───────────┬─────────────────┐ │
│  │ 💨 HUMID. │ 🌡️ TEMP.        │ │
│  │ Moderate  │ 20-35°C         │ │
│  └───────────┴─────────────────┘ │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   FUN FACTS                 ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  • Sacred in Hindu culture        │
│  • Natural air purifier           │
│  • Boosts immune system           │
│  • Repels mosquitoes naturally    │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  ADD TO MY GARDEN      →    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  CLOSE                      │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

#### Plant Doctor Modal

```
┌───────────────────────────────────┐
│  [X]  AI PLANT DOCTOR             │
├───────────────────────────────────┤
│                                   │
│  ┌─────────────────────────────┐ │
│  │ 🩺 AI PLANT DOCTOR          │ │
│  │ Upload photo or describe    │ │
│  │ symptoms for diagnosis      │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │    📷                        │ │
│  │    UPLOAD PLANT PHOTO       │ │ ← Upload area
│  │                             │ │
│  │    [TAP TO UPLOAD]          │ │
│  └─────────────────────────────┘ │
│                                   │
│  OR                               │
│                                   │
│  ┌─────────────────────────────┐ │
│  │                             │ │
│  │ Describe symptoms...        │ │ ← Text area
│  │                             │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  DIAGNOSE PLANT        →    │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

**Diagnosis Results**

```
┌───────────────────────────────────┐
│  [X]  DIAGNOSIS COMPLETE      [✓] │
├───────────────────────────────────┤
│                                   │
│  ⚠️ NUTRIENT DEFICIENCY           │
│  (Nitrogen)                       │
│                                   │
│  Confidence: 85%                  │
│  Severity: MODERATE               │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   SYMPTOMS                  ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  • Yellowing of lower leaves      │
│  • Slow growth                    │
│  • Pale green color overall       │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   TREATMENT                 ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  1. Apply balanced liquid         │
│     fertilizer (10-10-10) at      │
│     half strength                 │
│                                   │
│  2. Add compost to top layer      │
│                                   │
│  3. Consider slow-release         │
│     fertilizer                    │
│                                   │
│  ╔═════════════════════════════╗  │
│  ║   PREVENTION                ║  │
│  ╚═════════════════════════════╝  │
│                                   │
│  • Fertilize every 2-3 weeks      │
│  • Use quality potting mix        │
│  • Monitor leaf color             │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  SHOP FERTILIZERS      →    │ │
│  └─────────────────────────────┘ │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  SAVE TO MY GARDEN          │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

---

## 🎮 INTERACTION PATTERNS

### Gestures & Touch

#### Swipe Gestures

```
← Swipe Left   : Next item in carousel/slider
→ Swipe Right  : Previous item in carousel
↓ Swipe Down   : Dismiss bottom sheet / Refresh feed
↑ Swipe Up     : Open bottom sheet / Load more
```

#### Tap Interactions

```
Single Tap     : Select, activate, navigate
Double Tap     : Like/favorite (heart animation)
Long Press     : Context menu, additional options
```

#### Pull to Refresh

```
┌───────────────────────────────────┐
│         ↓ Pull to refresh         │ ← Pull indicator
├───────────────────────────────────┤
│                                   │
│  [Content refreshing...]          │
│                                   │
└───────────────────────────────────┘
```

---

### Bottom Sheets

**Behavior:**
- Slide up from bottom
- Drag handle at top
- Swipe down to dismiss
- Tap outside to close
- 3 sizes: Peek (30%), Half (50%), Full (90%)

**Examples:**
- Shopping cart
- Post creation
- Filter options
- Share menu

---

### Infinite Scroll

**Pattern:**
```
[Content items]
[Content items]
[Content items]
     ↓
[Loading spinner]
     ↓
[New content loads]
```

**Used in:**
- Community feed
- Marketplace products
- Activity logs
- Search results

---

### Floating Action Button (FAB)

```
┌───────────────────────────────────┐
│                                   │
│  [Content]                        │
│                                   │
│                        ┌────┐     │
│                        │ +  │     │ ← FAB
│                        └────┘     │   (64x64px)
│                                   │   Bottom-right
└───────────────────────────────────┘
```

**Usage:**
- Create new post (Community)
- Add new plant (Garden)
- Quick actions
- 16px from bottom, 16px from right

---

### Loading States

#### Skeleton Screens

```
┌───────────────────────────────────┐
│  ┌─────────────────────────────┐ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │ ← Image
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │   skeleton
│  │                             │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓                │ │ ← Text
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         │ │   skeleton
│  │ ▓▓▓▓▓▓▓▓                    │ │
│  └─────────────────────────────┘ │
└───────────────────────────────────┘
```

**Shimmer animation:** Left to right sweep

---

### Empty States

```
┌───────────────────────────────────┐
│                                   │
│           [Empty Icon]            │
│                                   │
│      No plants in garden yet      │
│                                   │
│   Start your botanical journey    │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  ADD YOUR FIRST PLANT       │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

---

### Error States

```
┌───────────────────────────────────┐
│                                   │
│           [Error Icon]            │
│                                   │
│      Something went wrong         │
│                                   │
│   Unable to load content          │
│                                   │
│  ┌─────────────────────────────┐ │
│  │  TRY AGAIN                  │ │
│  └─────────────────────────────┘ │
│                                   │
└───────────────────────────────────┘
```

---

## 👆 TOUCH TARGETS

### Minimum Sizes

```
Primary Buttons     : 48px height (full width)
Icon Buttons        : 44x44px minimum
List Items          : 56px height minimum
Navigation Items    : 48px height
FAB                 : 56x56px (regular), 64x64px (extended)
Toggle Switches     : 48x28px
```

### Spacing

```
Between tap targets : 8px minimum
Card padding        : 16px - 24px
Screen edges        : 16px - 24px
Bottom nav height   : 72px (includes safe area)
```

---

## 📱 MOBILE-SPECIFIC FEATURES

### Safe Area Handling

```tsx
/* Top safe area (notch/status bar) */
padding-top: env(safe-area-inset-top);

/* Bottom safe area (home indicator) */
padding-bottom: env(safe-area-inset-bottom);

/* Example: Bottom Navigation */
<nav className="fixed bottom-0 pb-safe">
  {/* Navigation items */}
</nav>
```

---

### Viewport Meta Tag

```html
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
```

---

### PWA Features

#### Install Prompt

```
┌───────────────────────────────────┐
│  ┌─────────────────────────────┐ │
│  │  📱 Install Bloomify        │ │
│  │                             │ │
│  │  Get quick access and       │ │
│  │  offline capabilities       │ │
│  │                             │ │
│  │  [Install]    [Not Now]     │ │
│  └─────────────────────────────┘ │
└───────────────────────────────────┘
```

#### Offline Mode

```
┌───────────────────────────────────┐
│  ⚠️ You're offline                │
│  Some features may be limited     │
└───────────────────────────────────┘
```

---

### Haptic Feedback

```javascript
// On button press
navigator.vibrate(10);

// On success action
navigator.vibrate([10, 50, 10]);

// On error
navigator.vibrate([50, 100, 50]);
```

**Used for:**
- Button taps
- Task completion
- Watering plant
- Level up
- Errors/alerts

---

### Orientation Lock

```javascript
// Lock to portrait (recommended)
screen.orientation.lock('portrait');
```

Most screens optimized for portrait mode.

---

## 📐 RESPONSIVE BREAKPOINTS

```css
/* Mobile Portrait */
@media (max-width: 374px)  { /* Small phones */ }
@media (min-width: 375px)  { /* iPhone SE, etc. */ }

/* Mobile Landscape */
@media (orientation: landscape) and (max-height: 428px) {
  /* Compact navigation */
}

/* Tablet */
@media (min-width: 768px)  {
  /* 2-column layouts */
  /* Show desktop nav */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Multi-column layouts */
  /* Full desktop experience */
}
```

---

## 🎨 MOBILE-SPECIFIC STYLING

### Typography Adjustments

```css
/* Mobile: Smaller headings */
.hero-title {
  font-size: 3rem;      /* 48px vs 128px desktop */
}

.section-title {
  font-size: 2rem;      /* 32px vs 72px desktop */
}

/* Improved readability */
body {
  font-size: 16px;      /* Base size */
  line-height: 1.6;     /* Comfortable reading */
}
```

---

### Card Adjustments

```tsx
/* Desktop: 3-column grid */
<div className="grid md:grid-cols-3 gap-8">

/* Mobile: Single column */
<div className="grid grid-cols-1 gap-6">
```

---

### Image Optimization

```tsx
/* Mobile: Lower resolution */
<img 
  src={`${imageUrl}?w=800&q=75`}  // 800px width, 75% quality
  srcSet={`
    ${imageUrl}?w=400 400w,
    ${imageUrl}?w=800 800w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

---

## 🔄 NAVIGATION FLOW

### User Journey (Mobile)

```
App Launch
    ↓
[Landing Page]
    ↓
Tap "START YOUR JOURNEY"
    ↓
[Auth Modal] → Login/Register
    ↓
[Dashboard] (Bottom Nav appears)
    ↓
━━━━━━━━━━━━━━━━━━━━━━━
Bottom Nav Options:
━━━━━━━━━━━━━━━━━━━━━━━
    ↓
    ├→ [🏠 Home] → Dashboard
    ├→ [🌿 Garden] → Gamification Hub
    ├→ [🛒 Market] → Marketplace
    ├→ [👥 Community] → Community Feed
    └→ [📊 Stats] → User Profile
```

---

### Quick Actions

```
From any screen:
    ↓
Tap Hamburger (☰)
    ↓
━━━━━━━━━━━━━━━━━━
Menu Options:
━━━━━━━━━━━━━━━━━━
    ↓
    ├→ AR Scanner
    ├→ Settings
    ├→ Language Switch
    ├→ About
    └→ Logout
```

---

## 📊 PERFORMANCE TARGETS

### Mobile Metrics

```
First Contentful Paint  : < 1.8s
Largest Contentful Paint: < 2.5s
Time to Interactive     : < 3.8s
Cumulative Layout Shift : < 0.1
First Input Delay       : < 100ms

Bundle Size (Mobile)    : < 300KB (gzipped)
Image Size (per image)  : < 100KB
Total Page Weight       : < 1MB
```

---

### Optimization Strategies

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Image Optimization**
   - WebP format
   - Lazy loading
   - Responsive images
   - CDN delivery

3. **Caching**
   - Service worker
   - Cache API
   - LocalStorage for data

4. **Network**
   - API request batching
   - Debounced search
   - Optimistic UI updates

---

## ✅ MOBILE CHECKLIST

### Pre-Launch Verification

- [ ] All touch targets ≥ 44x44px
- [ ] Bottom navigation accessible
- [ ] Safe area insets handled
- [ ] Orientation lock configured
- [ ] PWA manifest configured
- [ ] Offline mode functional
- [ ] Haptic feedback implemented
- [ ] Pull-to-refresh working
- [ ] Loading states present
- [ ] Error states present
- [ ] Empty states present
- [ ] Images optimized
- [ ] Fonts loaded efficiently
- [ ] Performance targets met
- [ ] Accessibility tested
- [ ] Cross-browser tested
- [ ] Real device tested

---

## 🎯 MOBILE UX PRINCIPLES

### 1. Progressive Disclosure
- Show essential info first
- Hide advanced features behind taps
- Use expandable sections

### 2. Thumb Zone Optimization
- Primary actions in lower half
- Secondary actions in upper half
- Avoid extreme corners

### 3. Feedback & Confirmation
- Visual feedback on tap
- Haptic feedback for actions
- Confirmation for destructive actions

### 4. Speed & Efficiency
- Skeleton screens during load
- Optimistic UI updates
- Minimal animations

### 5. Context Awareness
- Remember scroll position
- Preserve form state
- Auto-save drafts

---

**Document Version:** 1.0  
**Last Updated:** March 7, 2026  
**Platform:** Mobile Web (iOS/Android)  
**Maintained By:** Bloomify Design Team

---

*These wireframes represent the mobile-optimized experience for Bloomify. All measurements, interactions, and patterns are optimized for touch-based interfaces and small screens.*
