import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FlaskConical, Camera, TrendingUp, Lightbulb } from "lucide-react";

interface ExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperimentModal({ isOpen, onClose }: ExperimentModalProps) {
  const experiments = [
    {
      id: "hydro",
      name: "Kratky Hydroponics",
      difficulty: "Intermediate",
      duration: "4-6 weeks",
      description: "Grow lettuce without soil using the passive hydroponic method",
      materials: [
        "Opaque container with lid",
        "Net pots or cups",
        "Hydroponic nutrients (A & B)",
        "pH test kit",
        "Lettuce seeds or seedlings",
        "Growing medium (clay pebbles)"
      ],
      steps: [
        "Drill holes in container lid for net pots",
        "Mix nutrient solution (follow package instructions)",
        "Adjust pH to 5.5-6.5",
        "Fill container 3/4 full with nutrient solution",
        "Place seedlings in net pots with growing medium",
        "Position net pots so roots touch solution",
        "Monitor water level (don't refill - let roots reach down)",
        "Track growth and harvest in 4-6 weeks"
      ],
      tips: [
        "Use opaque containers to prevent algae growth",
        "Start with lettuce - easiest for beginners",
        "Keep in bright, indirect light or under grow lights",
        "Don't disturb the system once started"
      ]
    },
    {
      id: "grafting",
      name: "Tomato Grafting",
      difficulty: "Advanced",
      duration: "2-3 weeks",
      description: "Combine disease-resistant rootstock with flavorful variety",
      materials: [
        "Rootstock seedling (disease-resistant)",
        "Scion seedling (desired variety)",
        "Grafting clips or tape",
        "Sharp, sterilized razor blade",
        "Humidity dome or plastic bag",
        "Spray bottle"
      ],
      steps: [
        "Grow both plants until they have 2-3 true leaves",
        "Sterilize cutting tool with rubbing alcohol",
        "Cut rootstock at 45-degree angle above cotyledons",
        "Cut scion at matching 45-degree angle",
        "Join cuts together, aligning cambium layers",
        "Secure with grafting clip",
        "Place in humidity dome with indirect light",
        "Mist 2-3 times daily for 7-10 days",
        "Gradually acclimate to normal conditions",
        "Remove clip after 2-3 weeks"
      ],
      tips: [
        "Work quickly to prevent tissue from drying",
        "Maintain 80-90% humidity during healing",
        "Keep temperature around 75-80°F (24-27°C)",
        "Watch for wilting - increase humidity if needed"
      ]
    },
    {
      id: "propagation",
      name: "Stem Propagation",
      difficulty: "Beginner",
      duration: "2-4 weeks",
      description: "Clone your favorite plants from stem cuttings",
      materials: [
        "Healthy mother plant",
        "Sharp, clean scissors",
        "Small containers or glasses",
        "Water or rooting medium",
        "Rooting hormone (optional)",
        "Plastic bag for humidity"
      ],
      steps: [
        "Choose healthy stem with 3-4 leaf nodes",
        "Cut just below a node at 45-degree angle",
        "Remove lower leaves, keep 2-3 at top",
        "Apply rooting hormone to cut end (optional)",
        "Place in water or moist rooting medium",
        "Cover with plastic bag to maintain humidity",
        "Place in bright, indirect light",
        "Change water every 3-4 days if using water method",
        "Wait for roots to develop (1-4 weeks)",
        "Transplant to soil when roots are 1-2 inches"
      ],
      tips: [
        "Best time: spring or early summer",
        "Works great for basil, mint, pothos, tomatoes",
        "Use filtered or rainwater for better results",
        "Be patient - some plants root faster than others"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            Virtual Lab Experiments
          </DialogTitle>
          <DialogDescription>
            Master advanced growing techniques with step-by-step guidance
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="hydro" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {experiments.map((exp) => (
              <TabsTrigger key={exp.id} value={exp.id}>
                {exp.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {experiments.map((experiment) => (
            <TabsContent key={experiment.id} value={experiment.id}>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{experiment.name}</h3>
                    <p className="text-muted-foreground mb-3">{experiment.description}</p>
                    <div className="flex gap-2">
                      <Badge>{experiment.difficulty}</Badge>
                      <Badge variant="outline">{experiment.duration}</Badge>
                    </div>
                  </div>
                  <Button>
                    <Camera className="w-4 h-4 mr-2" />
                    Start Tracking
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Materials */}
                  <Card className="p-6 border-2 border-primary/10">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      Materials Needed
                    </h4>
                    <ul className="space-y-2">
                      {experiment.materials.map((material, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                          <span>{material}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Tips */}
                  <Card className="p-6 border-2 border-primary/10 bg-accent/5">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2">
                      {experiment.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Steps */}
                <Card className="p-6 border-2 border-primary/10">
                  <h4 className="font-bold mb-4">Step-by-Step Instructions</h4>
                  <div className="space-y-4">
                    {experiment.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-primary">{i + 1}</span>
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-sm text-muted-foreground">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
