import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  currentUser: any | null; // Changed to any to support mock users
  loading: boolean;
  userLoggedIn: boolean;
  loginAsDemo: (role: 'admin' | 'user') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  userLoggedIn: false,
  loginAsDemo: () => {},
  logout: () => {}
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loginAsDemo = (role: 'admin' | 'user') => {
    const mockUser = {
      uid: role === 'admin' ? 'demo-admin-id' : 'demo-user-id',
      email: role === 'admin' ? 'admin@bloomify.io' : 'guest@bloomify.io',
      displayName: role === 'admin' ? 'NEXUS ADMIN' : 'GUEST GARDENER',
      photoURL: null,
      role: role
    };
    setCurrentUser(mockUser);
    localStorage.setItem('bloomify_demo_user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error("Firebase signout error", e);
    }
    setCurrentUser(null);
    localStorage.removeItem('bloomify_demo_user');
    localStorage.removeItem('bloomify_user'); // Also remove the new login/signup user
  };

  useEffect(() => {
    // Check for demo user in local storage first (new login/signup flow)
    const savedUser = localStorage.getItem('bloomify_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.isAuthenticated) {
        // Convert to auth format
        const authUser = {
          uid: userData.email,
          email: userData.email,
          displayName: userData.name || 'User',
          photoURL: null,
        };
        setCurrentUser(authUser);
        setLoading(false);
        return;
      }
    }

    // Check for old demo user format
    const savedDemoUser = localStorage.getItem('bloomify_demo_user');
    if (savedDemoUser) {
      setCurrentUser(JSON.parse(savedDemoUser));
      setLoading(false);
      return;
    }

    console.log("🔐 AuthContext: Setting up auth state listener...");
    
    let timeoutCleared = false;
    
    const timeout = setTimeout(() => {
      if (loading && !timeoutCleared) {
        console.warn("⚠️ Firebase auth initialization timeout, loading app anyway");
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, 
      (user) => {
        timeoutCleared = true;
        clearTimeout(timeout);
        
        if (user) {
          console.log("✅ AuthContext: User logged in:", user.uid);
          setCurrentUser(user);
        } else {
          console.log("❌ AuthContext: No user logged in");
          setCurrentUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("❌ Auth state change error:", error);
        timeoutCleared = true;
        clearTimeout(timeout);
        setLoading(false);
      }
    );

    return () => {
      timeoutCleared = true;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    userLoggedIn: !!currentUser,
    loginAsDemo,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#020617]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-emerald-500/60 font-black uppercase tracking-[0.2em] text-xs">Synchronizing Nexus...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}