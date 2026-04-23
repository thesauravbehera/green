import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, Plus, Clock, CheckCircle2, AlertCircle, Filter,
  Repeat, Bell, Edit, Trash2, MoreVertical, Droplets, Sun,
  Scissors, Sprout, FileText
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const Planner = () => {
  const [view, setView] = useState<'today' | 'week' | 'month'>('today');

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: 'Water Basil',
      plant: 'Basil',
      type: 'watering',
      priority: 'high',
      due: 'Today, 10:00 AM',
      recurring: 'Every 2 days',
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
      recurring: 'Weekly',
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
      due: 'Tomorrow, 9:00 AM',
      recurring: 'Bi-weekly',
      status: 'pending',
      icon: Sprout,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 4,
      title: 'Check Sunlight',
      plant: 'Lavender',
      type: 'monitoring',
      priority: 'medium',
      due: 'Tomorrow, 12:00 PM',
      recurring: 'Daily',
      status: 'pending',
      icon: Sun,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 5,
      title: 'Water Lavender',
      plant: 'Lavender',
      type: 'watering',
      priority: 'high',
      due: 'Yesterday',
      recurring: 'Every 3 days',
      status: 'overdue',
      icon: Droplets,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 6,
      title: 'Harvest Basil',
      plant: 'Basil',
      type: 'harvesting',
      priority: 'medium',
      due: 'Last week',
      recurring: 'Monthly',
      status: 'completed',
      icon: Scissors,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  const upcomingEvents = [
    {
      date: 'April 5',
      title: 'Seasonal Planting',
      description: 'Best time to plant summer vegetables',
      type: 'event'
    },
    {
      date: 'April 12',
      title: 'Community Workshop',
      description: 'Advanced pruning techniques',
      type: 'event'
    }
  ];

  const taskStats = [
    { label: 'Due Today', value: 2, icon: Clock, color: 'text-blue-400' },
    { label: 'Overdue', value: 1, icon: AlertCircle, color: 'text-red-400' },
    { label: 'Completed', value: 15, icon: CheckCircle2, color: 'text-green-400' },
    { label: 'This Week', value: 8, icon: Calendar, color: 'text-purple-400' }
  ];

  const filteredTasks = tasks.filter(task => {
    if (view === 'today') {
      return task.due.includes('Today') || task.status === 'overdue';
    }
    return true;
  });

  const pendingTasks = filteredTasks.filter(t => t.status === 'pending');
  const overdueTasks = filteredTasks.filter(t => t.status === 'overdue');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Calendar className="w-10 h-10 text-primary" />
                Task Planner
              </h1>
              <p className="text-white/60">
                Manage your gardening schedule and reminders
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-5 h-5 mr-2" />
              New Task
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {taskStats.map((stat, idx) => (
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

          {/* View Selector */}
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 rounded-lg border border-white/10">
              <TabsTrigger
                value="today"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60"
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60"
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overdue Tasks */}
            {overdueTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-bold text-white">Overdue</h2>
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/30">
                    {overdueTasks.length}
                  </Badge>
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
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Pending</h2>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {pendingTasks.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </motion.div>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Completed</h2>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                    {completedTasks.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <Badge className="bg-primary/10 text-primary border-primary/30 mb-2">
                        {event.date}
                      </Badge>
                      <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                      <p className="text-white/60 text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-primary/10 backdrop-blur-sm border-primary/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Today's Tip
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Morning is the best time to water your plants. This allows them to absorb moisture before the heat of the day.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 w-full"
                >
                  More Tips
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task }: { task: any }) => {
  const Icon = task.icon;
  const isPriority = task.priority === 'high';
  const isOverdue = task.status === 'overdue';
  const isCompleted = task.status === 'completed';

  return (
    <Card className={`backdrop-blur-sm border-white/10 hover:border-white/20 transition-all ${
      isOverdue ? 'bg-red-500/5 border-red-500/20' : 
      isCompleted ? 'bg-white/5 opacity-60' : 
      'bg-white/5'
    }`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${
            isCompleted ? 'bg-green-500 border-green-500' : 'border-white/30 hover:border-primary'
          }`}>
            {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
          </button>

          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg ${task.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${task.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className={`font-semibold ${isCompleted ? 'text-white/60 line-through' : 'text-white'}`}>
                  {task.title}
                </h3>
                <p className="text-white/60 text-sm">{task.plant}</p>
              </div>
              {isPriority && !isCompleted && (
                <Badge className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">
                  Priority
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.due}
              </div>
              <div className="flex items-center gap-1">
                <Repeat className="w-4 h-4" />
                {task.recurring}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs"
              >
                <Bell className="w-3 h-3 mr-1" />
                Remind
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
