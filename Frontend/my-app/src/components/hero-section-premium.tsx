import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

// FadeIn Component
const FadeIn = ({ children, delay = 0, duration = 1000, className = '' }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// AnimatedHeading Component
const AnimatedHeading = ({ text, className = '' }: { text: string; className?: string }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const lines = text.split('\n');
  const charDelay = 30; // ms
  const initialDelay = 200; // ms

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  let globalCharIndex = 0;

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {line.split('').map((char, charIndex) => {
            const currentGlobalIndex = globalCharIndex++;
            const delay = currentGlobalIndex * charDelay;
            const isSpace = char === ' ';

            return (
              <span
                key={charIndex}
                className="inline-block"
                style={{
                  opacity: startAnimation ? 1 : 0,
                  transform: startAnimation ? 'translateX(0)' : 'translateX(-18px)',
                  transition: `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`,
                }}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
};

export function HeroSectionPremium() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex flex-col font-sans overflow-hidden">
      {/* Full-screen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar overlay */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pt-6">
        <div className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-tight text-white">
            VEX
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white">
            <a href="#" className="hover:text-gray-300 transition-colors">Story</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Investing</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Building</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Advisory</a>
          </div>
          <div>
            <button 
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              onClick={() => navigate(userLoggedIn ? "/dashboard" : "/signup")}
            >
              Start a Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Content pushed to bottom */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex-1 flex flex-col justify-end">
        <div className="lg:grid lg:grid-cols-2 lg:items-end w-full">
          
          {/* Left Column */}
          <div className="mb-8 lg:mb-0">
            <AnimatedHeading
              text="Shaping tomorrow\nwith vision and action."
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
            />

            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => navigate(userLoggedIn ? "/dashboard" : "/signup")}
                >
                  Start a Chat
                </button>
                <button 
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Now
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}