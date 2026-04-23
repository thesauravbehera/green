# 🌿 BLOOMIFY LANDING PAGE - COMPLETE RECREATION GUIDE

## 📋 OVERVIEW
Create a premium single-page landing website for Bloomify, a centralized balcony gardening smart solution with a Premium Deep Botanical aesthetic and liquid glass morphism design system. The website is localized for the Indian market with Indian Rupees (₹) and features sophisticated deep emerald-teal-sapphire gradient system.

---

## 🎨 DESIGN SYSTEM & THEME

### **Core Aesthetic:**
- **Primary Theme**: "Liquid Glass Morphism" - High-end agency style with glassmorphic elements
- **Style Reference**: Premium tech landing pages (Apple, Stripe, Vercel style)
- **Visual Language**: Clean, minimal, sophisticated with subtle animations
- **Target Audience**: Urban dwellers, beginners, and green enthusiasts in India

### **Color Palette:**
```css
/* Background & Base */
--background: #020617 (Dark Navy Blue - Primary background)
--foreground: #F8FAFC (Off-white text)

/* Brand Colors */
--primary: #10B981 (Emerald Green)
--accent: #0D9488 (Teal)
--secondary-accent: #0369A1 (Sapphire Blue)

/* Glass Effects */
--glass-bg: rgba(255, 255, 255, 0.03)
--glass-border: rgba(255, 255, 255, 0.08)
--glass-strong-border: rgba(16, 185, 129, 0.2)

/* Text */
--text-white: #FFFFFF
--text-muted: rgba(255, 255, 255, 0.75)
--text-light: rgba(255, 255, 255, 0.60)

/* Premium Gradient */
linear-gradient(135deg, #10B981 0%, #0D9488 50%, #0369A1 100%)
```

---

## 🔤 TYPOGRAPHY SYSTEM

### **Font Imports (Required):**
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
```

### **Font Hierarchy:**
1. **Clash Display** - Default body font, headings in dashboard
   - Weights: 200, 300, 400, 500, 600, 700
   - Usage: Default text, UI elements

2. **Barlow** - Primary landing page font
   - Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
   - Usage: Body text, buttons, descriptions, subheadings

3. **Instrument Serif** - Premium display font
   - Weights: 400 (Regular), 400 Italic
   - Usage: Large headlines, hero titles, section titles

### **Typography Scale:**
- Extra Small: 0.75rem (12px)
- Small: 0.875rem (14px)
- Base: 1rem (16px)
- Large: 1.125rem (18px)
- XL: 1.25rem (20px)
- 2XL: 1.5rem (24px)
- 3XL: 2rem (32px)
- 4XL: 2.5rem (40px)
- 5XL: 3.5rem (56px)
- 6XL: 4.5rem (72px)

---

## 🎬 VIDEO ASSETS

### **Video URLs (Critical - Must Use These Exact URLs):**
1. **Hero Section Background:**
   - URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4`
   - Specifications: Full-screen, autoplay, loop, muted, object-cover
   - Overlay: gradient from-black/50 via-black/30 to-black/60

2. **Features Showcase Section - Feature 1:**
   - URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065409_e3a5dd3c-dcb8-4ddf-8d97-6a1fb8cc1be9.mp4`
   - Position: Left side of split layout
   - Specifications: Autoplay, loop, muted, rounded corners (24px)

3. **Features Showcase Section - Feature 2:**
   - URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065554_41fe5ec2-b58b-4dd7-9bc5-9d4a46a8fbed.mp4`
   - Position: Right side of split layout
   - Specifications: Autoplay, loop, muted, rounded corners (24px)

4. **Pricing Section Background:**
   - URL: `https://www.stocksy.com/video/download/2318367/light-sparkles-on-water?size=small`
   - Specifications: Full-section background, autoplay, loop, muted, opacity 30%
   - Overlay: gradient from-[#020617]/90 via-[#0a1628]/85 to-[#020617]/90

---

## 📐 LIQUID GLASS MORPHISM CSS CLASSES

### **Required Utility Classes:**

```css
/* Liquid Glass Effect - Subtle */
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Liquid Glass Effect - Strong (for buttons) */
.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 
    4px 4px 4px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}

.liquid-glass-strong::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.2) 80%,
    rgba(255, 255, 255, 0.5) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

---

## 🏗️ PAGE STRUCTURE (Top to Bottom)

### **Main Container:**
- Background: #020617 (Dark navy)
- Text: White (#FFFFFF)
- Selection color: bg-emerald-500 with white text
- Min-height: 100vh

---

## 📍 SECTION 1: HERO SECTION

### **Layout:**
- Height: 95vh minimum
- Position: relative with centered content
- Padding top: 5rem (80px) - accounts for fixed header
- Background: Full-screen video with gradient overlay

### **Video Background:**
- **Video URL**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4`
- Position: Absolute, full width/height
- Object-fit: cover
- Autoplay, loop, muted, playsInline
- **Gradient Overlay**: linear-gradient from-black/50 via-black/30 to-black/60

### **Content Container:**
- Max-width: 80rem (1280px)
- Centered with mx-auto
- Padding: 1.5rem horizontal

### **Badge (Top):**
- Style: Inline-flex, centered
- Background: rgba(255, 255, 255, 0.1) with backdrop-blur
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Border-radius: Full (pill shape)
- Padding: 0.75rem horizontal, 0.75rem vertical
- Icon: Sparkles (emerald-400)
- Text: "AI-Powered Urban Gardening Platform"
- Font: Barlow, 14px, medium, white
- Animation: Fade in from opacity 0, y-offset 20px, 0.8s duration, 0.2s delay

### **Main Headline (Two Lines):**
**Line 1:**
- Text: "Platform that makes your"
- Font: Barlow, 700 weight (Bold)
- Size: 36px mobile → 52px tablet → 64px desktop
- Color: White (#FFFFFF)
- Letter-spacing: -3px
- Line-height: 1 (leading-none)
- Drop-shadow: 2xl
- Margin-bottom: 0.5rem

**Line 2:**
- Text: "balcony garden thrive"
- Font: Instrument Serif, 400 weight, **Italic**
- Size: 48px mobile → 68px tablet → 84px desktop
- Color: White (#FFFFFF)
- Line-height: 1 (leading-none)
- Drop-shadow: 2xl

**Animation**: Fade in from opacity 0, y-offset 30px, 0.8s duration, 0.4s delay

### **Subheadline:**
- Text: "Smart gardening solutions for Urban Dwellers, Beginners and Green Enthusiasts"
- Font: Barlow, 500 weight (Medium)
- Size: 16px mobile → 18px tablet → 20px desktop
- Color: rgba(255, 255, 255, 0.9)
- Max-width: 42rem (672px)
- Centered with mx-auto
- Line-height: Relaxed
- Margin-bottom: 3rem
- Animation: Fade in, y-offset 30px, 0.8s duration, 0.6s delay

### **CTA Buttons (Horizontal Stack):**
**Primary Button:**
- Text: "Start Growing Free" (if not logged in) or "Launch Dashboard" (if logged in)
- Style: Solid white background
- Background: #FFFFFF
- Text color: #020617 (dark)
- Font: Barlow, 600 weight (Semibold), 16px
- Padding: 2.5rem horizontal, 1.75rem vertical
- Border-radius: Full (rounded-full)
- Shadow: 2xl with white/30 glow on hover
- Hover: Scale 1.05, background white/95
- Active: Scale 0.95
- Animation: Group hover effect

**Secondary Button:**
- Icon: Play button in emerald-500 circle (32px diameter)
- Text: "See How It Works"
- Style: Transparent with border
- Background: transparent → white/10 on hover
- Border: 2px solid rgba(255, 255, 255, 0.3) → rgba(255, 255, 255, 0.6) on hover
- Text color: White
- Font: Barlow, 500 weight (Medium), 16px
- Padding: 2.5rem horizontal, 1.75rem vertical
- Border-radius: Full
- Backdrop-filter: blur-md
- Play icon background: emerald-500 → emerald-600 on hover

**Button Container Animation**: Fade in, y-offset 30px, 0.8s duration, 0.8s delay

### **Stats Grid:**
- Layout: 2 columns mobile → 4 columns desktop
- Gap: 1.5rem
- Max-width: 64rem
- Centered with mx-auto
- Margin-top: 5rem

**Each Stat Card:**
- Background: rgba(255, 255, 255, 0.1) with backdrop-blur-xl
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Border-radius: 1rem
- Padding: 1.5rem
- Hover: bg white/15, border emerald-400/40, shadow-2xl, scale 1.05

**Stats Data:**
1. **"10K+"** - Urban Gardeners
2. **"500+"** - Plant Species
3. **"95%"** - Success Rate
4. **"24/7"** - AI Support

**Stat Number:**
- Font: Clash Display, 700 weight (Bold)
- Size: 36px mobile → 48px desktop
- Color: White
- Margin-bottom: 0.25rem

**Stat Label:**
- Font: Barlow, 400 weight (Regular)
- Size: 14px
- Color: rgba(255, 255, 255, 0.7)

**Animation**: Each card fades in with stagger (0.1s delay between each), scale from 0.8, total duration 0.5s, starting at 1.2s + index

### **Scroll Indicator:**
- Position: Absolute bottom 3rem, centered horizontally
- Style: Rounded pill (24px width, 40px height)
- Border: 2px solid rgba(255, 255, 255, 0.4)
- Inner dot: 6px diameter, white, bg-white rounded-full
- Animation: Bounce up and down 12px, 2s duration, infinite, ease-in-out
- Fade in at 1.5s delay

---

## 📍 SECTION 2: PREMIUM FEATURES SHOWCASE

### **Section Container:**
- Background: #020617
- Padding: 8rem vertical, 1.5rem horizontal
- Position: relative with id="features"

### **Section Headline:**
- Text: "The platform your garden deserves"
- Font: Instrument Serif, Italic
- Size: 64px mobile → 72px tablet → 88px desktop (5.5rem)
- Color: White
- Line-height: 0.9
- Letter-spacing: -4px
- Text-align: Center
- Max-width: 96rem
- Margin: 0 auto 2rem
- Animation: Fade in, y-offset 30px, 0.8s duration, 0.2s delay

### **Section Subtitle:**
- Text: "Stunning insights. Smart recommendations. Powered by AI, refined by expert gardeners. This is balcony gardening, wildly reimagined."
- Font: Barlow, 300 weight (Light)
- Size: 16px
- Color: rgba(255, 255, 255, 0.6)
- Max-width: 48rem
- Centered
- Line-height: Relaxed
- Margin-bottom: 3rem

### **CTA Button (Center):**
- Text: "Start Growing Free"
- Class: liquid-glass-strong
- Background: Use liquid-glass-strong utility
- Text color: White
- Font: Barlow, 500 weight (Medium), 16px
- Padding: 2.5rem horizontal, 1.5rem vertical
- Border-radius: Full (rounded-full)
- Hover: bg-white/10
- Icon: Arrow Right (20px, ml-2)
- Margin-bottom: 8rem
- Animation: Fade in, y-offset 30px, 0.8s, 0.4s delay

### **Feature Grid (2 Large Feature Blocks):**
- Layout: Single column on mobile → 2 columns on desktop
- Gap: 2rem
- Max-width: 112rem (1792px)
- Margin: 0 auto

### **Feature 1 (Left):**
**Video Container:**
- **Video URL**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065409_e3a5dd3c-dcb8-4ddf-8d97-6a1fb8cc1be9.mp4`
- Width: 100%
- Height: 32rem (512px) mobile → 40rem desktop
- Border-radius: 24px
- Overflow: hidden
- Autoplay, loop, muted, playsInline
- Object-fit: cover
- Margin-bottom: 2rem

**Content:**
- Title: "AI Plant Doctor"
- Font: Barlow, 700 weight (Bold), 32px mobile → 40px desktop
- Color: White
- Margin-bottom: 1rem

- Description: "Upload a photo of your plant and get instant diagnosis. Our AI identifies diseases, pest problems, and nutrient deficiencies with 95% accuracy."
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Line-height: Relaxed

**Animation**: Fade in, y-offset 30px, 0.6s, 0.2s delay

### **Feature 2 (Right):**
**Video Container:**
- **Video URL**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065554_41fe5ec2-b58b-4dd7-9bc5-9d4a46a8fbed.mp4`
- Width: 100%
- Height: 32rem (512px) mobile → 40rem desktop
- Border-radius: 24px
- Overflow: hidden
- Autoplay, loop, muted, playsInline
- Object-fit: cover
- Margin-bottom: 2rem

**Content:**
- Title: "Smart Garden Planning"
- Font: Barlow, 700 weight (Bold), 32px mobile → 40px desktop
- Color: White
- Margin-bottom: 1rem

- Description: "Scan your balcony space and get personalized plant recommendations based on sunlight, space, and climate. Watch your virtual garden before you plant."
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Line-height: Relaxed

**Animation**: Fade in, y-offset 30px, 0.6s, 0.3s delay

---

## 📍 SECTION 3: PREMIUM CAPABILITIES SECTION

### **Section Container:**
- Background: linear-gradient to-bottom from-[#020617] via-[#0a1628] to-[#020617]
- Padding: 8rem vertical, 1.5rem horizontal
- Position: relative

### **Section Header:**
- Title: "How it works"
- Font: Instrument Serif, Regular, 48px mobile → 56px desktop
- Color: White
- Text-align: Center
- Margin-bottom: 1.5rem

- Subtitle: "Three simple steps to transform your balcony into a thriving garden"
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Max-width: 42rem
- Centered
- Margin-bottom: 5rem

**Animation**: Fade in, y-offset 30px, 0.8s duration

### **Steps Grid:**
- Layout: Single column mobile → 3 columns desktop
- Gap: 2rem
- Max-width: 80rem
- Centered

### **Step 1:**
**Number Badge:**
- Text: "01"
- Font: Barlow, 700 weight, 20px
- Background: rgba(16, 185, 129, 0.1)
- Color: Emerald-400
- Padding: 0.5rem 1rem
- Border-radius: Full (pill)
- Margin-bottom: 1.5rem

**Icon:**
- Icon: Camera (lucide-react)
- Size: 48px
- Color: Emerald-400
- Margin-bottom: 1.5rem

**Title:**
- Text: "Scan Your Space"
- Font: Barlow, 700 weight, 24px
- Color: White
- Margin-bottom: 1rem

**Description:**
- Text: "Use your phone camera to scan your balcony. Our AI analyzes sunlight, space, and environmental factors."
- Font: Barlow, 400 weight, 16px
- Color: rgba(255, 255, 255, 0.7)
- Line-height: Relaxed

**Animation**: Fade in, y-offset 30px, 0.6s, 0.1s delay

### **Step 2:**
- Number: "02"
- Icon: Lightbulb (emerald-400)
- Title: "Get Recommendations"
- Description: "Receive personalized plant suggestions perfect for your unique space and experience level."
- (Same styling as Step 1)
- Animation delay: 0.2s

### **Step 3:**
- Number: "03"
- Icon: TrendingUp (emerald-400)
- Title: "Grow & Track"
- Description: "Follow care schedules, track growth, and get real-time help from our AI plant doctor."
- (Same styling as Step 1)
- Animation delay: 0.3s

### **Bottom CTA Button:**
- Text: "Explore Features"
- Class: liquid-glass-strong
- Style: Same as previous section CTA
- Icon: Arrow Right
- Margin-top: 3rem
- Centered
- Animation: Fade in, y-offset 30px, 0.8s, 0.6s delay

---

## 📍 SECTION 4: INTERACTIVE DEMO SECTION

### **Section Container:**
- Background: #020617
- Padding: 6rem vertical, 1.5rem horizontal

### **Section Header:**
- Title: "See it in action"
- Font: Instrument Serif, Regular, 48px mobile → 56px desktop
- Color: White
- Text-align: Center
- Margin-bottom: 1rem

- Subtitle: "Experience the power of AI-driven gardening"
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Margin-bottom: 4rem

### **Demo Container:**
- Max-width: 80rem
- Centered
- Background: rgba(255, 255, 255, 0.03) with backdrop-blur
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Border-radius: 24px
- Padding: 3rem
- Aspect ratio: 16:9 (video/demo area)

**Content:**
- Placeholder for interactive demo or additional video content
- Could include: Plant identification demo, care calendar preview, community features showcase

---

## 📍 SECTION 5: LEVELS SECTION (LEARNING TIERS)

### **Section Container:**
- Background: linear-gradient to-bottom from-background to-secondary/20
- Padding: 6rem vertical, 1rem horizontal
- ID: "about"

### **Section Header:**
- Badge: "Learn at Your Pace" with Sprout icon
  - Style: Secondary variant
  - Padding: 1rem horizontal, 0.5rem vertical
  - Margin-bottom: 1rem

- Title: "Grow Your Plant Journey"
- Font: Clash Display (falls back to sans-serif), 700 weight
- Size: 32px mobile → 48px desktop
- Background: Gradient from-primary to-accent, bg-clip-text, text-transparent
- Margin-bottom: 1.5rem

- Subtitle: "Whether you're just starting or a seasoned gardener, Bloomify has the perfect tools and resources to help your balcony garden thrive."
- Font: Default system, 18px
- Color: Muted-foreground
- Max-width: 48rem
- Centered
- Line-height: Relaxed
- Margin-bottom: 4rem

**Animation**: Fade in, y-offset 30px, 0.8s duration

### **Level Cards Grid:**
- Layout: Single column mobile → 2 columns desktop
- Gap: 2rem
- Max-width: 80rem (1280px)
- Centered with mx-auto

### **LEVEL CARD 1: BEGINNER 🌱**

**Card Container:**
- Background: Card component with premium styling
- Padding: 2rem
- Height: Full (h-full)
- Border: 2px solid primary/10 → primary/20 on hover
- Border-radius: Default
- Hover: shadow-2xl, transition 300ms
- Position: relative with overflow-hidden

**Background Gradient (Inside card):**
- Gradient: from-green-500/10 to-emerald-500/10
- Opacity: 50% → 100% on group-hover
- Transition: opacity

**Icon Section:**
- Icon container: 64px × 64px
- Background: primary/10
- Border-radius: 16px (rounded-2xl)
- Icon: Sprout (lucide-react), 32px, primary color
- Hover: Scale 1.1
- Float right: Emoji "🌱" (text-4xl)

**Content:**
- Title: "Beginner"
  - Font: Default, 700 weight (Bold), 24px
  - Color: Default text
  - Margin-bottom: 0.5rem

- Subtitle: "Start Your Garden Journey"
  - Font: Default, 14px
  - Color: Muted-foreground
  - Margin-bottom: 1rem

- Description: "Perfect for those new to balcony gardening. Get personalized recommendations and simple care schedules."
  - Font: 14px
  - Color: Muted-foreground
  - Margin-bottom: 1.5rem

**Features List:**
1. "Space Photo Analysis"
2. "Simple Care Reminders"
3. "Starter Plant Kits"
4. "Weather & Sunlight Tips"

**Feature Item Styling:**
- Bullet: Small circle (20px diameter) with primary/20 background
  - Inner dot: 8px diameter, primary color
- Text: 14px, default color
- Gap: 0.75rem between bullet and text
- Spacing: 0.75rem between items

**Action Buttons:**
1. **"Upload Space Photo"** (Primary button, full width)
   - Icon: Camera
   - Variant: Default (filled)
   
2. **"Set Care Reminders"** (Secondary, full width)
   - Icon: Bell
   - Variant: Outline
   
3. **"Browse Starter Kits"** (Secondary, full width)
   - Icon: ShoppingBag
   - Variant: Outline

**Button Spacing:** 0.5rem gap between buttons

**Animation**: Fade in, y-offset 30px, 0.6s, no delay (index 0)

### **LEVEL CARD 2: INTERMEDIATE 🌿**

**Card Container:**
- Same styling as Beginner card

**Background Gradient:**
- Gradient: from-teal-500/10 to-cyan-500/10

**Icon:**
- Icon: Leaf (lucide-react), 32px
- Emoji: "🌿"

**Content:**
- Title: "Intermediate"
- Subtitle: "Grow Your Skills"
- Description: "Ready to deepen your knowledge? Learn to create fertilizers, test soil, and track plant progress."

**Features List:**
1. "Organic Fertilizer Creator"
2. "Soil Health Checker"
3. "Growth Journal Tracker"
4. "Seasonal Care Guide"

**Action Buttons:**
1. **"Create Fertilizer"** (Primary)
   - Icon: Beaker
   
2. **"Check Soil Health"** (Secondary)
   - Icon: TestTube2
   
3. **"Open Growth Journal"** (Secondary)
   - Icon: BookOpen

**Animation**: Fade in, y-offset 30px, 0.6s, 0.1s delay (index 1)

---

## 📍 SECTION 6: TESTIMONIALS SECTION (BENTO GRID)

### **Section Container:**
- Background: #020617
- Padding: 8rem vertical, 1.5rem horizontal

### **Section Header:**
- Title: "Loved by urban gardeners"
- Font: Instrument Serif, Regular, 48px mobile → 56px desktop
- Color: White
- Text-align: Center
- Margin-bottom: 1rem

- Subtitle: "Join thousands of successful balcony gardeners"
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Margin-bottom: 4rem

**Animation**: Fade in, y-offset 30px, 0.8s duration

### **Bento Grid Layout:**
- Layout: Asymmetric grid (Bento style)
- Max-width: 80rem
- Grid structure varies by breakpoint

### **Testimonial Card 1 (Large):**
- Grid span: 2 columns on desktop
- Background: rgba(255, 255, 255, 0.05) with backdrop-blur
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 24px
- Padding: 2.5rem
- Hover: bg white/10, border emerald-500/30, shadow-2xl

**Content:**
- Quote: "Bloomify transformed my tiny balcony into a thriving garden. The AI recommendations were spot-on!"
- Font: Barlow, 400 weight, 20px
- Color: White
- Margin-bottom: 1.5rem

**Author:**
- Name: "Priya Sharma"
- Location: "Mumbai, India"
- Avatar: Circular, 48px diameter
- Font: Barlow, 600 weight (Semibold), 16px for name
- Font: Barlow, 400 weight, 14px for location
- Color name: White
- Color location: rgba(255, 255, 255, 0.6)

**Rating:** 5 stars (emerald-400)

**Animation**: Fade in, y-offset 30px, 0.6s, 0.1s delay

### **Testimonial Cards 2-6:**
(Similar structure to Card 1, with varying grid spans and staggered animations)

**Sample Testimonials:**
2. "The plant doctor feature saved my tomatoes. Amazing!" - Rajesh Kumar, Bangalore
3. "Best gardening app for beginners. Super intuitive!" - Ananya Patel, Delhi
4. "Love the community features and expert advice" - Vikram Singh, Pune
5. "My herbs are thriving thanks to the care reminders" - Meera Reddy, Hyderabad
6. "The space scanning feature is pure magic!" - Arjun Das, Kolkata

---

## 📍 SECTION 7: PRICING SECTION

### **Section Container:**
- Background: #020617
- Padding: 8rem vertical, 1.5rem horizontal
- Position: relative
- Overflow: hidden

### **Video Background:**
- **Video URL**: `https://www.stocksy.com/video/download/2318367/light-sparkles-on-water?size=small`
- Position: Absolute, full width/height
- Object-fit: cover
- Autoplay, loop, muted, playsInline
- **Opacity: 30%** (key for subtle effect)
- **Gradient Overlay**: linear-gradient from-[#020617]/90 via-[#0a1628]/85 to-[#020617]/90

### **Section Header:**
- Title: "Plans and features"
- Font: Instrument Serif, Regular, 40px mobile → 48px tablet → 56px desktop
- Color: White
- Text-align: Center
- Line-height: Tight
- Margin-bottom: 1.5rem

- Subtitle: "Choose the perfect plan for your gardening journey. All plans include our core features and community support."
- Font: Barlow, 400 weight, 18px
- Color: rgba(255, 255, 255, 0.75)
- Max-width: 42rem
- Centered
- Margin-bottom: 5rem

**Animation**: Fade in, y-offset 30px, 0.8s duration

### **Pricing Cards Grid:**
- Layout: Single column mobile → 3 columns desktop
- Gap: 1.5rem
- Max-width: 96rem
- Centered
- Margin-bottom: 4rem

### **PRICING CARD 1: SEEDLING (FREE)**

**Card Container:**
- Background: rgba(255, 255, 255, 0.05)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 16px
- Padding: 2rem
- Hover: bg white/15
- Transition: all 300ms

**Header:**
- Subtitle: "Start"
  - Font: Barlow, 500 weight (Medium), uppercase, 12px
  - Color: rgba(255, 255, 255, 0.6)
  - Letter-spacing: wider
  - Margin-bottom: 0.5rem

- Name: "Seedling"
  - Font: Barlow, 700 weight (Bold), 24px
  - Color: White
  - Margin-bottom: 1rem

- Price: "Free"
  - Font: Barlow, 700 weight (Bold), 36px
  - Color: White
  - Margin-bottom: 1rem

- Period: "Forever"
  - Font: Barlow, 400 weight, 14px
  - Color: rgba(255, 255, 255, 0.6)

- Description: "Perfect for beginners starting their balcony garden journey"
  - Font: Barlow, 400 weight, 14px
  - Color: rgba(255, 255, 255, 0.75)
  - Line-height: Relaxed
  - Margin-bottom: 2rem

**Features List:**
✓ Basic plant database
✓ 5 garden plants (5 plants)
✓ Care reminders
✓ Community access
✗ AI plant suggestions
✗ Plant health diagnosis
✗ Seasonal calendar
✗ Weather integration
✗ Growth analytics

**Feature Item:**
- Icon: Check (emerald-400, 20px) for included, X (white/20, 20px) for not included
- Text: Barlow, 14px
- Color: White for included, rgba(255, 255, 255, 0.4) for not included
- Gap: 0.75rem
- Spacing: 1rem between items

**CTA Button:**
- Text: "Choose Plan"
- Background: rgba(255, 255, 255, 0.1) → rgba(255, 255, 255, 0.2) on hover
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Text color: White
- Font: Barlow, 600 weight (Semibold), 16px
- Padding: 1.5rem vertical
- Width: Full
- Border-radius: 2px (sharp corners for premium look)
- Transition: colors

**Animation**: Fade in, y-offset 30px, 0.6s, 0s delay

### **PRICING CARD 2: GARDENER (POPULAR)**

**Card Container:**
- Same as Seedling but with **HIGHLIGHT TREATMENT**:
- Background: rgba(255, 255, 255, 0.1)
- Border: 2px solid rgba(16, 185, 129, 0.4) (emerald with opacity)
- Shadow: 2xl with shadow-emerald-500/10

**"Most Popular" Badge:**
- Position: Absolute, -top-4, centered horizontally
- Background: #10B981 (emerald-500)
- Text: "MOST POPULAR"
- Font: Barlow, 700 weight (Bold), uppercase, 12px
- Color: White
- Padding: 0.25rem 1rem
- Border-radius: Full (pill)
- Letter-spacing: wider

**Header:**
- Subtitle: "Plus"
- Name: "Gardener"
- Price: "₹299" (Indian Rupees)
- Period: "per month"
- Description: "For serious urban gardeners who want to optimize their harvest"

**Features List:**
✓ Full plant database
✓ Unlimited plants (Unlimited)
✓ Smart care reminders
✓ Priority community
✓ AI plant suggestions
✓ Plant health diagnosis
✓ Seasonal calendar
✗ Weather integration
✗ Growth analytics

**CTA Button:**
- Text: "Start Free Trial"
- Background: #f8f8f8 → #FFFFFF on hover
- Text color: #171717 (dark)
- Font: Barlow, 600 weight, 16px
- Padding: 1.5rem vertical
- Width: Full
- Border-radius: 2px
- No border

**Animation**: Fade in, y-offset 30px, 0.6s, 0.1s delay

### **PRICING CARD 3: MASTER (ULTRA)**

**Card Container:**
- Same as Seedling (no highlight)

**Header:**
- Subtitle: "Ultra"
- Name: "Master"
- Price: "₹599" (Indian Rupees)
- Period: "per month"
- Description: "Complete solution for expert gardeners and plant enthusiasts"

**Features List:**
✓ Premium database
✓ Unlimited plants (Unlimited)
✓ Advanced AI reminders
✓ VIP community access
✓ AI plant suggestions
✓ Plant health diagnosis
✓ Seasonal calendar
✓ Weather integration
✓ Growth analytics

**CTA Button:**
- Text: "Choose Plan"
- Style: Same as Seedling card

**Animation**: Fade in, y-offset 30px, 0.6s, 0.2s delay

### **Bottom Text:**
- Text: "All plans include 14-day money-back guarantee. No questions asked."
- Font: Barlow, 400 weight, 16px
- Color: rgba(255, 255, 255, 0.75)
- Text-align: Center
- Margin-bottom: 1rem

**Link:**
- Text: "View detailed feature comparison →"
- Font: Barlow, 400 weight, 16px
- Color: #10B981 (emerald-400) → lighter emerald on hover
- Style: Underline on hover
- Centered

**Animation**: Fade in, y-offset 30px, 0.8s, 0.4s delay

---

## 📍 SECTION 8: FINAL CTA SECTION

### **Section Container:**
- Background: linear-gradient to-bottom from-[#020617] to-[#0a1628]
- Padding: 10rem vertical, 1.5rem horizontal
- Position: relative

### **Content:**
- Max-width: 64rem
- Centered
- Text-align: Center

### **Pre-headline:**
- Text: "Ready to transform your balcony?"
- Font: Barlow, 600 weight (Semibold), 16px
- Color: Emerald-400
- Uppercase
- Letter-spacing: wider
- Margin-bottom: 1.5rem

### **Main Headline:**
- Text: "Start growing today"
- Font: Instrument Serif, Italic, 48px mobile → 72px desktop
- Color: White
- Line-height: Tight
- Margin-bottom: 1.5rem

### **Subheadline:**
- Text: "Join 10,000+ urban gardeners who are growing fresh, organic produce right at home. No experience needed."
- Font: Barlow, 400 weight, 20px
- Color: rgba(255, 255, 255, 0.75)
- Line-height: Relaxed
- Margin-bottom: 3rem

### **CTA Buttons (Horizontal Stack):**

**Primary Button:**
- Text: "Begin Your Journey"
- Background: #f8f8f8 → #FFFFFF on hover
- Text color: #171717 (dark)
- Font: Barlow, 600 weight (Semibold), 18px
- Padding: 3rem horizontal, 1.75rem vertical
- Border-radius: 2px (sharp)
- Icon: Arrow Right (20px, ml-2)
- Hover: Group effect - icon translates right 4px
- Shadow: None (flat premium look)

**Secondary Button:**
- Text: "Join Community"
- Background: transparent → rgba(255, 255, 255, 0.1) on hover
- Border: 2px solid rgba(255, 255, 255, 0.2)
- Text color: White
- Font: Barlow, 500 weight (Medium), 18px
- Padding: 3rem horizontal, 1.75rem vertical
- Border-radius: 2px
- Transition: all 300ms

**Button Container:**
- Layout: Vertical stack mobile → horizontal desktop
- Gap: 1rem
- Justify: center
- Items: center

**Animation**: Fade in, y-offset 30px, 0.8s duration, 0.4s delay

---

## 📍 SECTION 9: FOOTER

### **Footer Container:**
- Background: #020617
- Border-top: 1px solid rgba(255, 255, 255, 0.1)
- Padding: 4rem vertical, 1.5rem horizontal

### **Layout:**
- Max-width: 80rem
- Centered
- Grid: 1 column mobile → 4 columns desktop
- Gap: 2rem

### **Column 1: Brand**
- Logo: "🌿 Bloomify"
  - Font: Clash Display, 700 weight (Bold), 24px
  - Color: White
  - Margin-bottom: 1rem

- Tagline: "Smart gardening for urban dwellers"
  - Font: Barlow, 400 weight, 14px
  - Color: rgba(255, 255, 255, 0.6)
  - Max-width: 16rem
  - Line-height: Relaxed

### **Column 2: Product**
- Title: "Product"
  - Font: Barlow, 600 weight (Semibold), 16px
  - Color: White
  - Margin-bottom: 1rem

**Links:**
- Features
- Pricing
- Community
- Plant Doctor
- Marketplace

**Link Style:**
- Font: Barlow, 400 weight, 14px
- Color: rgba(255, 255, 255, 0.7)
- Hover: White, underline
- Line-height: 2rem

### **Column 3: Resources**
- Title: "Resources"
**Links:**
- Blog
- Help Center
- Plant Database
- Gardening Guides
- API

### **Column 4: Company**
- Title: "Company"
**Links:**
- About
- Careers
- Contact
- Privacy
- Terms

### **Bottom Bar:**
- Border-top: 1px solid rgba(255, 255, 255, 0.1)
- Padding-top: 2rem
- Margin-top: 3rem
- Layout: Flex, space-between

**Copyright:**
- Text: "© 2026 Bloomify. All rights reserved."
- Font: Barlow, 400 weight, 14px
- Color: rgba(255, 255, 255, 0.5)

**Social Links:**
- Icons: Twitter, Instagram, LinkedIn (20px each)
- Color: rgba(255, 255, 255, 0.6) → White on hover
- Gap: 1.5rem

---

## 🎭 ANIMATIONS & INTERACTIONS

### **Animation Library:**
Use Framer Motion (motion/react) or CSS animations

### **Standard Animations:**
1. **Fade In with Y-offset:**
   - initial: { opacity: 0, y: 30 }
   - whileInView: { opacity: 1, y: 0 }
   - transition: { duration: 0.8 }
   - viewport: { once: true }

2. **Scale:**
   - initial: { opacity: 0, scale: 0.8 }
   - animate: { opacity: 1, scale: 1 }

3. **Hover Effects:**
   - Scale: 1.05 on hover
   - Shadow increase
   - Border color change
   - Background opacity increase

### **Scroll Behavior:**
- Smooth scrolling enabled
- Sections animate when they enter viewport (once)
- Staggered animations for grids (0.1s - 0.2s delay between items)

### **Button Interactions:**
- Hover: Scale 1.05, shadow increase
- Active: Scale 0.95
- Transition: all 200ms ease

### **Video Behavior:**
- Autoplay on load
- Loop infinitely
- Muted (no audio)
- playsInline (mobile optimization)

---

## 📱 RESPONSIVE BREAKPOINTS

### **Mobile (< 640px):**
- Single column layouts
- Stacked buttons
- Reduced font sizes
- Full-width cards
- Video height: 32rem

### **Tablet (640px - 1024px):**
- 2 column grids where applicable
- Medium font sizes
- Buttons can be horizontal
- Video height: 36rem

### **Desktop (> 1024px):**
- Multi-column grids (3-4 columns)
- Full font sizes
- Horizontal button layouts
- Video height: 40rem
- Max-width containers for content

---

## 🎯 INTERACTIVE ELEMENTS

### **Buttons (General Styling):**
- Border-radius: 2px (sharp premium look) OR rounded-full (pill shape)
- Transition: all 200-300ms
- Font: Barlow, weights 500-700
- Padding: Variable based on size (lg: 2.5rem × 1.75rem)

### **Video Controls:**
- No controls visible
- Auto-play on page load
- Loop continuously
- Muted by default

### **Links:**
- Color: Emerald-400 OR White with reduced opacity
- Hover: Brighter color, underline
- Transition: 200ms

### **Cards:**
- Hover: Lift (translateY -4px), shadow increase, border glow
- Transition: 300-500ms
- Backdrop-filter: blur for glass effect

---

## 🔧 TECHNICAL SPECIFICATIONS

### **Framework Recommendations:**
- React / Next.js
- Tailwind CSS v4
- Framer Motion for animations
- Lucide React for icons

### **Performance:**
- Lazy load videos
- Optimize video sizes (use compressed versions)
- Preload critical fonts
- Use IntersectionObserver for scroll animations

### **Accessibility:**
- Alt text for all images/videos
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios (WCAG AA minimum)
- Focus states on all interactive elements

### **Browser Support:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📦 ASSETS SUMMARY

### **Videos (4 Total):**
1. Hero: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4`
2. Feature 1: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065409_e3a5dd3c-dcb8-4ddf-8d97-6a1fb8cc1be9.mp4`
3. Feature 2: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065554_41fe5ec2-b58b-4dd7-9bc5-9d4a46a8fbed.mp4`
4. Pricing: `https://www.stocksy.com/video/download/2318367/light-sparkles-on-water?size=small`

### **Fonts (3 Total):**
1. Clash Display (Fontshare)
2. Barlow (Google Fonts)
3. Instrument Serif (Google Fonts)

### **Icons:**
Use Lucide React library (Camera, Sparkles, Play, Check, X, Arrow Right, Bell, etc.)

---

## 🎨 DESIGN PRINCIPLES

1. **White Text on Dark Backgrounds**: Always use pure white (#FFFFFF) or white with opacity for text on dark (#020617) backgrounds
2. **2px Border Radius**: Use sharp 2px corners for buttons and cards for premium, modern look (exception: pills use rounded-full)
3. **Liquid Glass Morphism**: Apply subtle glass effects with minimal blur and soft borders
4. **Generous Spacing**: Use 6-10rem vertical padding for sections
5. **Centered Layouts**: Max-width containers (80rem-112rem) centered with mx-auto
6. **Subtle Animations**: Fade in with 30px y-offset, 0.8s duration
7. **Consistent Typography**: Barlow for UI, Instrument Serif for display headlines
8. **Video as Background**: Full-screen or full-section videos with gradient overlays
9. **Minimal Borders**: Use rgba borders with low opacity (0.1-0.2)
10. **Hover States**: Scale 1.05, shadow increase, subtle color shifts

---

## ✅ FINAL CHECKLIST

- [ ] All 4 video URLs integrated correctly
- [ ] All 3 fonts loaded from CDN
- [ ] Liquid glass CSS classes implemented
- [ ] All 9 sections in correct order
- [ ] Mobile responsive at all breakpoints
- [ ] Smooth scroll animations enabled
- [ ] Stats, testimonials, and pricing data accurate
- [ ] Indian Rupee (₹) symbol used in pricing
- [ ] All CTAs use varied text (not repetitive "Get Started")
- [ ] Footer with brand, links, and copyright
- [ ] Accessibility features included
- [ ] Performance optimizations applied

---

## 🚀 DEPLOYMENT NOTES

- Test video loading on mobile networks
- Verify font fallbacks work properly
- Check gradient overlays render correctly on all browsers
- Ensure videos autoplay (may require user interaction on some devices)
- Validate color contrast ratios
- Test touch interactions on mobile devices
- Verify all links/buttons have proper hover states

---

**END OF RECREATION GUIDE**

*This document contains all specifications needed to recreate the Bloomify landing page pixel-perfect. Use this as a comprehensive reference for implementation in Google Stitch, Antigravity, or any web development platform.*
