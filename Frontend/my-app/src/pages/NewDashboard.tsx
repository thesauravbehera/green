import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Leaf, Bell, TrendingUp, Users, ShoppingCart, Activity, Shield,
  Zap, Cloud, Calendar, Sparkles, Settings, BarChart3, Camera,
  MessageSquare, Award, Database, Cpu, Globe, Lock
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
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

  // Main feature sections based on the overview
  const mainFeatures = [
    {
      id: 'frontend',
      title: 'My Garden',
      description: 'View and manage your plants',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-500',
      route: '/my-garden',
      stats: { label: '12 Plants', value: '85% Health' }
    },
    {
      id: 'realtime',
      title: 'Notifications',
      description: 'Alerts and reminders',
      icon: Bell,
      color: 'from-blue-500 to-cyan-500',
      route: '/notifications',
      stats: { label: '3 New', value: '12 Total' }
    },
    {
      id: 'community',
      title: 'Community',
      description: 'Connect with gardeners',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      route: '/community',
      stats: { label: '234 Posts', value: '45 Followers' }
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      description: 'Shop plants & supplies',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      route: '/marketplace',
      stats: { label: '1,200+ Items', value: 'Free Shipping' }
    },
    {
      id: 'visualization',
      title: 'Analytics',
      description: 'Growth metrics & insights',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500',
      route: '/analytics',
      stats: { label: '7 Days Data', value: '+12% Growth' }
    },
    {
      id: 'growth',
      title: 'Task Planner',
      description: 'Schedule & reminders',
      icon: Calendar,
      color: 'from-yellow-500 to-orange-500',
      route: '/planner',
      stats: { label: '5 Tasks', value: '2 Due Today' }
    },
    {
      id: 'ai',
      title: 'AI Assistant',
      description: 'Plant care recommendations',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      route: '/ai-assistant',
      stats: { label: 'Smart Tips', value: 'Personalized' }
    },
    {
      id: 'gamification',
      title: 'Achievements',
      description: 'Badges & leaderboard',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      route: '/achievements',
      stats: { label: '8 Badges', value: 'Level 5' }
    }
  ];

  // Quick action cards
  const quickActions = [
    {
      title: 'Scan Plant',
      description: 'Identify species with AI',
      icon: Camera,
      action: () => navigate('/scanner'),
      color: 'bg-blue-500'
    },
    {
      title: 'Add Plant',
      description: 'Add to your garden',
      icon: Leaf,
      action: () => navigate('/my-garden/add'),
      color: 'bg-green-500'
    },
    {
      title: 'Weather',
      description: 'Check forecast',
      icon: Cloud,
      action: () => navigate('/weather'),
      color: 'bg-cyan-500'
    },
    {
      title: 'Post Update',
      description: 'Share with community',
      icon: MessageSquare,
      action: () => navigate('/community/post'),
      color: 'bg-purple-500'
    }
  ];

  // System health indicators
  const systemStatus = [
    { label: 'Performance', value: 98, icon: Zap, color: 'text-yellow-400' },
    { label: 'Security', value: 100, icon: Shield, color: 'text-green-400' },
    { label: 'Uptime', value: 99.9, icon: Activity, color: 'text-blue-400' },
    { label: 'Database', value: 95, icon: Database, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {greeting}, {currentUser?.displayName?.split(' ')[0] || 'Gardener'}! 🌿
              </h1>
              <p className="text-white/60 text-lg">
                Your complete smart gardening ecosystem
              </p>
            </div>
            <Button
              onClick={() => navigate('/settings')}
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
          </div>

          {/* System Status Bar */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {systemStatus.map((status, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${status.color}`}>
                    <status.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider">{status.label}</p>
                    <p className="text-white font-bold text-lg">{status.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-white/60 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" />
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ y: -8 }}
                className="cursor-pointer"
                onClick={() => navigate(feature.route)}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all h-full">
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="text-white/40 text-xs">{feature.stats.label}</p>
                        <p className="text-white font-semibold text-sm">{feature.stats.value}</p>
                      </div>
                      <Badge className="bg-white/10 text-white border-0">
                        View →
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Infrastructure Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-blue-400" />
            System Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Backend Systems',
                description: 'Node.js, RESTful APIs, GraphQL',
                icon: Database,
                items: ['Server Architecture', 'Database Modeling', 'API Integration']
              },
              {
                title: 'Security & Auth',
                description: 'Token-based, encryption, MFA',
                icon: Lock,
                items: ['Authentication Flow', 'Data Protection', 'Access Control']
              },
              {
                title: 'Performance',
                description: 'Optimized, cached, monitored',
                icon: Zap,
                items: ['Asset Loading', 'Server Efficiency', 'CDN Usage']
              }
            ].map((section, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{section.title}</h3>
                    <p className="text-white/60 text-sm">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
