import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Menu, X, Play, UserCircle2, LogOut, Users, Sparkles, Camera, Trophy, LayoutDashboard, Sprout, ShoppingCart, ChevronRight, Languages, ShieldCheck } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, userLoggedIn, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Nexus Session Terminated", { description: "You have been logged out." });
    navigate("/");
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return currentUser?.email?.charAt(0).toUpperCase() || "U";
  };

  const navItems = [
    { label: 'Home', href: "/", icon: null },
    { label: 'Space Analysis', href: "/space-analysis", icon: null },
    { label: 'Plant Catalog', href: "/plant-catalog", icon: null },
    { label: 'My Plants', href: "/my-plants", icon: null, protected: true },
    { label: 'Care Guide', href: "/care-guide", icon: null },
    { label: 'Community', href: "/community", icon: Users },
    { label: 'Shop', href: "/shop", icon: ShoppingCart },
    { label: 'Sell', href: "/sell", icon: ShoppingCart } // We can use Store or similar icon if available, but keeping it simple for now
  ];

  const isAdmin = currentUser?.email === 'admin@bloomify.io';

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className={`glass px-8 h-16 rounded-full flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-[#020617]/80 border-emerald-500/20 shadow-xl backdrop-blur-xl" : "bg-[#020617] border-white/5"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group mr-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-emerald-500/20">
              <Leaf className="w-4 h-4 text-[#020617]" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Bloomify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            {navItems.map((item) => {
              if (item.protected && !userLoggedIn) return null;
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-all relative py-5 ${
                    isActive ? "text-emerald-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/5 rounded-full">
                  <Languages className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#020617] border-white/10 text-white min-w-[120px] rounded-2xl">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="rounded-xl cursor-pointer hover:bg-white/5">English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')} className="rounded-xl cursor-pointer hover:bg-white/5">हिन्दी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('kn')} className="rounded-xl cursor-pointer hover:bg-white/5">ಕನ್ನಡ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ta')} className="rounded-xl cursor-pointer hover:bg-white/5">தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {userLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-1.5 pl-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">{currentUser?.displayName?.split(' ')[0] || "OPERATOR"}</span>
                    <Avatar className="w-8 h-8 border border-emerald-500/30">
                      <AvatarImage src={currentUser?.photoURL || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-[10px] font-bold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-[#020617] border border-white/10 text-white p-2 rounded-3xl shadow-2xl">
                  <DropdownMenuLabel className="px-5 py-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold tracking-tight uppercase font-['Clash_Display']">{currentUser?.displayName || "Node Operator"}</p>
                      <p className="text-[10px] text-emerald-500/60 truncate uppercase tracking-widest font-black">{currentUser?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild className="rounded-2xl focus:bg-white/5 focus:text-white transition-colors cursor-pointer py-4 px-5">
                    <Link to="/profile">
                      <UserCircle2 className="w-4 h-4 mr-4 text-emerald-400" /> <span className="text-xs font-bold uppercase tracking-widest">Profile Configuration</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="rounded-2xl focus:bg-emerald-500/10 focus:text-emerald-400 transition-colors cursor-pointer py-4 px-5">
                      <Link to="/admin">
                        <ShieldCheck className="w-4 h-4 mr-4 text-emerald-500" /> <span className="text-xs font-bold uppercase tracking-widest">Admin Nexus</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="rounded-2xl focus:bg-red-500/10 focus:text-red-400 transition-colors cursor-pointer py-4 px-5 text-red-500">
                    <LogOut className="w-4 h-4 mr-4" /> <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className="text-white/40 hover:text-white hover:bg-white/5 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-white text-black hover:bg-white/90 font-black px-8 rounded-2xl shadow-xl shadow-white/5 transition-all active:scale-95 text-[10px] uppercase tracking-widest h-12"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white glass rounded-xl border-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#020617] shadow-2xl z-50 p-10 border-l border-white/10"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-bold tracking-tighter text-white font-['Clash_Display']">BLOOMIFY</span>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center justify-between text-2xl font-bold text-white/40 hover:text-white transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-['Clash_Display'] uppercase tracking-tight group-hover:translate-x-4 transition-transform">{item.label}</span>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:text-emerald-400" />
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between text-2xl font-bold text-emerald-500/60 hover:text-emerald-400 transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-['Clash_Display'] uppercase tracking-tight flex items-center gap-4">
                    <ShieldCheck className="w-6 h-6" />
                    ADMIN
                  </span>
                </Link>
              )}
            </div>

            <div className="absolute bottom-12 left-10 right-10 space-y-4">
              {userLoggedIn ? (
                <Button onClick={handleLogout} variant="outline" className="w-full border-white/10 text-white py-8 rounded-2xl font-black uppercase tracking-widest text-xs">
                  Terminate Session
                </Button>
              ) : (
                <>
                  <Button onClick={() => { navigate('/login'); setIsOpen(false); }} variant="outline" className="w-full border-white/10 text-white py-8 rounded-2xl font-black uppercase tracking-widest text-xs">
                    SIGN IN
                  </Button>
                  <Button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="w-full bg-white text-black py-8 font-black rounded-2xl tracking-[0.2em] text-xs">
                    GET STARTED
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.nav>
  );
}