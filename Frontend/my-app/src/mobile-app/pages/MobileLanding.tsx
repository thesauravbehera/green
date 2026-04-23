import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Leaf, Sparkles, Users, TrendingUp } from 'lucide-react';

export const MobileLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col justify-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mx-auto mb-8">
          <Leaf className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Welcome to<br />Bloomify
        </h1>
        <p className="text-white/60 text-center mb-12">
          Your smart balcony gardening companion powered by AI
        </p>

        <div className="space-y-4 mb-12">
          {[
            { icon: Sparkles, text: 'AI-powered plant care' },
            { icon: TrendingUp, text: 'Track growth & analytics' },
            { icon: Users, text: 'Join gardening community' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-white font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-4 bg-primary rounded-2xl text-white font-semibold active:scale-95 transition-transform"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-semibold active:scale-95 transition-transform"
          >
            Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
};
