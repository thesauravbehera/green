import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell, Droplets, AlertTriangle, MessageSquare, Award,
  ShoppingCart, Sun, Clock, CheckCircle2, Filter, Settings
} from 'lucide-react';

export const MobileNotifications = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications = [
    {
      id: 1,
      type: 'watering',
      title: 'Time to water Basil',
      message: 'Your Basil needs watering today',
      time: '10 min ago',
      read: false,
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 2,
      type: 'health',
      title: 'Plant health alert',
      message: 'Mint health dropped to 78%',
      time: '1 hour ago',
      read: false,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 3,
      type: 'community',
      title: 'New comment',
      message: 'Sarah: "Beautiful tomatoes!"',
      time: '2 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'You earned "Green Thumb" badge',
      time: '3 hours ago',
      read: true,
      icon: Award,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order shipped',
      message: 'Order #12345 arriving in 2-3 days',
      time: '5 hours ago',
      read: true,
      icon: ShoppingCart,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

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
            <h1 className="text-2xl font-bold text-white mb-1">Notifications</h1>
            <p className="text-white/60 text-sm">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white/60" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'text-white/60'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
              filter === 'unread' 
                ? 'bg-primary text-white' 
                : 'text-white/60'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification, idx) => {
          const Icon = notification.icon;
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-2xl backdrop-blur-sm border transition-all active:scale-98 ${
                notification.read 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-primary/5 border-primary/20'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${notification.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-white/70 text-sm mb-2">
                    {notification.message}
                  </p>
                  <p className="text-white/40 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notification.time}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
          <p className="text-white/60">
            No {filter === 'unread' ? 'unread' : ''} notifications right now
          </p>
        </motion.div>
      )}
    </div>
  );
};
