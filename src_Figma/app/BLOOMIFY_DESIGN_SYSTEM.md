# 🎨 BLOOMIFY DESIGN SYSTEM
## Premium Deep Botanical Aesthetic - Complete UI Component Library

> **Version:** 4.0  
> **Last Updated:** March 7, 2026  
> **Design Language:** Premium Deep Botanical with Glassmorphism  
> **Theme:** Dark Mode Exclusive

---

## 📑 TABLE OF CONTENTS

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Sizing](#spacing--sizing)
5. [Border Radius](#border-radius)
6. [Shadows & Elevation](#shadows--elevation)
7. [Glassmorphism System](#glassmorphism-system)
8. [Gradients](#gradients)
9. [Animation System](#animation-system)
10. [Icons](#icons)
11. [Buttons](#buttons)
12. [Cards](#cards)
13. [Badges](#badges)
14. [Forms & Inputs](#forms--inputs)
15. [Navigation](#navigation)
16. [Modals & Dialogs](#modals--dialogs)
17. [Alerts & Toasts](#alerts--toasts)
18. [Progress Indicators](#progress-indicators)
19. [Avatars](#avatars)
20. [Layout Patterns](#layout-patterns)
21. [Landing Page Sections](#landing-page-sections)
22. [Dashboard Components](#dashboard-components)
23. [Marketplace Components](#marketplace-components)
24. [Community Components](#community-components)
25. [Accessibility Guidelines](#accessibility-guidelines)

---

## 🎯 DESIGN PHILOSOPHY

### Core Principles

1. **Premium First**
   - High-end botanical aesthetic
   - Sophisticated color gradients
   - Elegant glassmorphism

2. **Sci-Fi Meets Nature**
   - Terminal-style typography
   - Uppercase labels with wide tracking
   - Technical language ("BIO-UNITS", "PROTOCOLS", "NEXUS")

3. **Dark Mode Native**
   - Deep slate backgrounds
   - High contrast text
   - Emerald-teal accent system

4. **Accessible & Inclusive**
   - WCAG 2.1 AA compliance
   - Multi-language support
   - Screen reader friendly

5. **Motion & Delight**
   - Subtle micro-interactions
   - Smooth transitions
   - Purposeful animations

---

## 🎨 COLOR SYSTEM

### Primary Palette

```css
/* Base Colors */
--color-black: #020617;          /* Deep Slate - Primary Background */
--color-white: #FFFFFF;          /* Pure White - Text */

/* Brand Colors */
--primary: #10B981;              /* Emerald - Primary Actions */
--accent: #0D9488;               /* Teal - Secondary Accents */
--tertiary: #0369A1;             /* Sapphire - Tertiary Accents */

/* Semantic Colors */
--success: #10B981;              /* Emerald Green */
--warning: #F59E0B;              /* Amber */
--error: #EF4444;                /* Red */
--info: #3B82F6;                 /* Blue */
```

### Opacity Levels

```css
/* White Opacity Scale */
--white-100: rgba(255, 255, 255, 1);     /* 100% - Headings */
--white-90: rgba(255, 255, 255, 0.9);    /* 90% - Body text */
--white-80: rgba(255, 255, 255, 0.8);    /* 80% - Secondary text */
--white-60: rgba(255, 255, 255, 0.6);    /* 60% - Muted text */
--white-40: rgba(255, 255, 255, 0.4);    /* 40% - Disabled text */
--white-30: rgba(255, 255, 255, 0.3);    /* 30% - Subtle labels */
--white-20: rgba(255, 255, 255, 0.2);    /* 20% - Dividers */
--white-10: rgba(255, 255, 255, 0.1);    /* 10% - Borders */
--white-5: rgba(255, 255, 255, 0.05);    /* 5% - Backgrounds */
--white-3: rgba(255, 255, 255, 0.03);    /* 3% - Subtle backgrounds */

/* Emerald Opacity Scale */
--emerald-100: rgba(16, 185, 129, 1);    /* 100% - Primary actions */
--emerald-50: rgba(16, 185, 129, 0.5);   /* 50% - Hover states */
--emerald-30: rgba(16, 185, 129, 0.3);   /* 30% - Focus rings */
--emerald-20: rgba(16, 185, 129, 0.2);   /* 20% - Highlights */
--emerald-10: rgba(16, 185, 129, 0.1);   /* 10% - Backgrounds */
--emerald-5: rgba(16, 185, 129, 0.05);   /* 5% - Subtle BG */
```

### Usage Guidelines

| Color | Usage | Example |
|-------|-------|---------|
| `#020617` | Page backgrounds, dark surfaces | `bg-[#020617]` |
| `#10B981` | Primary CTAs, active states, success | Buttons, links, badges |
| `#0D9488` | Secondary accents, highlights | Icons, borders |
| `#0369A1` | Tertiary accents, gradients | Gradient stops |
| `rgba(255,255,255,0.03)` | Card backgrounds | Glass cards |
| `rgba(255,255,255,0.1)` | Borders, dividers | Card borders |

---

## ✍️ TYPOGRAPHY

### Font Families

```css
/* Primary - Display & Headings */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap');
font-family: 'Clash Display', sans-serif;

/* Secondary - Body & UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
font-family: 'Inter', sans-serif;
```

### Type Scale

```css
/* Font Sizes */
--text-xs: 0.75rem;      /* 12px - Tiny labels */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-xl: 1.25rem;      /* 20px - Subheadings */
--text-2xl: 1.5rem;      /* 24px - H4 */
--text-3xl: 2rem;        /* 32px - H3 */
--text-4xl: 2.5rem;      /* 40px - H2 */
--text-5xl: 3.5rem;      /* 56px - H1 */
--text-6xl: 4.5rem;      /* 72px - Display Large */
--text-7xl: 6rem;        /* 96px - Display XL */
--text-8xl: 8rem;        /* 128px - Display 2XL */
--text-9xl: 10rem;       /* 160px - Display 3XL */
```

### Typography Styles

#### Headings (Clash Display)

```tsx
/* Hero Title - 9xl */
<h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-['Clash_Display']">
  THE <span className="text-premium">NEXUS.</span>
</h1>

/* Page Title - 8xl */
<h1 className="text-6xl md:text-8xl font-bold tracking-tighter font-['Clash_Display'] leading-none">
  SALUTATIONS, <span className="text-premium uppercase">COLLECTOR</span>
</h1>

/* Section Title - 3xl */
<h2 className="text-3xl font-bold tracking-tight uppercase font-['Clash_Display']">
  Active Protocols
</h2>

/* Subsection Title - 2xl */
<h3 className="text-2xl font-bold font-['Clash_Display'] uppercase tracking-tight">
  Plant of the Day
</h3>
```

#### Body Text (Inter)

```tsx
/* Body Large - lg */
<p className="text-lg text-white/80 leading-relaxed font-['Inter']">
  The definitive ecosystem for high-performance urban gardening.
</p>

/* Body Regular - base */
<p className="text-base text-white/70 leading-normal font-['Inter']">
  Essential Vedic botanical for immunity and air quality.
</p>

/* Body Small - sm */
<p className="text-sm text-white/60 font-['Inter']">
  Secondary information and descriptions.
</p>
```

#### Labels & Captions

```tsx
/* Label - Uppercase with tracking */
<p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
  COMMAND TERMINAL v4.0
</p>

/* Caption */
<p className="text-xs text-white/50 uppercase tracking-widest">
  NATIVE: TROPICAL ASIA
</p>
```

### Font Weights

```css
--font-light: 300;       /* Light - Rarely used */
--font-normal: 400;      /* Regular - Body text */
--font-medium: 500;      /* Medium - Emphasis */
--font-semibold: 600;    /* Semibold - Headings */
--font-bold: 700;        /* Bold - Strong emphasis */
--font-black: 900;       /* Black - Labels, badges */
```

### Letter Spacing

```css
--tracking-tighter: -0.05em;    /* -0.8px - Display headings */
--tracking-tight: -0.025em;     /* -0.4px - Headings */
--tracking-normal: 0em;         /* 0px - Body text */
--tracking-wide: 0.025em;       /* 0.4px - Buttons */
--tracking-wider: 0.05em;       /* 0.8px - Labels */
--tracking-widest: 0.1em;       /* 1.6px - Small labels */
--tracking-mega: 0.2em;         /* 3.2px - Tiny labels */
--tracking-ultra: 0.4em;        /* 6.4px - Brutalist labels */
```

---

## 📐 SPACING & SIZING

### Spacing Scale (Tailwind)

```css
/* Spacing Units (4px base) */
0    →  0px
px   →  1px
0.5  →  2px      /* Tiny gaps */
1    →  4px      /* Minimal spacing */
2    →  8px      /* Extra small */
3    →  12px     /* Small */
4    →  16px     /* Base spacing */
5    →  20px     /* Medium-small */
6    →  24px     /* Medium */
8    →  32px     /* Large */
10   →  40px     /* Extra large */
12   →  48px     /* 2XL */
16   →  64px     /* 3XL */
20   →  80px     /* 4XL */
24   →  96px     /* 5XL */
32   →  128px    /* 6XL - Hero sections */
40   →  160px    /* 7XL - Major sections */
```

### Common Spacing Patterns

```tsx
/* Card Padding */
className="p-8"           // Large cards - 32px
className="p-6"           // Medium cards - 24px
className="p-5"           // Small cards - 20px
className="p-4"           // Compact cards - 16px

/* Section Spacing */
className="py-40"         // Hero sections - 160px vertical
className="py-32"         // Major sections - 128px vertical
className="py-24"         // Standard sections - 96px vertical
className="py-16"         // Subsections - 64px vertical

/* Element Gaps */
className="gap-12"        // Section gaps - 48px
className="gap-8"         // Card gaps - 32px
className="gap-6"         // Element gaps - 24px
className="gap-4"         // Tight gaps - 16px
className="gap-3"         // Compact gaps - 12px
```

---

## 🔲 BORDER RADIUS

### Radius Scale

```css
--radius: 0.75rem;                     /* 12px - Base radius */
--radius-sm: calc(var(--radius) - 4px);  /* 8px - Small */
--radius-md: var(--radius);              /* 12px - Medium */
--radius-lg: calc(var(--radius) + 8px);  /* 20px - Large */
--radius-xl: calc(var(--radius) + 16px); /* 28px - Extra Large */
```

### Tailwind Classes

```tsx
/* Ultra Rounded (Pill shapes) */
rounded-full       // 9999px - Badges, buttons, avatars

/* Rounded Corners */
rounded-[3rem]     // 48px - Large cards (signature style)
rounded-[2rem]     // 32px - Medium cards, buttons
rounded-3xl        // 24px - Cards
rounded-2xl        // 16px - Cards, inputs
rounded-xl         // 12px - Standard cards
rounded-lg         // 8px - Small elements
rounded-md         // 6px - Tiny elements
rounded-sm         // 4px - Minimal rounding
rounded            // 4px - Default
rounded-none       // 0px - No rounding
```

### Usage Examples

```tsx
/* Signature Card Style */
<Card className="rounded-[3rem] border-white/5">

/* Button Style */
<Button className="rounded-[2rem] px-12">

/* Badge Style */
<Badge className="rounded-full px-4">

/* Input Style */
<Input className="rounded-2xl">
```

---

## 🌑 SHADOWS & ELEVATION

### Shadow System

```css
/* Shadow Levels */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 30px 60px rgba(0, 0, 0, 0.4);

/* Glow Shadows (Emerald) */
--glow-sm: 0 0 10px rgba(16, 185, 129, 0.1);
--glow-md: 0 0 20px rgba(16, 185, 129, 0.2);
--glow-lg: 0 0 30px rgba(16, 185, 129, 0.3);
--glow-xl: 0 0 40px rgba(16, 185, 129, 0.4);
```

### Tailwind Shadow Classes

```tsx
/* Standard Shadows */
shadow-sm          // Subtle elevation
shadow             // Base elevation
shadow-md          // Medium elevation
shadow-lg          // High elevation
shadow-xl          // Very high elevation
shadow-2xl         // Maximum elevation

/* Custom Shadows */
className="shadow-2xl shadow-emerald-500/20"  // Emerald glow
className="shadow-xl shadow-white/5"          // Subtle white glow
```

### Elevation Levels

| Level | Use Case | Shadow | Example |
|-------|----------|--------|---------|
| 0 | Flat surfaces | None | Backgrounds |
| 1 | Slight elevation | `shadow-sm` | Inputs, subtle cards |
| 2 | Card surfaces | `shadow-md` | Content cards |
| 3 | Floating elements | `shadow-lg` | Dropdowns, popovers |
| 4 | Modal overlays | `shadow-xl` | Modals, drawers |
| 5 | Maximum depth | `shadow-2xl` | Important modals |

---

## 🪟 GLASSMORPHISM SYSTEM

### Glass Utility Classes

```css
/* Base Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Strong Glass Effect */
.glass-strong {
  background: rgba(2, 6, 23, 0.7);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glass with Hover */
.glass-hover {
  @apply transition-all duration-500;
}

.glass-hover:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(16, 185, 129, 0.2);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), 
              0 0 40px rgba(16, 185, 129, 0.1);
  transform: translateY(-4px);
}
```

### Glass Component Examples

```tsx
/* Basic Glass Card */
<Card className="glass rounded-[3rem] overflow-hidden">
  {/* Content */}
</Card>

/* Hoverable Glass Card */
<Card className="glass glass-hover rounded-[3rem] group">
  {/* Content */}
</Card>

/* Strong Glass (Navigation, Modals) */
<nav className="glass-strong fixed top-0 left-0 right-0 z-50">
  {/* Nav content */}
</nav>

/* Premium Glass Card */
<Card className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl">
  {/* Content */}
</Card>
```

### Background Blur Levels

```css
backdrop-blur-none    // 0px - No blur
backdrop-blur-sm      // 4px - Subtle blur
backdrop-blur         // 8px - Base blur
backdrop-blur-md      // 12px - Medium blur
backdrop-blur-lg      // 16px - Strong blur
backdrop-blur-xl      // 24px - Extra strong (default glass)
backdrop-blur-2xl     // 32px - Maximum blur (strong glass)
backdrop-blur-3xl     // 64px - Ultra blur (special effects)
```

---

## 🌈 GRADIENTS

### Premium Gradient

```css
/* Primary Brand Gradient */
--premium-gradient: linear-gradient(135deg, #10B981 0%, #0D9488 50%, #0369A1 100%);

/* Usage in Tailwind */
bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600
```

### Gradient Text

```css
/* Premium Text Utility */
.text-premium {
  background: linear-gradient(135deg, #10B981 0%, #0D9488 50%, #0369A1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

```tsx
/* Usage */
<h1 className="text-premium">BLOOMIFY</h1>
<span className="text-premium uppercase">COLLECTOR</span>
```

### Gradient Variations

```tsx
/* Emerald to Teal */
className="bg-gradient-to-r from-emerald-500 to-teal-600"

/* Emerald to Blue */
className="bg-gradient-to-br from-emerald-500 to-blue-600"

/* Vertical Gradient */
className="bg-gradient-to-b from-emerald-500 via-teal-600 to-blue-600"

/* Diagonal Gradient (Signature) */
className="bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600"
```

### Overlay Gradients

```tsx
/* Dark Fade from Bottom */
<div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />

/* Dark Fade from Top */
<div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 to-transparent" />

/* Radial Glow */
<div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 to-transparent" />
```

---

## 🎬 ANIMATION SYSTEM

### Motion Library (Framer Motion)

```tsx
import { motion } from 'motion/react';
```

### Transition Presets

```tsx
/* Fade In */
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

/* Slide Up */
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

/* Slide In from Left */
const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

/* Scale In */
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};
```

### Stagger Children

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.div key={item} variants={item}>
      {/* Content */}
    </motion.div>
  ))}
</motion.div>
```

### Hover Animations

```tsx
/* Scale on Hover */
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>

/* Glow on Hover */
<motion.div
  whileHover={{
    boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)"
  }}
>
  {/* Content */}
</motion.div>
```

### CSS Animations

```css
/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}
```

### Transition Timing

```css
/* Duration */
duration-75      // 75ms - Instant
duration-100     // 100ms - Very fast
duration-150     // 150ms - Fast
duration-200     // 200ms - Base (default)
duration-300     // 300ms - Medium
duration-500     // 500ms - Slow
duration-700     // 700ms - Very slow
duration-1000    // 1000ms - Extra slow

/* Easing */
ease-linear      // Linear
ease-in          // Ease in
ease-out         // Ease out
ease-in-out      // Ease in-out (default)

/* Custom Spring Easing */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 🎯 ICONS

### Icon Library: Lucide React

```tsx
import { 
  Sprout, Droplets, Sun, Trophy, Zap, 
  TrendingUp, Calendar, Award, Target, 
  Sparkles, ChevronRight, ArrowUpRight,
  Heart, MessageCircle, Share2, Search,
  Filter, MapPin, Plus, X, Camera,
  Shield, Users, Activity, AlertTriangle
} from 'lucide-react';
```

### Icon Sizes

```tsx
/* Extra Small - w-3 h-3 (12px) */
<MapPin className="w-3 h-3" />

/* Small - w-4 h-4 (16px) */
<Heart className="w-4 h-4" />

/* Medium - w-5 h-5 (20px) - DEFAULT */
<Sprout className="w-5 h-5" />

/* Large - w-6 h-6 (24px) */
<Trophy className="w-6 h-6" />

/* Extra Large - w-8 h-8 (32px) */
<Award className="w-8 h-8" />

/* 2XL - w-10 h-10 (40px) */
<Shield className="w-10 h-10" />
```

### Icon with Text Pattern

```tsx
/* Button with Icon */
<Button>
  <Plus className="w-5 h-5 mr-3" />
  Add Plant
</Button>

/* Badge with Icon */
<Badge>
  <MapPin className="w-3 h-3 mr-1" />
  MUMBAI
</Badge>

/* Stat with Icon */
<div className="flex items-center gap-3">
  <Sprout className="text-emerald-400 w-6 h-6" />
  <span>12 Plants</span>
</div>
```

### Icon Color System

```tsx
/* Semantic Colors */
className="text-emerald-400"    // Success, growth, plants
className="text-blue-400"       // Water, hydration
className="text-yellow-400"     // Energy, sun, XP
className="text-purple-400"     // Premium, achievements
className="text-red-400"        // Alerts, warnings
className="text-white/60"       // Muted icons
```

---

## 🔘 BUTTONS

### Button Variants

#### 1. Primary Button (Default)

```tsx
<Button className="h-20 px-12 rounded-[2rem] bg-white text-black font-black hover:scale-105 transition-all shadow-2xl shadow-white/5 font-['Clash_Display'] uppercase tracking-[0.2em] text-xs">
  START YOUR JOURNEY
</Button>
```

**Styles:**
- Background: White
- Text: Black
- Height: 80px
- Padding: 48px horizontal
- Border Radius: 32px
- Font: Clash Display, 900 weight
- Uppercase with letter-spacing
- Scale on hover: 1.05
- Shadow: 2xl with white glow

#### 2. Emerald Button

```tsx
<Button className="h-16 px-10 rounded-[2rem] bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
  ACQUIRE ASSET
</Button>
```

#### 3. Ghost Button

```tsx
<Button className="px-8 py-4 rounded-[2rem] border-2 border-white/10 text-white hover:border-emerald-500/30 hover:bg-white/5 transition-all backdrop-blur-xl">
  Learn More
</Button>
```

#### 4. Icon Button

```tsx
<Button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all">
  <Plus className="w-5 h-5" />
</Button>
```

#### 5. Glass Button

```tsx
<Button className="glass px-8 py-4 rounded-[2rem] hover:bg-white/10 transition-all">
  Continue
</Button>
```

#### 6. Compact Button

```tsx
<Button className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-all">
  Add to Cart
</Button>
```

### Button Sizes

```tsx
/* Extra Large */
className="h-20 px-12"     // Hero CTAs

/* Large */
className="h-16 px-10"     // Primary actions

/* Medium (Default) */
className="h-12 px-8"      // Standard buttons

/* Small */
className="h-10 px-6"      // Compact buttons

/* Extra Small */
className="h-8 px-4"       // Tiny buttons
```

### Button States

```tsx
/* Hover */
hover:scale-105
hover:shadow-lg
hover:bg-emerald-600
hover:border-emerald-500/30

/* Active */
active:scale-95

/* Disabled */
disabled:opacity-50
disabled:cursor-not-allowed
disabled:hover:scale-100

/* Focus */
focus:outline-none
focus:ring-2
focus:ring-emerald-500/30
focus:ring-offset-2
focus:ring-offset-[#020617]
```

---

## 🃏 CARDS

### Card Variants

#### 1. Glass Card (Signature Style)

```tsx
<Card className="glass rounded-[3rem] border-white/5 overflow-hidden shadow-xl">
  <div className="p-8">
    {/* Content */}
  </div>
</Card>
```

**Features:**
- Frosted glass background
- 48px border radius
- White border with 5% opacity
- 24px backdrop blur
- Shadow XL

#### 2. Premium Glass Card

```tsx
<Card className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl hover:border-emerald-500/30 transition-all duration-700">
  <div className="p-10">
    {/* Content */}
  </div>
</Card>
```

#### 3. Hoverable Card

```tsx
<Card className="glass rounded-[3rem] group hover:border-emerald-500/30 transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-2">
  <div className="p-8">
    {/* Content with group-hover effects */}
  </div>
</Card>
```

#### 4. Image Card (Community/Marketplace)

```tsx
<Card className="glass rounded-[3rem] border-white/5 overflow-hidden group">
  <div className="relative overflow-hidden aspect-video">
    <img 
      src={imageUrl}
      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
  </div>
  <div className="p-8">
    {/* Content */}
  </div>
</Card>
```

#### 5. Stat Card

```tsx
<Card className="glass rounded-[2rem] border-white/5 p-8">
  <div className="flex items-center gap-6">
    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
      <Sprout className="w-7 h-7 text-white" />
    </div>
    <div>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">
        BIO-UNITS
      </p>
      <p className="text-4xl font-bold tracking-tight font-['Clash_Display']">
        12
      </p>
      <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mt-1">
        98% UPTIME
      </p>
    </div>
  </div>
</Card>
```

#### 6. Product Card

```tsx
<Card className="glass rounded-[2rem] overflow-hidden group hover:border-emerald-500/20 transition-all">
  <div className="aspect-square overflow-hidden relative">
    <img 
      src={product.image}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <Button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20">
      <Heart className="w-4 h-4" />
    </Button>
  </div>
  <div className="p-6">
    <Badge className="mb-3">Plants</Badge>
    <h3 className="text-lg font-bold uppercase mb-2">HOLY BASIL (TULSI)</h3>
    <p className="text-sm text-white/60 mb-4">Essential Vedic botanical</p>
    <div className="flex items-center justify-between">
      <p className="text-2xl font-bold text-emerald-400">₹249</p>
      <Button className="rounded-2xl">Add</Button>
    </div>
  </div>
</Card>
```

### Card Padding

```tsx
p-10    // 40px - Extra large cards
p-8     // 32px - Large cards (default)
p-6     // 24px - Medium cards
p-5     // 20px - Compact cards
p-4     // 16px - Small cards
```

---

## 🏷️ BADGES

### Badge Variants

#### 1. Default Badge

```tsx
<Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
  FEATURED
</Badge>
```

#### 2. Outlined Badge

```tsx
<Badge className="border border-emerald-500/30 text-emerald-400 bg-transparent px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
  3 / 5 SYNCHRONIZED
</Badge>
```

#### 3. Status Badge

```tsx
/* Success */
<Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
  ACTIVE
</Badge>

/* Warning */
<Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
  WARNING
</Badge>

/* Error */
<Badge className="bg-red-500/10 text-red-400 border-red-500/20">
  OFFLINE
</Badge>

/* Info */
<Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
  NEW
</Badge>
```

#### 4. Location Badge

```tsx
<Badge className="bg-black/40 backdrop-blur-xl border-white/10 text-white/80 flex items-center gap-2 py-2 px-4 rounded-full">
  <MapPin className="w-3 h-3 text-emerald-400" />
  BENGALURU
</Badge>
```

#### 5. Discount Badge

```tsx
<Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
  -30%
</Badge>
```

#### 6. Level Badge

```tsx
<Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
  ELITE GARDENER
</Badge>
```

### Badge Sizes

```tsx
/* Small */
className="px-2 py-0.5 text-[10px]"

/* Medium (Default) */
className="px-3 py-1 text-xs"

/* Large */
className="px-4 py-1.5 text-sm"

/* Extra Large */
className="px-6 py-2 text-base"
```

---

## 📝 FORMS & INPUTS

### Input Field

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-white/80 uppercase tracking-wider">
    Email Address
  </label>
  <Input 
    type="email"
    placeholder="collector@bloomify.io"
    className="h-14 px-6 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
  />
</div>
```

### Textarea

```tsx
<Textarea 
  placeholder="Describe symptoms..."
  className="min-h-32 px-6 py-4 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 resize-none"
/>
```

### Select Dropdown

```tsx
<Select>
  <SelectTrigger className="h-14 px-6 rounded-2xl bg-white/5 border-white/10 text-white">
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent className="bg-[#020617] border-white/10 rounded-2xl backdrop-blur-3xl">
    <SelectItem value="plants">Bio-Units</SelectItem>
    <SelectItem value="seeds">Genomes</SelectItem>
    <SelectItem value="tools">Equipment</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox

```tsx
<div className="flex items-center gap-3">
  <Checkbox 
    id="terms"
    className="w-5 h-5 rounded border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
  />
  <label htmlFor="terms" className="text-sm text-white/80">
    I agree to the terms and conditions
  </label>
</div>
```

### Radio Group

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option1" id="r1" />
    <label htmlFor="r1">Option 1</label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option2" id="r2" />
    <label htmlFor="r2">Option 2</label>
  </div>
</RadioGroup>
```

### Switch/Toggle

```tsx
<div className="flex items-center gap-3">
  <Switch 
    id="notifications"
    className="data-[state=checked]:bg-emerald-500"
  />
  <label htmlFor="notifications" className="text-sm text-white/80">
    Enable notifications
  </label>
</div>
```

### Search Input

```tsx
<div className="relative">
  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
  <Input 
    type="search"
    placeholder="Search assets..."
    className="h-14 pl-14 pr-6 rounded-[2rem] bg-white/5 border-white/10 text-white placeholder:text-white/30"
  />
</div>
```

### Form Validation States

```tsx
/* Error State */
<Input className="border-red-500/50 focus:border-red-500 focus:ring-red-500/20" />
<p className="text-xs text-red-400 mt-2">Invalid email address</p>

/* Success State */
<Input className="border-emerald-500/50" />
<p className="text-xs text-emerald-400 mt-2">Email verified</p>

/* Disabled State */
<Input disabled className="opacity-50 cursor-not-allowed" />
```

---

## 🧭 NAVIGATION

### Top Navigation Bar

```tsx
<nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
  <div className="container mx-auto px-6">
    <div className="flex items-center justify-between h-24">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
          <Sprout className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold font-['Clash_Display'] tracking-tight">
          BLOOMIFY
        </span>
      </div>

      {/* Nav Items */}
      <div className="hidden md:flex items-center gap-10">
        <a href="/" className="text-sm font-medium uppercase tracking-wider hover:text-emerald-400 transition-colors">
          Overview
        </a>
        <a href="/dashboard" className="text-sm font-medium uppercase tracking-wider text-emerald-400">
          Dashboard
        </a>
        {/* More items */}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <Select>
          <SelectTrigger className="w-20 h-10">
            <SelectValue placeholder="EN" />
          </SelectTrigger>
          {/* Options */}
        </Select>

        {/* User Avatar or Login */}
        <Button className="rounded-full">
          Login
        </Button>
      </div>

    </div>
  </div>
</nav>
```

### Active Link Styling

```tsx
/* Active */
className="text-emerald-400 border-b-2 border-emerald-400"

/* Inactive */
className="text-white/70 hover:text-white transition-colors"
```

### Mobile Navigation

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="w-6 h-6" />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="bg-[#020617] border-white/10">
    <nav className="flex flex-col gap-6 mt-8">
      <a href="/" className="text-lg font-medium uppercase tracking-wider">
        Overview
      </a>
      {/* More links */}
    </nav>
  </SheetContent>
</Sheet>
```

---

## 🗨️ MODALS & DIALOGS

### Standard Modal

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#020617] border-white/10 text-white">
    
    <DialogHeader className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
          <Flower2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <DialogTitle className="text-2xl font-bold font-['Clash_Display'] uppercase tracking-tight">
            Plant of the Day
          </DialogTitle>
          <DialogDescription className="text-white/40 font-medium">
            Daily botanical protocol for urban resilience
          </DialogDescription>
        </div>
      </div>
    </DialogHeader>

    <div className="space-y-8">
      {/* Modal content */}
    </div>

    <div className="flex gap-4 mt-8">
      <Button onClick={onClose} className="flex-1">
        Close
      </Button>
    </div>

  </DialogContent>
</Dialog>
```

### Full-Screen Modal

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-7xl w-[95vw] h-[95vh] bg-[#020617] border-white/10">
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Modal Header with Icon

```tsx
<DialogHeader>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
      <Icon className="w-5 h-5 text-emerald-400" />
    </div>
    <div>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Modal description</DialogDescription>
    </div>
  </div>
</DialogHeader>
```

---

## 🔔 ALERTS & TOASTS

### Toast Notifications (Sonner)

```tsx
import { toast } from 'sonner@2.0.3';

/* Success */
toast.success('Plant added to garden!');

/* Error */
toast.error('Failed to save changes');

/* Info */
toast.info('New plant of the day available');

/* Warning */
toast.warning('Low water level detected');

/* Custom Toast */
toast.custom((t) => (
  <div className="glass rounded-2xl p-4 border border-emerald-500/20">
    <p className="font-bold text-emerald-400">Achievement Unlocked!</p>
    <p className="text-sm text-white/80">You've reached Level 15</p>
  </div>
));
```

### Alert Component

```tsx
<Alert className="glass rounded-2xl border-yellow-500/20 bg-yellow-500/5">
  <AlertTriangle className="w-5 h-5 text-yellow-400" />
  <AlertTitle className="text-yellow-400 font-bold">
    High Temperature Alert
  </AlertTitle>
  <AlertDescription className="text-white/70">
    Consider providing shade for your plants today.
  </AlertDescription>
</Alert>
```

### Alert Variants

```tsx
/* Success Alert */
<Alert className="border-emerald-500/20 bg-emerald-500/5">
  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
  {/* Content */}
</Alert>

/* Error Alert */
<Alert className="border-red-500/20 bg-red-500/5">
  <XCircle className="w-5 h-5 text-red-400" />
  {/* Content */}
</Alert>

/* Info Alert */
<Alert className="border-blue-500/20 bg-blue-500/5">
  <Info className="w-5 h-5 text-blue-400" />
  {/* Content */}
</Alert>
```

---

## 📊 PROGRESS INDICATORS

### Progress Bar

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-white/80">Growth</span>
    <span className="text-sm font-bold text-emerald-400">45%</span>
  </div>
  <Progress 
    value={45} 
    className="h-2 bg-white/10"
    indicatorClassName="bg-gradient-to-r from-emerald-500 to-teal-600"
  />
</div>
```

### Level Progress

```tsx
<div className="space-y-3">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500/30">
        <span className="text-lg font-bold text-emerald-400">15</span>
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest">LEVEL</p>
        <p className="text-sm font-bold">S-CLASS COLLECTOR</p>
      </div>
    </div>
    <p className="text-sm text-white/60">3,450 / 5,000 XP</p>
  </div>
  <Progress value={69} className="h-3 bg-white/10" />
</div>
```

### Circular Progress

```tsx
<div className="relative w-32 h-32">
  <svg className="w-full h-full transform -rotate-90">
    <circle
      cx="64"
      cy="64"
      r="56"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="8"
      fill="none"
    />
    <circle
      cx="64"
      cy="64"
      r="56"
      stroke="url(#gradient)"
      strokeWidth="8"
      fill="none"
      strokeDasharray={`${2 * Math.PI * 56}`}
      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
      className="transition-all duration-500"
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
    </defs>
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-2xl font-bold text-emerald-400">75%</span>
  </div>
</div>
```

### Loading Spinner

```tsx
<div className="flex items-center justify-center">
  <div className="w-12 h-12 border-4 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
</div>
```

---

## 👤 AVATARS

### User Avatar

```tsx
<Avatar className="w-12 h-12 border-2 border-emerald-500/30">
  <AvatarImage src={user.photoURL} alt={user.name} />
  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
    {user.name.split(' ').map(n => n[0]).join('')}
  </AvatarFallback>
</Avatar>
```

### Avatar Sizes

```tsx
/* Extra Small */
<Avatar className="w-8 h-8" />

/* Small */
<Avatar className="w-10 h-10" />

/* Medium (Default) */
<Avatar className="w-12 h-12" />

/* Large */
<Avatar className="w-16 h-16" />

/* Extra Large */
<Avatar className="w-24 h-24" />
```

### Avatar with Status

```tsx
<div className="relative">
  <Avatar className="w-12 h-12">
    <AvatarImage src={user.photoURL} />
    <AvatarFallback>RG</AvatarFallback>
  </Avatar>
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020617]" />
</div>
```

### Avatar Group

```tsx
<div className="flex -space-x-4">
  <Avatar className="w-12 h-12 border-2 border-[#020617]">
    <AvatarImage src="/avatar1.jpg" />
  </Avatar>
  <Avatar className="w-12 h-12 border-2 border-[#020617]">
    <AvatarImage src="/avatar2.jpg" />
  </Avatar>
  <Avatar className="w-12 h-12 border-2 border-[#020617]">
    <AvatarFallback className="bg-white/10">+5</AvatarFallback>
  </Avatar>
</div>
```

---

## 📐 LAYOUT PATTERNS

### Container

```tsx
<div className="container mx-auto max-w-7xl px-6">
  {/* Content */}
</div>
```

### Grid Layouts

```tsx
/* 2-Column Grid */
<div className="grid md:grid-cols-2 gap-8">
  {/* Items */}
</div>

/* 3-Column Grid */
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>

/* 4-Column Grid */
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>

/* Auto-fit Grid */
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
  {/* Items */}
</div>
```

### Masonry Layout (Community)

```tsx
<div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
  {posts.map((post) => (
    <div key={post.id} className="break-inside-avoid">
      {/* Post card */}
    </div>
  ))}
</div>
```

### Flex Layouts

```tsx
/* Horizontal Stack */
<div className="flex items-center gap-4">
  {/* Items */}
</div>

/* Vertical Stack */
<div className="flex flex-col gap-6">
  {/* Items */}
</div>

/* Space Between */
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

/* Center */
<div className="flex items-center justify-center min-h-screen">
  {/* Centered content */}
</div>
```

### Section Spacing

```tsx
/* Hero Section */
<section className="py-40 px-6">
  {/* Content */}
</section>

/* Major Section */
<section className="py-32 px-6">
  {/* Content */}
</section>

/* Standard Section */
<section className="py-24 px-6">
  {/* Content */}
</section>

/* Compact Section */
<section className="py-16 px-6">
  {/* Content */}
</section>
```

---

## 🏠 LANDING PAGE SECTIONS

### Hero Section

```tsx
<section className="min-h-screen flex items-center justify-center py-40 px-6 bg-[#020617] text-white selection:bg-emerald-500 relative overflow-hidden">
  
  {/* Background Gradient Effects */}
  <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent opacity-40" />
  
  <div className="container mx-auto max-w-7xl relative z-10">
    <div className="text-center space-y-12">
      
      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs"
      >
        PREMIUM BOTANICAL ECOSYSTEM
      </motion.p>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-['Clash_Display']"
      >
        CULTIVATE <br/>
        <span className="text-premium">INTELLIGENTLY.</span>
      </motion.h1>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
      >
        The definitive ecosystem for high-performance urban gardening in India.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Button className="h-20 px-12 rounded-[2rem] bg-white text-black font-black hover:scale-105 transition-all shadow-2xl shadow-white/5 font-['Clash_Display'] uppercase tracking-[0.2em] text-xs">
          <ArrowRight className="w-5 h-5 mr-3" />
          START YOUR JOURNEY
        </Button>
        
        <Button className="h-20 px-12 rounded-[2rem] border-2 border-white/10 text-white hover:border-emerald-500/30 hover:bg-white/5 transition-all backdrop-blur-xl font-['Clash_Display'] uppercase tracking-[0.2em] text-xs">
          EXPLORE FEATURES
        </Button>
      </motion.div>

    </div>
  </div>

  {/* Floating Elements */}
  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronRight className="w-8 h-8 text-emerald-500/30 rotate-90" />
  </div>

</section>
```

### Features Grid Section

```tsx
<section className="py-32 px-6 bg-[#020617]">
  <div className="container mx-auto max-w-7xl">
    
    {/* Section Header */}
    <div className="text-center mb-20">
      <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs mb-4">
        CORE CAPABILITIES
      </p>
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-['Clash_Display']">
        INTELLIGENT <span className="text-premium">FEATURES</span>
      </h2>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {features.map((feature, idx) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="glass rounded-[3rem] p-10 group hover:border-emerald-500/30 transition-all duration-700 hover:-translate-y-2">
            
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <feature.icon className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight font-['Clash_Display']">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-white/60 leading-relaxed">
              {feature.description}
            </p>

            {/* Learn More Link */}
            <button className="flex items-center gap-2 text-emerald-400 font-bold mt-6 group-hover:gap-4 transition-all">
              Learn More
              <ArrowUpRight className="w-4 h-4" />
            </button>

          </Card>
        </motion.div>
      ))}

    </div>
  </div>
</section>
```

### Testimonials Section

```tsx
<section className="py-32 px-6 bg-[#020617]">
  <div className="container mx-auto max-w-7xl">
    
    <div className="text-center mb-20">
      <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs mb-4">
        COMMUNITY VOICES
      </p>
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-['Clash_Display']">
        TRUSTED BY <span className="text-premium">THOUSANDS</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, idx) => (
        <Card key={idx} className="glass rounded-[3rem] p-8">
          
          {/* Rating Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <p className="text-white/80 leading-relaxed mb-8">
            "{testimonial.quote}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-emerald-500/30">
              <AvatarImage src={testimonial.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                {testimonial.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold uppercase tracking-tight">
                {testimonial.name}
              </p>
              <Badge className="mt-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                <MapPin className="w-3 h-3 mr-1" />
                {testimonial.location}
              </Badge>
            </div>
          </div>

        </Card>
      ))}
    </div>

  </div>
</section>
```

---

## 📊 DASHBOARD COMPONENTS

### Stat Card

```tsx
<Card className="glass rounded-[2rem] border-white/5 p-8">
  <div className="flex items-center gap-6">
    
    {/* Icon Container */}
    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
      <Sprout className="w-7 h-7 text-white" />
    </div>

    {/* Content */}
    <div className="flex-1">
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">
        BIO-UNITS
      </p>
      <p className="text-4xl font-bold tracking-tight font-['Clash_Display']">
        12
      </p>
      <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mt-1">
        98% UPTIME
      </p>
    </div>

  </div>
</Card>
```

### Task Item

```tsx
<Card className="glass rounded-2xl p-6 group hover:border-emerald-500/20 transition-all">
  <div className="flex items-center gap-4">
    
    {/* Checkbox */}
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
      task.completed 
        ? 'bg-emerald-500 border-emerald-500' 
        : 'border-white/20 group-hover:border-emerald-500/30'
    }`}>
      {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
    </div>

    {/* Task Info */}
    <div className="flex-1">
      <p className={`font-medium ${task.completed ? 'line-through text-white/40' : 'text-white'}`}>
        {task.title}
      </p>
      <p className="text-xs text-emerald-400 font-bold mt-1">
        +{task.reward} XP
      </p>
    </div>

    {/* Action Button */}
    {!task.completed && (
      <Button size="sm" className="rounded-full">
        Complete
      </Button>
    )}

  </div>
</Card>
```

### Activity Log Item

```tsx
<div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
  
  {/* Icon */}
  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
    <Droplets className="w-5 h-5 text-emerald-400" />
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <p className="text-sm">
      <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs">
        HYDRATION LOGGED:
      </span>{' '}
      <span className="text-white/80">TULSI UNIT 01</span>
    </p>
    <div className="flex items-center gap-3 mt-1">
      <p className="text-xs text-white/40">24:00H AGO</p>
      <Badge className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5">
        +50 XP
      </Badge>
    </div>
  </div>

</div>
```

---

## 🛒 MARKETPLACE COMPONENTS

### Product Card

```tsx
<Card className="glass rounded-[2rem] overflow-hidden group hover:border-emerald-500/20 transition-all">
  
  {/* Product Image */}
  <div className="aspect-square overflow-hidden relative bg-white/5">
    <img 
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    
    {/* Discount Badge */}
    {product.discount && (
      <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
        -{product.discount}%
      </Badge>
    )}

    {/* Favorite Button */}
    <Button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-500/30">
      <Heart className="w-4 h-4" />
    </Button>

    {/* Trending Badge */}
    {product.trending && (
      <Badge className="absolute bottom-4 left-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-xl flex items-center gap-1.5 px-3 py-1.5">
        <TrendingUp className="w-3 h-3" />
        TRENDING
      </Badge>
    )}
  </div>

  {/* Product Info */}
  <div className="p-6 space-y-4">
    
    {/* Category */}
    <Badge className="bg-white/5 text-white/60 border-white/10 uppercase text-[10px] tracking-widest">
      {product.category}
    </Badge>

    {/* Name */}
    <h3 className="text-lg font-bold uppercase tracking-tight font-['Clash_Display'] leading-tight">
      {product.name}
    </h3>

    {/* Description */}
    <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
      {product.description}
    </p>

    {/* Rating */}
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < Math.floor(product.rating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-white/20'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-white/60">
        ({product.reviews})
      </span>
    </div>

    {/* Price and Action */}
    <div className="flex items-center justify-between pt-2">
      <div>
        {product.originalPrice && (
          <p className="text-sm text-white/30 line-through mb-1">
            ₹{product.originalPrice}
          </p>
        )}
        <p className="text-2xl font-bold text-emerald-400 font-['Clash_Display']">
          ₹{product.price}
        </p>
      </div>
      <Button className="h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/20">
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </div>

  </div>

</Card>
```

### Shopping Cart Summary

```tsx
<Card className="glass-strong rounded-[3rem] p-8 sticky top-32">
  
  {/* Header */}
  <div className="flex items-center justify-between mb-8">
    <h3 className="text-2xl font-bold uppercase tracking-tight font-['Clash_Display']">
      CART
    </h3>
    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-full">
      {totalItems} Items
    </Badge>
  </div>

  {/* Cart Items */}
  <div className="space-y-4 mb-8">
    {cartItems.map((item) => (
      <div key={item.id} className="flex items-center gap-4">
        <img 
          src={item.image} 
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="text-xs text-white/60">₹{item.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            className="w-8 h-8 rounded-lg"
            onClick={() => decreaseQuantity(item.id)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center font-bold">{item.quantity}</span>
          <Button 
            size="icon" 
            className="w-8 h-8 rounded-lg"
            onClick={() => increaseQuantity(item.id)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    ))}
  </div>

  {/* Total */}
  <div className="border-t border-white/10 pt-6 space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-white/60">Subtotal</span>
      <span className="font-bold">₹{subtotal}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-white/60">Shipping</span>
      <span className="text-emerald-400 font-bold">FREE</span>
    </div>
    <div className="flex items-center justify-between text-xl">
      <span className="font-bold uppercase tracking-tight font-['Clash_Display']">
        Total
      </span>
      <span className="text-emerald-400 font-bold font-['Clash_Display']">
        ₹{total}
      </span>
    </div>
  </div>

  {/* Checkout Button */}
  <Button className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold uppercase tracking-wide">
    Checkout
  </Button>

</Card>
```

---

## 👥 COMMUNITY COMPONENTS

### Community Post Card

```tsx
<Card className="glass rounded-[3rem] border-white/5 overflow-hidden group hover:border-emerald-500/30 transition-all duration-700 shadow-xl break-inside-avoid">
  
  {/* Post Image */}
  <div className="relative overflow-hidden aspect-video md:aspect-square">
    <img 
      src={post.imageUrl} 
      alt={post.caption} 
      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
    
    {/* Location Badge */}
    <div className="absolute top-8 left-8">
      <Badge className="bg-black/40 backdrop-blur-xl border-white/10 text-white/80 flex items-center gap-2 py-2 px-4 rounded-full">
        <MapPin className="w-3 h-3 text-emerald-400" />
        {post.location}
      </Badge>
    </div>
  </div>

  {/* Post Content */}
  <div className="p-8 space-y-6">
    
    {/* User Info */}
    <div className="flex items-center gap-4">
      <Avatar className="w-12 h-12 border-2 border-emerald-500/30">
        <AvatarImage src={post.userAvatar} />
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
          {post.userName.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-bold uppercase tracking-tight text-sm truncate">
          {post.userName}
        </p>
        <Badge className="mt-1 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 text-emerald-400 border-emerald-500/20 text-[10px]">
          {post.userLevel}
        </Badge>
      </div>
    </div>

    {/* Caption */}
    <p className="text-white/80 leading-relaxed">
      {post.caption}
    </p>

    {/* Engagement Stats */}
    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
      
      <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors">
        <Heart className="w-5 h-5" />
        <span className="text-sm font-bold">{post.likes}</span>
      </button>

      <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-bold">{post.comments}</span>
      </button>

      <button className="flex items-center gap-2 text-white/60 hover:text-emerald-400 transition-colors">
        <Share2 className="w-5 h-5" />
        <span className="text-sm font-bold">{post.shares}</span>
      </button>

    </div>

  </div>

</Card>
```

---

## ♿ ACCESSIBILITY GUIDELINES

### ARIA Labels

```tsx
/* Button with icon only */
<Button aria-label="Close modal">
  <X className="w-5 h-5" />
  <span className="sr-only">Close</span>
</Button>

/* Navigation link */
<a href="/dashboard" aria-current="page">
  Dashboard
</a>

/* Form input */
<Input 
  id="email"
  type="email"
  aria-label="Email address"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

### Focus States

```tsx
/* All interactive elements */
className="focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2 focus:ring-offset-[#020617]"

/* Buttons */
className="focus-visible:ring-2 focus-visible:ring-emerald-500/50"

/* Inputs */
className="focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
```

### Screen Reader Only Text

```tsx
<span className="sr-only">
  Additional context for screen readers
</span>
```

### Color Contrast

- Ensure all text meets WCAG AA standards
- White text on dark backgrounds: minimum 7:1 ratio
- Colored text: minimum 4.5:1 ratio
- Interactive elements: clear hover/focus states

### Keyboard Navigation

- All interactive elements accessible via Tab
- Modals trap focus within dialog
- Skip to content link (if applicable)
- Arrow keys for navigation where appropriate

---

## 📝 USAGE NOTES

### Component Import Pattern

```tsx
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
```

### Tailwind Configuration

This design system uses Tailwind CSS v4 with custom CSS variables defined in `/styles/globals.css`.

### Custom Utilities

Use the custom utility classes:
- `.glass` - Glassmorphism effect
- `.glass-strong` - Strong glassmorphism
- `.glass-hover` - Hoverable glass card
- `.text-premium` - Gradient text
- `.glow-border` - Animated glow border
- `.premium-card` - Premium card styling

### Responsive Design

All components are mobile-first:
- Use `sm:`, `md:`, `lg:`, `xl:` prefixes
- Test on mobile (375px), tablet (768px), desktop (1440px)
- Consider touch targets (minimum 44x44px)

---

**Last Updated:** March 7, 2026  
**Maintained By:** Bloomify Design Team  
**Version:** 4.0 - Premium Deep Botanical Edition

This design system is a living document. Update as new components and patterns are added to the Bloomify ecosystem.
