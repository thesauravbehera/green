import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isPremium?: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('bloomify_mobile_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Demo account logic
    const demoAccounts = {
      'demo@bloomify.io': {
        uid: 'demo-123',
        email: 'demo@bloomify.io',
        displayName: 'Demo User',
        photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        isPremium: false,
        isAdmin: false
      },
      'premium@bloomify.io': {
        uid: 'premium-456',
        email: 'premium@bloomify.io',
        displayName: 'Premium User',
        photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        isPremium: true,
        isAdmin: false
      },
      'admin@bloomify.io': {
        uid: 'admin-789',
        email: 'admin@bloomify.io',
        displayName: 'Admin',
        photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        isPremium: true,
        isAdmin: true
      }
    };

    const user = demoAccounts[email as keyof typeof demoAccounts];
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('bloomify_mobile_user', JSON.stringify(user));
      return;
    }

    throw new Error('Invalid credentials');
  };

  const signup = async (email: string, password: string, displayName: string) => {
    const newUser: User = {
      uid: `user-${Date.now()}`,
      email,
      displayName,
      isPremium: false,
      isAdmin: false
    };
    setCurrentUser(newUser);
    localStorage.setItem('bloomify_mobile_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bloomify_mobile_user');
    navigate('/');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
