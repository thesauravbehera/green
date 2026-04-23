import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { TestTube2, Droplet, Wind, Sprout, AlertCircle } from "lucide-react";

interface SoilHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SoilHealthModal({ isOpen, onClose }: SoilHealthModalProps) {
  const testingGuide = [
    {
      test: "pH Level",
      icon: TestTube2,
      ideal: "6.0 - 7.0",
      current: 6.5,
      status: "Optimal",
      color: "text-green-500",
      method: "Use pH testing kit from garden center. Collect soil sample from 4-6 inches deep. Mix with distilled water and use test strips.",
      fix: "If too acidic (below 6.0): Add lime. If too alkaline (above 7.0): Add sulfur or organic matter."
    },
    {
      test: "Moisture Level",
      icon: Droplet,
      ideal: "Consistently moist",
      current: 75,
      status: "Good",
      color: "text-blue-500",
      method: "Insert finger 2 inches into soil. Should feel damp but not soggy. Use moisture meter for accuracy.",
      fix: "If too dry: Increase watering frequency, add mulch. If too wet: Improve drainage, reduce watering."
    },
    {
      test: "Drainage",
      icon: Wind,
      ideal: "1-2 inches/hour",
      current: 85,
      status: "Excellent",
      color: "text-cyan-500",
      method: "Dig 12-inch hole, fill with water. Measure how fast water drains. Should empty in 1-2 hours.",
      fix: "Poor drainage: Add perlite, vermiculite, or coarse sand. Create raised beds."
    },
    {
      test: "Nutrient Content",
      icon: Sprout,
      ideal: "N-P-K balanced",
      current: 60,
      status: "Moderate",
      color: "text-yellow-500",
      method: "Use soil test kit or send sample to local extension office for detailed analysis.",
      fix: "Add compost, worm castings, or balanced organic fertilizer. Avoid over-fertilizing."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-primary" />
            Soil Health Checker & Guide
          </DialogTitle>
          <DialogDescription>
            Test and improve your balcony garden soil for optimal plant growth
          </DialogDescription>
        </DialogHeader>

        {/* Overall Health Score */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 mb-6">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-primary mb-2">78%</div>
            <p className="text-muted-foreground">Overall Soil Health Score</p>
          </div>
          <Progress value={78} className="h-3" />
        </Card>

        {/* Testing Guide */}
        <div className="space-y-4">
          {testingGuide.map((test, index) => (
            <Card key={index} className="p-6 border-2 border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 ${test.color}`}>
                  <test.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{test.test}</h4>
                    <Badge variant={test.status === "Optimal" ? "default" : test.status === "Excellent" ? "secondary" : "outline"}>
                      {test.status}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Ideal Range:</p>
                      <p className="font-medium">{test.ideal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Status:</p>
                      <div className="flex items-center gap-2">
                        <Progress value={test.current} className="flex-1 h-2" />
                        <span className={`text-sm font-medium ${test.color}`}>{test.current}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">How to Test:</p>
                      <p className="text-sm text-muted-foreground">{test.method}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        How to Improve:
                      </p>
                      <p className="text-sm text-muted-foreground">{test.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="p-6 bg-secondary/30 border-primary/10 mt-6">
          <h4 className="font-medium mb-3">Quick Tips for Balcony Gardens</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Use high-quality potting mix designed for containers, not garden soil</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Refresh soil annually by replacing top 2-3 inches with fresh compost</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Add perlite or vermiculite for better drainage in container gardens</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
              <span>Test soil every 3-4 months for best results</span>
            </li>
          </ul>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
