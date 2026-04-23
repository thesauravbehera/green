import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Sparkles, Search, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function PremiumCapabilitiesSection() {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[700px] bg-black py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4"
            type="video/mp4"
          />
        </video>
        {/* Top fade gradient */}
        <div 
          className="absolute top-0 left-0 right-0 z-[1] h-[200px]"
          style={{ background: 'linear-gradient(to bottom, black, transparent)' }}
        />
        {/* Bottom fade gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1] h-[200px]"
          style={{ background: 'linear-gradient(to top, black, transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center min-h-[500px] flex flex-col items-center justify-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="liquid-glass rounded-full px-4 py-2 text-xs font-medium text-white inline-block mb-8"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          How It Works
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl italic text-white tracking-tight leading-[0.9] mb-8"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          You dream it. We grow it.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base font-light text-white/60 max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Share your balcony vision. Our AI handles the rest—plant selection, care schedules, 
          problem diagnosis, community support. All in days, not months.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => navigate("/signup")}
            className="liquid-glass-strong text-white px-10 py-6 text-base font-medium transition-colors rounded-full hover:bg-white/10 border-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Explore Features
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Loading...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}