import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router";

export function PremiumPricingSection() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Seedling",
      subtitle: "Start",
      price: "Free",
      period: "Forever",
      description: "Perfect for beginners starting their balcony garden journey",
      features: [
        { name: "Basic plant database", included: true },
        { name: "5 garden plants", included: true, limit: "5 plants" },
        { name: "Care reminders", included: true },
        { name: "Community access", included: true },
        { name: "AI plant suggestions", included: false },
        { name: "Plant health diagnosis", included: false },
        { name: "Seasonal calendar", included: false },
        { name: "Weather integration", included: false },
        { name: "Growth analytics", included: false },
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Gardener",
      subtitle: "Plus",
      price: "₹299",
      period: "per month",
      description: "For serious urban gardeners who want to optimize their harvest",
      features: [
        { name: "Full plant database", included: true },
        { name: "Unlimited plants", included: true, limit: "Unlimited" },
        { name: "Smart care reminders", included: true },
        { name: "Priority community", included: true },
        { name: "AI plant suggestions", included: true },
        { name: "Plant health diagnosis", included: true },
        { name: "Seasonal calendar", included: true },
        { name: "Weather integration", included: false },
        { name: "Growth analytics", included: false },
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Master",
      subtitle: "Ultra",
      price: "₹599",
      period: "per month",
      description: "Complete solution for expert gardeners and plant enthusiasts",
      features: [
        { name: "Premium database", included: true },
        { name: "Unlimited plants", included: true, limit: "Unlimited" },
        { name: "Advanced AI reminders", included: true },
        { name: "VIP community access", included: true },
        { name: "AI plant suggestions", included: true },
        { name: "Plant health diagnosis", included: true },
        { name: "Seasonal calendar", included: true },
        { name: "Weather integration", included: true },
        { name: "Growth analytics", included: true },
      ],
      cta: "Get Started",
      highlighted: false,
    },
  ];

  return (
    <section className="relative bg-[#020617] py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source
            src="https://www.stocksy.com/video/download/2318367/light-sparkles-on-water?size=small"
            type="video/mp4"
          />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#0a1628]/85 to-[#020617]/90" />
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
            className="text-[40px] md:text-[48px] lg:text-[56px] text-white leading-tight mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Plans and features
          </h2>
          <p
            className="text-lg text-white/75 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Choose the perfect plan for your gardening journey. All plans include our core features and community support.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${
                plan.highlighted 
                  ? "bg-white/10 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10" 
                  : "bg-white/5 border border-white/10"
              } p-8 transition-all hover:bg-white/15`}
              style={{ borderRadius: "16px" }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8 pb-8 border-b border-white/10">
                <p
                  className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {plan.subtitle}
                </p>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period !== "Forever" && (
                    <span
                      className="text-white/60 text-sm ml-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm text-white/75 leading-relaxed"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-white/20 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          feature.included ? "text-white" : "text-white/40"
                        }`}
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {feature.name}
                      </p>
                      {feature.limit && (
                        <p className="text-xs text-white/60 mt-0.5"
                          style={{ fontFamily: "'Barlow', sans-serif" }}
                        >
                          {feature.limit}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => navigate("/signup")}
                className={`w-full py-6 transition-colors ${
                  plan.highlighted
                    ? "bg-[#f8f8f8] hover:bg-white text-[#171717]"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
                style={{ 
                  fontFamily: "'Barlow', sans-serif",
                  borderRadius: "2px",
                  fontWeight: 600
                }}
              >
                {plan.highlighted ? "Start Free Trial" : "Choose Plan"}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="text-white/75 mb-4"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            All plans include 14-day money-back guarantee. No questions asked.
          </p>
          <Button
            variant="link"
            onClick={() => navigate("/community")}
            className="text-emerald-400 hover:text-emerald-300"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            View detailed feature comparison →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}