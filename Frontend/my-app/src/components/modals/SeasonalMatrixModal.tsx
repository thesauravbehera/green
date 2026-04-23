import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, CloudLightning, Sprout, ClipboardList } from "lucide-react";

interface SeasonalMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SeasonalMatrixModal({ isOpen, onClose }: SeasonalMatrixModalProps) {
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
          className="relative w-full max-w-xl bg-[#060B14] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden font-['Inter']"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white font-['Clash_Display'] uppercase">Seasonal Matrix</h2>
                <p className="text-sm text-white/50">Personalized cultivation schedule for Indian urban zones</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Location Card */}
          <div className="bg-[#0A101C] border border-white/5 rounded-[2rem] p-6 mb-8 flex justify-between items-center relative overflow-hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <CloudLightning className="w-48 h-48" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">GEOSPATIAL ZONE</p>
              <h3 className="text-2xl font-bold font-['Clash_Display'] text-white uppercase mb-1">ZONE 10: TROPICAL<br/>MONSOON</h3>
              <p className="text-xs font-medium text-white/50 uppercase tracking-widest">BENGALURU, KARNATAKA — OPTIMIZED</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform z-10">
              ACTIVE PROTOCOL
            </button>
          </div>

          {/* Timeline View */}
          <div className="bg-[#0A101C] border border-white/5 rounded-[2rem] p-8 relative">
            <div className="flex items-start justify-between mb-10">
              <div>
                <h4 className="text-4xl font-bold font-['Clash_Display'] text-white mb-3">OCT - DEC</h4>
                <div className="bg-emerald-500/20 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-emerald-500/30">
                  POST-MONSOON / EARLY WINTER
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <ThermometerIcon className="w-6 h-6 text-black" />
              </div>
            </div>

            <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-8 w-[200px] text-right ml-auto leading-relaxed">
              IDEAL FOR LEAFY GREENS IN INDIAN CLIMATE.
            </p>

            <div className="grid grid-cols-2 gap-8 relative">
              {/* Timeline Line */}
              <div className="absolute left-[50%] top-12 bottom-0 w-px bg-white/10" />

              {/* Columns Header */}
              <div className="flex items-center gap-2 text-emerald-500 mb-6">
                <Sprout className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">CULTIVATION ASSETS</span>
              </div>
              <div className="flex items-center gap-2 text-blue-500 mb-6 pl-4">
                <ClipboardList className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">MAINTENANCE LOGS</span>
              </div>

              {/* Row 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <LeafIcon className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-['Clash_Display']">CORIANDER<br/>(DHANIYA)</p>
                </div>
                <div className="absolute right-[-40px] text-[8px] font-black text-white/40 border border-white/10 rounded-full px-2 py-1 bg-[#060B14]">DIRECT SOW</div>
                <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center pl-8">
                <p className="text-xs font-medium text-white/70 leading-relaxed">Shield delicate plants from northern winds</p>
              </div>

              {/* Row 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative z-10 mt-8">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-['Clash_Display']">FENUGREEK<br/>(METHI)</p>
                </div>
                <div className="absolute right-[-40px] text-[8px] font-black text-white/40 border border-white/10 rounded-full px-2 py-1 bg-[#060B14]">DIRECT SOW</div>
                <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center pl-8 mt-16 relative">
                <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <p className="text-xs font-medium text-white/70 leading-relaxed">Monitor for aphids as temperatures drop</p>
              </div>

              {/* Row 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative z-10 mt-8">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <LeafIcon className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-['Clash_Display']">SPINACH<br/>(PALAK)</p>
                </div>
                <div className="absolute right-[-40px] text-[8px] font-black text-white/40 border border-white/10 rounded-full px-2 py-1 bg-[#060B14]">DIRECT SOW</div>
              </div>
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center pl-8 mt-16 relative">
                <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <p className="text-xs font-medium text-white/70 leading-relaxed">Introduce organic neem cake to soil</p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ThermometerIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <path d="M11.5 12V3.5" />
    </svg>
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
