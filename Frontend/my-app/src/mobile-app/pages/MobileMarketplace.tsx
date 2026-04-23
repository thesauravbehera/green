import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Search } from 'lucide-react';

export const MobileMarketplace = () => {
  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-4">Marketplace</h1>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
        />
      </div>
      <div className="text-center py-20">
        <ShoppingCart className="w-16 h-16 text-primary mx-auto mb-4" />
        <p className="text-white/60">Marketplace coming soon</p>
      </div>
    </div>
  );
};
