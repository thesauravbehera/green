import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Smartphone, Monitor, Headphones, Eye, Play, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function InteractiveDemoSection() {
  const demoFeatures = [
    {
      id: "ar",
      title: "Space Analysis",
      icon: Smartphone,
      description: "Upload photos of your balcony to get AI-powered plant recommendations",
      image: "https://images.unsplash.com/photo-1758530273862-f765619474c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGdhcmRlbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxNTIxNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "vr",
      title: "Care Dashboard",
      icon: Headphones,
      description: "Track all your plants, schedules, and progress in one beautiful interface",
      image: "https://images.unsplash.com/photo-1553275991-b6ba99f234e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBoZXJiJTIwZ2FyZGVufGVufDF8fHx8MTc2MTQxODM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "web",
      title: "Community Hub",
      icon: Monitor,
      description: "Share your garden journey and learn from thousands of balcony gardeners",
      image: "https://images.unsplash.com/photo-1757282101267-dc6667158dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxjb255JTIwZ2FyZGVuJTIwcGxhbnRzfGVufDF8fHx8MTc2MTUyMTU1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            See Bloomify in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore interactive demos and see how Bloomify's smart features can help you 
            create the perfect balcony garden tailored to your space and goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1 rounded-2xl">
              {demoFeatures.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {demoFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="mt-0">
                <Card className="overflow-hidden border-2 border-primary/10 shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] lg:aspect-auto">
                      <ImageWithFallback
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      
                      {/* Demo Placeholder Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-center text-white"
                        >
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                            <Play className="w-10 h-10 ml-1" />
                          </div>
                          <p className="font-medium text-lg">Interactive {feature.title}</p>
                          <p className="text-sm opacity-90 mt-1">Click to experience the demo</p>
                        </motion.div>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">Next-Generation Learning</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                          <Eye className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Smart Analysis</p>
                            <p className="text-sm text-muted-foreground">AI-powered recommendations for your unique space</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Personalized Guidance</p>
                            <p className="text-sm text-muted-foreground">Tailored to your climate, space, and experience</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button className="flex-1 rounded-xl">
                          Try {feature.title} Demo
                          <Play className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="flex-1 rounded-xl border-2">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Technology Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-6 bg-secondary/30 border-primary/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <p className="font-medium">Mobile App Coming Soon</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Native iOS and Android apps with push notifications, offline mode, and camera integration for even better plant care on the go.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}