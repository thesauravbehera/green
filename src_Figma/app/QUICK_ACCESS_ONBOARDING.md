# 🎯 QUICK ACCESS GUIDE - ONBOARDING FLOW

## 📍 HOW TO ACCESS THE ONBOARDING

### **Method 1: Complete Signup Flow (Recommended)**

1. **Click "Get Started" button** in the navigation (top right)
   - OR go directly to: `http://localhost:5173/signup`

2. **Fill out the signup form:**
   ```
   Name: Test User
   Email: test@example.com
   Phone: (optional)
   Location: (optional)
   Password: password123
   Confirm Password: password123
   ☑ Agree to Terms
   ```

3. **Click "Create Account"** button

4. **You'll be automatically redirected to the Onboarding flow!**

---

### **Method 2: Direct URL Access**

Just navigate directly to:
```
http://localhost:5173/onboarding
```

This works immediately without signup!

---

## 📱 ONBOARDING FLOW BREAKDOWN

### **Step 1 of 4: Experience Level**
Choose your gardening expertise:
- 🌱 Beginner
- 🌿 Intermediate  
- 🏆 Expert

### **Step 2 of 4: Interests**
Select plant types (multi-select):
- 🌱 Herbs & Vegetables
- 🌸 Flowering Plants
- 🍃 Foliage Plants
- 🌵 Succulents
- 🪴 Indoor Plants
- 💊 Medicinal Plants

### **Step 3 of 4: Space Type**
Define your growing area:
- ☀️ Sunny (6+ hours sun)
- 💧 Partial Shade (3-6 hours sun)
- 🌬️ Shaded (indirect light)
- 🏠 Indoor (no direct sun)

### **Step 4 of 4: Goals**
Set your objectives (multi-select):
- 🥗 Grow my own food
- ✨ Beautify my space
- 💨 Improve air quality
- 📚 Learn a new hobby
- 🧘 Reduce stress
- 👥 Join a community

### **Completion**
After Step 4, click "Complete" → Redirected to `/dashboard`!

---

## 🔗 ALL ROUTES

### **Authentication Routes:**
```
/login       → Login with demo credentials
/signup      → Create new account
/onboarding  → 4-step personalization
```

### **Main App Routes:**
```
/dashboard   → Main dashboard
/plants      → Plant catalog
/tasks       → Tasks & reminders
/weather     → Weather dashboard
/marketplace → Shop plants
/community   → Community hub
/garden      → Gamification
/leaderboard → Rankings
/profile     → User profile
/scanner     → AR Scanner
/admin       → Admin panel
```

---

## 🎮 DEMO CREDENTIALS (on Login page)

Click any card to auto-fill:

| Type | Email | Password |
|------|-------|----------|
| Regular | demo@bloomify.io | bloomify2024 |
| Premium | premium@bloomify.io | premium2024 |
| Admin | admin@bloomify.io | bloomify2026 |

---

## 🚀 COMPLETE USER JOURNEY

### **New User Path:**
```
Landing (/)
   ↓ Click "Get Started"
Login/Signup Choice
   ↓ Choose "Sign Up"
Signup Form (/signup)
   ↓ Fill & Submit
Onboarding (/onboarding)
   ↓ Complete 4 steps
Dashboard (/dashboard)
   ✅ Ready to use app!
```

### **Returning User Path:**
```
Landing (/)
   ↓ Click "Sign In"
Login (/login)
   ↓ Click demo account
Dashboard (/dashboard)
   ✅ Welcome back!
```

---

## 💡 TIPS

### **To Skip Onboarding:**
On any step, click the **"Skip for now"** button in the top right.

### **To Go Back:**
Click the **"Back"** button to revise previous answers.

### **Progress Indicator:**
- Blue progress bar shows completion
- Dots at bottom show current step
- "Step X of 4" counter at top

### **Cannot Proceed?**
The "Next" button is disabled until you make a selection on each step.

---

## 🎨 VISUAL FEATURES

✅ **Smooth animations** between steps  
✅ **Selected items** show checkmark badges  
✅ **Hover effects** on all cards  
✅ **Progress tracking** with visual feedback  
✅ **Completion message** on final step  
✅ **Fully responsive** design  

---

## 📝 DATA SAVED

After onboarding, your preferences are saved to localStorage:

```javascript
{
  name: "Test User",
  email: "test@example.com",
  onboardingComplete: true,
  preferences: {
    experience: "beginner",
    interests: ["herbs", "flowers"],
    balconyType: "sunny",
    goals: ["food", "beauty"]
  }
}
```

This data can be used to:
- Personalize plant recommendations
- Customize dashboard content
- Filter marketplace items
- Tailor AI suggestions

---

## ✅ READY TO TEST!

**Fastest way to see onboarding:**
1. Open browser to `http://localhost:5173/onboarding`
2. That's it! Start clicking through the 4 steps.

**Or test full flow:**
1. Go to homepage
2. Click "Get Started"
3. Fill signup form
4. Complete onboarding
5. Explore dashboard!

---

🌿 **Enjoy your personalized Bloomify experience!** ✨
