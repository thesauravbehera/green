import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Plus, Search, Filter, Droplets, Sun, Wind, AlertCircle,
  CheckCircle2, Clock, TrendingUp, ChevronRight
} from 'lucide-react';

export const MyGarden = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const plants = [
    {
      id: 1,
      name: 'Basil',
      species: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1545157142-f2b2ac57da5d/400x400',
      health: 95,
      status: 'Thriving',
      lastWatered: '2 hours ago',
      nextWatering: 'Tomorrow',
      sunlight: 'Full Sun',
      location: 'Balcony North',
      daysGrowing: 45
    },
    {
      id: 2,
      name: 'Tomato',
      species: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa/400x400',
      health: 88,
      status: 'Healthy',
      lastWatered: '1 day ago',
      nextWatering: 'Today',
      sunlight: 'Full Sun',
      location: 'Balcony South',
      daysGrowing: 62
    },
    {
      id: 3,
      name: 'Mint',
      species: 'Mentha',
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1/400x400',
      health: 78,
      status: 'Needs Attention',
      lastWatered: '3 days ago',
      nextWatering: 'Overdue',
      sunlight: 'Partial Shade',
      location: 'Kitchen Window',
      daysGrowing: 30
    },
    {
      id: 4,
      name: 'Lavender',
      species: 'Lavandula',
      image: 'https://images.unsplash.com/photo-1611251185555-272e6392838e/400x400',
      health: 92,
      status: 'Thriving',
      lastWatered: '1 day ago',
      nextWatering: 'In 2 days',
      sunlight: 'Full Sun',
      location: 'Balcony East',
      daysGrowing: 90
    }
  ];

  const stats = [
    { label: 'Total', value: plants.length, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Healthy', value: plants.filter(p => p.health >= 85).length, icon: CheckCircle2, color: 'text-blue-400' },
    { label: 'Need Water', value: 2, icon: Droplets, color: 'text-cyan-400' },
    { label: 'Tasks', value: 5, icon: Clock, color: 'text-yellow-400' }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (health >= 75) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getStatusIcon = (health: number) => {
    if (health >= 90) return CheckCircle2;
    if (health >= 75) return Clock;
    return AlertCircle;
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">My Garden</h1>
            <p className="text-white/60 text-sm">{plants.length} plants growing</p>
          </div>
          <button
            onClick={() => navigate('/my-garden/add')}
            className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your plants..."
            className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
          />
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
              <p className="text-white font-bold text-sm">{stat.value}</p>
              <p className="text-white/60 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Plants Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {plants.map((plant, idx) => {
          const StatusIcon = getStatusIcon(plant.health);
          return (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => navigate(`/my-garden/${plant.id}`)}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden active:scale-98 transition-transform"
            >
              {/* Plant Image Header */}
              <div className="relative h-48">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                
                {/* Health Badge */}
                <div className="absolute top-3 left-3">
                  <div className={`px-3 py-1.5 rounded-xl backdrop-blur-sm border font-semibold text-sm flex items-center gap-1 ${getHealthColor(plant.health)}`}>
                    <StatusIcon className="w-4 h-4" />
                    {plant.health}%
                  </div>
                </div>

                {/* Plant Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white mb-1">{plant.name}</h3>
                  <p className="text-white/70 text-sm italic">{plant.species}</p>
                </div>
              </div>

              {/* Plant Info */}
              <div className="p-4">
                {/* Status Indicators */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Next Water</p>
                      <p className={`text-sm font-semibold ${plant.nextWatering === 'Overdue' ? 'text-red-400' : 'text-white'}`}>
                        {plant.nextWatering}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <Sun className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">Sunlight</p>
                      <p className="text-white text-sm font-semibold">{plant.sunlight}</p>
                    </div>
                  </div>
                </div>

                {/* Location & Days */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Wind className="w-4 h-4" />
                    {plant.location}
                  </div>
                  <div className="text-white/60 text-sm">
                    Day {plant.daysGrowing}
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl text-primary font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {plants.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Plants Yet</h3>
          <p className="text-white/60 mb-6">
            Add your first plant to start your garden journey
          </p>
          <button className="px-6 py-3 bg-primary rounded-2xl text-white font-semibold active:scale-95 transition-transform">
            Add Your First Plant
          </button>
        </motion.div>
      )}
    </div>
  );
};
