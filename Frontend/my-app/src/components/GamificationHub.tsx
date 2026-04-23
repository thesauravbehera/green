import { useState, useEffect } from 'react';
import { Droplets, Sun, AlertTriangle, Trophy, Star, Zap, TrendingUp, Award, Gift, Sprout, Flame, Wind } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface PlantStats {
  health: number;
  growth: number;
  hydration: number;
  happiness: number;
}

interface GameState {
  level: number;
  greenPoints: number;
  pointsToNextLevel: number;
  totalPoints: number;
  streak: number;
  achievements: number;
}

export function GamificationHub() {
  const [plantStats, setPlantStats] = useState<PlantStats>({
    health: 75,
    growth: 45,
    hydration: 60,
    happiness: 80
  });

  const [gameState, setGameState] = useState<GameState>({
    level: 5,
    greenPoints: 1250,
    pointsToNextLevel: 1500,
    totalPoints: 6250,
    streak: 7,
    achievements: 12
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'water', message: 'Your Monstera needs watering!', urgent: true },
    { id: 2, type: 'heat', message: 'High temperature alert - Consider shade', urgent: true },
    { id: 3, type: 'care', message: 'Time to fertilize your Snake Plant', urgent: false }
  ]);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const plants = [
    {
      name: "Monstera Deliciosa",
      model: "https://sketchfab.com/models/dac370ad6c49465c8613979514beb4f5/embed",
      stage: "Mature",
      daysGrowing: 45
    },
    {
      name: "Houseleek Plant",
      model: "https://sketchfab.com/models/70679a304b324ca8941c214875acf6a9/embed",
      stage: "Growing",
      daysGrowing: 23
    },
    {
      name: "Indoor Plant",
      model: "https://sketchfab.com/models/7c5e77d572c848458e5d898ac49f6f27/embed",
      stage: "Seedling",
      daysGrowing: 8
    }
  ];

  // Simulate plant growth over time
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setPlantStats(prev => ({
        ...prev,
        growth: Math.min(100, prev.growth + 0.5),
        hydration: Math.max(0, prev.hydration - 0.3),
        health: prev.hydration > 30 ? Math.min(100, prev.health + 0.2) : Math.max(0, prev.health - 0.5)
      }));
    }, 2000);

    return () => clearInterval(growthInterval);
  }, []);

  // Check for level up
  useEffect(() => {
    if (gameState.greenPoints >= gameState.pointsToNextLevel) {
      setShowLevelUp(true);
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          level: prev.level + 1,
          greenPoints: prev.greenPoints - prev.pointsToNextLevel,
          pointsToNextLevel: Math.floor(prev.pointsToNextLevel * 1.5)
        }));
        setShowLevelUp(false);
      }, 3000);
    }
  }, [gameState.greenPoints, gameState.pointsToNextLevel]);

  const handleWaterPlant = () => {
    setPlantStats(prev => ({
      ...prev,
      hydration: Math.min(100, prev.hydration + 30),
      health: Math.min(100, prev.health + 10),
      happiness: Math.min(100, prev.happiness + 5)
    }));
    setGameState(prev => ({
      ...prev,
      greenPoints: prev.greenPoints + 50,
      totalPoints: prev.totalPoints + 50
    }));
    setLastAction('water');
    setTimeout(() => setLastAction(null), 2000);
    
    // Remove water alert
    setAlerts(prev => prev.filter(a => a.type !== 'water'));
  };

  const handleFertilize = () => {
    setPlantStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 15),
      growth: Math.min(100, prev.growth + 10),
      happiness: Math.min(100, prev.happiness + 10)
    }));
    setGameState(prev => ({
      ...prev,
      greenPoints: prev.greenPoints + 75,
      totalPoints: prev.totalPoints + 75
    }));
    setLastAction('fertilize');
    setTimeout(() => setLastAction(null), 2000);

    // Remove care alert
    setAlerts(prev => prev.filter(a => a.type !== 'care'));
  };

  const handleShade = () => {
    setPlantStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 10),
      happiness: Math.min(100, prev.happiness + 8)
    }));
    setGameState(prev => ({
      ...prev,
      greenPoints: prev.greenPoints + 40,
      totalPoints: prev.totalPoints + 40
    }));
    setLastAction('shade');
    setTimeout(() => setLastAction(null), 2000);

    // Remove heat alert
    setAlerts(prev => prev.filter(a => a.type !== 'heat'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 py-20 px-4">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-center"
            >
              <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-6xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Level {gameState.level + 1}!
              </h2>
              <p className="text-emerald-400 text-2xl">You're an amazing gardener!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm">Gamification Hub</span>
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Grow & Earn Rewards
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Take care of your virtual plants, complete challenges, and level up your gardening skills
          </p>

          {/* Level and Points Display */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-400" />
                <div className="text-left">
                  <p className="text-yellow-400 text-sm">Level</p>
                  <p className="text-white text-2xl">{gameState.level}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30 backdrop-blur-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-emerald-400" />
                <div className="text-left">
                  <p className="text-emerald-400 text-sm">Green Points</p>
                  <p className="text-white text-2xl">{gameState.greenPoints.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <Flame className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <p className="text-purple-400 text-sm">Day Streak</p>
                  <p className="text-white text-2xl">{gameState.streak}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-blue-400" />
                <div className="text-left">
                  <p className="text-blue-400 text-sm">Achievements</p>
                  <p className="text-white text-2xl">{gameState.achievements}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-4 mt-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progress to Level {gameState.level + 1}</span>
                <span className="text-emerald-400">
                  {gameState.greenPoints} / {gameState.pointsToNextLevel} GP
                </span>
              </div>
              <Progress 
                value={(gameState.greenPoints / gameState.pointsToNextLevel) * 100} 
                className="h-3 bg-slate-800"
              />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Alerts & Actions */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <h2 className="text-xl text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Active Alerts
              </h2>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`p-4 rounded-lg border ${
                      alert.urgent 
                        ? 'bg-red-500/10 border-red-500/30' 
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {alert.type === 'water' && <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0" />}
                      {alert.type === 'heat' && <Sun className="w-5 h-5 text-orange-400 flex-shrink-0" />}
                      {alert.type === 'care' && <Sprout className="w-5 h-5 text-green-400 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-white text-sm">{alert.message}</p>
                        {alert.urgent && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs mt-2">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <h2 className="text-xl text-white mb-4">Care Actions</h2>
              <div className="space-y-3">
                <Button
                  onClick={handleWaterPlant}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 relative overflow-hidden"
                >
                  <Droplets className="w-4 h-4 mr-2" />
                  Water Plant (+50 GP)
                  {lastAction === 'water' && (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -50 }}
                      className="absolute right-4 text-yellow-300"
                    >
                      +50
                    </motion.div>
                  )}
                </Button>

                <Button
                  onClick={handleFertilize}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 relative overflow-hidden"
                >
                  <Sprout className="w-4 h-4 mr-2" />
                  Fertilize (+75 GP)
                  {lastAction === 'fertilize' && (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -50 }}
                      className="absolute right-4 text-yellow-300"
                    >
                      +75
                    </motion.div>
                  )}
                </Button>

                <Button
                  onClick={handleShade}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 relative overflow-hidden"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Adjust Shade (+40 GP)
                  {lastAction === 'shade' && (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -50 }}
                      className="absolute right-4 text-yellow-300"
                    >
                      +40
                    </motion.div>
                  )}
                </Button>
              </div>
            </Card>

            {/* Daily Challenges */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl p-6">
              <h2 className="text-xl text-white mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-400" />
                Daily Challenges
              </h2>
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <p className="text-sm text-white mb-2">Water 3 plants</p>
                  <div className="flex items-center gap-2">
                    <Progress value={66} className="flex-1 h-2 bg-slate-800" />
                    <span className="text-xs text-purple-400">2/3</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <p className="text-sm text-white mb-2">Check plant health 5 times</p>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="flex-1 h-2 bg-slate-800" />
                    <span className="text-xs text-emerald-400">5/5 ✓</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Column - Virtual Plant */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plant Display */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl text-white">{plants[selectedPlant].name}</h2>
                  <p className="text-slate-400 text-sm">
                    {plants[selectedPlant].stage} • Day {plants[selectedPlant].daysGrowing}
                  </p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Growing
                </Badge>
              </div>

              {/* 3D Plant Model */}
              <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg overflow-hidden border border-slate-800 mb-6 relative">
                <iframe
                  title={plants[selectedPlant].name}
                  frameBorder="0"
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                  src={plants[selectedPlant].model}
                  className="w-full h-full"
                />
                
                {/* Floating Stats Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-emerald-500/30">
                    <p className="text-emerald-400 text-xs">Health: {Math.round(plantStats.health)}%</p>
                  </div>
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-500/30">
                    <p className="text-blue-400 text-xs">Hydration: {Math.round(plantStats.hydration)}%</p>
                  </div>
                </div>
              </div>

              {/* Plant Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      Health
                    </span>
                    <span className="text-sm text-white">{Math.round(plantStats.health)}%</span>
                  </div>
                  <Progress value={plantStats.health} className="h-2 bg-slate-800" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      Growth
                    </span>
                    <span className="text-sm text-white">{Math.round(plantStats.growth)}%</span>
                  </div>
                  <Progress value={plantStats.growth} className="h-2 bg-slate-800" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      Hydration
                    </span>
                    <span className="text-sm text-white">{Math.round(plantStats.hydration)}%</span>
                  </div>
                  <Progress value={plantStats.hydration} className="h-2 bg-slate-800" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      Happiness
                    </span>
                    <span className="text-sm text-white">{Math.round(plantStats.happiness)}%</span>
                  </div>
                  <Progress value={plantStats.happiness} className="h-2 bg-slate-800" />
                </div>
              </div>

              {/* Plant Selector */}
              <div className="border-t border-slate-800 pt-4">
                <p className="text-sm text-slate-400 mb-3">Your Plants:</p>
                <div className="grid grid-cols-3 gap-3">
                  {plants.map((plant, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedPlant(index)}
                      variant={selectedPlant === index ? "default" : "outline"}
                      className={selectedPlant === index
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "border-slate-700 hover:bg-slate-800"
                      }
                      size="sm"
                    >
                      <Sprout className="w-4 h-4 mr-2" />
                      {plant.stage}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Growth Timeline */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl p-6">
              <h3 className="text-lg text-white mb-4">Growth Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Sprout className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Seedling Stage</p>
                    <p className="text-slate-500 text-xs">Days 1-15</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Complete</Badge>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <TrendingUp className="w-6 h-6 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Growth Stage</p>
                    <p className="text-slate-500 text-xs">Days 16-40</p>
                  </div>
                  <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">Current</Badge>
                </div>

                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Trophy className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 text-sm">Mature Stage</p>
                    <p className="text-slate-600 text-xs">Days 41+</p>
                  </div>
                  <Badge variant="outline" className="border-slate-700 text-slate-500">Locked</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
