import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Droplets, Sun, Trophy, ChevronUp, ChevronDown, Zap, Heart, AlertCircle, TrendingUp, ArrowUpRight, Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

export function FloatingUserStation() {
  const { currentUser, userLoggedIn } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const [stats] = useState({
    level: 15,
    xp: 3450,
    xpToNext: 5000,
    greenPoints: 18750,
    healthyPlants: 9,
    totalPlants: 12,
    wateringDue: 3,
    overallHealth: 87
  });

  const [urgentTasks] = useState([
    { icon: Droplets, text: 'Monstera hydration protocol due', status: 'URGENT' },
    { icon: Sun, text: 'Lux adjustment for Peace Lily', status: 'PENDING' },
    { icon: AlertCircle, text: 'Nutrient injection required', status: 'ACTIVE' }
  ]);

  if (!userLoggedIn) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="container mx-auto px-6 pb-6 pointer-events-auto">
        <motion.div
          layout
          className="glass-strong rounded-[2rem] border-white/20 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Collapsed View */}
          <div className="p-5">
            <div className="flex items-center gap-6">
              {/* User Avatar & Level */}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-white/20 overflow-hidden">
                  <span className="text-black font-black text-xl">{currentUser?.displayName?.charAt(0) || 'B'}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-black text-[10px] font-black flex items-center justify-center rounded-lg border-2 border-black">
                  {stats.level}
                </div>
              </div>

              {/* Quick Summary Stats */}
              <div className="flex-1 flex items-center gap-8">
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Health Index</p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{stats.overallHealth}%</span>
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${stats.overallHealth}%` }} className="h-full bg-white" />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-white/10" />

                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Active Bio-Units</p>
                  <p className="font-bold uppercase tracking-tighter">
                    {stats.healthyPlants} <span className="text-white/30">/ {stats.totalPlants}</span>
                  </p>
                </div>

                <div className="hidden lg:block w-px h-8 bg-white/10" />

                <div className="hidden lg:block">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Protocol Status</p>
                  <p className="font-bold text-xs uppercase tracking-tight text-white/60">
                    {stats.wateringDue} Systems Requiring Interaction
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all"
                >
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </Button>
                <Button className="h-12 px-6 rounded-2xl bg-white text-black font-bold uppercase text-xs tracking-widest">
                  Quick Log
                </Button>
              </div>
            </div>
          </div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10"
              >
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Stats Column */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Metric Analysis</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-white/30 mb-1 uppercase">XP PROGRESS</p>
                        <p className="text-xl font-bold mb-2">{Math.round((stats.xp / stats.xpToNext) * 100)}%</p>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white w-2/3" />
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-white/30 mb-1 uppercase">GREEN POINTS</p>
                        <p className="text-xl font-bold">{stats.greenPoints.toLocaleString()}</p>
                        <p className="text-[10px] font-black text-green-400 mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> +250 TODAY
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tasks Column */}
                  <div className="lg:col-span-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Interaction Protocol</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {urgentTasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/5 transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <task.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{task.status}</p>
                            <p className="text-sm font-bold leading-tight">{task.text}</p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="px-8 pb-8 flex justify-end gap-3">
                   <Button variant="ghost" onClick={() => setIsExpanded(false)} className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white">
                     Close Command
                   </Button>
                   <Button className="h-12 px-10 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em]">
                     Full Terminal
                   </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
