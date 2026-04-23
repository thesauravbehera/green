import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Droplets, Sun, Wind, TrendingUp, Calendar, Bell } from 'lucide-react';

export const MobilePlantDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] pb-24">
      <div className="relative h-80">
        <img
          src="https://images.unsplash.com/photo-1545157142-f2b2ac57da5d/600x800"
          alt="Basil"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="text-3xl font-bold text-white mb-2">Basil</h1>
          <p className="text-white/70 italic">Ocimum basilicum</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Droplets, label: 'Water', value: 'Tomorrow' },
            { icon: Sun, label: 'Sun', value: 'Full Sun' },
            { icon: TrendingUp, label: 'Health', value: '95%' }
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-white font-bold text-sm mb-1">{stat.value}</p>
              <p className="text-white/60 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-white font-bold mb-3">Care Schedule</h3>
          <div className="space-y-3">
            {[
              { task: 'Water plant', time: 'Tomorrow, 10:00 AM', icon: Droplets },
              { task: 'Fertilize', time: 'In 5 days', icon: Calendar }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <item.icon className="w-5 h-5 text-cyan-400" />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item.task}</p>
                  <p className="text-white/60 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-primary rounded-2xl text-white font-semibold flex items-center justify-center gap-2">
          <Bell className="w-5 h-5" />
          Set Reminder
        </button>
      </div>
    </div>
  );
};
