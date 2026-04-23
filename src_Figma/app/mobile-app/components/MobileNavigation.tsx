import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, Leaf, Bell, Calendar, User } from 'lucide-react';
import { motion } from 'motion/react';

export const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navigation on public pages
  const publicPaths = ['/', '/login', '/signup', '/onboarding'];
  if (publicPaths.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Leaf, label: 'Garden', path: '/garden' },
    { icon: Calendar, label: 'Tasks', path: '/planner' },
    { icon: Bell, label: 'Alerts', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 z-50"
    >
      <div className="flex items-center justify-around px-2 py-3 safe-area-bottom">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 min-w-[60px]"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative">
                <Icon className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-white/60'
                }`} />
                {item.label === 'Alerts' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </div>
              
              <span className={`text-xs font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-white/60'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};
