import React from 'react';
import { motion } from 'motion/react';
import { Users, Plus } from 'lucide-react';

export const MobileCommunity = () => {
  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Community</h1>
        <button className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="text-center py-20">
        <Users className="w-16 h-16 text-primary mx-auto mb-4" />
        <p className="text-white/60">Community features coming soon</p>
      </div>
    </div>
  );
};
