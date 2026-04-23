import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Leaf, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export const MobileLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    {
      email: 'demo@bloomify.io',
      password: 'bloomify2024',
      name: 'Demo User',
      type: 'Free Account',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      email: 'premium@bloomify.io',
      password: 'premium2024',
      name: 'Premium User',
      type: 'Premium Account',
      color: 'from-purple-500 to-pink-500'
    },
    {
      email: 'admin@bloomify.io',
      password: 'bloomify2026',
      name: 'Admin',
      type: 'Admin Access',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    try {
      setLoading(true);
      await login(demoEmail, demoPassword);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-white/60 text-center">
          Sign in to continue your garden journey
        </p>
      </motion.div>

      {/* Demo Accounts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <p className="text-white/60 text-sm mb-4 text-center">Quick Demo Login</p>
        <div className="space-y-3">
          {demoAccounts.map((account, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => handleDemoLogin(account.email, account.password)}
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${account.color} flex items-center justify-center flex-shrink-0`}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-semibold">{account.name}</p>
                  <p className="text-white/60 text-sm">{account.type}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-white/40" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-white/40 text-sm">or sign in with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Login Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleLogin}
        className="space-y-4 mb-6"
      >
        <div>
          <label className="block text-white/60 text-sm mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </motion.form>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-auto text-center space-y-4"
      >
        <button className="text-primary text-sm">
          Forgot password?
        </button>
        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
          <span>Don't have an account?</span>
          <button
            onClick={() => navigate('/signup')}
            className="text-primary font-semibold"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
};
