import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Sprout, Leaf, TreePine, Camera, Bell, Beaker, TestTube2, 
  FlaskConical, Stethoscope, ShoppingBag, BookOpen 
} from "lucide-react";
import { PlantSuggestionsModal } from "./modals/PlantSuggestionsModal";
import { CareRemindersModal } from "./modals/CareRemindersModal";
import { FertilizerModal } from "./modals/FertilizerModal";
import { SoilHealthModal } from "./modals/SoilHealthModal";
import { ExperimentModal } from "./modals/ExperimentModal";
import { PlantDoctorModal } from "./modals/PlantDoctorModal";

export function LevelsSection() {
  const [plantSuggestionsOpen, setPlantSuggestionsOpen] = useState(false);
  const [careRemindersOpen, setCareRemindersOpen] = useState(false);
  const [fertilizerOpen, setFertilizerOpen] = useState(false);
  const [soilHealthOpen, setSoilHealthOpen] = useState(false);
  const [experimentOpen, setExperimentOpen] = useState(false);
  const [plantDoctorOpen, setPlantDoctorOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        setPlantSuggestionsOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const levels = [
    {
      icon: Sprout,
      emoji: "🌱",
      title: "Beginner",
      subtitle: "Start Your Garden Journey",
      description: "Perfect for those new to balcony gardening. Get personalized recommendations and simple care schedules.",
      features: [
        "Space Photo Analysis",
        "Simple Care Reminders",
        "Starter Plant Kits",
        "Weather & Sunlight Tips"
      ],
      actions: [
        { 
          label: "Upload Space Photo", 
          icon: Camera, 
          onClick: () => document.getElementById("space-photo-input")?.click()
        },
        { label: "Set Care Reminders", icon: Bell, onClick: () => setCareRemindersOpen(true) },
        { label: "Browse Starter Kits", icon: ShoppingBag, onClick: () => {} }
      ],
      color: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Leaf,
      emoji: "🌿",
      title: "Intermediate",
      subtitle: "Grow Your Skills",
      description: "Ready to deepen your knowledge? Learn to create fertilizers, test soil, and track plant progress.",
      features: [
        "Organic Fertilizer Creator",
        "Soil Health Checker",
        "Growth Journal Tracker",
        "Seasonal Care Guide"
      ],
      actions: [
        { label: "Create Fertilizer", icon: Beaker, onClick: () => setFertilizerOpen(true) },
        { label: "Check Soil Health", icon: TestTube2, onClick: () => setSoilHealthOpen(true) },
        { label: "Open Growth Journal", icon: BookOpen, onClick: () => {} }
      ],
      color: "from-teal-500/10 to-cyan-500/10"
    }
  ];

  return (
    <section id="levels-section" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Sprout className="w-4 h-4 mr-2" />
            Learn at Your Pace
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Grow Your Plant Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're just starting or a seasoned gardener, Bloomify has the perfect tools 
            and resources to help your balcony garden thrive.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {levels.map((level, index) => (
            <motion.div
              key={level.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary/20 relative overflow-hidden group`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <level.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-4xl">{level.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{level.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-6">{level.description}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {level.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {level.actions.map((action, i) => (
                      <Button
                        key={i}
                        variant={i === 0 ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={action.onClick}
                      >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          id="space-photo-input"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </div>

      {/* Modals */}
      <PlantSuggestionsModal
        isOpen={plantSuggestionsOpen}
        onClose={() => setPlantSuggestionsOpen(false)}
        uploadedImage={uploadedImage}
      />
      <CareRemindersModal
        isOpen={careRemindersOpen}
        onClose={() => setCareRemindersOpen(false)}
      />
      <FertilizerModal
        isOpen={fertilizerOpen}
        onClose={() => setFertilizerOpen(false)}
      />
      <SoilHealthModal
        isOpen={soilHealthOpen}
        onClose={() => setSoilHealthOpen(false)}
      />
      <ExperimentModal
        isOpen={experimentOpen}
        onClose={() => setExperimentOpen(false)}
      />
      <PlantDoctorModal
        isOpen={plantDoctorOpen}
        onClose={() => setPlantDoctorOpen(false)}
      />
    </section>
  );
}