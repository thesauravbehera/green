import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  Plus,
  Minus,
  Heart,
  Leaf,
  Droplets,
  Bug,
  Sprout,
  Package,
  TrendingUp,
  Award,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Product {
  id: number;
  name: string;
  category: 'plants' | 'pesticides' | 'fertilizers' | 'tools' | 'pots' | 'seeds';
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  inStock: boolean;
  trending?: boolean;
  featured?: boolean;
  discount?: number;
}

export default function Marketplace() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { t } = useLanguage();

  const products: Product[] = [
    { id: 1, name: 'HOLY BASIL (TULSI)', category: 'plants', price: 249, rating: 4.9, reviews: 842, image: 'https://images.unsplash.com/photo-1618473413824-7661f034032d?w=400', description: 'Essential Vedic botanical for immunity and air quality.', inStock: true, trending: true, featured: true },
    { id: 2, name: 'SNAKE PLANT ALPHA', category: 'plants', price: 899, rating: 4.9, reviews: 521, image: 'https://images.unsplash.com/photo-1593482892540-72b3746d1877?w=400', description: 'Indestructible air purification unit.', inStock: true, trending: true },
    { id: 3, name: 'MOGRA (JASMINE)', category: 'plants', price: 349, originalPrice: 499, rating: 4.7, reviews: 289, image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400', description: 'Fragrant blossoms optimized for Indian balconies.', inStock: true, discount: 30 },
    { id: 4, name: 'ALOE VERA HYBRID', category: 'plants', price: 199, rating: 4.6, reviews: 412, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400', description: 'Resilient medicinal unit with high hydration retention.', inStock: true },
    { id: 5, name: 'NEEM EXTRACT v2', category: 'pesticides', price: 450, rating: 4.5, reviews: 234, image: 'https://images.unsplash.com/photo-1607968565043-36af90dde238?w=400', description: 'Molecular pest elimination spray using organic neem.', inStock: true, featured: true },
    { id: 11, name: 'TITANIUM SHEARS', category: 'tools', price: 1299, rating: 4.7, reviews: 312, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', description: 'Precision cutting for botanical maintenance.', inStock: true },
    { id: 14, name: 'TERRACOTTA MATRIX', category: 'pots', price: 599, originalPrice: 799, rating: 4.8, reviews: 421, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', description: 'Artisanal micro-porous hydration chambers.', inStock: true, discount: 25, featured: true },
    { id: 17, name: 'KITCHEN GARDEN KIT', category: 'seeds', price: 399, rating: 4.8, reviews: 689, image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400', description: 'Chilli, Coriander, and Curry Leaf genomes.', inStock: true, featured: true }
  ];

  const categories = [
    { value: 'all', label: 'All Assets', icon: Package },
    { value: 'plants', label: 'Bio-Units', icon: Leaf },
    { value: 'seeds', label: 'Genomes', icon: Sprout },
    { value: 'tools', label: 'Equipment', icon: Package },
    { value: 'pots', label: 'Housing', icon: Package }
  ];

  const addToCart = (productId: number) => {
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    toast.success('Asset added to collection');
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) newCart[productId]--;
      else delete newCart[productId];
      return newCart;
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, count) => sum + count, 0);
  const getTotalPrice = () => Object.entries(cart).reduce((sum, [id, count]) => {
    const product = products.find(p => p.id === parseInt(id));
    return sum + (product?.price || 0) * count;
  }, 0);

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 px-6 selection:bg-emerald-500 selection:text-white font-['Inter']">
      <div className="container mx-auto max-w-7xl">
        {/* Market Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">NEXUS ACQUISITION</p>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-['Clash_Display']">
              BOTANICAL <br /><span className="text-premium">ASSETS.</span>
            </h1>
          </motion.div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="h-18 px-10 rounded-3xl border-white/10 glass-hover font-bold font-['Clash_Display'] uppercase tracking-widest text-xs">
              <Heart className={`w-5 h-5 mr-3 ${favorites.length > 0 ? "fill-emerald-400 text-emerald-400" : ""}`} />
              Vault ({favorites.length})
            </Button>
            <Button className="h-18 px-10 rounded-3xl bg-white text-black font-black hover:scale-105 transition-all shadow-2xl shadow-white/5 font-['Clash_Display'] uppercase tracking-widest text-xs">
              <ShoppingCart className="w-5 h-5 mr-3" />
              Cart ({t('price_prefix')}{getTotalPrice().toLocaleString()})
              {getTotalItems() > 0 && (
                <div className="ml-3 px-2.5 py-1 bg-emerald-500 text-white text-[10px] rounded-lg">
                  {getTotalItems()}
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Tactical Search Bar */}
        <div className="glass p-8 rounded-[3rem] border-white/10 mb-16 flex flex-col lg:flex-row gap-8 shadow-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20" />
            <Input 
              placeholder="Search botanical genomes and equipment..." 
              className="h-16 pl-16 bg-white/5 border-white/10 rounded-2xl focus:border-emerald-500/40 transition-all font-medium text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`h-16 px-10 rounded-2xl font-bold text-xs whitespace-nowrap transition-all uppercase tracking-[0.2em] font-['Clash_Display'] ${
                  selectedCategory === cat.value 
                    ? "bg-white text-black shadow-lg shadow-white/10" 
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.filter(p => selectedCategory === 'all' || p.category === selectedCategory).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 glass-hover mb-8 shadow-xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
                />
                
                {/* Tactical Overlays */}
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    {product.trending && (
                      <Badge className="bg-emerald-500 text-white border-0 font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1 rounded-full">
                        Trending
                      </Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-blue-500 text-white border-0 font-black text-[9px] px-3 py-1 rounded-full">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="w-12 h-12 rounded-2xl glass flex items-center justify-center border-white/20 hover:bg-white hover:text-black transition-all shadow-xl"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-emerald-400 text-emerald-400" : ""}`} />
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 pointer-events-none" />
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Button 
                    onClick={() => addToCart(product.id)}
                    className="w-full py-8 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl"
                  >
                    {t('acquire')}
                  </Button>
                </div>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl uppercase tracking-tighter font-['Clash_Display']">{product.name}</h3>
                  <span className="font-black text-xl text-emerald-400">{t('price_prefix')}{product.price.toLocaleString()}</span>
                </div>
                <p className="text-white/40 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-emerald-500/50 text-emerald-500" />
                    <span className="text-white/60">{product.rating}</span>
                  </div>
                  <span>{product.reviews} DATA POINTS</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
