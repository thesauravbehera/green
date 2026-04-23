import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Clock, Droplets, Leaf, Plus, Calendar, 
  Bell, TrendingUp, Sparkles, Filter, ChevronDown, Sun
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

interface Task {
  id: string;
  plantName: string;
  plantImage: string;
  taskType: 'water' | 'fertilize' | 'prune' | 'inspect';
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  xpReward: number;
  streak?: number;
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    plantName: 'Tulsi (Holy Basil)',
    plantImage: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=200&h=200&fit=crop',
    taskType: 'water',
    dueTime: '9:00 AM',
    priority: 'high',
    completed: false,
    xpReward: 50,
    streak: 7,
  },
  {
    id: '2',
    plantName: 'Monstera Deliciosa',
    plantImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&h=200&fit=crop',
    taskType: 'fertilize',
    dueTime: '10:30 AM',
    priority: 'medium',
    completed: false,
    xpReward: 75,
  },
  {
    id: '3',
    plantName: 'Snake Plant',
    plantImage: 'https://images.unsplash.com/photo-1593482892540-73c6e536b081?w=200&h=200&fit=crop',
    taskType: 'inspect',
    dueTime: '2:00 PM',
    priority: 'low',
    completed: false,
    xpReward: 25,
  },
  {
    id: '4',
    plantName: 'Aloe Vera',
    plantImage: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=200&h=200&fit=crop',
    taskType: 'water',
    dueTime: 'Yesterday',
    priority: 'high',
    completed: false,
    xpReward: 50,
  },
];

const TASK_ICONS = {
  water: Droplets,
  fertilize: Leaf,
  prune: Sparkles,
  inspect: TrendingUp,
};

const TASK_COLORS = {
  water: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  fertilize: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  prune: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  inspect: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
};

const PRIORITY_COLORS = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export const TasksReminders = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesType = filterType === 'all' || 
                       (filterType === 'pending' && !task.completed) ||
                       (filterType === 'completed' && task.completed);
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesType && matchesPriority;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => !t.completed && t.dueTime.includes('Yesterday')).length,
  };

  const completionRate = (stats.completed / stats.total) * 100;

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-premium">Care Tasks</span>
          </h1>
          <p className="text-white/60 text-lg">
            Daily reminders to keep your garden thriving
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="glass p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
                <p className="text-sm text-white/60">Completed</p>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                <p className="text-sm text-white/60">Pending</p>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/20">
                <Bell className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.overdue}</p>
                <p className="text-sm text-white/60">Overdue</p>
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/20">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{completionRate.toFixed(0)}%</p>
                <p className="text-sm text-white/60">Completion</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Today's Progress</h3>
              <span className="text-white/60 text-sm">
                {stats.completed} / {stats.total} tasks
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="glass p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter */}
              <div className="flex-1">
                <label className="text-sm text-white/60 mb-2 block">Status</label>
                <div className="flex gap-2">
                  {(['all', 'pending', 'completed'] as const).map((type) => (
                    <Button
                      key={type}
                      onClick={() => setFilterType(type)}
                      variant={filterType === type ? 'default' : 'outline'}
                      className={`${
                        filterType === type
                          ? 'bg-primary text-white'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } capitalize`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div className="flex-1">
                <label className="text-sm text-white/60 mb-2 block">Priority</label>
                <div className="flex gap-2">
                  {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
                    <Button
                      key={priority}
                      onClick={() => setFilterPriority(priority)}
                      variant={filterPriority === priority ? 'default' : 'outline'}
                      className={`${
                        filterPriority === priority
                          ? 'bg-primary text-white'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } capitalize`}
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => {
            const TaskIcon = TASK_ICONS[task.taskType];
            const taskColor = TASK_COLORS[task.taskType];
            const isOverdue = task.dueTime.includes('Yesterday');

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-hover p-6 ${task.completed ? 'opacity-50' : ''} ${isOverdue && !task.completed ? 'border-red-500/50' : ''}`}>
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.completed}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-primary border-primary'
                          : 'border-white/30 hover:border-primary hover:bg-primary/10'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </button>

                    {/* Plant Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={task.plantImage}
                        alt={task.plantName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-white/50' : 'text-white'}`}>
                            {task.plantName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${taskColor.bg} ${taskColor.text} border ${taskColor.border} capitalize`}>
                              <TaskIcon className="w-3 h-3 mr-1" />
                              {task.taskType}
                            </Badge>
                            <Badge className={PRIORITY_COLORS[task.priority]}>
                              {task.priority} priority
                            </Badge>
                            {task.streak && (
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                🔥 {task.streak} day streak
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span className={isOverdue && !task.completed ? 'text-red-400 font-semibold' : ''}>
                            {task.dueTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span>+{task.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {!task.completed && (
                      <Button
                        onClick={() => handleCompleteTask(task.id)}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete
                      </Button>
                    )}

                    {task.completed && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                        ✓ Done
                      </Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
            <p className="text-white/60 mb-6">
              All caught up! Your plants are well taken care of.
            </p>
          </motion.div>
        )}

        {/* Add Task Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Custom Task
          </Button>
        </motion.div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="glass p-6 border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/20 flex-shrink-0">
                <Sun className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💡 Daily Gardening Tip</h3>
                <p className="text-white/80">
                  Morning is the best time to water your plants! It allows excess water to evaporate
                  during the day, reducing the risk of fungal diseases and ensuring your plants stay
                  healthy and hydrated throughout the day.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
