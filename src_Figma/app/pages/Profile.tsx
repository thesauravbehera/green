import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Settings, Bell, Heart, Award, TrendingUp, Calendar, 
  LogOut, Edit, Camera, Shield, Globe, Moon, Mail, Phone,
  MapPin, Crown, Star, Zap, Lock, CreditCard
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const user = {
    id: '1',
    displayName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, Karnataka',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    joinedDate: 'Jan 2024',
    level: 12,
    xp: 12450,
    xpForNextLevel: 13000,
    streak: 21,
    role: 'premium',
    stats: {
      plantsOwned: 24,
      tasksCompleted: 187,
      communityPosts: 45,
      helpfulVotes: 152,
    },
    achievements: [
      { id: '1', name: 'Green Thumb', icon: '🌱', earned: true },
      { id: '2', name: 'Week Warrior', icon: '🔥', earned: true },
      { id: '3', name: 'Plant Parent', icon: '🌿', earned: true },
      { id: '4', name: 'Community Hero', icon: '⭐', earned: true },
      { id: '5', name: 'Expert Gardener', icon: '🏆', earned: false },
    ],
    preferences: {
      language: 'en',
      notifications: {
        email: true,
        push: true,
        taskReminders: true,
        communityUpdates: false,
        marketingEmails: false,
      },
      theme: 'dark',
      units: {
        temperature: 'celsius',
        measurement: 'metric',
      },
    },
  };

  const [preferences, setPreferences] = useState(user.preferences);

  const updatePreference = (category: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [key]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-primary">
                  <AvatarImage src={user.photoURL} alt={user.displayName} />
                  <AvatarFallback className="text-3xl">
                    {user.displayName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary hover:bg-primary/90 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
                {user.role === 'premium' && (
                  <div className="absolute -top-2 -right-2 p-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/30">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                  {user.role === 'premium' && (
                    <Badge className="bg-yellow-500 text-black border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-white/60 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                </div>

                {/* Level & Streak */}
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                    <Star className="w-4 h-4 mr-1" />
                    Level {user.level}
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-2">
                    🔥 {user.streak} Day Streak
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                    {user.xp.toLocaleString()} XP
                  </Badge>
                </div>

                {/* XP Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Progress to Level {user.level + 1}</span>
                    <span className="text-sm text-white/80">
                      {user.xp.toLocaleString()} / {user.xpForNextLevel.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500"
                      style={{ width: `${(user.xp / user.xpForNextLevel) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={`${
                  isEditing ? 'bg-primary' : 'glass border border-white/10'
                } hover:bg-primary/90 text-white`}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="glass p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{user.stats.plantsOwned}</p>
            <p className="text-sm text-white/60">Plants Owned</p>
          </Card>

          <Card className="glass p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{user.stats.tasksCompleted}</p>
            <p className="text-sm text-white/60">Tasks Done</p>
          </Card>

          <Card className="glass p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{user.stats.communityPosts}</p>
            <p className="text-sm text-white/60">Posts</p>
          </Card>

          <Card className="glass p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{user.stats.helpfulVotes}</p>
            <p className="text-sm text-white/60">Helpful Votes</p>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="glass border border-white/10 p-1 w-full justify-start overflow-x-auto mb-6">
              <TabsTrigger value="achievements" className="data-[state=active]:bg-primary">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-primary">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card className="glass p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Your Achievements
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {user.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border text-center transition-all ${
                        achievement.earned
                          ? 'glass-hover border-primary/30 bg-primary/10'
                          : 'border-white/10 bg-white/5 opacity-50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{achievement.icon}</div>
                      <p className="text-sm font-semibold text-white">{achievement.name}</p>
                      {achievement.earned && (
                        <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                          ✓ Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Display Name</label>
                      <Input
                        defaultValue={user.displayName}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Email</label>
                      <Input
                        defaultValue={user.email}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Phone</label>
                      <Input
                        defaultValue={user.phone}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Location</label>
                      <Input
                        defaultValue={user.location}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </Card>

                {/* Preferences */}
                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Language</label>
                      <select 
                        value={preferences.language}
                        onChange={(e) => updatePreference('language', '', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="kn">ಕನ್ನಡ (Kannada)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Temperature Unit</label>
                      <select 
                        value={preferences.units.temperature}
                        onChange={(e) => updatePreference('units', 'temperature', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      >
                        <option value="celsius">Celsius (°C)</option>
                        <option value="fahrenheit">Fahrenheit (°F)</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="glass p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </h3>
                <div className="space-y-6">
                  {Object.entries(preferences.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <div>
                        <p className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm text-white/60 mt-1">
                          {key === 'email' && 'Receive updates via email'}
                          {key === 'push' && 'Get push notifications on your device'}
                          {key === 'taskReminders' && 'Daily reminders for plant care tasks'}
                          {key === 'communityUpdates' && 'Updates from community posts'}
                          {key === 'marketingEmails' && 'Promotional offers and newsletters'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => updatePreference('notifications', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Current Password</label>
                      <Input
                        type="password"
                        placeholder="Enter current password"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block">Confirm New Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Update Password
                    </Button>
                  </div>
                </Card>

                <Card className="glass p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Premium Subscription
                  </h3>
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-400 font-semibold mb-1">Premium Member</p>
                        <p className="text-sm text-white/60">Your subscription renews on May 15, 2024</p>
                      </div>
                      <Crown className="w-8 h-8 text-yellow-400" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="glass border-white/10 text-white hover:bg-white/10">
                      Manage Subscription
                    </Button>
                    <Button variant="outline" className="glass border-white/10 text-white hover:bg-white/10">
                      Billing History
                    </Button>
                  </div>
                </Card>

                <Card className="glass p-6 border-red-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <LogOut className="w-5 h-5 text-red-400" />
                    Danger Zone
                  </h3>
                  <p className="text-white/60 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                    Delete Account
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};
