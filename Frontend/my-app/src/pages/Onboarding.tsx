import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Leaf, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('');

  const experienceLevels = [
    {
      id: 'Beginner',
      title: 'Beginner',
      desc: 'Just starting my plant journey',
      icon: <Leaf className="w-8 h-8 text-white" />,
      color: 'bg-emerald-500'
    },
    {
      id: 'Intermediate',
      title: 'Intermediate',
      desc: 'Growing a few plants already',
      icon: <Leaf className="w-8 h-8 text-white" />,
      color: 'bg-blue-500'
    },
    {
      id: 'Expert',
      title: 'Expert',
      desc: 'Experienced plant parent',
      icon: <Trophy className="w-8 h-8 text-white" />,
      color: 'bg-yellow-500'
    }
  ];

  const handleNext = () => {
    if (step === 1 && !experience) {
      toast.error('Please select your experience level');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-24 px-6 flex flex-col items-center selection:bg-emerald-500 selection:text-white font-['Inter']">
      
      {/* Title Area */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Welcome to Bloomify!
        </h1>
        <p className="text-xl text-gray-400">
          Let's personalize your gardening experience
        </p>
      </div>

      <div className="w-full max-w-4xl">
        {/* Progress header */}
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-gray-400 text-sm font-medium">Step 1 of 4</span>
          <button className="text-gray-400 text-sm font-medium hover:text-white transition-colors" onClick={() => navigate('/dashboard')}>
            Skip for now
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-blue-500 w-1/4 rounded-full" />
        </div>

        {/* Main Card */}
        <div className="bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-14 shadow-2xl relative">
          
          <h2 className="text-3xl font-bold text-white mb-2">
            What's your gardening experience?
          </h2>
          <p className="text-gray-400 mb-12">
            We'll customize recommendations based on your level
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {experienceLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setExperience(level.id)}
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all ${
                  experience === level.id
                    ? 'bg-white/10 border-white/40 ring-1 ring-white/20'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg ${level.color}`}>
                  {level.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{level.title}</h3>
                <p className="text-sm text-gray-400 text-center">{level.desc}</p>
              </button>
            ))}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <div className="flex gap-2">
              <div className="w-6 h-1.5 rounded-full bg-emerald-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>

            <button 
              onClick={handleNext}
              className="bg-[#0f172a] text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
