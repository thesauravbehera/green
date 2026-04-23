import { motion } from "motion/react";
import { Star, Leaf, Users, TrendingUp } from "lucide-react";

export function PremiumTestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Urban Gardener - Mumbai",
      company: "Home Gardener",
      companyIcon: Leaf,
      quote: "This platform transformed how we grow vegetables. We can harvest fresh produce daily, and the AI guidance makes it incredibly easy.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      size: "large"
    },
    {
      name: "Rahul Verma",
      role: "Beginner Gardener",
      company: "First Timer",
      companyIcon: Users,
      quote: "Started with zero experience. Now I have a thriving balcony garden with herbs and vegetables.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      size: "medium"
    },
    {
      name: "Aisha Khan",
      role: "Balcony Expert - Delhi",
      company: "Advanced Grower",
      companyIcon: TrendingUp,
      quote: "The seasonal planting calendar helps our family plan harvests strategically, making gardening more rewarding and productive.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      size: "large"
    },
  ];

  return (
    <section className="relative bg-[#020617] py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="text-[40px] md:text-[48px] lg:text-[56px] font-light text-white mb-4 leading-tight"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Hear from gardeners
          </h2>
          <h2
            className="text-[40px] md:text-[48px] lg:text-[56px] text-white leading-tight italic mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            like you
          </h2>
          <p
            className="text-lg text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Join thousands of urban gardeners who have transformed their balconies 
            into thriving green spaces with Bloomify.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${
                testimonial.size === "large" 
                  ? "lg:col-span-2 lg:row-span-1" 
                  : "lg:col-span-1"
              } relative group overflow-hidden`}
              style={{ borderRadius: "16px" }}
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full min-h-[320px] flex flex-col justify-between">
                {/* Top: Company Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                    <testimonial.companyIcon className="w-4 h-4 text-white" />
                    <span
                      className="text-sm font-medium text-white"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {testimonial.company}
                    </span>
                  </div>
                </div>

                {/* Bottom: Quote and Info */}
                <div>
                  <p
                    className="text-white text-base md:text-lg leading-relaxed mb-6 italic"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    "{testimonial.quote}"
                  </p>

                  <div>
                    <p
                      className="text-white font-semibold text-lg"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-white/75 text-sm"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Empty Cards for Grid Balance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            style={{ borderRadius: "16px", minHeight: "320px" }}
          >
            <div className="text-center p-8">
              <Leaf className="w-16 h-16 text-emerald-400 mx-auto mb-4 opacity-50" />
              <p
                className="text-white/75 text-lg"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                10,000+ Happy Gardeners
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 p-8"
            style={{ borderRadius: "16px", minHeight: "240px" }}
          >
            <div className="grid grid-cols-3 gap-8 h-full items-center">
              <div className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  4.9
                </div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p
                  className="text-white/75 text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  App Rating
                </p>
              </div>

              <div className="text-center border-x border-white/10">
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  95%
                </div>
                <p
                  className="text-white/75 text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Success Rate
                </p>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  10K+
                </div>
                <p
                  className="text-white/75 text-sm"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Active Gardeners
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
