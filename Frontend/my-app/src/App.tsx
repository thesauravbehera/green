import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import { Navigation } from "./components/navigation";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { NewDashboard } from "./pages/NewDashboard";
import Marketplace from "./pages/Marketplace";
import { CommunityHub } from "./components/CommunityHub";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "sonner";
import { GamificationHub } from "./components/GamificationHub";
import { ARBalconyScanner } from "./components/ARBalconyScanner";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PlantCatalog } from "./pages/PlantCatalog";
import { PlantDetails } from "./pages/PlantDetails";
import { TasksReminders } from "./pages/TasksReminders";
import { Profile } from "./pages/Profile";
import { Leaderboard } from "./pages/Leaderboard";
import { WeatherDashboard } from "./pages/WeatherDashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Onboarding } from "./pages/Onboarding";
import { MyGarden } from "./pages/MyGarden";
import { Notifications } from "./pages/Notifications";
import { Analytics } from "./pages/Analytics";
import { Planner } from "./pages/Planner";
import { AIAssistant } from "./pages/AIAssistant";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navigation />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main Dashboard Routes */}
        <Route path="/dashboard" element={<NewDashboard />} />
        <Route path="/dashboard-old" element={<Dashboard />} />
        
        {/* Core Feature Routes */}
        <Route path="/my-garden" element={<MyGarden />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/achievements" element={<Leaderboard />} />
        
        {/* Secondary Routes */}
        <Route path="/plants" element={<PlantCatalog />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/tasks" element={<TasksReminders />} />
        <Route path="/weather" element={<WeatherDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<CommunityHub />} />
        <Route path="/garden" element={<GamificationHub />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scanner" element={<ARBalconyScanner />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}