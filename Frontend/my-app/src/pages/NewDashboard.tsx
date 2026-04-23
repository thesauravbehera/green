import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Leaf, Bell, TrendingUp, Users, ShoppingCart, Calendar,
  Sparkles, Camera, MessageSquare, Cloud, Plus, Search,
  Award, Activity, Zap, Settings, ChevronRight, Droplets, Sun
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const NewDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const quickStats = [
    { label: 'Plants', value: '12', icon: Leaf, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Health', value: '85%', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Tasks', value: '5', icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Alerts', value: '3', icon: Bell, color: 'text-red-400', bg: 'bg-red-500/10' }
  ];

  const quickActions = [
    { icon: Camera, label: 'Scan', color: 'from-blue-500 to-cyan-500', action: '/ai-assistant' },
    { icon: Plus, label: 'Add Plant', color: 'from-green-500 to-emerald-500', action: '/my-garden' },
    { icon: Cloud, label: 'Weather', color: 'from-cyan-500 to-blue-500', action: '/analytics' },
    { icon: MessageSquare, label: 'Community', color: 'from-purple-500 to-pink-500', action: '/community' }
  ];

  const mainFeatures = [
    {
      title: 'My Garden',
      description: '12 plants growing',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-500',
      route: '/my-garden',
      stats: '85% avg health'
    },
    {
      title: 'Task Planner',
      description: '5 tasks pending',
      icon: Calendar,
      color: 'from-yellow-500 to-orange-500',
      route: '/planner',
      stats: '2 due today'
    },
    {
      title: 'AI Assistant',
      description: 'Smart recommendations',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      route: '/ai-assistant',
      stats: '24/7 available'
    },
    {
      title: 'Analytics',
      description: 'Growth insights',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      route: '/analytics',
      stats: '+12% this week'
    },
    {
      title: 'Marketplace',
      description: '1,200+ products',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      route: '/marketplace',
      stats: 'Free shipping'
    },
    {
      title: 'Community',
      description: 'Connect & share',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      route: '/community',
      stats: '45 followers'
    }
  ];

  const myPlants = [
    {
      name: 'Basil',
      health: 95,
      image: 'https://images.unsplash.com/photo-1545157142-f2b2ac57da5d/300x300',
      nextAction: 'Water today'
    },
    {
      name: 'Tomato',
      health: 88,
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa/300x300',
      nextAction: 'Prune tomorrow'
    },
    {
      name: 'Mint',
      health: 78,
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1/300x300',
      nextAction: 'Water urgent'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] px-4 pt-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/60 text-sm mb-1">{greeting} 🌿</p>
            <h1 className="text-2xl font-bold text-white">
              {currentUser?.displayName?.split(' ')[0] || 'Gardener'}
            </h1>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search plants, tasks..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-2 mb-6"
      >
        {quickStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-white font-bold text-sm">{stat.value}</p>
            <p className="text-white/60 text-xs">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => navigate(action.action)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center active:scale-95 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/80 text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* My Plants Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">My Plants</h2>
          <button
            onClick={() => navigate('/my-garden')}
            className="text-primary text-sm font-semibold flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {myPlants.map((plant, idx) => (
            <div
              key={idx}
              onClick={() => navigate('/my-garden/1')}
              className="flex-shrink-0 w-40 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden active:scale-95 transition-transform"
            >
              <div className="relative h-32">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
                <div className="absolute top-2 right-2">
                  <div className={`px-2 py-1 rounded-lg backdrop-blur-sm text-xs font-semibold ${
                    plant.health >= 90 ? 'bg-green-500/30 text-green-400' :
                    plant.health >= 75 ? 'bg-yellow-500/30 text-yellow-400' :
                    'bg-red-500/30 text-red-400'
                  }`}>
                    {plant.health}%
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white font-semibold mb-1">{plant.name}</p>
                <p className="text-white/60 text-xs flex items-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {plant.nextAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-lg font-bold text-white mb-4">Features</h2>
        <div className="grid grid-cols-2 gap-3">
          {mainFeatures.map((feature, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              onClick={() => navigate(feature.route)}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all active:scale-95 text-left"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-white/60 text-xs mb-2">{feature.description}</p>
              <p className="text-primary text-xs font-semibold">{feature.stats}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Today's Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/30"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Today's Gardening Tip</h3>
            <p className="text-white/80 text-sm">
              Morning is the best time to water your plants. This allows them to absorb moisture before the heat of the day.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
