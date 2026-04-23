import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";
import { Leaf, Mail, Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { registerUser } from "../lib/auth/register";
import { loginUser, loginWithGoogle, loginWithGithub } from "../lib/auth/login";
import { sendPasswordReset } from "../lib/auth/passwordReset";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { loginAsDemo } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check for Demo Admin Bypass with trimming
    const emailLower = loginForm.email.trim().toLowerCase();
    const passwordTrim = loginForm.password.trim();

    if (emailLower === "admin@bloomify.io" && passwordTrim === "bloomify2026") {
      setTimeout(() => {
        loginAsDemo('admin');
        toast.success("Nexus Admin Override Successful", {
          description: "Authenticated via bypass protocol",
        });
        setIsLoading(false);
        onClose();
      }, 1000);
      return;
    }

    // Check for Guest/Demo User Bypass
    if (emailLower === "guest@bloomify.io") {
      setTimeout(() => {
        loginAsDemo('user');
        toast.success("Demo User Access Granted", {
          description: "Logged in as Guest Gardener",
        });
        setIsLoading(false);
        onClose();
      }, 1000);
      return;
    }
    
    try {
      const result = await loginUser(loginForm);
      
      if (result.success && result.user) {
        toast.success("Welcome back to Bloomify!", {
          description: `Logged in as ${result.user.email}`,
        });
        onClose();
        setLoginForm({ email: "", password: "" });
        setShowPassword(false);
      } else {
        toast.error("Login Failed", {
          description: result.error || "Please check your credentials and try again.",
        });
      }
    } catch (error: any) {
      toast.error("Login Failed", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await registerUser(signupForm);
      
      if (result.success && result.user) {
        toast.success("Welcome to Bloomify!", {
          description: "Your account has been created successfully. Please check your email for verification.",
        });
        onClose();
        setSignupForm({ name: "", email: "", password: "" });
        setShowPassword(false);
        setActiveTab("login");
      } else {
        toast.error("Registration Failed", {
          description: result.error || "Please try again.",
        });
      }
    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "Google" | "GitHub") => {
    setIsLoading(true);
    
    try {
      let result;
      
      if (provider === "Google") {
        result = await loginWithGoogle();
      } else {
        result = await loginWithGithub();
      }
      
      if (result.success && result.user) {
        toast.success(`Welcome to Bloomify!`, {
          description: `Signed in with ${provider}`,
        });
        onClose();
        setLoginForm({ email: "", password: "" });
        setSignupForm({ name: "", email: "", password: "" });
        setShowPassword(false);
      } else {
        toast.error(`${provider} Login Failed`, {
          description: result.error || "Please try again.",
        });
      }
    } catch (error: any) {
      toast.error(`${provider} Login Failed`, {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden max-h-[90vh] overflow-y-auto bg-[#020617] border-2 border-emerald-500/20 text-white">
        {/* Radix Accessibility Headers (Hidden) */}
        <div className="sr-only">
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>Login or create an account to access Bloomify Nexus</DialogDescription>
        </div>

        {/* Decorative Header */}
        <div className="relative h-28 bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Leaf className="w-8 h-8 text-emerald-400" />
            </motion.div>
          </div>
        </div>

        <div className="px-8 pb-10 pt-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/5 p-1 rounded-2xl border border-white/10">
              <TabsTrigger 
                value="login" 
                className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-black data-[state=active]:font-black uppercase text-[10px] tracking-widest transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-black data-[state=active]:font-black uppercase text-[10px] tracking-widest transition-all"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0 space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold font-['Clash_Display'] uppercase tracking-tight">Nexus Entry</h2>
                <p className="text-white/40 text-sm font-medium">Synchronize your botanical profile</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] ml-1">
                    Identification Unit (Email)
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="admin@bloomify.io"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="h-14 pl-12 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-2xl transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="login-password" className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em]">
                      Access Protocol (Password)
                    </Label>
                    <button
                      type="button"
                      className="text-[10px] font-bold text-white/30 hover:text-emerald-400 uppercase tracking-widest transition-colors"
                      onClick={() => toast.info("Check background for credentials", { description: "admin@bloomify.io / bloomify2026" })}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="h-14 pl-12 pr-12 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-2xl transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:scale-[1.02] transition-transform shadow-2xl shadow-white/5" disabled={isLoading}>
                  {isLoading ? "PROCESING..." : "INITIALIZE SYNC"}
                </Button>
              </form>

              {/* Explicit Admin Access Button */}
              <Button 
                onClick={() => {
                  setLoginForm({ email: "admin@bloomify.io", password: "bloomify2026" });
                  toast.success("Credentials Pre-filled", { description: "Click Initialize Sync to enter as Admin" });
                }}
                variant="outline" 
                className="w-full h-14 border-emerald-500/30 text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-emerald-500/10"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                ADMIN OVERRIDE ACCESS
              </Button>

              {/* Guest Access Button */}
              <Button 
                onClick={() => {
                  setLoginForm({ email: "guest@bloomify.io", password: "demo" });
                  toast.success("Guest Credentials Pre-filled", { description: "Click Initialize Sync to enter as Guest" });
                }}
                variant="outline" 
                className="w-full h-14 border-blue-500/30 text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-blue-500/10"
              >
                <User className="w-4 h-4 mr-2" />
                GUEST DEMO ACCESS
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><Separator className="bg-white/10" /></div>
                <div className="relative flex justify-center"><span className="bg-[#020617] px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">OR SOCIAL</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="ghost" className="h-14 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest" onClick={() => handleSocialLogin("Google")}>
                  GOOGLE
                </Button>
                <Button variant="ghost" className="h-14 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest" onClick={() => handleSocialLogin("GitHub")}>
                  GITHUB
                </Button>
              </div>

              {/* Info Card */}
              <div className="mt-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] mb-2">DEMO ACCESS</p>
                <p className="text-xs text-white/60 leading-relaxed">
                  Use <span className="text-emerald-400 font-bold">Admin Override</span> for full system access or <span className="text-blue-400 font-bold">Guest Demo</span> to explore features. No Firebase required for demo accounts.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="mt-0 space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold font-['Clash_Display'] uppercase tracking-tight">New Node</h2>
                <p className="text-white/40 text-sm font-medium">Initialize your gardening instance</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] ml-1">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="Operator Name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    className="h-14 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-2xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] ml-1">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="node@nexus.io"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    className="h-14 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-2xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em] ml-1">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="h-14 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-2xl"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-14 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-emerald-400">
                  CREATE PROFILE
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}