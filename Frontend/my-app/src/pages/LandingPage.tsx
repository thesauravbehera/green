import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
import { HeroSectionPremium } from "../components/hero-section-premium";
import { PremiumFeaturesShowcase } from "../components/premium-features-showcase";
import { PremiumCapabilitiesSection } from "../components/premium-capabilities-section";
import { PremiumTestimonialsSection } from "../components/premium-testimonials-section";
import { PremiumPricingSection } from "../components/premium-pricing-section";
import { PremiumFinalCTA } from "../components/premium-final-cta";
import { InteractiveDemoSection } from "../components/interactive-demo-section";
import { LevelsSection } from "../components/LevelsSection";
import { Footer } from "../components/footer";
import { FloatingUserStation } from "../components/FloatingUserStation";

export function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 selection:text-white min-h-screen">
      <HeroSectionPremium />
      
      {/* Premium Sections with Video Backgrounds & Modern Design */}
      <div id="features">
        <PremiumFeaturesShowcase />
      </div>
      
      <PremiumCapabilitiesSection />
      
      <InteractiveDemoSection />
      
      <div id="about">
        <LevelsSection />
      </div>
      
      <PremiumTestimonialsSection />
      
      <PremiumPricingSection />
      
      <PremiumFinalCTA />
      
      <Footer />
      
      {/* Floating UI Elements */}
      <FloatingUserStation />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  );
}