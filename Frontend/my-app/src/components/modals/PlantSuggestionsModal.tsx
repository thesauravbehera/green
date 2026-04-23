import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Leaf, Sun, Droplet, Wind, Sparkles } from "lucide-react";

interface PlantSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedImage?: string | null;
}

export function PlantSuggestionsModal({ isOpen, onClose, uploadedImage }: PlantSuggestionsModalProps) {
  const suggestions = [
    {
      name: "Balcony Tomatoes",
      difficulty: "Beginner",
      sunlight: "6-8 hours",
      water: "Daily",
      space: "Medium pot",
      benefits: ["Fresh produce", "Easy to grow", "Compact variety"]
    },
    {
      name: "Basil & Mint Combo",
      difficulty: "Beginner",
      sunlight: "4-6 hours",
      water: "2-3 times/week",
      space: "Small pots",
      benefits: ["Culinary herbs", "Aromatic", "Fast growing"]
    },
    {
      name: "Lettuce Mix",
      difficulty: "Beginner",
      sunlight: "3-4 hours",
      water: "Daily",
      space: "Shallow containers",
      benefits: ["Quick harvest", "Space efficient", "Continuous growth"]
    },
    {
      name: "Strawberries",
      difficulty: "Beginner",
      sunlight: "6+ hours",
      water: "Daily in summer",
      space: "Hanging baskets",
      benefits: ["Sweet fruit", "Vertical space", "Perennial"]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Plant Recommendations
          </DialogTitle>
          <DialogDescription>
            Based on your space analysis, here are perfect plants for your balcony garden
          </DialogDescription>
        </DialogHeader>

        {uploadedImage && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Your Space:</p>
            <img src={uploadedImage} alt="Your space" className="w-full h-48 object-cover rounded-xl border-2 border-primary/20" />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {suggestions.map((plant, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-all border-2 border-primary/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold mb-1">{plant.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {plant.difficulty}
                  </Badge>
                </div>
                <Leaf className="w-6 h-6 text-primary" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-muted-foreground">{plant.sunlight}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground">{plant.water}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Wind className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">{plant.space}</span>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                {plant.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-xs text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" size="sm">
                Add to Garden Plan
              </Button>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
