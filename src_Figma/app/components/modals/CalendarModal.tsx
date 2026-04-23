import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Sprout, Sun, Leaf, CloudRain, Thermometer } from "lucide-react";
import { motion } from "motion/react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const months = [
    {
      name: "Oct - Dec",
      season: "Post-Monsoon / Early Winter",
      plantings: [
        { name: "Coriander (Dhaniya)", type: "Direct Sow", icon: Leaf, color: "text-emerald-400" },
        { name: "Fenugreek (Methi)", type: "Direct Sow", icon: Sprout, color: "text-green-400" },
        { name: "Spinach (Palak)", type: "Direct Sow", icon: Leaf, color: "text-teal-400" }
      ],
      tasks: [
        "Shield delicate plants from northern winds",
        "Monitor for aphids as temperatures drop",
        "Introduce organic neem cake to soil"
      ],
      alert: "Ideal for leafy greens in Indian climate."
    },
    {
      name: "Jan - Mar",
      season: "Peak Winter / Spring",
      plantings: [
        { name: "Tomatoes", type: "Transplant", icon: Sprout, color: "text-red-400" },
        { name: "Chillies", type: "Transplant", icon: Sprout, color: "text-green-500" },
        { name: "Rosemary", type: "Cuttings", icon: Leaf, color: "text-blue-400" }
      ],
      tasks: [
        "Mulch heavily to preserve moisture",
        "Prune Hibiscus for spring growth",
        "Transition to bi-weekly fertilization"
      ],
      alert: "Excellent light availability periods."
    },
    {
      name: "Apr - Jun",
      season: "Summer",
      plantings: [
        { name: "Mint (Pudina)", type: "Runner", icon: Leaf, color: "text-emerald-300" },
        { name: "Okra (Bhindi)", type: "Direct Sow", icon: Sprout, color: "text-green-600" }
      ],
      tasks: [
        "Deploy 50% Green Shade Netting",
        "Deep watering before 8:00 AM only",
        "Check for spider mites daily"
      ],
      alert: "High-stress thermal conditions."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#020617] border-white/10 text-white">
        <DialogHeader className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold font-['Clash_Display'] uppercase tracking-tight">
                Seasonal Matrix
              </DialogTitle>
              <DialogDescription className="text-white/40 font-medium">
                Personalized cultivation schedule for Indian urban zones
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Region Indicator */}
        <Card className="p-8 bg-emerald-500/5 border-emerald-500/20 rounded-[2rem] mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
             <CloudRain className="w-24 h-24" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em]">GEOSPATIAL ZONE</p>
              <h4 className="text-xl font-bold uppercase font-['Clash_Display']">Zone 10: Tropical Monsoon</h4>
              <p className="text-sm text-white/40 font-medium">BENGALURU, KARNATAKA — OPTIMIZED</p>
            </div>
            <Badge className="bg-white text-black font-black px-6 py-2 rounded-full uppercase text-[10px] tracking-widest border-none shadow-xl shadow-white/5">
              ACTIVE PROTOCOL
            </Badge>
          </div>
        </Card>

        {/* Monthly Calendar */}
        <div className="grid gap-8">
          {months.map((month, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-10 bg-white/5 border-white/5 hover:border-emerald-500/30 transition-all duration-700 rounded-[2.5rem] group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold font-['Clash_Display'] uppercase tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                      {month.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                        {month.season}
                      </Badge>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{month.alert}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                    <Thermometer className="w-8 h-8 text-emerald-400 group-hover:text-black" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* What to Plant */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em] flex items-center gap-3">
                      <Sprout className="w-4 h-4" />
                      CULTIVATION ASSETS
                    </h4>
                    <div className="grid gap-3">
                      {month.plantings.map((planting, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group/item hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${planting.color}`}>
                              <planting.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-tight">{planting.name}</span>
                          </div>
                          <Badge variant="outline" className="text-[9px] font-black border-white/10 text-white/40 rounded-lg px-2 py-1 uppercase tracking-widest">
                            {planting.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.3em] flex items-center gap-3">
                      <Calendar className="w-4 h-4" />
                      MAINTENANCE LOGS
                    </h4>
                    <div className="grid gap-3">
                      {month.tasks.map((task, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-white/60 font-medium leading-relaxed">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="p-10 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 border-white/5 rounded-[2.5rem] mt-10">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">BALCONY RESILIENCE ADVISORY</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            {[
              "Container thermodynamics: Pots heat faster than soil. Phase watering accordingly.",
              "Microclimate Mapping: Identify heat traps on south-facing balconies early.",
              "Hydration Timing: Pre-emptive saturation before 9:00 AM prevents root stress.",
              "Succession Logic: Deploy seeds every 14 days for infinite harvest yields."
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-white/60 font-medium leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
