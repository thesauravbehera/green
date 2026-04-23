import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Flower2, Sun, Droplet, Wind, ThermometerSun, Info, Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface PlantOfDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: {
    name: string;
    family: string;
    origin: string;
    difficulty: string;
    funFacts: string[];
    careBasics: {
      light: string;
      water: string;
      humidity: string;
      temperature: string;
    };
  };
}

export function PlantOfDayModal({ isOpen, onClose, plant }: PlantOfDayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#020617] border-white/10 text-white selection:bg-emerald-500">
        <DialogHeader className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <Flower2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold font-['Clash_Display'] uppercase tracking-tight">
                Plant of the Day
              </DialogTitle>
              <DialogDescription className="text-white/40 font-medium">
                Daily botanical protocol for urban resilience
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-['Clash_Display'] uppercase tracking-tighter text-white">{plant.name}</h3>
              <div className="flex items-center gap-4">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {plant.difficulty}
                </Badge>
                <p className="text-sm text-white/40 font-medium uppercase tracking-widest">{plant.family}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em]">
              <MapPin className="w-3 h-3" />
              <span>Native: {plant.origin}</span>
            </div>
          </div>

          {/* Plant Image */}
          <Card className="overflow-hidden border-white/5 bg-white/5 rounded-[2rem] aspect-video relative group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1757282101267-dc6667158dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwcGxhbnRzfGVufDF8fHx8MTc2MTUyMTU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={plant.name}
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
          </Card>

          {/* Care Basics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <Sun className="w-5 h-5 text-emerald-400 mb-3" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">LIGHT</p>
              <p className="text-xs font-bold leading-tight">{plant.careBasics.light}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <Droplet className="w-5 h-5 text-blue-400 mb-3" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">WATER</p>
              <p className="text-xs font-bold leading-tight">{plant.careBasics.water}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <Wind className="w-5 h-5 text-teal-400 mb-3" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">HUMIDITY</p>
              <p className="text-xs font-bold leading-tight">{plant.careBasics.humidity}</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
              <ThermometerSun className="w-5 h-5 text-red-400 mb-3" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">TEMP</p>
              <p className="text-xs font-bold leading-tight">{plant.careBasics.temperature}</p>
            </div>
          </div>

          {/* Fun Facts */}
          <Card className="p-10 bg-emerald-500/5 border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star className="w-20 h-20 text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-3 font-['Clash_Display'] uppercase tracking-tight">
              <Info className="w-5 h-5 text-emerald-400" />
              Botanical Intelligence
            </h4>
            <div className="grid gap-4 relative z-10">
              {plant.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-all">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/60 leading-relaxed font-medium">{fact}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform">
              Synchronize to Garden
            </Button>
            <Button variant="outline" className="flex-1 h-16 rounded-2xl border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5">
              Full Protocol
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
