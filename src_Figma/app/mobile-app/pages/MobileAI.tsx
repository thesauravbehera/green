import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Send, Camera, Image as ImageIcon, Mic,
  Lightbulb, Brain, Droplets, Sun, Bug, BookOpen, X
} from 'lucide-react';

export const MobileAI = () => {
  const [message, setMessage] = useState('');
  const [showActions, setShowActions] = useState(false);

  const quickActions = [
    { icon: Camera, label: 'Scan Plant', color: 'from-green-500 to-emerald-500' },
    { icon: Bug, label: 'Diagnose Issue', color: 'from-red-500 to-orange-500' },
    { icon: BookOpen, label: 'Care Guide', color: 'from-blue-500 to-cyan-500' },
    { icon: Droplets, label: 'Water Schedule', color: 'from-cyan-500 to-blue-500' }
  ];

  const messages = [
    {
      id: 1,
      type: 'ai',
      text: 'Hello! I\'m your AI gardening assistant. How can I help you today?',
      time: '10:30 AM',
      suggestions: ['Identify plant', 'Diagnose issue', 'Care tips']
    },
    {
      id: 2,
      type: 'user',
      text: 'My basil leaves are turning yellow',
      time: '10:32 AM'
    },
    {
      id: 3,
      type: 'ai',
      text: 'Yellow basil leaves can be caused by several factors. Let me help diagnose:',
      time: '10:32 AM',
      diagnosis: [
        { name: 'Overwatering', probability: 70, icon: Droplets },
        { name: 'Nutrient Deficiency', probability: 20, icon: Sun },
        { name: 'Too Much Sun', probability: 10, icon: Sun }
      ],
      recommendation: 'Check soil moisture and reduce watering frequency. Consider nitrogen-rich fertilizer.'
    }
  ];

  const recommendations = [
    {
      title: 'Water Schedule',
      description: 'Basil needs water every 2 days',
      icon: Droplets,
      color: 'text-cyan-400',
      confidence: 95
    },
    {
      title: 'Nutrient Boost',
      description: 'Add fertilizer to tomato',
      icon: Sun,
      color: 'text-yellow-400',
      confidence: 88
    },
    {
      title: 'Companion Planting',
      description: 'Plant marigolds near tomatoes',
      icon: Lightbulb,
      color: 'text-green-400',
      confidence: 92
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4 border-b border-white/10 bg-[#020617]/95 backdrop-blur-xl sticky top-0 z-10"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Assistant
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-white/60 text-sm">Online</p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
            <Brain className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/70 text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.type === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/60 text-xs">AI Assistant</span>
                </div>
              )}
              
              <div className={`rounded-2xl p-4 ${
                msg.type === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-white'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {/* Diagnosis */}
                {msg.diagnosis && (
                  <div className="mt-3 space-y-2">
                    {msg.diagnosis.map((cause: any, i: number) => {
                      const Icon = cause.icon;
                      return (
                        <div key={i} className="p-3 rounded-xl bg-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold flex-1">{cause.name}</span>
                            <span className="text-xs text-white/60">{cause.probability}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${cause.probability}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/30">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold text-xs mb-1">Recommendation</p>
                          <p className="text-xs text-white/80">{msg.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.suggestions.map((suggestion: string, i: number) => (
                      <button
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-white/10 text-xs"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-white/40 text-xs mt-1 px-2">{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-3 bg-white/5 backdrop-blur-sm border-t border-white/10"
      >
        <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">Smart Recommendations</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div
                key={idx}
                className="flex-shrink-0 w-48 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${rec.color}`} />
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold mb-1">{rec.title}</p>
                    <p className="text-white/60 text-xs">{rec.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/60">{rec.confidence}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-[#020617] border-t border-white/10">
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
            <ImageIcon className="w-5 h-5 text-white/60" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
            <Camera className="w-5 h-5 text-white/60" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
