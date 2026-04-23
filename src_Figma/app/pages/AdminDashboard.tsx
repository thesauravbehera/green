import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Users, 
  Sprout, 
  Activity, 
  AlertTriangle, 
  Database, 
  Globe, 
  TrendingUp,
  Cpu,
  Lock,
  ChevronRight,
  MoreVertical,
  Search,
  CheckCircle2,
  XCircle,
  BarChart3
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function AdminDashboard() {
  const { currentUser, userLoggedIn } = useAuth();
  
  // Guard clause: Only allow demo-admin or users with admin role
  if (!userLoggedIn || currentUser?.email !== 'admin@bloomify.io') {
    return <Navigate to="/" replace />;
  }

  const [systemLogs] = useState([
    { id: 1, event: "DATABASE_SYNC", target: "PLANT_CATALOG_V2", status: "SUCCESS", time: "12:45:01" },
    { id: 2, event: "USER_AUTHENTICATION", target: "u_88291_ALPHA", status: "BEYPASS_ACTIVE", time: "12:44:30" },
    { id: 3, event: "AI_DIAGNOSIS_INIT", target: "PLANT_DOCTOR_CORE", status: "SUCCESS", time: "12:42:15" },
    { id: 4, event: "SYSTEM_ALERT", target: "NODE_MUMBAI_04", status: "WARNING", time: "12:40:00" },
    { id: 5, event: "PROTOCOL_UPDATE", target: "MONSOON_V4.2", status: "DEPLOYED", time: "12:35:12" }
  ]);

  const [users] = useState([
    { id: 'u1', name: "ROHAN GUPTA", level: 45, status: "ACTIVE", lastLogin: "02M AGO", region: "BENGALURU" },
    { id: 'u2', name: "ANANYA SHARMA", level: 32, status: "ACTIVE", lastLogin: "15M AGO", region: "MUMBAI" },
    { id: 'u3', name: "VIKRAM SINGH", level: 12, status: "OFFLINE", lastLogin: "04H AGO", region: "DELHI" },
    { id: 'u4', name: "PRIYA K.", level: 58, status: "ACTIVE", lastLogin: "JUST NOW", region: "CHENNAI" }
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 px-6 selection:bg-emerald-500 font-['Inter']">
      <div className="container mx-auto max-w-7xl">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                SYSTEM ROOT ACCESS
              </Badge>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-['Clash_Display']">
              ADMIN <span className="text-emerald-500">NEXUS.</span>
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="h-16 px-8 rounded-2xl border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/5">
              <Database className="w-4 h-4 mr-3" />
              FLUSH CACHE
            </Button>
            <Button className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl shadow-white/5">
              <Shield className="w-4 h-4 mr-3" />
              SECURITY LOGS
            </Button>
          </div>
        </div>

        {/* Tactical Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AdminStat icon={<Users className="text-emerald-400" />} label="ACTIVE NODES" value="52,492" sub="+12% VS WEEK" />
          <AdminStat icon={<Sprout className="text-blue-400" />} label="BIO-UNITS" value="312,084" sub="98.2% HEALTH" />
          <AdminStat icon={<Cpu className="text-purple-400" />} label="AI INFERENCE" value="4.2M" sub="0.4s LATENCY" />
          <AdminStat icon={<Globe className="text-amber-400" />} label="REGIONAL COVERAGE" value="14 ZONES" sub="SOUTH ASIA ACTIVE" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* System Control Panel */}
          <div className="lg:col-span-2 space-y-10">
            <Card className="p-10 bg-white/5 border-white/5 rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <BarChart3 className="w-64 h-64" />
              </div>
              <div className="flex items-center justify-between mb-10 relative z-10">
                <h2 className="text-2xl font-bold font-['Clash_Display'] uppercase tracking-tight">Node Management</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input placeholder="SEARCH NODES..." className="pl-12 h-12 bg-white/5 border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest w-64" />
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center font-bold text-emerald-400">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold uppercase tracking-tight font-['Clash_Display']">{user.name}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">LEVEL {user.level}</span>
                          <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest">{user.region}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">LAST ACCESS</p>
                        <p className="text-xs font-bold text-white/80">{user.lastLogin}</p>
                      </div>
                      <Badge className={user.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/30 border-white/10'}>
                        {user.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="text-white/20 hover:text-white group-hover:bg-white/5">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Core Metrics */}
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="p-8 bg-white/5 border-white/5 rounded-[2.5rem]">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-6">Plant Doctor Performance</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>ACCURACY RATING</span>
                      <span>99.4%</span>
                    </div>
                    <Progress value={99.4} className="h-1.5 bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>USER CONFIDENCE</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-1.5 bg-white/5" />
                  </div>
                </div>
              </Card>
              <Card className="p-8 bg-white/5 border-white/5 rounded-[2.5rem]">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500/60 mb-6">Marketplace Volume</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>DAILY REVENUE (₹)</span>
                      <span>8.2M</span>
                    </div>
                    <Progress value={78} className="h-1.5 bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>ACTIVE LISTINGS</span>
                      <span>12.5K</span>
                    </div>
                    <Progress value={85} className="h-1.5 bg-white/5" />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Activity Log Console */}
          <div className="space-y-10">
            <Card className="p-8 bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
              <div className="flex items-center gap-3 mb-8">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold font-['Clash_Display'] uppercase tracking-tight">Neural Activity Log</h3>
              </div>
              
              <div className="space-y-6">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex gap-4 group/log">
                    <div className="w-px bg-white/5 relative">
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        log.status === 'WARNING' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      }`} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-white/[0.03]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{log.time}</span>
                        <Badge variant="outline" className={`text-[8px] font-black px-1.5 py-0 border-none ${
                          log.status === 'WARNING' ? 'text-amber-500' : 'text-emerald-500/60'
                        }`}>
                          {log.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-white/90 uppercase tracking-tight mb-1">{log.event}</p>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{log.target}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="w-full mt-6 text-[10px] font-black tracking-[0.2em] uppercase text-emerald-500/60 hover:text-emerald-400">
                VIEW FULL SYSTEM DUMP <ChevronRight className="ml-2 w-3 h-3" />
              </Button>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] px-2">Rapid Deployment</h4>
              <QuickAction icon={<AlertTriangle className="text-amber-400" />} label="GLOBAL BROADCAST" />
              <QuickAction icon={<Database className="text-blue-400" />} label="DATABASE REINDEX" />
              <QuickAction icon={<Lock className="text-red-400" />} label="LOCK DOWN NEXUS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminStat({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <Card className="p-8 bg-white/5 border-white/5 hover:border-emerald-500/30 transition-all duration-500 rounded-[2.5rem] group">
      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
        {icon}
      </div>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold tracking-tighter font-['Clash_Display']">{value}</span>
        <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">{sub}</span>
      </div>
    </Card>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
    </button>
  );
}
