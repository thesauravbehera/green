import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AuthModal } from "../components/AuthModal";
import { HeroSectionPremium } from "../components/hero-section-premium";
import { Leaf, Play, ChevronDown, Droplets, Sun, AlertCircle, ArrowUpRight } from "lucide-react";

export function LandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 selection:text-white min-h-screen font-['Inter']">
      
      <HeroSectionPremium />

      {/* Dashboard Preview Section */}
      <section className="relative z-10 flex flex-col items-center pt-32 pb-40 px-6 bg-[#020617]">
        {/* Hero Text */}
        <div className="max-w-3xl text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/60 font-medium leading-relaxed"
          >
          Join 10,000+ urban gardeners mastering balcony gardening with AI plant
          suggestions, smart care reminders, and a thriving community. From beginner to
          expert.
        </motion.p>
      </div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center gap-6 mb-24 relative z-10"
      >
        <button 
          onClick={() => navigate('/signup')}
          className="bg-emerald-500 hover:bg-emerald-400 text-[#020617] px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors text-lg w-full sm:w-auto justify-center"
        >
          <Leaf className="w-5 h-5" />
          Start Growing Free
          <ArrowUpRight className="w-5 h-5 ml-2" />
        </button>

        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors text-lg w-full sm:w-auto justify-center">
          <Play className="w-5 h-5" />
          Watch Demo
        </button>
      </motion.div>

      {/* Dashboard Terminal Preview Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-5xl bg-[#080d1a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-emerald-500/10 blur-[100px] pointer-events-none" />

        {/* Top Terminal Bar */}
        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/5 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black font-black text-2xl font-['Clash_Display']">
                N
              </div>
              <div className="absolute -top-2 -right-2 bg-black border-2 border-[#080d1a] text-white text-[10px] font-black rounded-full w-6 h-6 flex items-center justify-center">
                15
              </div>
            </div>
            
            <div className="pr-6 border-r border-white/10">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">HEALTH INDEX</p>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold font-['Clash_Display']">87%</span>
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[87%] h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="pr-6 border-r border-white/10 flex-1 min-w-[150px]">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">ACTIVE BIO-UNITS</p>
            <p className="text-xl font-bold font-['Clash_Display']"><span className="text-white">9</span><span className="text-white/40">/12</span></p>
          </div>

          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">PROTOCOL STATUS</p>
            <p className="text-sm font-bold text-white/80 tracking-tight">3 SYSTEMS REQUIRING INTERACTION</p>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronDown className="w-5 h-5 text-white/60" />
            </button>
            <button className="bg-white text-black px-6 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform">
              QUICK LOG
            </button>
          </div>
        </div>

        {/* Bottom Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Metric Analysis */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">METRIC ANALYSIS</h3>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem]">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">XP PROGRESS</p>
                <p className="text-3xl font-bold font-['Clash_Display'] mb-4">69%</p>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[69%] h-full bg-white rounded-full" />
                </div>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-[1.5rem]">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">GREEN POINTS</p>
                <p className="text-2xl font-bold font-['Clash_Display'] mb-2">18,750</p>
                <p className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +250 TODAY
                </p>
              </div>
            </div>
          </div>

          {/* Interaction Protocol */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">INTERACTION PROTOCOL</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-[1.5rem] flex items-start gap-4 hover:border-emerald-500/30 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Droplets className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">URGENT</p>
                  <p className="text-sm font-bold text-white/90 leading-tight pr-6">Monstera hydration protocol due</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-[1.5rem] flex items-start gap-4 hover:border-blue-500/30 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">PENDING</p>
                  <p className="text-sm font-bold text-white/90 leading-tight pr-6">Lux adjustment for Peace Lily</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-[1.5rem] flex items-start gap-4 hover:border-yellow-500/30 transition-colors group cursor-pointer sm:col-span-1">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">ACTIVE</p>
                  <p className="text-sm font-bold text-white/90 leading-tight pr-6">Nutrient injection required</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
              </div>

            </div>

            <div className="flex items-center justify-end gap-8">
              <button className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white/60 transition-colors">
                CLOSE COMMAND
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-white text-black px-8 py-4 rounded-[1rem] font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform"
              >
                FULL TERMINAL
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </main>
  );
}