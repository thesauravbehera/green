import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, Users, BookOpen, Microscope } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const features = [
    {
      icon: Leaf,
      title: "Smart Recommendations",
      description: "AI-powered plant suggestions based on your space, climate, and experience"
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Guides",
      description: "Detailed growing instructions from seed to harvest for balcony gardens"
    },
    {
      icon: Users,
      title: "Garden Community",
      description: "Connect with balcony gardeners worldwide and share your success stories"
    },
    {
      icon: Microscope,
      title: "Problem Diagnosis",
      description: "AI plant doctor to identify and solve common gardening issues"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Leaf className="w-4 h-4 mr-2" />
            About Bloomify
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Balcony Garden's Smart Companion
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bloomify is your centralized platform for balcony gardening success. We combine AI technology, 
            expert knowledge, and community support to help you grow fresh vegetables, herbs, and flowers 
            in any space, no matter your experience level.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-2 border-primary/10 shadow-xl">
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553275991-b6ba99f234e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBoZXJiJTIwZ2FyZGVufGVufDF8fHx8MTc2MTQxODM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Balcony Herb Garden"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium">Smart Balcony Gardening</p>
                  <p className="text-sm opacity-90">Powered by AI & Community</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary">
              From Beginner to Master Gardener
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're growing your first tomato or experimenting with hydroponics, Bloomify adapts 
              to your skill level. Our three-tier learning system ensures you always have the right tools 
              and knowledge for your gardening journey, all optimized for balcony and container growing.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium">Personalized Plant Recommendations</p>
                  <p className="text-sm text-muted-foreground">Get AI suggestions based on your space, light, and climate</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium">Smart Care Reminders</p>
                  <p className="text-sm text-muted-foreground">Never forget to water, fertilize, or prune your plants</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div>
                  <p className="font-medium">Container-Optimized Methods</p>
                  <p className="text-sm text-muted-foreground">All techniques tailored specifically for balcony and container gardens</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-2 border-primary/10 hover:border-primary/20">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}