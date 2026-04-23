import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Flower2, Calendar, Users, Trophy, Sprout, Bell, 
  MessageSquare, Award, Camera, RefreshCcw 
} from "lucide-react";
import { PlantOfDayModal } from "./modals/PlantOfDayModal";
import { CalendarModal } from "./modals/CalendarModal";

export function FeaturesSection() {
  const navigate = useNavigate();
  const [plantOfDayOpen, setPlantOfDayOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(generateRandomPlant());

  const uniqueFeatures = [
    {
      icon: Flower2,
      title: "Plant of the Day",
      badge: "Daily",
      description: "Discover a new balcony-friendly plant every day with detailed care instructions and fun facts.",
      color: "from-emerald-500/20 to-teal-500/20",
      action: () => {
        setCurrentPlant(generateRandomPlant());
        setPlantOfDayOpen(true);
      }
    },
    {
      icon: Calendar,
      title: "Seasonal Planting Calendar",
      badge: "Personalized",
      description: "Get month-by-month planting guides tailored to your climate zone and balcony conditions.",
      color: "from-teal-600/20 to-cyan-600/20",
      action: () => setCalendarOpen(true)
    },
    {
      icon: Users,
      title: "Community Garden Hub",
      badge: "Social",
      description: "Share photos, exchange tips, and connect with balcony gardeners worldwide.",
      color: "from-emerald-700/20 to-blue-700/20",
      action: () => navigate("/community")
    },
    {
      icon: Trophy,
      title: "Achievement Badges",
      badge: "Gamified",
      description: "Earn rewards as you progress from beginner to master balcony gardener.",
      color: "from-teal-800/20 to-emerald-900/20",
      action: () => navigate("/garden")
    }
  ];

  const platformFeatures = [
    { 
      icon: Sprout, 
      title: "Smart Plant Selection", 
      description: "AI recommendations for your balcony space and climate" 
    },
    { 
      icon: Bell, 
      title: "Care Reminders", 
      description: "Automated watering and fertilizing schedules" 
    },
    { 
      icon: Camera, 
      title: "Problem Diagnosis", 
      description: "AI-powered plant health analysis from photos" 
    },
    { 
      icon: MessageSquare, 
      title: "Expert Q&A", 
      description: "Get answers from experienced gardeners" 
    },
    { 
      icon: Award, 
      title: "Growth Tracking", 
      description: "Journal your plants' progress with photos" 
    },
    { 
      icon: RefreshCcw, 
      title: "Seasonal Updates", 
      description: "Timely tips for changing weather conditions" 
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Flower2 className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent font-['Clash_Display'] uppercase tracking-tight">
            Everything for Balcony Garden Success
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Bloomify provides all the tools, knowledge, and community support you need 
            to grow a thriving balcony garden, no matter your experience level.
          </p>
        </motion.div>

        {/* Unique Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-white/5 border-white/10 hover:shadow-2xl transition-all duration-500 border-2 hover:border-emerald-500/40 group cursor-pointer relative overflow-hidden rounded-[2.5rem]"
                onClick={feature.action}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-emerald-400 group-hover:text-black" />
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-full px-4 py-1">{feature.badge}</Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 font-['Clash_Display'] uppercase tracking-tight text-white">{feature.title}</h3>
                  <p className="text-white/40 leading-relaxed mb-8 text-lg">
                    {feature.description}
                  </p>

                  <Button variant="outline" className="w-full rounded-2xl border-white/10 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-xs py-6">
                    Launch Asset
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Platform Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500/60 text-center mb-10">System Core Capabilities</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center bg-white/5 border-white/5 hover:border-emerald-500/30 transition-all duration-500 h-full rounded-3xl group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 font-['Clash_Display'] uppercase tracking-tight">{feature.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 bg-[#020617] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              {[
                { label: "Balcony Plants", value: "300+", sub: "DATABASE" },
                { label: "Active Gardeners", value: "50K+", sub: "COLLECTIVE" },
                { label: "Growing Guides", value: "500+", sub: "PROTOCOL" },
                { label: "System Support", value: "24/7", sub: "LIVE" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500/60 mb-2">{stat.sub}</p>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Clash_Display']">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-white/30 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <PlantOfDayModal
        isOpen={plantOfDayOpen}
        onClose={() => setPlantOfDayOpen(false)}
        plant={currentPlant}
      />
      <CalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </section>
  );
}

function generateRandomPlant() {
  const plants = [
    {
      name: "Cherry Tomatoes",
      family: "Solanaceae (Nightshade Family)",
      origin: "South America",
      difficulty: "Beginner",
      funFacts: [
        "Cherry tomatoes are perfect for balconies - they produce fruit in just 60-70 days",
        "A single plant can yield up to 200 tomatoes in a season",
        "They contain more vitamin C per weight than oranges",
        "Can be grown year-round indoors with proper light"
      ],
      careBasics: {
        light: "6-8 hours of direct sunlight",
        water: "Keep soil consistently moist, water daily in hot weather",
        humidity: "40-70% - tolerates average humidity",
        temperature: "65-85°F (18-29°C) ideal growing range"
      }
    },
    {
      name: "Basil",
      family: "Lamiaceae (Mint Family)",
      origin: "Tropical regions of Asia and Africa",
      difficulty: "Beginner",
      funFacts: [
        "Basil is a natural mosquito repellent - perfect for balcony gardens",
        "Regular harvesting makes the plant bushier and more productive",
        "Fresh basil has 3x more essential oils than dried basil",
        "Can be grown from cuttings - just place stems in water"
      ],
      careBasics: {
        light: "4-6 hours of sunlight, can tolerate partial shade",
        water: "Keep soil moist but not waterlogged, water when top inch is dry",
        humidity: "50-70% - enjoys moderate to high humidity",
        temperature: "70-85°F (21-29°C) - very heat sensitive"
      }
    },
    {
      name: "Lettuce Mix",
      family: "Asteraceae (Daisy Family)",
      origin: "Mediterranean region",
      difficulty: "Beginner",
      funFacts: [
        "Lettuce is one of the fastest vegetables to grow - harvest in 30 days",
        "Perfect for succession planting - sow every 2 weeks for continuous harvest",
        "Grows well in shallow containers (only 6-8 inches deep needed)",
        "Can regrow from cut leaves - 'cut and come again' varieties"
      ],
      careBasics: {
        light: "3-4 hours of sunlight, prefers cooler conditions",
        water: "Keep consistently moist, needs frequent watering in containers",
        humidity: "60-80% - prefers higher humidity",
        temperature: "45-75°F (7-24°C) - cool season crop"
      }
    },
    {
      name: "Holy Basil (Tulsi)",
      family: "Lamiaceae",
      origin: "Indian Subcontinent",
      difficulty: "Intermediate",
      funFacts: [
        "Known as the 'Queen of Herbs' in Ayurvedic tradition",
        "Releases oxygen for 20 hours a day",
        "Effective as a natural stress reliever when consumed as tea",
        "Symbol of purity and used in traditional Indian households"
      ],
      careBasics: {
        light: "4-6 hours of morning sunlight",
        water: "Keep soil moist, water more frequently in Indian summers",
        humidity: "40-60%",
        temperature: "20-35°C (68-95°F)"
      }
    },
    {
      name: "Jasmine (Mogra)",
      family: "Oleaceae",
      origin: "South and Southeast Asia",
      difficulty: "Intermediate",
      funFacts: [
        "National flower of Pakistan and Philippines",
        "Flowers are used to make traditional Indian garlands",
        "Scent is most potent during the night",
        "Grows rapidly during monsoon season in India"
      ],
      careBasics: {
        light: "6+ hours of full sun",
        water: "Consistent moisture, but avoid waterlogging during monsoons",
        humidity: "50-80%",
        temperature: "20-40°C (68-104°F)"
      }
    }
  ];
  
  return plants[Math.floor(Math.random() * plants.length)];
}
