import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { MobileNavigation } from "./components/MobileNavigation";
import { MobileLanding } from "./pages/MobileLanding";
import { MobileDashboard } from "./pages/MobileDashboard";
import { MobileLogin } from "./pages/MobileLogin";
import { MobileSignup } from "./pages/MobileSignup";
import { MobileOnboarding } from "./pages/MobileOnboarding";
import { MobileGarden } from "./pages/MobileGarden";
import { MobilePlantDetails } from "./pages/MobilePlantDetails";
import { MobileNotifications } from "./pages/MobileNotifications";
import { MobileAnalytics } from "./pages/MobileAnalytics";
import { MobilePlanner } from "./pages/MobilePlanner";
import { MobileAI } from "./pages/MobileAI";
import { MobileMarketplace } from "./pages/MobileMarketplace";
import { MobileCommunity } from "./pages/MobileCommunity";
import { MobileProfile } from "./pages/MobileProfile";
import { MobileSettings } from "./pages/MobileSettings";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner@2.0.3";

export default function MobileApp() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#020617] pb-20">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MobileLanding />} />
            <Route path="/login" element={<MobileLogin />} />
            <Route path="/signup" element={<MobileSignup />} />
            <Route path="/onboarding" element={<MobileOnboarding />} />
            
            {/* Main App Routes */}
            <Route path="/dashboard" element={<MobileDashboard />} />
            <Route path="/garden" element={<MobileGarden />} />
            <Route path="/garden/:id" element={<MobilePlantDetails />} />
            <Route path="/notifications" element={<MobileNotifications />} />
            <Route path="/analytics" element={<MobileAnalytics />} />
            <Route path="/planner" element={<MobilePlanner />} />
            <Route path="/ai" element={<MobileAI />} />
            <Route path="/marketplace" element={<MobileMarketplace />} />
            <Route path="/community" element={<MobileCommunity />} />
            <Route path="/profile" element={<MobileProfile />} />
            <Route path="/settings" element={<MobileSettings />} />
          </Routes>
          
          <MobileNavigation />
          <Toaster position="top-center" theme="dark" />
        </div>
      </Router>
    </AuthProvider>
  );
}
