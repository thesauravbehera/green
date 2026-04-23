import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, Heart, Share2, Plus, Sun, Droplets, Wind, ThermometerSun, 
  Calendar, Leaf, Info, AlertTriangle, CheckCircle2, Clock, TrendingUp,
  Sparkles, BookOpen, Sprout, Bug, ShoppingCart
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';

export const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - would come from API
  const plant = {
    id: '1',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    commonNames: ['Holy Basil', 'Tulsi', 'Krishna Tulsi'],
    category: 'Herbs',
    family: 'Lamiaceae',
    difficulty: 'Easy',
    isIndian: true,
    isPremium: false,
    rating: 4.8,
    reviews: 234,
    growthRate: 'Fast',
    lifespan: '1-2 years',
    maxHeight: '60-90 cm',
    description: 'Tulsi, or Holy Basil, is a sacred plant in Hindu belief and widely used in Indian traditional medicine. It has aromatic leaves and small white or purple flowers. Known for its medicinal properties and spiritual significance.',
    images: [
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&h=600&fit=crop',
    ],
    careRequirements: {
      sunlight: {
        level: 'Full Sun',
        hours: '6-8 hours',
        description: 'Thrives in direct sunlight, best in morning sun',
      },
      water: {
        frequency: 'Daily',
        amount: 'Moderate',
        description: 'Keep soil consistently moist but not waterlogged',
      },
      temperature: {
        min: 18,
        max: 35,
        ideal: '20-30°C',
        description: 'Warm weather plant, sensitive to frost',
      },
      humidity: {
        level: 'Moderate',
        range: '40-60%',
        description: 'Adapts well to typical Indian humidity',
      },
      soil: {
        type: 'Well-draining',
        ph: '6.0-7.5',
        description: 'Rich, loamy soil with good drainage',
      },
      fertilizer: {
        frequency: 'Monthly',
        type: 'Organic compost or balanced NPK',
        description: 'Feed during growing season (Mar-Oct)',
      },
    },
    benefits: [
      'Boosts immunity and fights infections',
      'Reduces stress and anxiety',
      'Improves respiratory health',
      'Natural insect repellent',
      'Purifies air quality',
    ],
    growthStages: [
      { stage: 'Seed Germination', days: '7-10 days', description: 'Seeds sprout and develop first leaves' },
      { stage: 'Seedling', days: '2-3 weeks', description: 'Young plant establishes root system' },
      { stage: 'Vegetative Growth', days: '4-6 weeks', description: 'Rapid leaf and stem development' },
      { stage: 'Mature Plant', days: '8-10 weeks', description: 'Full-sized plant ready for harvest' },
      { stage: 'Flowering', days: '12+ weeks', description: 'Produces flowers and seeds' },
    ],
    commonIssues: [
      { issue: 'Leaf yellowing', cause: 'Overwatering or poor drainage', solution: 'Reduce watering frequency, improve soil drainage' },
      { issue: 'Wilting leaves', cause: 'Underwatering or heat stress', solution: 'Water regularly, provide afternoon shade in extreme heat' },
      { issue: 'Aphids', cause: 'Pest infestation', solution: 'Spray with neem oil solution or soapy water' },
    ],
    harvestInfo: {
      time: '60-90 days after planting',
      method: 'Pinch off leaves regularly to encourage bushy growth',
      bestTime: 'Morning after dew dries',
      storage: 'Use fresh or dry leaves for tea',
    },
    companionPlants: ['Tomatoes', 'Peppers', 'Marigold'],
    avoidPlanting: ['Rue', 'Sage'],
    price: 99,
    inStock: true,
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate('/plants')}
            variant="outline"
            className="glass border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <Card className="glass overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src={plant.images[selectedImage]}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {plant.isIndian && (
                    <Badge className="bg-orange-500 text-white border-0">
                      🇮🇳 Indian Plant
                    </Badge>
                  )}
                  <Badge className="bg-emerald-500/90 text-white border-0">
                    {plant.difficulty}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-3 rounded-full glass backdrop-blur-md hover:bg-white/20 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                    />
                  </button>
                  <button className="p-3 rounded-full glass backdrop-blur-md hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {plant.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-primary scale-105' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${plant.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Plant Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {plant.name}
              </h1>
              <p className="text-lg text-white/60 italic mb-4">{plant.scientificName}</p>
              
              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="border-white/20 text-white/80">
                  {plant.family}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white/80">
                  {plant.category}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-400">
                  ⭐ {plant.rating} <span className="text-white/60 text-sm">({plant.reviews} reviews)</span>
                </div>
              </div>

              {/* Common Names */}
              <div className="flex flex-wrap gap-2 mb-4">
                {plant.commonNames.map((name, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full glass text-sm text-white/80">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <Card className="glass p-6">
              <p className="text-white/80 leading-relaxed">{plant.description}</p>
            </Card>

            {/* Quick Stats */}
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">Growth Rate</p>
                  <p className="text-white font-medium">{plant.growthRate}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Lifespan</p>
                  <p className="text-white font-medium">{plant.lifespan}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Max Height</p>
                  <p className="text-white font-medium">{plant.maxHeight}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm mb-1">Difficulty</p>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {plant.difficulty}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 text-lg">
                <Plus className="w-5 h-5 mr-2" />
                Add to My Garden
              </Button>
              <Button 
                variant="outline" 
                className="glass border-white/10 text-white hover:bg-white/10 h-12 px-6"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>

            {/* Price */}
            {plant.price && (
              <Card className="glass p-4 border-primary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Buy Seeds/Plant</p>
                    <p className="text-2xl font-bold text-primary">₹{plant.price}</p>
                  </div>
                  <Badge className={plant.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                    {plant.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Detailed Information Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="glass border border-white/10 p-1 w-full justify-start overflow-x-auto">
              <TabsTrigger value="care" className="data-[state=active]:bg-primary">
                <Leaf className="w-4 h-4 mr-2" />
                Care Guide
              </TabsTrigger>
              <TabsTrigger value="benefits" className="data-[state=active]:bg-primary">
                <Sparkles className="w-4 h-4 mr-2" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="growth" className="data-[state=active]:bg-primary">
                <TrendingUp className="w-4 h-4 mr-2" />
                Growth Stages
              </TabsTrigger>
              <TabsTrigger value="issues" className="data-[state=active]:bg-primary">
                <Bug className="w-4 h-4 mr-2" />
                Common Issues
              </TabsTrigger>
              <TabsTrigger value="harvest" className="data-[state=active]:bg-primary">
                <Calendar className="w-4 h-4 mr-2" />
                Harvest
              </TabsTrigger>
            </TabsList>

            {/* Care Guide Tab */}
            <TabsContent value="care" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sunlight */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-yellow-500/20">
                      <Sun className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Sunlight</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.sunlight.level}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">☀️ {plant.careRequirements.sunlight.hours} daily</p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.sunlight.description}</p>
                </Card>

                {/* Water */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <Droplets className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Watering</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.water.frequency}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">💧 {plant.careRequirements.water.amount} amount</p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.water.description}</p>
                </Card>

                {/* Temperature */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-red-500/20">
                      <ThermometerSun className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Temperature</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.temperature.ideal}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">
                    🌡️ Range: {plant.careRequirements.temperature.min}°C - {plant.careRequirements.temperature.max}°C
                  </p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.temperature.description}</p>
                </Card>

                {/* Humidity */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-cyan-500/20">
                      <Wind className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Humidity</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.humidity.level}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">💨 {plant.careRequirements.humidity.range}</p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.humidity.description}</p>
                </Card>

                {/* Soil */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-amber-500/20">
                      <Sprout className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Soil</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.soil.type}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">🧪 pH: {plant.careRequirements.soil.ph}</p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.soil.description}</p>
                </Card>

                {/* Fertilizer */}
                <Card className="glass p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-green-500/20">
                      <Leaf className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Fertilizer</h4>
                      <p className="text-sm text-white/60">{plant.careRequirements.fertilizer.frequency}</p>
                    </div>
                  </div>
                  <p className="text-white/80 mb-2">🌱 {plant.careRequirements.fertilizer.type}</p>
                  <p className="text-white/60 text-sm">{plant.careRequirements.fertilizer.description}</p>
                </Card>
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="mt-6">
              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Plant Benefits
                </h3>
                <div className="space-y-4">
                  {plant.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg glass-hover">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-white/80">{benefit}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Growth Stages Tab */}
            <TabsContent value="growth" className="mt-6">
              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Growth Timeline
                </h3>
                <div className="space-y-6">
                  {plant.growthStages.map((stage, idx) => (
                    <div key={idx} className="relative pl-8 pb-6 border-l-2 border-white/10 last:border-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-[#020617]" />
                      <div className="glass p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{stage.stage}</h4>
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {stage.days}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Common Issues Tab */}
            <TabsContent value="issues" className="mt-6">
              <div className="space-y-4">
                {plant.commonIssues.map((item, idx) => (
                  <Card key={idx} className="glass p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-red-500/20 flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">{item.issue}</h4>
                        <p className="text-white/60 text-sm mb-3">
                          <strong className="text-white/80">Cause:</strong> {item.cause}
                        </p>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <p className="text-green-400 text-sm">
                            <strong>Solution:</strong> {item.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Harvest Tab */}
            <TabsContent value="harvest" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    Harvest Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Harvest Time</p>
                      <p className="text-white font-medium">{plant.harvestInfo.time}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Method</p>
                      <p className="text-white font-medium">{plant.harvestInfo.method}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Best Time</p>
                      <p className="text-white font-medium">{plant.harvestInfo.bestTime}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Storage</p>
                      <p className="text-white font-medium">{plant.harvestInfo.storage}</p>
                    </div>
                  </div>
                </Card>

                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Companion Planting
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-sm mb-2">✅ Plant With</p>
                      <div className="flex flex-wrap gap-2">
                        {plant.companionPlants.map((comp, idx) => (
                          <Badge key={idx} className="bg-green-500/20 text-green-400 border-green-500/30">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-2">❌ Avoid Planting With</p>
                      <div className="flex flex-wrap gap-2">
                        {plant.avoidPlanting.map((avoid, idx) => (
                          <Badge key={idx} className="bg-red-500/20 text-red-400 border-red-500/30">
                            {avoid}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
