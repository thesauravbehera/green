# Bloomify — Complete Project Inventory 🌿

**Tech Stack:** React 18 + Node.js/Express + MongoDB + Python ML  
**Design System:** Deep Botanical | Premium Glassmorphism | Emerald-Teal-Sapphire

---

## 📋 TABLE OF CONTENTS

1. [PHASE 1: Implementation Checklist](#phase-1-implementation-checklist)
2. [PHASE 2: Backend Architecture](#phase-2-backend-architecture)
3. [PHASE 3: Frontend Components](#phase-3-frontend-components)
4. [PHASE 4: Data Models & Schemas](#phase-4-data-models--schemas)
5. [PHASE 5: Database Collections](#phase-5-database-collections)
6. [PHASE 6: API Endpoints](#phase-6-api-endpoints)
7. [PHASE 7: Data Sources & Integration Points](#phase-7-data-sources--integration-points)
8. [PHASE 8: Dependencies & Packages](#phase-8-dependencies--packages)

---

## PHASE 1: IMPLEMENTATION CHECKLIST

### ✅ PHASE 1 — Foundation (CSS & Config) [COMPLETED]

#### 1.1 Global CSS / Index CSS
- [x] Import Clash Display from Fontshare API
- [x] Import Inter + JetBrains Mono from Google Fonts
- [x] Set `body` background to `#020617` (deep slate)
- [x] Set `body` font to Inter, color to `#E8EDD6`
- [x] Add `.glass` utility class
- [x] Add `.glass-elevated` utility class
- [x] Add `.glass-green` utility class
- [x] Add `.gradient-text` utility class
- [x] Add `.bg-botanical` gradient utility class
- [x] Add `.glow-border:hover` utility
- [x] Add custom scrollbar styles (4px, emerald thumb)
- [x] Add `@keyframes shimmer`
- [x] Add `@keyframes fade-in-token`
- [x] Add `@keyframes scan`
- [x] Add `@keyframes level-up`
- [x] Add `@keyframes pulse-orb`
- [x] Override shadcn Dialog styles (glass-elevated)
- [x] Override shadcn Select dropdown styles
- [x] Override shadcn Sheet styles

#### 1.2 Tailwind Config (Tailwind v4 via @theme)
- [x] Add `deep-slate: #020617` color
- [x] Add `slate-2: #0A1628` color
- [x] Add `slate-3: #0F1F35` color
- [x] Add `emerald-brand: #10B981` color
- [x] Add `teal-brand: #0D9488` color
- [x] Add `sapphire-brand: #0369A1` color
- [x] Add `text-warm: #E8EDD6` color
- [x] Add `saffron: #FF9933` color
- [x] Add `sacred-red: #DC2626` color
- [x] Add `botanical` background-image gradient
- [x] Add `botanical-soft` background-image gradient
- [x] Add `display` font family (Clash Display)
- [x] Add `body` font family (Inter)
- [x] Add `mono` font family (JetBrains Mono)
- [x] Add `3xl: 1.5rem` border radius
- [x] Add `4xl: 2rem` border radius

#### 1.3 CSS Variables (Color System)
- [x] `--bg-primary: #020617`
- [x] `--bg-secondary: #0A1628`
- [x] `--bg-tertiary: #0F1F35`
- [x] `--emerald: #10B981`
- [x] `--teal: #0D9488`
- [x] `--sapphire: #0369A1`
- [x] `--glass-bg: rgba(255,255,255,0.03)`
- [x] `--glass-border: rgba(255,255,255,0.08)`
- [x] `--glass-border-strong: rgba(16,185,129,0.20)`
- [x] `--text-primary: #E8EDD6`
- [x] `--text-secondary: rgba(232,237,214,0.60)`
- [x] `--text-tertiary: rgba(232,237,214,0.35)`
- [x] `--text-accent: #10B981`
- [x] `--success: #22C55E`
- [x] `--warning: #F59E0B`
- [x] `--danger: #EF4444`
- [x] `--info: #3B82F6`
- [x] `--saffron: #FF9933`
- [x] `--sacred-red: #DC2626`

---

### ✅ PHASE 2 — Layout Shell [COMPLETED]

#### 2.1 PageShell Component
- [x] `min-h-screen bg-deep-slate` wrapper
- [x] Include `<Navbar />` (fixed top, 64px)
- [x] Include `<BottomNav />` (mobile only, fixed bottom, 64px)
- [x] `main` with `pt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto`
- [x] Safe area padding for iPhone notch / home indicator
- [x] `PageContainer.jsx` updated as legacy alias → delegates to PageShell

#### 2.2 Navigation Bar (Navbar.jsx)
- [x] Fixed top, full width, z-50
- [x] Use `.glass-elevated` + `border-b border-white/8`
- [x] Height: `h-16`
- [x] Logo: `font-display font-semibold text-xl gradient-text` — "Bloomify"
- [x] Desktop nav links (hidden on mobile): Features, Community, Market
- [x] Language selector dropdown (EN / HI / KN / TA)
- [x] User avatar / Sign In button
- [x] Responsive: hide nav links below `md`
- [x] Mobile hamburger with animated dropdown + language chips

#### 2.3 Bottom Nav (BottomNav.jsx)
- [x] `fixed bottom-0 left-0 right-0 z-50 md:hidden`
- [x] `.glass-elevated border-t border-white/8`
- [x] 5 nav items: Home, Garden, Community, Market, Profile
- [x] Active item: botanical gradient icon bg + `text-emerald-brand` label
- [x] Inactive item: outline icon + `text-text-warm/40` label
- [x] `whileTap={{ scale: 0.9 }}` tap feedback
- [x] Safe area padding bottom (`env(safe-area-inset-bottom)`)

#### 2.4 Footer
- [x] `glass border-t border-white/8`
- [x] Logo + nav links + copyright in single row (responsive)
- [x] Hidden on mobile (behind bottom nav), visible on `md+`

---

### ✅ PHASE 3 — Shared UI Components [COMPLETED]

#### 3.1 Buttons
- [x] **Primary** — `bg-botanical text-white rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.30)]`
- [x] **Secondary** — `glass border border-emerald-brand/30 text-emerald-brand rounded-2xl`
- [x] **Ghost** — `text-text-warm/60 hover:text-text-warm hover:bg-white/5 rounded-xl`
- [x] **Danger** — `bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl`
- [x] **Icon Button** — `glass border border-white/10 p-3 rounded-xl`
- [x] All buttons: `hover:opacity-90 active:scale-95 transition-all duration-200`

#### 3.2 Cards
- [x] **Standard** — `glass border border-white/8 rounded-3xl p-6 hover:border-emerald-brand/20`
- [x] **Stat Card** — `glass-green border border-emerald-brand/20 rounded-2xl p-4`
- [x] **Plant Card** — glass + hover glow `shadow-[0_0_30px_rgba(16,185,129,0.08)]` + image area
- [x] **Alert Card** — amber tinted `bg-amber-500/10 border-amber-500/30` with pulsing dot

#### 3.3 Badges
- [x] **Difficulty — Easy** — `bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`
- [x] **Difficulty — Medium** — `bg-amber-500/15 text-amber-400 border border-amber-500/30`
- [x] **Difficulty — Hard** — `bg-red-500/15 text-red-400 border border-red-500/30`
- [x] **Tier — Seedling** — `bg-emerald-500/15 text-emerald-300`
- [x] **Tier — Bloomer** — `bg-amber-500/15 text-amber-300`
- [x] **Tier — Master** — `bg-violet-500/15 text-violet-300`
- [x] **City** — `bg-sapphire-brand/15 text-blue-300 border border-blue-500/20`
- [x] **Season** — `bg-teal-brand/15 text-teal-300 border border-teal-500/20`
- [x] **XP** — `bg-botanical text-white font-medium`
- [x] **Daily Pick** — `bg-amber-500/15 text-amber-300`
- [x] **Featured** — `bg-botanical text-white text-xs rounded-full`

#### 3.4 Progress Bars
- [x] **Vital bar** — color changes: green (>60%) → amber (30-60%) → red (<30%)
- [x] **XP level bar** — `bg-botanical` with shimmer animation overlay
- [x] Label row with left label + right value
- [x] Track: `h-2 bg-white/5 rounded-full`
- [x] Smooth `transition-all duration-700 ease-out`

#### 3.5 Inputs
- [x] **Text input** — `glass border border-white/10 rounded-2xl px-4 py-3`
- [x] Focus state: `border-emerald-brand/50 ring-1 ring-emerald-brand/30`
- [x] Placeholder: `text-text-warm/30`
- [x] **Search bar** — with Search icon left-padded
- [x] **Range slider** — custom thumb: `bg-botanical` circle + glow shadow
- [x] **Textarea** — same glass style, character counter

#### 3.6 Language Selector
- [x] `glass border border-white/10 rounded-xl` select
- [x] Options: EN, HI, KN, TA
- [x] ChevronDown icon, `appearance-none`

#### 3.7 AI Stream Text
- [x] Skeleton loader (3 lines, `animate-pulse bg-white/5`) while `isLoading && !text`
- [x] Character-by-character reveal with `fade-in-token` animation (8ms delay per char)

#### 3.8 Framer Motion Variants
- [x] `pageVariants` — fade + y:20 entrance
- [x] `containerVariants` — stagger children 0.08s
- [x] `itemVariants` — fade + y:16 + scale:0.97
- [x] `modalVariants` — spring scale entrance
- [x] Card hover: `whileHover={{ y: -4 }}`
- [x] Button tap: `whileTap={{ scale: 0.96 }}`

---

### ✅ PHASE 4 — Pages [COMPLETED]

| Page Component | Route | Status | Key Features |
|---|---|---|---|
| Home (Landing) | `/` | ✅ Complete | Hero, Features Grid, 3-Tier Section, Testimonials, CTA, Footer |
| Login/Register | `/login` | ✅ Complete | Tab Switcher, Email/Password, Language Chips, Guest Login |
| Onboarding | `/onboarding` | ✅ Complete | 4-Step Progress, Balcony Profile, Preferences, Goals, Experience Level |
| Dashboard | `/home` | ✅ Complete | Status Bar, Stats Grid, Watering Alert, Quick Actions, Daily Tasks, Level Progress |
| My Garden | `/garden` | ✅ Complete | 3D Viewer, Plant Vitals, Plant List, Care Actions, Achievements |
| Community | `/community` | ✅ Complete | Search, City Filter, Monthly Challenge, Post Cards, Create Post Modal |
| Marketplace | `/marketplace` | ✅ Complete | Search, Category Filter, Product Grid, Featured Banner, Cart Drawer |
| Profile | `/profile` | ✅ Complete | Hero Section, Language Settings, Achievements, Level Progress, Settings |
| AR Scanner | `/scanner` | ✅ Complete | Camera Viewfinder, Scan Progress, Result Box, Env Metrics, 3D Preview |
| Admin Dashboard | `/admin` | 🔜 In Progress | Metrics Grid, System Logs, User Table, Content Moderation |

#### 4.1 Landing Page (Home.jsx)
- [x] **Hero Section** — Animated orbs, season badge, headline, CTA buttons, stats row
- [x] **Features Grid (6 cards)** — AI Doctor, AR Scan, Monsoon-Ready, XP/Levels, Community, Marketplace
- [x] **Three-Tier Section** — Seedling, Bloomer, Master with feature lists
- [x] **Testimonials (2-col masonry)** — Star ratings, city badges
- [x] **CTA Section** — Green glassmorphic card with [Create free account]
- [x] **Footer** — Logo, links, copyright

#### 4.2 Login/Register (Login.jsx)
- [x] Max-width centered, dark bg with orbs
- [x] Glass-elevated container `rounded-4xl p-8`
- [x] Tab switcher (Login / Register)
- [x] Email + Password inputs (glass styled)
- [x] [Sign in to Bloomify] button with glow
- [x] [Continue as guest] glass button
- [x] "or" divider
- [x] Language chips (EN/HI/KN/TA)

#### 4.3 Onboarding (Onboarding.jsx)
- [x] **Step 1** — Balcony Profile (City, Direction, Sunlight, Size)
- [x] **Step 2** — Plant Preferences (multi-select chips)
- [x] **Step 3** — Goals (multi-select chips)
- [x] **Step 4** — Experience Level (Seedling/Bloomer/Master cards)
- [x] Step progress indicator with filled circles + lines
- [x] [Continue] primary button, [Back] ghost button

#### 4.4 Dashboard (Dashboard.jsx)
- [x] Status bar: "Good morning, {name}" + Pre-Monsoon badge
- [x] **Stats 2×2 grid** — Plants, Streak, XP, Level+Tier (glass-green cards)
- [x] **Watering alert** (conditional) — amber tinted with pulsing dot
- [x] **Quick Actions (3 cards)** — Plant Doctor, Plant of the Day, AR Scan
- [x] **Daily Tasks section** — Task cards with XP labels, progress bars, [Mark done] buttons
- [x] **Level Progress section** — Tier ladder with shimmer XP bar

#### 4.5 My Garden (MyGarden.jsx)
- [x] Header: "My Garden" + [+ AR scan] button
- [x] **3D Plant Viewer** — Sketchfab iframe with tab row for model switching
- [x] **Plant Vitals 2×2** — Health, Hydration, Growth, Happiness with color-coded bars
- [x] **Plant List** — Row cards with thumb, name, meta, alert badge, chevron
- [x] **Care Actions** — Water (+50 XP), Fertilise (+75 XP), Prune (+35 XP)
- [x] **Action Result Box** — Shows hydration, health, XP earned, streak
- [x] **Achievements** — Flex wrap of emerald chips

#### 4.6 Plant Doctor Modal (PlantDoctorModal.jsx)
- [x] 3-step indicator (circles + lines)
- [x] Photo upload area (drag-drop or camera capture)
- [x] Symptom textarea, plant name input
- [x] [Analyse with AI] button with glow
- [x] **AI Result Box** — Issue, Confidence, Treatment steps, Climate note
- [x] "Powered by Gemini 2.0 Flash" label
- [x] Uses `AIStreamText` component for character-reveal
- [x] Footer: [Close] ghost + [Buy neem oil] buttons

#### 4.7 Plant of the Day Modal (PlantOfTheDayModal.jsx)
- [x] Header: "Plant of the Day" + date + [Daily Pick] amber badge
- [x] Plant illustration: `glass-green rounded-3xl h-32`
- [x] Quick stats 3-column layout
- [x] Description text
- [x] Care tip box with green styling
- [x] Footer: [Close] ghost + [Buy {plant}] buttons

#### 4.8 Community (Community.jsx)
- [x] Header: "Community" + [+ Post] button
- [x] Search bar + City filter chips
- [x] **Monthly Challenge card** (pinned, green styling)
- [x] **Post cards** — Image, author, level badge, city badge, caption
- [x] Engagement: Like, Comment, Share buttons (glass pills)
- [x] Like active: red styling with red bg
- [x] **Create Post Modal** — Photo upload, caption textarea (280 char counter), city selector

#### 4.9 Marketplace (Marketplace.jsx)
- [x] Header: "Marketplace" + cart icon with badge
- [x] Search + Category chips (All/Plants/Seeds/Tools/Pots/Fertiliser)
- [x] **Product Grid** (2-col mobile, 4-col desktop)
- [x] Product card: Image, [Featured] badge, [Out of stock] overlay
- [x] Price in emerald-brand, [+ Cart] button, wishlisting heart
- [x] **Featured Product Banner** — Emerald green styling
- [x] **Cart Drawer** (shadcn Sheet) — Item rows, qty controls, total, checkout button

#### 4.10 Profile (Profile.jsx)
- [x] Hero: Avatar ring, name, tier badge, level, city
- [x] Stats row: Plants, Streak, XP (gradient-text)
- [x] **Language section** — Chips with active emerald state
- [x] **Achievements** — Flex wrap emerald chips
- [x] **Level Progress** — XP bar with shimmer
- [x] **Settings rows** — Glass cards with chevrons
- [x] **Sign Out** — Red-tinted glass button

#### 4.11 AR Scanner (ARScanner.jsx)
- [x] Header: "AR Balcony Scanner" + ← Back button
- [x] **Camera Viewfinder** — Glass border, emerald pulsing corners
- [x] Camera permission error state
- [x] [Start Scan] primary button
- [x] **Progress bar** — Animated fill 0%→100% over 3s
- [x] **Scan Result Box** — Shows sunlight %, space, airflow, direction
- [x] **Env Metrics (3-col)** — Glass cards with icons
- [x] **Recommended Plants** — Plant rows with [Best Match] badge
- [x] **3D Placement Preview**
- [x] [Shop recommended plants] button

#### 4.12 Admin Dashboard (Admin.jsx)
- [ ] Top bar: "Bloomify Admin" + admin badge + [Sign out]
- [ ] **Sidebar** (desktop) — Nav items, active state with emerald border
- [ ] **Metrics Grid (4-col)** — Users, Plants, Posts, Uptime (glass-green cards)
- [ ] **System Logs** — Mono font, color-coded (success/warning)
- [ ] **User Table** — Glass container, hover rows, status badges
- [ ] **Content Moderation** — Flagged posts with [Approve]/[Reject]
- [ ] **Analytics Cards** — Revenue, Orders (gradient-text)

---

### ✅ PHASE 5 — Routing & App Shell [COMPLETED]

- [x] Add `/onboarding` route → `<Onboarding />`
- [x] Add `/home` route → `<Dashboard />` (separate from landing)
- [x] Add `/garden` route → `<MyGarden />`
- [x] Add `/community` route → `<Community />`
- [x] Add `/marketplace` route → `<Marketplace />`
- [x] Add `/profile` route → `<Profile />`
- [x] Add `/scanner` route → `<ARScanner />`
- [x] Add `/admin` route → `<Admin />`
- [x] Wire Plant Doctor Modal trigger from Dashboard Quick Actions
- [x] Wire Plant of the Day Modal trigger from Dashboard Quick Actions
- [x] Wrap all page components in `<PageShell />`
- [x] Add `AnimatePresence` + `pageVariants` on all page transitions

---

### 🔜 PHASE 6 — Mobile & Polish [IN PROGRESS]

#### 6.1 Mobile Patterns
- [x] All touch targets minimum `44 × 44px`
- [x] Buttons: `min-h-[44px] px-6`
- [x] Nav items: `flex-1 h-16`
- [x] List rows: `py-4` minimum
- [x] Page content bottom padding: `calc(64px + env(safe-area-inset-bottom))`
- [x] Bottom nav height: `calc(64px + env(safe-area-inset-bottom))`

#### 6.2 Camera / AR
- [x] Request rear camera: `facingMode: { ideal: 'environment' }`
- [x] Graceful error state if camera denied
- [x] Camera toggle (front/rear) button

#### 6.3 Responsive Breakpoints
- [x] `< 640px`: Bottom nav visible, single column, modals are full-screen sheets
- [x] `640–1024px`: Top nav + bottom nav, 2-column grids
- [x] `> 1024px`: Top nav only, multi-column, sidebar on Admin

---

### 🔜 PHASE 7 — Pre-launch Verification [PENDING]

- [ ] Background `#020617` renders correctly on all pages
- [ ] Clash Display font loads on mobile browser (not fallback)
- [ ] Glass effect visible on Chrome mobile (`backdrop-filter` supported)
- [ ] Gradient text renders as gradient (not black boxes)
- [ ] All buttons have `:active` scale feedback on tap
- [ ] Bottom nav active item shows botanical gradient
- [ ] Modal overlays use `rgba(0,0,0,0.7)` dark backdrop
- [ ] AI result cards use `glass-green` with emerald border
- [ ] Progress bars animate smoothly on first render
- [ ] Skeleton loaders appear while AI responds
- [ ] No layout shift when Clash Display font loads
- [ ] Camera permission request works on real mobile device
- [ ] All pages scroll without bottom nav overlap
- [ ] Font sizes readable without zooming on mobile
- [ ] All touch targets are minimum 44px

---

## PHASE 2: BACKEND ARCHITECTURE
... (Included in source files)
...
