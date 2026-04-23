import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, ArrowRight, Leaf, Camera, Calendar } from "lucide-react";

export function PremiumFeaturesShowcase() {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const features = [
    {
      icon: Sparkles,
      tag: "AI-Powered",
      title: "Smart Plant Selection",
      description: "Transform complex plant selection into clear insights and confident decision-making.",
      action: () => navigate("/plants"),
    },
    {
      icon: Camera,
      tag: "Plant Doctor",
      title: "Health Diagnosis",
      description: "Analyze plant health, identify issues, and get treatment recommendations instantly.",
      action: () => navigate("/dashboard"),
    },
    {
      icon: Calendar,
      tag: "Seasonal Guide",
      title: "Planting Calendar",
      description: "Month-by-month planting guides tailored to your climate and balcony conditions.",
      action: () => navigate("/planner"),
    },
  ];

  return (
    <section className="relative min-h-[1000px] bg-black py-32 overflow-hidden">
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute top-[20%] w-full h-auto object-contain z-0"
          poster="/images/hero_bg.jpeg"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
        {/* Light darkening overlay */}
        <div className="absolute inset-0 bg-black/5 z-0" />
        {/* Bottom gradient fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-[1] h-[300px]"
          style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-[250px]">
        {/* Featured Badge - Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center liquid-glass rounded-full px-6 py-3">
            <div className="px-4 py-1.5 bg-white text-black rounded-full mr-3 text-xs font-medium"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              New
            </div>
            <span 
              className="text-sm font-light text-white/90"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Introducing AI-powered balcony gardening
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-6xl mx-auto"
        >
          <h2
            className="text-6xl md:text-7xl lg:text-[5.5rem] italic text-white leading-[0.9] tracking-[-4px] mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The platform your garden deserves
          </h2>
          <p
            className="text-base font-light text-white/60 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Stunning insights. Smart recommendations. Powered by AI, refined by expert gardeners. 
            This is balcony gardening, wildly reimagined.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mb-32"
        >
          <Button
            onClick={() => navigate("/signup")}
            className="liquid-glass-strong text-white px-10 py-6 text-base font-medium transition-colors rounded-full hover:bg-white/10 border-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Start Growing Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer liquid-glass rounded-2xl p-8 hover:bg-white/5 transition-all"
              onClick={feature.action}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-[7px] h-[7px] bg-white" />
              <div className="absolute top-0 right-0 w-[7px] h-[7px] bg-white" />
              <div className="absolute bottom-0 left-0 w-[7px] h-[7px] bg-white" />
              <div className="absolute bottom-0 right-0 w-[7px] h-[7px] bg-white" />

              {/* Icon in liquid glass circle */}
              <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="mb-4">
                <span
                  className="text-xs font-medium text-white/60 uppercase tracking-wider"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {feature.tag}
                </span>
              </div>

              <h3
                className="text-2xl italic text-white mb-4 tracking-tight leading-[0.9]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {feature.title}
              </h3>

              <p
                className="text-white/60 font-light text-sm leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 text-center"
        >
          <div className="liquid-glass rounded-full px-4 py-2 text-xs font-medium text-white inline-block mb-8"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Trusted by gardeners worldwide
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["10K+ Users", "500+ Plants", "95% Success", "24/7 Support", "Expert Community"].map((partner) => (
              <span
                key={partner}
                className="text-2xl md:text-3xl italic text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-white/60 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Loading experience...
            </p>
          </div>
        </div>
      )}
    </section>
  );
}