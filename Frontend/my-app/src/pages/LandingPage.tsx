import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
import { HeroSectionPremium } from "../components/hero-section-premium";

export function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 selection:text-white min-h-screen">
      <HeroSectionPremium />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  );
}