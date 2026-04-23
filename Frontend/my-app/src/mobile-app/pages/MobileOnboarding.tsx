import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Leaf, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

export const MobileOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [spaceType, setSpaceType] = useState('');
  const [goals, setGoals] = useState<string[]>([]);

  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];
  const interestOptions = ['Herbs', 'Vegetables', 'Flowers', 'Succulents', 'Foliage', 'Fruits'];
  const spaceTypes = ['Sunny Balcony', 'Partial Shade', 'Shaded Area', 'Indoor Only'];
  const goalOptions = ['Grow Food', 'Beauty & Decor', 'Air Quality', 'Hobby & Relaxation'];

  const handleNext = () => {
    if (step === 1 && !experience) {
      toast.error('Please select your experience level');
      return;
    }
    if (step === 2 && interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }
    if (step === 3 && !spaceType) {
      toast.error('Please select your space type');
      return;
    }
    if (step === 4 && goals.length === 0) {
      toast.error('Please select at least one goal');
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      toast.success('Profile setup complete!');
      navigate('/dashboard');
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="flex-1 flex justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === step ? 'w-8 bg-primary' : i < step ? 'w-6 bg-primary/50' : 'w-6 bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="w-10" />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <Leaf className="w-16 h-16 text-primary mb-6" />
            <h1 className="text-3xl font-bold text-white mb-3">What's your experience level?</h1>
            <p className="text-white/60 mb-8">Help us personalize your journey</p>
            
            <div className="space-y-3 flex-1">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setExperience(level)}
                  className={`w-full p-4 rounded-2xl border transition-all ${
                    experience === level
                      ? 'bg-primary/10 border-primary'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <p className="text-white font-semibold text-left">{level}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold text-white mb-3">What interests you?</h1>
            <p className="text-white/60 mb-8">Select all that apply</p>
            
            <div className="grid grid-cols-2 gap-3 flex-1">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-2xl border transition-all relative ${
                    interests.includes(interest)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {interests.includes(interest) && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <p className="text-white font-semibold">{interest}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold text-white mb-3">What's your space like?</h1>
            <p className="text-white/60 mb-8">Choose your growing environment</p>
            
            <div className="space-y-3 flex-1">
              {spaceTypes.map((space) => (
                <button
                  key={space}
                  onClick={() => setSpaceType(space)}
                  className={`w-full p-4 rounded-2xl border transition-all ${
                    spaceType === space
                      ? 'bg-primary/10 border-primary'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <p className="text-white font-semibold text-left">{space}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold text-white mb-3">What are your goals?</h1>
            <p className="text-white/60 mb-8">Select all that apply</p>
            
            <div className="space-y-3 flex-1">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`w-full p-4 rounded-2xl border transition-all relative ${
                    goals.includes(goal)
                      ? 'bg-primary/10 border-primary'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {goals.includes(goal) && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <p className="text-white font-semibold text-left">{goal}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full py-4 bg-primary rounded-2xl text-white font-semibold flex items-center justify-center gap-2 mt-8 active:scale-95 transition-transform"
      >
        {step === 4 ? 'Complete Setup' : 'Continue'}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
