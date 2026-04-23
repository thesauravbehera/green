import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Activity, Droplets, Calendar } from 'lucide-react';

export const MobileAnalytics = () => {
  const metrics = [
    { label: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Plant Health', value: '91%', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Water Usage', value: '2.1L', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white mb-4">Analytics</h1>
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric, idx) => (
            <div key={idx} className={`p-4 rounded-2xl ${metric.bg} border border-white/10`}>
              <metric.icon className={`w-5 h-5 ${metric.color} mb-2`} />
              <p className="text-white font-bold">{metric.value}</p>
              <p className="text-white/60 text-xs">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
          <BarChart3 className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-white/60">Interactive charts coming soon</p>
        </div>
      </motion.div>
    </div>
  );
};
