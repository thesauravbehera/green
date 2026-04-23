import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  ArrowRight, ArrowLeft, Check, Leaf, Sun, Droplets, 
  Wind, Home, Target, Sparkles, CheckCircle2, Crown
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Onboarding state
  const [onboardingData, setOnboardingData] = useState({
    experience: '',
    interests: [] as string[],
    balconyType: '',
    goals: [] as string[],
  });

  const experienceLevels = [
    {
      id: 'beginner',
      title: '🌱 Beginner',
      description: 'Just starting my plant journey',
      color: 'bg-green-500',
    },
    {
      id: 'intermediate',
      title: '🌿 Intermediate',
      description: 'Growing a few plants already',
      color: 'bg-blue-500',
    },
    {
      id: 'expert',
      title: '🏆 Expert',
      description: 'Experienced plant parent',
      color: 'bg-purple-500',
    },
  ];

  const interestOptions = [
    { id: 'herbs', label: 'Herbs & Vegetables', icon: '🌱' },
    { id: 'flowers', label: 'Flowering Plants', icon: '🌸' },
    { id: 'foliage', label: 'Foliage Plants', icon: '🍃' },
    { id: 'succulents', label: 'Succulents', icon: '🌵' },
    { id: 'indoor', label: 'Indoor Plants', icon: '🪴' },
    { id: 'medicinal', label: 'Medicinal Plants', icon: '💊' },
  ];

  const balconyTypes = [
    { id: 'sunny', icon: <Sun className="w-8 h-8" />, label: 'Sunny', description: '6+ hours direct sun' },
    { id: 'partial', icon: <Droplets className="w-8 h-8" />, label: 'Partial Shade', description: '3-6 hours sun' },
    { id: 'shaded', icon: <Wind className="w-8 h-8" />, label: 'Shaded', description: 'Mostly indirect light' },
    { id: 'indoor', icon: <Home className="w-8 h-8" />, label: 'Indoor', description: 'No direct sunlight' },
  ];

  const goalOptions = [
    { id: 'food', label: 'Grow my own food', icon: '🥗' },
    { id: 'beauty', label: 'Beautify my space', icon: '✨' },
    { id: 'air', label: 'Improve air quality', icon: '💨' },
    { id: 'hobby', label: 'Learn a new hobby', icon: '📚' },
    { id: 'stress', label: 'Reduce stress', icon: '🧘' },
    { id: 'community', label: 'Join a community', icon: '👥' },
  ];

  const handleSelect = (field: string, value: string) => {
    setOnboardingData({ ...onboardingData, [field]: value });
  };

  const toggleArrayItem = (field: 'interests' | 'goals', value: string) => {
    const array = onboardingData[field];
    if (array.includes(value)) {
      setOnboardingData({
        ...onboardingData,
        [field]: array.filter(item => item !== value),
      });
    } else {
      setOnboardingData({
        ...onboardingData,
        [field]: [...array, value],
      });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.experience !== '';
      case 2:
        return onboardingData.interests.length > 0;
      case 3:
        return onboardingData.balconyType !== '';
      case 4:
        return onboardingData.goals.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const user = JSON.parse(localStorage.getItem('bloomify_user') || '{}');
      localStorage.setItem('bloomify_user', JSON.stringify({
        ...user,
        onboardingComplete: true,
        preferences: onboardingData,
      }));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    const user = JSON.parse(localStorage.getItem('bloomify_user') || '{}');
    localStorage.setItem('bloomify_user', JSON.stringify({
      ...user,
      onboardingComplete: true,
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome to Bloomify!</h1>
          </div>
          <p className="text-white/60 text-lg">
            Let's personalize your gardening experience
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-sm">
              Step {currentStep} of {totalSteps}
            </span>
            <button
              onClick={handleSkip}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Skip for now
            </button>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Experience Level */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    What's your gardening experience?
                  </h2>
                  <p className="text-white/60">
                    We'll customize recommendations based on your level
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => handleSelect('experience', level.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-center ${
                        onboardingData.experience === level.id
                          ? 'border-primary bg-primary/10 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                      }`}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${level.color} flex items-center justify-center text-3xl`}>
                        {level.title.split(' ')[0]}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {level.title.split(' ')[1]}
                      </h3>
                      <p className="text-white/60 text-sm">{level.description}</p>
                      {onboardingData.experience === level.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-4"
                        >
                          <Badge className="bg-primary text-white border-0">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Selected
                          </Badge>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    What are you interested in growing?
                  </h2>
                  <p className="text-white/60">
                    Select all that apply
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleArrayItem('interests', interest.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        onboardingData.interests.includes(interest.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                      }`}
                    >
                      <div className="text-4xl mb-3">{interest.icon}</div>
                      <p className="text-white font-semibold">{interest.label}</p>
                      {onboardingData.interests.includes(interest.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Balcony Type */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    What type of space do you have?
                  </h2>
                  <p className="text-white/60">
                    This helps us recommend suitable plants
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {balconyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleSelect('balconyType', type.id)}
                      className={`p-8 rounded-xl border-2 transition-all ${
                        onboardingData.balconyType === type.id
                          ? 'border-primary bg-primary/10 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                          {type.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {type.label}
                          </h3>
                          <p className="text-white/60 text-sm">{type.description}</p>
                        </div>
                      </div>
                      {onboardingData.balconyType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Badge className="bg-primary text-white border-0">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Selected
                          </Badge>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Goals */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    What are your gardening goals?
                  </h2>
                  <p className="text-white/60">
                    Select all that resonate with you
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleArrayItem('goals', goal.id)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        onboardingData.goals.includes(goal.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
                      }`}
                    >
                      <div className="text-4xl mb-3">{goal.icon}</div>
                      <p className="text-white font-semibold text-sm">{goal.label}</p>
                      {onboardingData.goals.includes(goal.id) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Completion Message */}
                {onboardingData.goals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 rounded-xl bg-primary/10 border-2 border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2">
                          You're all set!
                        </h4>
                        <p className="text-white/80 mb-4">
                          We've personalized your experience based on your preferences. 
                          You can always update these settings in your profile.
                        </p>
                        <Badge className="bg-yellow-500 text-black border-0">
                          <Crown className="w-4 h-4 mr-1" />
                          Welcome to Bloomify!
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex items-center justify-between"
        >
          <Button
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx + 1 === currentStep
                    ? 'bg-primary w-8'
                    : idx + 1 < currentStep
                    ? 'bg-primary/50'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-primary hover:bg-primary/90 text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? (
              <>
                Complete
                <Check className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
