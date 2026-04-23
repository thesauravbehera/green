import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Leaf, ArrowRight, Play, Mail, CheckCircle } from "lucide-react";

export function CTASection() {
  const benefits = [
    "Free 30-day trial",
    "No credit card required",
    "Access to all features",
    "Cancel anytime"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Leaf className="w-4 h-4 mr-2" />
            Start Your Journey
          </Badge>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
            Start Your Balcony Garden
            <br />
            Journey Today
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of balcony gardeners who are growing fresh vegetables, herbs, and flowers 
            with Bloomify's smart, personalized guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 lg:p-10 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-secondary/30">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Start Free Trial</h3>
                <p className="text-muted-foreground">Experience the full Bloomify platform</p>
              </div>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email address"
                    className="flex-1 rounded-xl border-2 border-primary/20 focus:border-primary bg-background"
                  />
                  <Button className="px-6 rounded-xl">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button size="lg" className="w-full rounded-xl text-lg py-6 shadow-lg hover:shadow-xl transition-all">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Demo CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 lg:p-10 border-2 border-primary/10 shadow-xl h-full flex flex-col">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/60 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Watch Live Demo</h3>
                <p className="text-muted-foreground">See Bloomify in action before you start</p>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-6 mb-8">
                <div className="aspect-video bg-gradient-to-br from-accent/40 to-secondary/60 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-medium">Interactive Demo Video</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">5 minutes overview</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">5 min</div>
                    <div className="text-sm text-muted-foreground">Quick Overview</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">Live</div>
                    <div className="text-sm text-muted-foreground">Interactive Demo</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" size="lg" className="w-full rounded-xl text-lg py-6 border-2 hover:bg-secondary/50 transition-all">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
                <Button variant="ghost" className="w-full rounded-xl">
                  Schedule Personal Demo
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Trusted by balcony gardeners in over 50 countries
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-bold">🇺🇸 United States</div>
            <div className="text-lg font-bold">🇬🇧 United Kingdom</div>
            <div className="text-lg font-bold">🇦🇺 Australia</div>
            <div className="text-lg font-bold">🇨🇦 Canada</div>
            <div className="text-lg font-bold">🇮🇳 India</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}