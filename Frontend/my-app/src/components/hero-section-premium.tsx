import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Play, ArrowUpRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export function HeroSectionPremium() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex flex-col font-sans overflow-hidden bg-[#020617]">
      {/* Full-screen Video Background without overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
          type="video/mp4"
        />
      </video>

      {/* Floating Navigation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[16px] px-6 py-4 flex items-center justify-between z-50 shadow-2xl"
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
           <Leaf className="w-6 h-6 text-white drop-shadow-md" />
           <span className="text-xl font-bold text-white font-['Barlow'] tracking-tight drop-shadow-md">Bloomify</span>
        </div>
        <div className="hidden md:flex gap-8 text-[14px] text-white font-['Barlow'] font-medium drop-shadow-md">
           <button onClick={() => navigate('/dashboard')} className="hover:text-emerald-300 transition-colors drop-shadow-md">Dashboard</button>
           <button onClick={() => navigate('/my-garden')} className="hover:text-emerald-300 transition-colors drop-shadow-md">My Garden</button>
           <button onClick={() => navigate('/ai-assistant')} className="hover:text-emerald-300 transition-colors drop-shadow-md">AI Assistant</button>
           <button onClick={() => navigate('/community')} className="hover:text-emerald-300 transition-colors drop-shadow-md">Community</button>
        </div>
        <button 
          className="bg-[#222] text-white px-5 py-2.5 rounded-full text-sm font-['Barlow'] font-medium flex items-center gap-3 hover:bg-black transition-colors shadow-lg"
          onClick={() => navigate(userLoggedIn ? '/dashboard' : '/signup')}
        >
           Start your Garden
           <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
             <ArrowUpRight className="w-3 h-3 text-white" />
           </div>
        </button>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-20">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center drop-shadow-2xl"
        >
          <span className="font-['Barlow'] font-bold text-white tracking-[-2px] md:tracking-[-4px] text-5xl md:text-6xl lg:text-7xl mb-2 drop-shadow-2xl">
            Platform that makes your
          </span>
          <span className="font-['Instrument_Serif'] italic text-white text-6xl md:text-[84px] leading-[1.1] drop-shadow-2xl">
            balcony garden thrive
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-['Barlow'] font-medium text-[18px] text-white/90 mt-6 mb-10 max-w-2xl drop-shadow-lg"
        >
          Smart plant care for Urban Gardeners, Beginners and Experts
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="bg-white text-black px-8 py-4 rounded-full font-['Barlow'] font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl"
          onClick={() => navigate(userLoggedIn ? '/dashboard' : '/onboarding')}
        >
          <Play className="w-5 h-5 fill-black text-black" />
          See the App Action
        </motion.button>
      </div>
    </section>
  );
}