import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Leaf, Plus, Search, Filter, Grid, List, TrendingUp,
  Droplets, Sun, Wind, AlertCircle, CheckCircle2, Clock,
  MoreVertical, Edit, Trash2, Camera, Bell
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export const MyGarden = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock plant data
  const plants = [
    {
      id: 1,
      name: 'Basil',
      species: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1545157]/600x400',
      health: 95,
      status: 'Thriving',
      lastWatered: '2 hours ago',
      nextWatering: 'Tomorrow',
      sunlight: 'Full Sun',
      location: 'Balcony North',
      daysGrowing: 45,
      tasks: ['Water', 'Fertilize']
    },
    {
      id: 2,
      name: 'Tomato',
      species: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa/600x400',
      health: 88,
      status: 'Healthy',
      lastWatered: '1 day ago',
      nextWatering: 'Today',
      sunlight: 'Full Sun',
      location: 'Balcony South',
      daysGrowing: 62,
      tasks: ['Water', 'Prune']
    },
    {
      id: 3,
      name: 'Mint',
      species: 'Mentha',
      image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1/600x400',
      health: 78,
      status: 'Needs Attention',
      lastWatered: '3 days ago',
      nextWatering: 'Overdue',
      sunlight: 'Partial Shade',
      location: 'Kitchen Window',
      daysGrowing: 30,
      tasks: ['Water Urgently', 'Check Soil']
    },
    {
      id: 4,
      name: 'Lavender',
      species: 'Lavandula',
      image: 'https://images.unsplash.com/photo-1611251185555-272e6-92838e/600x400',
      health: 92,
      status: 'Thriving',
      lastWatered: '1 day ago',
      nextWatering: 'In 2 days',
      sunlight: 'Full Sun',
      location: 'Balcony East',
      daysGrowing: 90,
      tasks: ['Harvest']
    }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (health >= 75) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const getStatusIcon = (health: number) => {
    if (health >= 90) return CheckCircle2;
    if (health >= 75) return Clock;
    return AlertCircle;
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Leaf className="w-10 h-10 text-primary" />
                My Garden
              </h1>
              <p className="text-white/60">
                {plants.length} plants in your collection
              </p>
            </div>
            <Button
              onClick={() => navigate('/my-garden/add')}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Plant
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Plants', value: plants.length, icon: Leaf, color: 'text-green-400' },
              { label: 'Avg Health', value: '88%', icon: TrendingUp, color: 'text-blue-400' },
              { label: 'Need Water', value: 2, icon: Droplets, color: 'text-cyan-400' },
              { label: 'Tasks Due', value: 5, icon: Clock, color: 'text-yellow-400' }
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

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                placeholder="Search your plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
              <div className="flex bg-white/5 rounded-lg border border-white/10 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-white/60'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-white/60'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plants Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {plants.map((plant, idx) => {
            const StatusIcon = getStatusIcon(plant.health);
            return (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all overflow-hidden group">
                  {/* Plant Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60" />
                    
                    {/* Health Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getHealthColor(plant.health)} border font-semibold`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {plant.health}% Health
                      </Badge>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Plant Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{plant.name}</h3>
                      <p className="text-white/60 text-sm italic">{plant.species}</p>
                    </div>

                    {/* Status Indicators */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-white/40 text-xs">Next Water</p>
                          <p className={`text-sm font-semibold ${plant.nextWatering === 'Overdue' ? 'text-red-400' : 'text-white'}`}>
                            {plant.nextWatering}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-yellow-400" />
                        <div>
                          <p className="text-white/40 text-xs">Sunlight</p>
                          <p className="text-white text-sm font-semibold">{plant.sunlight}</p>
                        </div>
                      </div>
                    </div>

                    {/* Location & Days */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Wind className="w-4 h-4" />
                        {plant.location}
                      </div>
                      <div className="text-white/60 text-sm">
                        Day {plant.daysGrowing}
                      </div>
                    </div>

                    {/* Tasks */}
                    {plant.tasks.length > 0 && (
                      <div className="mb-4">
                        <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">Pending Tasks</p>
                        <div className="flex flex-wrap gap-2">
                          {plant.tasks.map((task, i) => (
                            <Badge key={i} className="bg-primary/10 text-primary border-primary/30">
                              {task}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/my-garden/${plant.id}`)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State if no plants */}
        {plants.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-12 max-w-md mx-auto">
              <Leaf className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Start Your Garden</h3>
              <p className="text-white/60 mb-6">
                Add your first plant to begin tracking growth and care schedules
              </p>
              <Button
                onClick={() => navigate('/my-garden/add')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Plant
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
