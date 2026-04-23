import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { Leaf, Play, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1757282101267-dc6667158dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwcGxhbnRzfGVufDF8fHx8MTc2MTUyMTU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Balcony Garden"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-40 right-16 hidden lg:block"
      >
        <div className="w-12 h-12 bg-accent/60 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Leaf className="w-4 h-4 mr-2" />
            Smart Balcony Gardening Solution
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
            Grow Your Perfect
            <br />
            Balcony Garden
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your centralized smart solution for balcony gardening. Get AI-powered plant recommendations, 
            care reminders, and expert guidance to grow fresh herbs, vegetables, and flowers at home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                const levelsSection = document.getElementById('levels-section');
                levelsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Growing Today
              <Leaf className="w-5 h-5 ml-2" />
            </Button>
            
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all">
              <Play className="w-5 h-5 mr-2" />
              See How It Works
            </Button>
          </div>

          {/* 3D/AR Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl"
          >
            <div className="aspect-video bg-gradient-to-br from-accent/40 to-secondary/60 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Smart Garden Assistant</p>
                <p className="text-sm text-muted-foreground/60 mt-1">AI-Powered Plant Care Platform</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  );
}