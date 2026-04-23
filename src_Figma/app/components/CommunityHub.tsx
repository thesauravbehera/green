import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Image as ImageIcon, 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  TrendingUp,
  Search,
  X,
  ChevronRight,
  ArrowUpRight,
  Filter,
  MapPin
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useAuth } from "../contexts/AuthContext";

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userLevel: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
  location: string;
  createdAt: Date;
}

const SAMPLE_POSTS: Post[] = [
  { id: '1', userId: 'u1', userName: 'ROHAN GUPTA', userLevel: 'ELITE GARDENER', caption: 'Monsoon drainage matrix looking solid in Bengaluru. Tulsi thriving with zero senescent foliage.', imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800', likes: 342, comments: 28, shares: 15, location: 'BENGALURU', createdAt: new Date() },
  { id: '2', userId: 'u2', userName: 'ANANYA SHARMA', userLevel: 'SYSTEM MASTER', caption: 'Mumbai humidity syncing perfectly with the new bio-unit protocols. Snake plant resilience up 40%.', imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800', likes: 567, comments: 45, shares: 23, location: 'MUMBAI', createdAt: new Date() },
  { id: '3', userId: 'u3', userName: 'VIKRAM SINGH', userLevel: 'DESIGN ARCHITECT', caption: 'Delhi rooftop oasis. Heat shielding engaged for the Mogra blooms.', imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800', likes: 234, comments: 52, shares: 12, location: 'NEW DELHI', createdAt: new Date() }
];

export function CommunityHub() {
  const { currentUser, userLoggedIn } = useAuth();
  const [posts] = useState<Post[]>(SAMPLE_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="bg-[#020617] text-white py-40 px-6 selection:bg-emerald-500 selection:text-white font-['Inter']">
      <div className="container mx-auto max-w-7xl">
        {/* Community Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">NEXUS COLLECTIVE</p>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-['Clash_Display']">
              THE <span className="text-premium">NEXUS.</span>
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
            <Button className="h-20 px-12 rounded-[2rem] bg-white text-black font-black hover:scale-105 transition-all shadow-2xl shadow-white/5 font-['Clash_Display'] uppercase tracking-[0.2em] text-xs">
              <Plus className="w-5 h-5 mr-3" />
              INITIATE LOG
            </Button>
          </div>
        </div>

        {/* Collective Logs Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="glass rounded-[3rem] border-white/5 overflow-hidden group hover:border-emerald-500/30 transition-all duration-700 shadow-xl">
                <div className="relative overflow-hidden aspect-video md:aspect-square">
                  <img 
                    src={post.imageUrl} 
                    alt={post.caption} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-8 left-8">
                    <Badge className="bg-black/40 backdrop-blur-xl border-white/10 text-white/80 flex items-center gap-2 py-2 px-4 rounded-full">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {post.location}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-10">
                  <div className="flex items-center gap-5 mb-8">
                    <Avatar className="w-12 h-12 border border-emerald-500/30">
                      <AvatarImage src={post.userAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-black">{post.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-lg tracking-tight uppercase font-['Clash_Display']">{post.userName}</p>
                      <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em]">{post.userLevel}</p>
                    </div>
                  </div>

                  <p className="text-white/60 font-medium leading-relaxed mb-10 text-lg">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div className="flex gap-8">
                      <button className="flex items-center gap-3 group/btn">
                        <Heart className="w-6 h-6 text-white/20 group-hover/btn:text-emerald-400 transition-colors" />
                        <span className="text-xs font-black tracking-widest">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-3 group/btn">
                        <MessageCircle className="w-6 h-6 text-white/20 group-hover/btn:text-blue-400 transition-colors" />
                        <span className="text-xs font-black tracking-widest">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
