import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Award, BarChart3, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const MobileProfile = () => {
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'Edit Profile', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: Award, label: 'Achievements', action: () => {} },
    { icon: BarChart3, label: 'Statistics', action: () => {} },
    { icon: LogOut, label: 'Logout', action: logout, danger: true }
  ];

  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-emerald-600 mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{currentUser?.displayName}</h1>
          <p className="text-white/60">{currentUser?.email}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Plants', value: '12' },
            { label: 'Tasks', value: '45' },
            { label: 'Badges', value: '8' }
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className={`w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 active:scale-98 transition-all ${
                item.danger ? 'border-red-500/30' : ''
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-400' : 'text-white/60'}`} />
              <span className={`flex-1 text-left font-semibold ${item.danger ? 'text-red-400' : 'text-white'}`}>
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
