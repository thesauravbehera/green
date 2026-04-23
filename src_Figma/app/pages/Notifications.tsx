import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell, Droplets, Sun, AlertTriangle, CheckCircle2, Info,
  MessageSquare, ShoppingCart, Award, TrendingUp, Clock,
  Filter, Search, Settings, BellOff
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const Notifications = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'watering',
      title: 'Time to water your Basil',
      message: 'Your Basil plant needs watering. Last watered 2 days ago.',
      time: '10 minutes ago',
      read: false,
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      priority: 'high'
    },
    {
      id: 2,
      type: 'health',
      title: 'Plant health alert',
      message: 'Mint plant health dropped to 78%. Check soil moisture.',
      time: '1 hour ago',
      read: false,
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'community',
      title: 'New comment on your post',
      message: 'Sarah commented: "Beautiful tomatoes! What variety is this?"',
      time: '2 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      priority: 'low'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement unlocked!',
      message: 'You earned the "Green Thumb" badge for 30 days of consistent care.',
      time: '3 hours ago',
      read: true,
      icon: Award,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      priority: 'low'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order shipped',
      message: 'Your order #12345 has been shipped and will arrive in 2-3 days.',
      time: '5 hours ago',
      read: true,
      icon: ShoppingCart,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'sunlight',
      title: 'Optimal sunlight window',
      message: 'Next 3 hours will provide perfect sunlight for your outdoor plants.',
      time: '6 hours ago',
      read: true,
      icon: Sun,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      priority: 'low'
    },
    {
      id: 7,
      type: 'task',
      title: 'Task reminder',
      message: 'Don\'t forget to fertilize your Tomato plant this week.',
      time: '1 day ago',
      read: true,
      icon: Clock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      priority: 'medium'
    },
    {
      id: 8,
      type: 'system',
      title: 'Weekly growth report ready',
      message: 'Your plants grew an average of 12% this week. View detailed analytics.',
      time: '2 days ago',
      read: true,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      priority: 'low'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const notificationTypes = [
    { label: 'All', value: 'all', count: notifications.length },
    { label: 'Unread', value: 'unread', count: unreadCount },
    { label: 'Read', value: 'read', count: notifications.length - unreadCount }
  ];

  const markAllAsRead = () => {
    // In real app, this would update the backend
    console.log('Marking all as read');
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Bell className="w-10 h-10 text-primary" />
                Notifications
              </h1>
              <p className="text-white/60">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Today', value: '5', icon: Clock, color: 'text-blue-400' },
              { label: 'Urgent', value: '2', icon: AlertTriangle, color: 'text-red-400' },
              { label: 'This Week', value: '24', icon: TrendingUp, color: 'text-green-400' }
            ].map((stat, idx) => (
              <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">{stat.label}</p>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 rounded-lg border border-white/10">
              {notificationTypes.map((type) => (
                <TabsTrigger
                  key={type.value}
                  value={type.value}
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 transition-all"
                >
                  {type.label}
                  {type.count > 0 && (
                    <Badge className="ml-2 bg-white/20 text-white border-0 text-xs px-2">
                      {type.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12">
                <BellOff className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No notifications</h3>
                <p className="text-white/60">
                  You're all caught up! Check back later for updates.
                </p>
              </Card>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, idx) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={`backdrop-blur-sm border-white/10 hover:border-white/20 transition-all cursor-pointer ${
                    notification.read ? 'bg-white/5' : 'bg-primary/5 border-primary/20'
                  }`}>
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${notification.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className="text-white font-semibold">
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                            )}
                          </div>
                          <p className="text-white/70 text-sm mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-white/40 text-xs flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </p>
                            {notification.priority === 'high' && (
                              <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Load More Notifications
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
