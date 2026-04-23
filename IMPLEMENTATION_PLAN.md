# Bloomify Frontend Rebuild & Revamp Plan

This document details a comprehensive 15-phase restructure of the Bloomify frontend to achieve a premium, high-end "Deep Botanical" aesthetic while preserving all underlying backend functionality and data flows.

## Core Objectives
1. **Zero Compromise on Logic:** Keep all existing authentication, database, and backend routing entirely intact.
2. **Premium Aesthetic:** Implement the "Liquid Glass" and "Deep Botanical" UI themes.
3. **Mobile-First Components:** Implement the provided `MobileAI`, `MobileOnboarding`, `MobileDashboard`, and `MobileGarden` components.
4. **Cinematic Hero Landing:** Recreate a high-end agency-style landing page using a looping video background.

---

## 15 Phases of Deploy-Ready Restructure

### Phase 1: Setup & Environment Configuration
- **Objective:** Prepare the Vite + React environment for the new dependencies.
- **Actions:**
  - Install required packages: `lucide-react`, `motion`, `sonner`, `react-router-dom` (if missing/updating).
  - Configure `.env` for the new API keys (OpenRouter, Kaggle, PlantVillage) ensuring they are securely accessed (preferably via backend proxies where possible).

### Phase 2: Global Styling & Theme Initialization
- **Objective:** Establish the foundation for the "Deep Botanical" design.
- **Actions:**
  - Inject the provided Shadcn UI CSS variables and liquid-glass CSS into `index.css` / `globals.css`.
  - Add Google Font links to `index.html` (`Inter`, `Barlow`, `Instrument Serif`, `Clash Display`).
  - Extend the `tailwind.config.js` to map these new fonts and colors.

### Phase 3: Routing Architecture Overhaul
- **Objective:** Define the new application structure without breaking legacy routes.
- **Actions:**
  - Restructure `App.jsx` with the new core routes: `/`, `/dashboard`, `/onboarding`, `/ai-assistant`, `/my-garden`, `/notifications`, `/analytics`, `/planner`.
  - Keep old routes accessible (e.g., `/dashboard-old`) for backward compatibility during the transition.

### Phase 4: Cinematic Landing Page Construction
- **Objective:** Build the ultra-modern, minimal Hero section.
- **Actions:**
  - Implement the looping video background: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4`.
  - Build the floating glass navbar (`liquid-glass` class).
  - Implement staggered character-by-character entrance animations for the `Instrument Serif` typography.

### Phase 5: Onboarding Flow Integration
- **Objective:** Implement the personalized 4-step user onboarding.
- **Actions:**
  - Create `Onboarding.tsx` using the provided `MobileOnboarding` component.
  - Connect the flow (Experience -> Interests -> Space Type -> Goals) to local state and prepare the final step to push data to the user profile backend.

### Phase 6: Main Dashboard Implementation
- **Objective:** Deploy the new central hub.
- **Actions:**
  - Implement the `MobileDashboard` / `NewDashboard` component.
  - Wire up dynamic greetings based on time, quick stats, quick actions, and the feature grid linking to other modules.

### Phase 7: My Garden Module Revamp
- **Objective:** Create a premium plant management interface.
- **Actions:**
  - Implement the `MobileGarden` component.
  - Connect the static plant list to the backend `/my-plants` endpoint.
  - Apply health badges and filtering systems based on live data.

### Phase 8: AI Assistant & Chat Integration
- **Objective:** Bring the smart gardening assistant to life.
- **Actions:**
  - Implement the `MobileAI` component.
  - Integrate OpenRouter API calls (via backend or direct if safe) for real conversational AI capabilities.
  - Configure the diagnosis displays and smart recommendations.

### Phase 9: Task Planner & Calendar Sync
- **Objective:** Build scheduling functionality.
- **Actions:**
  - Construct the `Planner` component.
  - Build categories for overdue, pending, and completed tasks (Watering, Fertilizing, Pruning).
  - Prepare Google Calendar integration hooks.

### Phase 10: Analytics & Data Visualization
- **Objective:** Display meaningful plant metrics.
- **Actions:**
  - Construct the `Analytics` page.
  - Use a charting library (like Recharts) to build visualizations for plant growth tracking, environmental conditions, and water usage.

### Phase 11: Notifications System
- **Objective:** Keep users informed in real-time.
- **Actions:**
  - Build the `Notifications` page.
  - Implement filter tabs (All/Unread/Read) and notification categories (Watering, Health, Community).
  - Connect to the existing Socket.IO real-time layer.

### Phase 12: Context & Auth Alignment
- **Objective:** Seamlessly integrate the new UI with existing authentication.
- **Actions:**
  - Ensure `AuthContext` (Firebase) wraps the new routing correctly.
  - Map `currentUser` data to the new Dashboard and Profile components.

### Phase 13: Component Modernization & Refactoring
- **Objective:** Bring legacy pages up to the new aesthetic standard.
- **Actions:**
  - Review existing pages (e.g., Marketplace, PlantDetails, Community).
  - Apply `liquid-glass`, `card-clean`, and premium gradients to ensure a unified user experience across the entire app.

### Phase 14: Mobile Responsiveness & Polish
- **Objective:** Guarantee flawless performance across all devices.
- **Actions:**
  - Perform a comprehensive audit on mobile screens (viewport checks, touch targets).
  - Fine-tune Framer Motion staggered delays for smooth, lag-free transitions.

### Phase 15: Final Testing & Deployment Preparation
- **Objective:** Ensure a robust, deploy-ready application.
- **Actions:**
  - Verify all API endpoints (`/api/v1/plants`, `/api/v1/garden`, `/analyze-space`) interface perfectly with the new UI.
  - Run build processes (`npm run build`), resolve any linting/type errors, and finalize for production deployment.

---
## Approval
Please review this file. If you are ready, I will begin executing Phase 1 and 2 immediately.
