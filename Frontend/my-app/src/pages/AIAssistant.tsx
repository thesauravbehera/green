import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Send, Mic, Image as ImageIcon, Camera, Leaf,
  MessageSquare, Brain, Lightbulb, AlertCircle, CheckCircle2,
  Droplets, Sun, Bug, Sprout, BookOpen
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'Hello! I\'m Nexus, your AI gardening assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['Identify plant', 'Diagnose issue', 'Care tips', 'Watering schedule']
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history: messages })
      });
      const data = await response.json();
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        diagnosis: data.diagnosis,
        suggestions: data.suggestions
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: 'Sorry, I am having trouble connecting to my neural network right now. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick actions
  const quickActions = [
    {
      title: 'Identify Plant',
      description: 'Upload a photo to identify species',
      icon: Camera,
      color: 'from-green-500 to-emerald-500',
      action: 'identify'
    },
    {
      title: 'Diagnose Issue',
      description: 'Get help with plant problems',
      icon: Bug,
      color: 'from-red-500 to-orange-500',
      action: 'diagnose'
    },
    {
      title: 'Care Guide',
      description: 'Get personalized care instructions',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      action: 'care'
    },
    {
      title: 'Ask Question',
      description: 'Any gardening question answered',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      action: 'question'
    }
  ];

  // Smart recommendations
  const recommendations = [
    {
      title: 'Water Schedule Optimization',
      description: 'Your basil needs water every 2 days based on current weather',
      icon: Droplets,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      confidence: 95
    },
    {
      title: 'Nutrient Boost Suggested',
      description: 'Add nitrogen-rich fertilizer to improve tomato growth',
      icon: Sprout,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      confidence: 88
    },
    {
      title: 'Companion Planting Tip',
      description: 'Plant marigolds near tomatoes to deter pests naturally',
      icon: Lightbulb,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      confidence: 92
    }
  ];

  // Knowledge base articles
  const knowledgeBase = [
    {
      category: 'Basics',
      title: 'Understanding Soil pH',
      description: 'Learn how pH affects plant growth',
      readTime: '5 min read'
    },
    {
      category: 'Advanced',
      title: 'Companion Planting Guide',
      description: 'Maximize your garden with strategic planting',
      readTime: '8 min read'
    },
    {
      category: 'Troubleshooting',
      title: 'Common Pest Problems',
      description: 'Identify and treat garden pests organically',
      readTime: '6 min read'
    }
  ];

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
                <Sparkles className="w-10 h-10 text-primary" />
                AI Assistant
              </h1>
              <p className="text-white/60">
                Your intelligent gardening companion powered by AI
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/30">
              <Brain className="w-4 h-4 mr-2" />
              AI Powered
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMessage(`I want to ${action.title.toLowerCase()}`);
                  setTimeout(() => document.querySelector('input')?.focus(), 100);
                }}
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">{action.title}</h3>
                <p className="text-white/60 text-xs">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-lg border border-white/10 mb-6">
                <TabsTrigger
                  value="chat"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="knowledge"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white text-white/60"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Knowledge Base
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-0">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  {/* Chat Messages */}
                  <div className="h-[600px] overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                          {msg.type === 'ai' && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
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
                            
                            {/* Diagnosis Section */}
                            {msg.diagnosis && (
                              <div className="mt-4 space-y-3">
                                <div className="space-y-2">
                                  {msg.diagnosis.possibleCauses.map((cause: any, i: number) => {
                                    const Icon = cause.icon;
                                    return (
                                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                                        <Icon className="w-5 h-5 text-primary" />
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold">{cause.name}</span>
                                            <span className="text-xs text-white/60">{cause.probability}%</span>
                                          </div>
                                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-primary rounded-full"
                                              style={{ width: `${cause.probability}%` }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                                  <div className="flex items-start gap-2">
                                    <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                      <h4 className="font-semibold text-sm mb-1">Recommendation</h4>
                                      <p className="text-xs text-white/80">{msg.diagnosis.recommendation}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Suggestions */}
                            {msg.suggestions && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {msg.suggestions.map((suggestion: string, i: number) => (
                                  <button
                                    key={i}
                                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs transition-colors"
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

                  {/* Input Area */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                      >
                        <Camera className="w-5 h-5" />
                      </Button>
                      <Input
                        placeholder="Ask me anything about gardening..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            sendMessage();
                          }
                        }}
                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        disabled={isLoading}
                      />
                      <Button
                        size="icon"
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="knowledge" className="mt-0">
                <div className="space-y-3">
                  {knowledgeBase.map((article, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <Badge className="bg-primary/10 text-primary border-primary/30 mb-2 text-xs">
                              {article.category}
                            </Badge>
                            <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                            <p className="text-white/60 text-sm mb-3">{article.description}</p>
                            <p className="text-white/40 text-xs">{article.readTime}</p>
                          </div>
                          <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Smart Recommendations */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Smart Recommendations
                </h3>
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => {
                    const Icon = rec.icon;
                    return (
                      <div key={idx} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-lg ${rec.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${rec.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm mb-1">{rec.title}</h4>
                            <p className="text-white/60 text-xs mb-2">{rec.description}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${rec.confidence}%` }}
                                />
                              </div>
                              <span className="text-xs text-white/60">{rec.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* AI Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-primary/10 backdrop-blur-sm border-primary/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">AI Insights</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Questions Answered</p>
                    <p className="text-white font-bold text-2xl">247</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Accuracy Rate</p>
                    <p className="text-white font-bold text-2xl">94.5%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Plants Identified</p>
                    <p className="text-white font-bold text-2xl">156</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
