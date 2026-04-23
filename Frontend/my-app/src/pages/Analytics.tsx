import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3, TrendingUp, TrendingDown, Activity, Droplets,
  Sun, Wind, Thermometer, Calendar, Download, Filter, Info
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Mock data for charts
  const growthData = [
    { date: 'Mon', height: 12, health: 85, water: 250 },
    { date: 'Tue', height: 12.5, health: 87, water: 300 },
    { date: 'Wed', height: 13, health: 89, water: 280 },
    { date: 'Thu', height: 13.8, health: 91, water: 320 },
    { date: 'Fri', height: 14.5, health: 92, water: 290 },
    { date: 'Sat', height: 15, health: 93, water: 310 },
    { date: 'Sun', height: 15.8, health: 95, water: 300 }
  ];

  const environmentData = [
    { time: '6AM', temp: 18, humidity: 65, light: 100 },
    { time: '9AM', temp: 22, humidity: 60, light: 450 },
    { time: '12PM', temp: 28, humidity: 55, light: 800 },
    { time: '3PM', temp: 30, humidity: 50, light: 650 },
    { time: '6PM', temp: 25, humidity: 58, light: 300 },
    { time: '9PM', temp: 20, humidity: 62, light: 0 }
  ];

  const plantDistribution = [
    { name: 'Herbs', value: 35, color: '#10B981' },
    { name: 'Vegetables', value: 30, color: '#3B82F6' },
    { name: 'Flowers', value: 20, color: '#8B5CF6' },
    { name: 'Succulents', value: 15, color: '#F59E0B' }
  ];

  const taskCompletion = [
    { week: 'Week 1', completed: 28, pending: 5 },
    { week: 'Week 2', completed: 32, pending: 3 },
    { week: 'Week 3', completed: 35, pending: 2 },
    { week: 'Week 4', completed: 38, pending: 4 }
  ];

  // Key metrics
  const metrics = [
    {
      label: 'Avg Growth Rate',
      value: '+12.5%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'Plant Health',
      value: '91.2%',
      change: '+4.1%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Water Usage',
      value: '2.1L/day',
      change: '-8.5%',
      trend: 'down',
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      label: 'Task Completion',
      value: '94%',
      change: '+6.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#020617] border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-1">{payload[0].payload.date || payload[0].payload.time}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Height' && 'cm'}
              {entry.name === 'Health' && '%'}
              {entry.name === 'Water' && 'ml'}
              {entry.name === 'Temperature' && '°C'}
              {entry.name === 'Humidity' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
                <BarChart3 className="w-10 h-10 text-primary" />
                Analytics Dashboard
              </h1>
              <p className="text-white/60">
                Insights and metrics for your garden
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 mb-6">
            {(['week', 'month', 'year'] as const).map((range) => (
              <Button
                key={range}
                onClick={() => setTimeRange(range)}
                variant="outline"
                className={`${
                  timeRange === range
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => {
              const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                      <Badge className={`${
                        metric.trend === 'up' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        <TrendIcon className="w-3 h-3 mr-1" />
                        {metric.change}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                    <p className="text-white/60 text-sm">{metric.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Plant Growth Tracking</h3>
                  <p className="text-white/60 text-sm">Height & health over time</p>
                </div>
                <Info className="w-5 h-5 text-white/40" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <Tooltip content={customTooltip} />
                  <Line type="monotone" dataKey="height" stroke="#10B981" strokeWidth={3} name="Height" dot={{ fill: '#10B981', r: 4 }} />
                  <Line type="monotone" dataKey="health" stroke="#3B82F6" strokeWidth={3} name="Health" dot={{ fill: '#3B82F6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Environment Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Environmental Conditions</h3>
                  <p className="text-white/60 text-sm">Temperature & humidity today</p>
                </div>
                <Info className="w-5 h-5 text-white/40" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={environmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <Tooltip content={customTooltip} />
                  <Area type="monotone" dataKey="temp" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Temperature" />
                  <Area type="monotone" dataKey="humidity" stackId="2" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.6} name="Humidity" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Water Usage Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Water Usage</h3>
                  <p className="text-white/60 text-sm">Daily consumption (ml)</p>
                </div>
                <Droplets className="w-5 h-5 text-cyan-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="date" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                  <Tooltip content={customTooltip} />
                  <Bar dataKey="water" fill="#06B6D4" radius={[8, 8, 0, 0]} name="Water" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Plant Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Plant Distribution</h3>
                  <p className="text-white/60 text-sm">By category</p>
                </div>
                <Info className="w-5 h-5 text-white/40" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={plantDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {plantDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Task Completion Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Task Completion Trends</h3>
                <p className="text-white/60 text-sm">Completed vs pending tasks (monthly)</p>
              </div>
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCompletion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="week" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <Tooltip content={customTooltip} />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Bar dataKey="completed" fill="#10B981" radius={[8, 8, 0, 0]} name="Completed" />
                <Bar dataKey="pending" fill="#F59E0B" radius={[8, 8, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
