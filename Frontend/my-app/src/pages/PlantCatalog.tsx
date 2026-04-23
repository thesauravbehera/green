import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Sprout, Sun, Droplets, Wind, TrendingUp, Heart, ChevronRight, Leaf, Home, Trees } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router';

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sunlight: string;
  water: string;
  image: string;
  description: string;
  isPremium?: boolean;
  isIndian?: boolean;
  isIndoor?: boolean;
  isOutdoor?: boolean;
  price?: number;
}

const MOCK_PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    category: 'Herbs',
    difficulty: 'Easy',
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop',
    description: 'Sacred Indian herb with medicinal properties',
    isIndian: true,
    isOutdoor: true,
  },
  {
    id: '2',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'Foliage',
    difficulty: 'Easy',
    sunlight: 'Indirect Light',
    water: 'Moderate',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
    description: 'Iconic tropical plant with split leaves',
    isPremium: true,
    isIndoor: true,
  },
  {
    id: '3',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'Succulent',
    difficulty: 'Easy',
    sunlight: 'Low to Bright',
    water: 'Low',
    image: 'https://images.unsplash.com/photo-1593482892540-73c6e536b081?w=400&h=400&fit=crop',
    description: 'Air-purifying succulent, extremely hardy',
    isIndoor: true,
  },
  {
    id: '4',
    name: 'Marigold',
    scientificName: 'Tagetes erecta',
    category: 'Flowering',
    difficulty: 'Easy',
    sunlight: 'Full Sun',
    water: 'Moderate',
    image: 'https://images.unsplash.com/photo-1595423498634-01a29848e6a6?w=400&h=400&fit=crop',
    description: 'Vibrant flowers, natural pest deterrent',
    isIndian: true,
    isOutdoor: true,
  },
  {
    id: '5',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'Foliage',
    difficulty: 'Medium',
    sunlight: 'Bright Indirect',
    water: 'Moderate',
    image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=400&h=400&fit=crop',
    description: 'Dramatic large-leafed statement plant',
    isIndoor: true,
  },
  {
    id: '6',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    category: 'Succulent',
    difficulty: 'Easy',
    sunlight: 'Bright Direct',
    water: 'Low',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=400&fit=crop',
    description: 'Medicinal succulent with healing gel',
    isIndian: true,
    isIndoor: true,
    isOutdoor: true,
  },
  {
    id: '7',
    name: 'Jasmine',
    scientificName: 'Jasminum sambac',
    category: 'Flowering',
    difficulty: 'Medium',
    sunlight: 'Full Sun',
    water: 'High',
    image: 'https://images.unsplash.com/photo-1629815884972-ddc0ebfd7d73?w=400&h=400&fit=crop',
    description: 'Fragrant white flowers, Indian favorite',
    isIndian: true,
    isOutdoor: true,
  },
  {
    id: '8',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    category: 'Foliage',
    difficulty: 'Easy',
    sunlight: 'Low to Medium',
    water: 'High',
    image: 'https://images.unsplash.com/photo-1593482892540-73c6e536b081?w=400&h=400&fit=crop',
    description: 'Elegant white blooms, air purifying',
    isIndoor: true,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Plants', icon: Trees },
  { id: 'indoor', label: 'Indoor', icon: Home },
  { id: 'outdoor', label: 'Outdoor', icon: Sun },
  { id: 'herbs', label: 'Herbs', icon: Leaf },
  { id: 'foliage', label: 'Foliage', icon: Sprout },
  { id: 'succulent', label: 'Succulents', icon: Sun },
];

export const PlantCatalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlants = MOCK_PLANTS.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'indoor') {
        matchesCategory = !!plant.isIndoor;
      } else if (selectedCategory === 'outdoor') {
        matchesCategory = !!plant.isOutdoor;
      } else {
        matchesCategory = plant.category.toLowerCase() === selectedCategory;
      }
    }

    const matchesDifficulty = !selectedDifficulty || plant.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-premium">Plant Catalog</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover over 1000+ plants perfect for your balcony garden
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search plants by name or scientific name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 h-12 text-white"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <div className="space-y-4">
                  {/* Difficulty Filter */}
                  <div>
                    <label className="text-sm text-white/60 mb-2 block">Difficulty Level</label>
                    <div className="flex flex-wrap gap-2">
                      {['Easy', 'Medium', 'Hard'].map((level) => (
                        <Button
                          key={level}
                          onClick={() => setSelectedDifficulty(selectedDifficulty === level ? null : level)}
                          variant={selectedDifficulty === level ? 'default' : 'outline'}
                          className={`${
                            selectedDifficulty === level
                              ? 'bg-primary text-white'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                          }`}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 overflow-x-auto pb-4"
        >
          <div className="flex gap-3 min-w-max">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'glass border-white/10 text-white/60 hover:border-primary/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-white/60 text-sm">
          Showing {filteredPlants.length} of {MOCK_PLANTS.length} plants
        </div>

        {/* Plant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="glass-hover cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/plants/${plant.id}`)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {plant.isIndian && (
                      <Badge className="bg-orange-500/90 text-white border-0">
                        🇮🇳 Indian
                      </Badge>
                    )}
                    {plant.isPremium && (
                      <Badge className="bg-yellow-500/90 text-black border-0">
                        ⭐ Premium
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-white/50 italic mb-3 line-clamp-1">
                    {plant.scientificName}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {plant.description}
                  </p>

                  {/* Care Requirements */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
                      <Sun className="w-4 h-4 text-yellow-400 mb-1" />
                      <span className="text-xs text-white/60 text-center line-clamp-1">
                        {plant.sunlight}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
                      <Droplets className="w-4 h-4 text-blue-400 mb-1" />
                      <span className="text-xs text-white/60 text-center">
                        {plant.water}
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
                      <TrendingUp className="w-4 h-4 text-green-400 mb-1" />
                      <Badge className={`text-xs ${getDifficultyColor(plant.difficulty)} px-1 py-0`}>
                        {plant.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button 
                    className="w-full bg-primary/20 hover:bg-primary text-white border-0 group/btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/plants/${plant.id}`);
                    }}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlants.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full glass flex items-center justify-center">
              <Sprout className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No plants found</h3>
            <p className="text-white/60 mb-6">
              Try adjusting your search or filters
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty(null);
              }}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};