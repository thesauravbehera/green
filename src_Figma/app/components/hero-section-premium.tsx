import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Play, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function HeroSectionPremium() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Full-screen Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-white tracking-tight" style={{ fontFamily: "'Barlow', sans-serif" }}>
              AI-Powered Urban Gardening Platform
            </span>
          </motion.div>

          {/* Primary Headline - Two Lines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            {/* First Line - Barlow Bold */}
            <h1 
              className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-white mb-2 leading-none drop-shadow-2xl"
              style={{ 
                fontFamily: "'Barlow', sans-serif",
                letterSpacing: "-3px",
                fontWeight: 700
              }}
            >
              Platform that makes your
            </h1>
            
            {/* Second Line - Instrument Serif Italic */}
            <h1 
              className="text-[48px] md:text-[68px] lg:text-[84px] text-white leading-none italic drop-shadow-2xl"
              style={{ 
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400
              }}
            >
              balcony garden thrive
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
          >
            Smart gardening solutions for Urban Dwellers, Beginners and Green Enthusiasts
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <Button 
              size="lg"
              className="bg-white hover:bg-white/95 text-[#020617] px-10 py-7 rounded-full text-base font-semibold shadow-2xl hover:shadow-white/30 transition-all group hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Barlow', sans-serif" }}
              onClick={() => navigate(userLoggedIn ? "/dashboard" : "/signup")}
            >
              {userLoggedIn ? "Launch Dashboard" : "Start Growing Free"}
            </Button>

            {/* Secondary CTA - See How It Works */}
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/60 px-10 py-7 rounded-full text-base font-medium backdrop-blur-md transition-all group"
              style={{ fontFamily: "'Barlow', sans-serif" }}
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3 group-hover:bg-emerald-600 transition-colors">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              See How It Works
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: "10K+", label: "Urban Gardeners" },
              { value: "500+", label: "Plant Species" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-emerald-400/40 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <div 
                  className="text-3xl md:text-4xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm text-white/70"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-[#020617] flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading experience...</p>
          </div>
        </div>
      )}
    </section>
  );
}