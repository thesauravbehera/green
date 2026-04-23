import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Urban Gardener",
      location: "New York City",
      avatar: "SM",
      content: "Bloomify helped me transform my tiny balcony into a thriving vegetable garden! The AI recommendations were perfect for my space and climate. Now I have fresh tomatoes, basil, and lettuce year-round.",
      rating: 5,
      achievement: "10+ thriving herbs"
    },
    {
      name: "Marcus Lee",
      role: "Beginner Gardener",
      location: "San Francisco",
      avatar: "ML",
      content: "I killed every plant I touched before Bloomify. The care reminders and step-by-step guides made it so easy. Six months later, I'm growing strawberries and planning my winter garden!",
      rating: 5,
      achievement: "First successful harvest"
    },
    {
      name: "Priya Sharma",
      role: "Balcony Enthusiast",
      location: "Mumbai, India",
      avatar: "PS",
      content: "The seasonal calendar adapted perfectly to my tropical climate. I love the community feature - sharing tips with other balcony gardeners worldwide has been amazing. Highly recommend!",
      rating: 5,
      achievement: "25+ container plants"
    },
    {
      name: "James Rodriguez",
      role: "Sustainable Living Advocate",
      location: "Barcelona",
      avatar: "JR",
      content: "Bloomify's organic fertilizer recipes saved me so much money! Making my own compost tea and banana peel fertilizer has improved my plants' health dramatically. The soil testing guide is brilliant.",
      rating: 5,
      achievement: "Zero-waste gardener"
    },
    {
      name: "Emma Thompson",
      role: "Home Chef",
      location: "London",
      avatar: "ET",
      content: "Growing my own herbs and microgreens on my balcony has elevated my cooking. Bloomify made it foolproof. The plant of the day feature introduced me to varieties I never knew existed!",
      rating: 5,
      achievement: "Fresh herbs daily"
    },
    {
      name: "David Park",
      role: "Tech Professional",
      location: "Seoul",
      avatar: "DP",
      content: "The AI plant doctor saved my pepper plants! I uploaded a photo of yellowing leaves and got instant diagnosis and treatment. Two weeks later, they're thriving. This app is incredible.",
      rating: 5,
      achievement: "Prize-winning peppers"
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
            <Star className="w-4 h-4 mr-2" />
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Loved by Balcony Gardeners Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of urban gardeners who are growing fresh food and beautiful plants 
            on their balconies with Bloomify's smart guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/20 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground/80">{testimonial.location}</p>
                    {testimonial.achievement && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        🏆 {testimonial.achievement}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50k+</div>
                <div className="text-sm text-muted-foreground">Active Gardeners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <div className="text-sm text-muted-foreground">Plants Grown</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}