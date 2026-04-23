import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, Crown, TrendingUp, Award, Star, Flame, Target,
  Users, MapPin, Calendar, Medal, Zap, Gift, Lock
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';

interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  location: string;
  isPremium: boolean;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    id: '1',
    name: 'Rajesh Kumar',
    avatar: 'https://i.pravatar.cc/150?img=12',
    level: 24,
    xp: 45600,
    streak: 89,
    location: 'Mumbai',
    isPremium: true,
  },
  {
    rank: 2,
    id: '2',
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/150?img=5',
    level: 22,
    xp: 42100,
    streak: 76,
    location: 'Bangalore',
    isPremium: true,
  },
  {
    rank: 3,
    id: '3',
    name: 'Amit Patel',
    avatar: 'https://i.pravatar.cc/150?img=33',
    level: 20,
    xp: 38900,
    streak: 65,
    location: 'Delhi',
    isPremium: false,
  },
  {
    rank: 4,
    id: '4',
    name: 'Sneha Reddy',
    avatar: 'https://i.pravatar.cc/150?img=9',
    level: 19,
    xp: 36200,
    streak: 58,
    location: 'Hyderabad',
    isPremium: true,
  },
  {
    rank: 5,
    id: '5',
    name: 'Vikram Singh',
    avatar: 'https://i.pravatar.cc/150?img=14',
    level: 18,
    xp: 34500,
    streak: 52,
    location: 'Pune',
    isPremium: false,
  },
  // Current user
  {
    rank: 12,
    id: 'current',
    name: 'You',
    avatar: 'https://i.pravatar.cc/150?img=8',
    level: 12,
    xp: 12450,
    streak: 21,
    location: 'Bangalore',
    isPremium: true,
  },
];

const ACHIEVEMENTS = [
  {
    id: '1',
    name: 'Green Thumb Beginner',
    description: 'Add your first plant to the garden',
    icon: '🌱',
    xpReward: 100,
    progress: 100,
    unlocked: true,
    rarity: 'common',
  },
  {
    id: '2',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    xpReward: 500,
    progress: 100,
    unlocked: true,
    rarity: 'rare',
  },
  {
    id: '3',
    name: 'Plant Parent',
    description: 'Own 10 plants simultaneously',
    icon: '🌿',
    xpReward: 1000,
    progress: 80,
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: '4',
    name: 'Community Hero',
    description: 'Get 100 helpful votes on your posts',
    icon: '⭐',
    xpReward: 2000,
    progress: 65,
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: '5',
    name: 'Expert Gardener',
    description: 'Reach Level 20',
    icon: '🏆',
    xpReward: 5000,
    progress: 45,
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: '6',
    name: 'Task Master',
    description: 'Complete 500 care tasks',
    icon: '✅',
    xpReward: 3000,
    progress: 37,
    unlocked: false,
    rarity: 'epic',
  },
];

const REWARDS = [
  {
    id: '1',
    name: 'Premium Border',
    cost: 1000,
    type: 'cosmetic',
    icon: '🎨',
    locked: false,
  },
  {
    id: '2',
    name: 'Exclusive Badge',
    cost: 2500,
    type: 'cosmetic',
    icon: '🏅',
    locked: false,
  },
  {
    id: '3',
    name: 'Custom Plant Tag',
    cost: 5000,
    type: 'feature',
    icon: '🏷️',
    locked: true,
  },
  {
    id: '4',
    name: 'AI Diagnosis Priority',
    cost: 10000,
    type: 'feature',
    icon: '🤖',
    locked: true,
  },
];

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-orange-400';
  return 'text-white/60';
};

const getRankMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common': return 'border-gray-500/30 bg-gray-500/10';
    case 'rare': return 'border-blue-500/30 bg-blue-500/10';
    case 'epic': return 'border-purple-500/30 bg-purple-500/10';
    case 'legendary': return 'border-yellow-500/30 bg-yellow-500/10';
    default: return 'border-white/10 bg-white/5';
  }
};

export const Leaderboard = () => {
  const [selectedTab, setSelectedTab] = useState('global');
  const currentUser = MOCK_LEADERBOARD.find(u => u.id === 'current')!;

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
            <span className="text-premium">Leaderboard & Achievements</span>
          </h1>
          <p className="text-white/60 text-lg">
            Compete with gardeners worldwide and unlock exclusive rewards
          </p>
        </motion.div>

        {/* Current User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass p-6 mb-8 border-primary/30">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-primary">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{currentUser.name}</h3>
                  {currentUser.isPremium && (
                    <Badge className="bg-yellow-500 text-black border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                    🔥 {currentUser.streak} Day Streak
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-white/60">
                  <div className="flex items-center gap-2">
                    <Trophy className={`w-5 h-5 ${getRankColor(currentUser.rank)}`} />
                    <span>Rank #{currentUser.rank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>Level {currentUser.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span>{currentUser.xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span>{currentUser.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="glass border border-white/10 p-1 w-full justify-start overflow-x-auto mb-8">
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-primary">
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-primary">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-primary">
              <Gift className="w-4 h-4 mr-2" />
              Rewards Shop
            </TabsTrigger>
          </TabsList>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Top 3 Podium */}
              {MOCK_LEADERBOARD.slice(0, 3).map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + user.rank * 0.1 }}
                >
                  <Card className={`glass-hover p-6 text-center ${
                    user.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/5' : ''
                  }`}>
                    <div className="text-5xl mb-4">{getRankMedal(user.rank)}</div>
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ')[0][0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{user.name}</h3>
                      {user.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <p className="text-white/60 text-sm mb-4 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {user.location}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Level</span>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {user.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">XP</span>
                        <span className="text-white font-semibold">{user.xp.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Streak</span>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          🔥 {user.streak} days
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="glass p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Global Rankings
              </h3>
              <div className="space-y-3">
                {MOCK_LEADERBOARD.slice(3).map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className={`p-4 rounded-lg transition-all ${
                      user.id === 'current'
                        ? 'glass border-2 border-primary bg-primary/5'
                        : 'glass-hover'
                    }`}>
                      <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className={`text-2xl font-bold w-12 text-center ${getRankColor(user.rank)}`}>
                          #{user.rank}
                        </div>

                        {/* Avatar */}
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold text-white truncate">{user.name}</h4>
                            {user.isPremium && <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {user.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-400" />
                              {user.streak}d
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden md:flex items-center gap-6 text-right">
                          <div>
                            <p className="text-sm text-white/60 mb-1">Level</p>
                            <Badge className="bg-primary/20 text-primary border-primary/30">
                              {user.level}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-white/60 mb-1">Total XP</p>
                            <p className="text-white font-semibold">{user.xp.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACHIEVEMENTS.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`glass-hover p-6 ${
                    achievement.unlocked ? 'border-primary/30' : 'opacity-70'
                  } ${getRarityColor(achievement.rarity)}`}>
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`text-5xl ${!achievement.unlocked && 'grayscale'}`}>
                        {achievement.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-white/60 mb-3">
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              ✓ Unlocked
                            </Badge>
                          )}
                        </div>

                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white/60">Progress</span>
                            <span className="text-sm text-white font-semibold">{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>

                        {/* Reward */}
                        <div className="flex items-center justify-between">
                          <Badge className={`capitalize ${getRarityColor(achievement.rarity)} border`}>
                            {achievement.rarity}
                          </Badge>
                          <div className="flex items-center gap-1 text-primary">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold">+{achievement.xpReward} XP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Achievement Stats */}
            <Card className="glass p-6 mt-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Your Progress
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">
                    {ACHIEVEMENTS.filter(a => a.unlocked).length}
                  </p>
                  <p className="text-white/60 text-sm">Unlocked</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">
                    {ACHIEVEMENTS.length}
                  </p>
                  <p className="text-white/60 text-sm">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">
                    {ACHIEVEMENTS.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0)}
                  </p>
                  <p className="text-white/60 text-sm">XP Earned</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">
                    {Math.round((ACHIEVEMENTS.filter(a => a.unlocked).length / ACHIEVEMENTS.length) * 100)}%
                  </p>
                  <p className="text-white/60 text-sm">Completion</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Rewards Shop Tab */}
          <TabsContent value="rewards">
            <Card className="glass p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Your XP Balance</h3>
                  <p className="text-white/60">Spend XP on exclusive rewards and features</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold text-primary mb-1">{currentUser.xp.toLocaleString()}</p>
                  <p className="text-white/60 text-sm">Available XP</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REWARDS.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`glass-hover p-6 text-center ${
                    reward.locked ? 'opacity-50' : ''
                  }`}>
                    <div className="text-5xl mb-4">{reward.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{reward.name}</h4>
                    <Badge className="mb-4 capitalize bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {reward.type}
                    </Badge>
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Zap className="w-5 h-5" />
                        <span className="text-2xl font-bold">{reward.cost}</span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">XP Cost</p>
                    </div>
                    <Button
                      disabled={reward.locked || currentUser.xp < reward.cost}
                      className={`w-full ${
                        reward.locked || currentUser.xp < reward.cost
                          ? 'bg-white/10 text-white/40'
                          : 'bg-primary hover:bg-primary/90 text-white'
                      }`}
                    >
                      {reward.locked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Locked
                        </>
                      ) : currentUser.xp < reward.cost ? (
                        'Not Enough XP'
                      ) : (
                        'Unlock'
                      )}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
