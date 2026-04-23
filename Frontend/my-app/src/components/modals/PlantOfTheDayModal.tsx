import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Sun, Droplets, Wind, ThermometerSun } from "lucide-react";

interface PlantOfTheDayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlantOfTheDayModal({ isOpen, onClose }: PlantOfTheDayModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#060B14] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden font-['Inter']"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <LeafIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-['Clash_Display'] uppercase">Plant of the Day</h2>
                <p className="text-sm text-white/50">Daily botanical protocol for urban resilience</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plant Name & Details */}
          <div className="mb-8">
            <h1 className="text-7xl font-bold tracking-tighter text-white font-['Clash_Display'] uppercase mb-4">
              BASIL
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-1.5 rounded-full border border-emerald-500 text-emerald-500 text-xs font-bold uppercase tracking-widest bg-emerald-500/10">
                BEGINNER
              </div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
                LAMIACEAE <br/>(MINT FAMILY)
              </p>
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest ml-auto">
                <MapPin className="w-4 h-4" />
                <span>NATIVE: TROPICAL REGIONS OF<br/>ASIA AND AFRICA</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-8 relative border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1621256038479-7f99ff9f0a52?w=1200&q=80" 
              alt="Basil Plant"
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-transparent to-transparent" />
          </div>

          {/* Protocol Cards */}
          <div className="grid grid-cols-4 gap-4">
            
            <div className="bg-[#0A101C] border border-white/5 rounded-[1.5rem] p-5 flex flex-col items-start gap-4">
              <Sun className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">LIGHT</p>
                <p className="text-xs font-bold text-white/90 leading-relaxed">4-6 hours of sunlight, can tolerate partial shade</p>
              </div>
            </div>

            <div className="bg-[#0A101C] border border-white/5 rounded-[1.5rem] p-5 flex flex-col items-start gap-4">
              <Droplets className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">WATER</p>
                <p className="text-xs font-bold text-white/90 leading-relaxed">Keep soil moist but not waterlogged, water when top inch is dry</p>
              </div>
            </div>

            <div className="bg-[#0A101C] border border-white/5 rounded-[1.5rem] p-5 flex flex-col items-start gap-4">
              <Wind className="w-6 h-6 text-teal-400" />
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">HUMIDITY</p>
                <p className="text-xs font-bold text-white/90 leading-relaxed">50-70% - enjoys moderate to high humidity</p>
              </div>
            </div>

            <div className="bg-[#0A101C] border border-white/5 rounded-[1.5rem] p-5 flex flex-col items-start gap-4">
              <ThermometerSun className="w-6 h-6 text-rose-400" />
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">TEMP</p>
                <p className="text-xs font-bold text-white/90 leading-relaxed">70-85°F (21-29°C) - very heat sensitive</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function LeafIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
