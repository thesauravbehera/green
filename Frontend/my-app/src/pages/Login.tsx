import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Leaf, 
  Sparkles, AlertCircle, CheckCircle2, Loader2 
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Demo credentials
  const demoAccounts = [
    {
      email: 'demo@bloomify.io',
      password: 'bloomify2024',
      name: 'Demo User',
      badge: 'Regular User',
      color: 'bg-blue-500',
    },
    {
      email: 'premium@bloomify.io',
      password: 'premium2024',
      name: 'Premium User',
      badge: 'Premium',
      color: 'bg-yellow-500',
    },
    {
      email: 'admin@bloomify.io',
      password: 'bloomify2026',
      name: 'Admin',
      badge: 'Admin',
      color: 'bg-red-500',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const account = demoAccounts.find(
        acc => acc.email === formData.email && acc.password === formData.password
      );

      if (account) {
        // Store user data in localStorage for demo
        localStorage.setItem('bloomify_user', JSON.stringify({
          email: account.email,
          name: account.name,
          isAuthenticated: true,
        }));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try one of the demo accounts below.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Bloomify</h1>
                  <p className="text-white/60">Your Smart Garden Companion</p>
                </div>
              </div>

              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Welcome back to your{' '}
                <span className="text-premium">green paradise</span>
              </h2>

              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Continue your journey to becoming a master gardener. Track your plants, 
                complete daily care tasks, and connect with a thriving community of plant lovers.
              </p>

              <div className="space-y-4">
                {[
                  { icon: '🌱', text: 'AI-powered plant care advice' },
                  { icon: '📊', text: 'Real-time weather integration' },
                  { icon: '🏆', text: 'Gamified gardening experience' },
                  { icon: '🌿', text: '1000+ plant database' },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                      {feature.icon}
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">Sign In</h3>
              <p className="text-white/60">
                Enter your credentials to access your garden
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                  />
                  <span className="text-white/60 text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-primary text-sm hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-sm">Or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              >
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-white/60">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Sign Up
              </button>
            </p>
          </Card>

          {/* Demo Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Card className="bg-primary/10 backdrop-blur-sm border-primary/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="text-white font-semibold">Demo Accounts</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Click any account below to auto-fill credentials:
              </p>
              <div className="space-y-3">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center text-white font-bold`}>
                          {account.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{account.name}</p>
                          <p className="text-white/60 text-xs">{account.email}</p>
                        </div>
                      </div>
                      <Badge className={`${account.color} text-white border-0`}>
                        {account.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">Password: {account.password}</span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
