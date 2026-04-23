import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export function PremiumFinalCTA() {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[80vh] bg-[#020617] flex items-center justify-center overflow-hidden">
      {/* Full-Screen Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/60 to-[#020617]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span
              className="text-sm font-medium text-white"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Join 10,000+ Urban Gardeners
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-[40px] md:text-[56px] lg:text-[72px] font-light text-white mb-6 leading-tight"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Ready to transform your
          </h2>
          <h2
            className="text-[40px] md:text-[56px] lg:text-[72px] text-white leading-tight italic mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            balcony into paradise?
          </h2>

          {/* Description */}
          <p
            className="text-xl text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Start your gardening journey today with AI-powered guidance, expert community support, 
            and everything you need to grow thriving plants in any space.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/signup")}
              size="lg"
              className="bg-[#f8f8f8] hover:bg-white text-[#171717] px-12 py-7 text-lg font-semibold transition-colors group"
              style={{ 
                fontFamily: "'Barlow', sans-serif",
                borderRadius: "2px"
              }}
            >
              Begin Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => navigate("/community")}
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white px-12 py-7 text-lg font-medium transition-colors"
              style={{ 
                fontFamily: "'Barlow', sans-serif",
                borderRadius: "2px"
              }}
            >
              Join Community
            </Button>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/50"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "14px" }}>
                No credit card required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "14px" }}>
                Free forever plan
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "14px" }}>
                Cancel anytime
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Loading State */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-[#020617] flex items-center justify-center z-40">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}