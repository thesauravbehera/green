import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Plus, Clock, CheckCircle2, AlertCircle,
  Droplets, Scissors, Sprout, Filter, MoreVertical
} from 'lucide-react';

export const MobilePlanner = () => {
  const [view, setView] = useState<'today' | 'week'>('today');

  const tasks = [
    {
      id: 1,
      title: 'Water Basil',
      plant: 'Basil',
      type: 'watering',
      priority: 'high',
      due: 'Today, 10:00 AM',
      status: 'pending',
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 2,
      title: 'Prune Tomato',
      plant: 'Tomato',
      type: 'maintenance',
      priority: 'medium',
      due: 'Today, 2:00 PM',
      status: 'pending',
      icon: Scissors,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 3,
      title: 'Fertilize Mint',
      plant: 'Mint',
      type: 'fertilizing',
      priority: 'low',
      due: 'Tomorrow',
      status: 'pending',
      icon: Sprout,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 4,
      title: 'Water Lavender',
      plant: 'Lavender',
      type: 'watering',
      priority: 'high',
      due: 'Overdue',
      status: 'overdue',
      icon: Droplets,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    }
  ];

  const stats = [
    { label: 'Due Today', value: 2, icon: Clock, color: 'text-blue-400' },
    { label: 'Overdue', value: 1, icon: AlertCircle, color: 'text-red-400' },
    { label: 'This Week', value: 8, icon: Calendar, color: 'text-purple-400' }
  ];

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const overdueTasks = tasks.filter(t => t.status === 'overdue');

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
            <h1 className="text-2xl font-bold text-white mb-1">Task Planner</h1>
            <p className="text-white/60 text-sm">{tasks.length} tasks total</p>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center active:scale-95 transition-transform">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
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

        {/* View Selector */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
          <button
            onClick={() => setView('today')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
              view === 'today' 
                ? 'bg-primary text-white' 
                : 'text-white/60'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setView('week')}
            className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-colors ${
              view === 'week' 
                ? 'bg-primary text-white' 
                : 'text-white/60'
            }`}
          >
            This Week
          </button>
        </div>
      </motion.div>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-bold text-white">Overdue</h2>
            <div className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold">
              {overdueTasks.length}
            </div>
          </div>
          <div className="space-y-3">
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Pending Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Pending</h2>
          <div className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
            {pendingTasks.length}
          </div>
        </div>
        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </motion.div>

      {/* Today's Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/30"
      >
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Today's Tip
        </h3>
        <p className="text-white/80 text-sm">
          Complete morning watering tasks between 6-10 AM for best results.
        </p>
      </motion.div>
    </div>
  );
};

const TaskCard = ({ task }: { task: any }) => {
  const Icon = task.icon;
  const isOverdue = task.status === 'overdue';

  return (
    <div className={`p-4 rounded-2xl backdrop-blur-sm border active:scale-98 transition-all ${
      isOverdue 
        ? 'bg-red-500/5 border-red-500/20' 
        : 'bg-white/5 border-white/10'
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button className="w-6 h-6 rounded-lg border-2 border-white/30 hover:border-primary flex-shrink-0 mt-0.5 active:scale-95 transition-all" />
        
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl ${task.bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${task.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm mb-1">{task.title}</h3>
          <p className="text-white/60 text-xs mb-2">{task.plant}</p>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-white/40" />
            <span className={`text-xs ${isOverdue ? 'text-red-400' : 'text-white/60'}`}>
              {task.due}
            </span>
          </div>
        </div>

        {/* Menu */}
        <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
          <MoreVertical className="w-4 h-4 text-white/60" />
        </button>
      </div>
    </div>
  );
};
