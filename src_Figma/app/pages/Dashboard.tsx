import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sprout, Droplets, Sun, Trophy, Zap, TrendingUp, Calendar, Award, Target, Sparkles, ChevronRight, ArrowUpRight, CheckCircle2, Star, CloudRain } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const [stats] = useState({
    plantsOwned: 12,
    plantsHealthy: 9,
    wateringStreak: 7,
    level: 15,
    xp: 3450,
    xpToNextLevel: 5000,
    greenPoints: 18750,
    achievements: 24,
    tasksToday: 5,
    tasksCompleted: 3
  });

  const [todayTasks] = useState([
    { id: 1, title: 'Water Monstera Complex', reward: 50, completed: true },
    { id: 2, title: 'Analyze Substrate Moisture', reward: 30, completed: true },
    { id: 3, title: 'Apply Nutrient Injection #04', reward: 75, completed: true },
    { id: 4, title: 'Check Monsoon Drainage', reward: 40, completed: false },
    { id: 5, title: 'Calibrate Solar Exposure', reward: 35, completed: false }
  ]);

  const [recentActivity] = useState([
    { action: 'PROTOCOL INITIATED:', plant: 'TULSI UNIT 01', time: '02:00H AGO', xp: 50 },
    { action: 'NUTRIENT SYNC:', plant: 'SNAKE PLANT ALPHA', time: '05:00H AGO', xp: 75 },
    { action: 'MONSOON ALERT:', plant: 'EXCESSIVE HUMIDITY DETECTED', time: '24:00H AGO', xp: 100 },
    { action: 'HYDRATION LOGGED:', plant: 'ALOE UNIT 1', time: '24:00H AGO', xp: 50 }
  ]);

  const plantModels = [
    { url: 'https://sketchfab.com/models/dac370ad6c49465c8613979514beb4f5/embed', name: 'BIO-UNIT 01', health: 95 },
    { url: 'https://sketchfab.com/models/70679a304b324ca8941c214875acf6a9/embed', name: 'SUCCULENT ALPHA', health: 88 },
    { url: 'https://sketchfab.com/models/7c5e77d572c848458e5d898ac49f6f27/embed', name: 'INDOOR BOTANICAL', health: 92 }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 px-6 selection:bg-emerald-500 selection:text-white font-['Inter']">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-3">COMMAND TERMINAL v4.0</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter font-['Clash_Display'] leading-none">
              {t('welcome')}, <span className="text-premium uppercase">{currentUser?.displayName?.split(' ')[0] || 'COLLECTOR'}</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-[2rem] p-5 pr-8 shadow-2xl backdrop-blur-3xl"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CloudRain className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">LOCAL CLIMATE</p>
              <p className="text-2xl font-bold tracking-tight font-['Clash_Display'] text-emerald-400 uppercase">Pre-Monsoon</p>
            </div>
          </motion.div>
        </div>

        {/* Tactical Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <TacticalStat icon={<Sprout className="text-emerald-400" />} label={t('bio_units')} value={stats.plantsOwned} sub="98% UPTIME" />
          <TacticalStat icon={<Droplets className="text-blue-400" />} label={t('streak')} value={stats.wateringStreak} sub="OPTIMAL FLOW" />
          <TacticalStat icon={<Zap className="text-yellow-400" />} label="BIO-POINTS" value={stats.greenPoints.toLocaleString()} sub="+240 TODAY" />
          <TacticalStat icon={<Award className="text-purple-400" />} label="MASTERY" value={stats.level} sub="RANK: S-CLASS" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Console */}
          <div className="lg:col-span-2 space-y-12">
            {/* Active Protocols */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight uppercase font-['Clash_Display']">Active Protocols</h2>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                  {stats.tasksCompleted} / {stats.tasksToday} SYNCHRONIZED
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {todayTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ x: 8 }}
                    className={`group flex items-center gap-6 p-6 rounded-[2rem] border transition-all ${
                      task.completed 
                        ? "bg-white/5 border-emerald-500/20 opacity-40" 
                        : "bg-white/[0.02] border-white/10 hover:border-emerald-500/40 hover:bg-white/5"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                      task.completed ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-white/20"
                    }`}>
                      {task.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                    <span className={`flex-1 font-bold text-lg tracking-tight uppercase ${task.completed ? "line-through text-white/40" : "text-white/80"}`}>
                      {task.title}
                    </span>
                    <Badge className="bg-white/5 text-emerald-400 border-0 font-black text-xs">+{task.reward} XP</Badge>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Botanical Visualizer */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight uppercase font-['Clash_Display']">Botanical Visualizer</h2>
                <Button variant="ghost" className="text-[10px] font-black tracking-[0.2em] uppercase hover:bg-emerald-500/10 text-emerald-400 group">
                  EXPAND NEXUS <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plantModels.map((plant, idx) => (
                  <div key={idx} className="group relative">
                    <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 relative glass-hover">
                      <iframe
                        src={plant.url}
                        className="w-full h-full grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                        frameBorder="0"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-[10px] font-black text-emerald-500 tracking-[0.3em] mb-2 uppercase">UNIT ID: {idx + 104}</p>
                        <p className="text-lg font-bold tracking-tighter mb-4 font-['Clash_Display']">{plant.name}</p>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${plant.health}%` }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Side Console */}
          <div className="space-y-12">
            {/* Mastery Progress */}
            <Card className="glass p-10 rounded-[3rem] border-white/10 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all" />
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                  <StarIcon className="w-8 h-8 text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">CURRENT RANK</p>
                  <p className="text-3xl font-bold font-['Clash_Display']">LEVEL {stats.level}</p>
                </div>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>BIO-EXPERIENCE</span>
                  <span>{stats.xp} / {stats.xpToNextLevel}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.xp / stats.xpToNextLevel) * 100}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>
              
              <Button className="w-full py-8 rounded-[1.5rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5">
                SYNCHRONIZE DAILY
              </Button>
            </Card>

            {/* Neural Log */}
            <section>
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-8">NEURAL ACTIVITY LOG</h3>
              <div className="space-y-8 pl-4">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex gap-6 group relative">
                    <div className="w-px bg-emerald-500/20 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                    <div className="pb-8">
                      <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest mb-2">{item.time}</p>
                      <p className="font-bold text-sm tracking-tight mb-1 text-white/90">{item.action}</p>
                      <p className="text-xs font-medium text-white/40 uppercase tracking-tighter">{item.plant}</p>
                      <div className="mt-2 text-[10px] font-black text-emerald-400">+{item.xp} XP LOGGED</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function TacticalStat({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string | number, sub: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-8 rounded-[2.5rem] border-white/5 group transition-all duration-500 hover:bg-white/5"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/30 transition-all">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold tracking-tighter font-['Clash_Display']">{value}</span>
        <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">{sub}</span>
      </div>
    </motion.div>
  );
}

function StarIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}