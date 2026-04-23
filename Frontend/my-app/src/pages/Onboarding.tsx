import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Leaf, Trophy, ArrowRight, ArrowLeft, MapPin, Camera, Calendar as CalendarIcon, Upload, CheckCircle2, ScanLine } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // State for Step 1: Location
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // State for Step 2: Vision Scan
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for Step 3: Calendar
  const [calendarSynced, setCalendarSynced] = useState(false);

  const handleNext = () => {
    if (step === 1 && !location) {
      toast.error('Please detect or enter your location');
      return;
    }
    if (step === 2 && !imagePreview) {
      toast.error('Please upload a photo of your space');
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success('Onboarding complete! Welcome to Bloomify.');
      navigate('/dashboard');
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation('Mumbai, India (Balcony - High Humidity)');
      setIsLocating(false);
      toast.success('Micro-climate context fetched successfully');
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        startVisionScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const startVisionScan = () => {
    setIsScanning(true);
    // Simulate GSAP scanning line & AI analysis
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        lighting: 'Bright Indirect',
        space: 'Balcony Edge',
        recommendation: 'Monstera Deliciosa'
      });
      toast.success('Space analyzed successfully');
    }, 3000);
  };

  const syncCalendar = () => {
    setCalendarSynced(true);
    toast.success('Google Calendar synced successfully');
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-24 px-6 flex flex-col items-center selection:bg-emerald-500 selection:text-white font-['Inter']">
      
      {/* Title Area */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Verified Diagnostic
        </h1>
        <p className="text-xl text-gray-400">
          Let's calibrate your environment for optimal growth
        </p>
      </div>

      <div className="w-full max-w-4xl">
        {/* Progress header */}
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-gray-400 text-sm font-medium">Step {step} of 3</span>
          <button className="text-gray-400 text-sm font-medium hover:text-white transition-colors" onClick={() => navigate('/dashboard')}>
            Skip for now
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden flex">
          <div className={`h-full bg-emerald-500 transition-all duration-500 rounded-full`} style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {/* Main Card */}
        <div className="bg-[#0B0F19] border border-white/5 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Location & Micro-Climate */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <MapPin className="text-emerald-500" /> Location & Micro-Climate
                </h2>
                <p className="text-gray-400 mb-8">
                  We use your location to fetch precise weather, humidity, and photoperiod data.
                </p>

                <div className="bg-black/50 border border-white/10 rounded-2xl h-[300px] relative overflow-hidden flex flex-col items-center justify-center mb-8">
                  {/* Stylized Dark Map Background */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                    backgroundSize: '100px'
                  }} />
                  
                  {isLocating ? (
                    <div className="flex flex-col items-center relative z-10">
                      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-emerald-400 font-bold uppercase tracking-widest">Triangulating Coordinates...</p>
                    </div>
                  ) : location ? (
                    <div className="flex flex-col items-center relative z-10 bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-2xl backdrop-blur-md">
                      <MapPin className="w-12 h-12 text-emerald-400 mb-4" />
                      <p className="text-2xl font-bold text-white">{location}</p>
                      <p className="text-emerald-400 mt-2 font-mono">LAT: 19.0760° N | LNG: 72.8777° E</p>
                    </div>
                  ) : (
                    <Button onClick={detectLocation} className="relative z-10 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-6 rounded-2xl text-lg font-bold">
                      <MapPin className="w-6 h-6 mr-3" /> Detect My Location
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Vision Scan */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Camera className="text-emerald-500" /> The Vision Scan
                </h2>
                <p className="text-gray-400 mb-8">
                  Upload a photo of your space. Our AI will analyze lighting and furniture to recommend the perfect plant.
                </p>

                <div className="border-2 border-dashed border-white/20 rounded-3xl h-[400px] relative overflow-hidden flex flex-col items-center justify-center bg-black/30">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />

                  {!imagePreview ? (
                    <div className="text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-16 h-16 text-white/40 mx-auto mb-4 hover:text-emerald-400 transition-colors" />
                      <p className="text-white font-bold text-lg">Click to Upload Space Photo</p>
                      <p className="text-white/40 mt-2 text-sm">JPEG, PNG up to 10MB</p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img src={imagePreview} alt="Space" className="w-full h-full object-cover" />
                      
                      {/* Scanning Line Effect */}
                      {isScanning && (
                        <motion.div
                          initial={{ top: '0%' }}
                          animate={{ top: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_#10b981] z-20"
                        />
                      )}

                      {/* Scan Overlay */}
                      {isScanning && (
                        <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center backdrop-blur-sm">
                          <div className="flex items-center gap-3 bg-black/80 px-6 py-3 rounded-full border border-emerald-500/50">
                            <ScanLine className="w-5 h-5 text-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-bold tracking-widest uppercase">Analyzing Light & Shadows...</span>
                          </div>
                        </div>
                      )}

                      {/* Results Overlay */}
                      {scanResult && !isScanning && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-xl border border-emerald-500/30 p-6 rounded-2xl flex items-center justify-between"
                        >
                          <div>
                            <p className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-1">Analysis Complete</p>
                            <p className="text-white font-bold text-xl">{scanResult.lighting} Detected</p>
                            <p className="text-white/60">Recommended: {scanResult.recommendation}</p>
                          </div>
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Calendar Sync */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <CalendarIcon className="text-emerald-500" /> Sync With My Hustle
                </h2>
                <p className="text-gray-400 mb-12">
                  Connect your calendar so we schedule watering and care routines only when you are actually home.
                </p>

                <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">
                  <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                    <CalendarIcon className="w-12 h-12 text-blue-400" />
                  </div>
                  
                  {calendarSynced ? (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Calendar Synced Successfully!</h3>
                      <p className="text-emerald-400 font-medium">Your plant care routine is now optimized.</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Connect Google Calendar</h3>
                      <Button onClick={syncCalendar} className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-2xl text-lg font-bold">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-6 h-6 mr-3" />
                        Sync with Google
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-10 mt-10 border-t border-white/5">
            <button 
              onClick={() => step > 1 && setStep(step - 1)}
              className={`flex items-center gap-2 transition-colors ${step > 1 ? 'text-gray-400 hover:text-white' : 'text-transparent pointer-events-none'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === step ? 'w-6 bg-emerald-500' : 'bg-white/20'} transition-all`} />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="bg-[#0f172a] text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors"
            >
              {step === 3 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
