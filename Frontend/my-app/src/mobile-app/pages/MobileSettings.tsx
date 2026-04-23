import React from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Globe, Moon, Lock, HelpCircle } from 'lucide-react';

export const MobileSettings = () => {
  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="space-y-2">
        {[
          { icon: Bell, label: 'Notifications' },
          { icon: Globe, label: 'Language' },
          { icon: Moon, label: 'Dark Mode' },
          { icon: Lock, label: 'Privacy' },
          { icon: HelpCircle, label: 'Help & Support' }
        ].map((item, idx) => (
          <button
            key={idx}
            className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
          >
            <item.icon className="w-5 h-5 text-white/60" />
            <span className="text-white font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
