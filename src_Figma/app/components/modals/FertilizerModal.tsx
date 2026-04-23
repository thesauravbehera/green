import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Beaker, Leaf, Droplet, Clock } from "lucide-react";

interface FertilizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FertilizerModal({ isOpen, onClose }: FertilizerModalProps) {
  const recipes = [
    {
      name: "Compost Tea",
      type: "Organic",
      difficulty: "Easy",
      time: "24-48 hours",
      ingredients: [
        "2 cups finished compost",
        "5 gallons water",
        "1 tbsp molasses (optional)"
      ],
      steps: [
        "Fill bucket with water and let sit for 30 minutes to dechlorinate",
        "Add compost to water in a mesh bag or directly",
        "Add molasses to feed beneficial microbes",
        "Stir mixture twice daily",
        "Steep for 24-48 hours",
        "Strain and dilute 1:10 for use",
        "Apply to soil or as foliar spray"
      ],
      benefits: ["Rich in microorganisms", "Gentle on plants", "Cost-effective"]
    },
    {
      name: "Banana Peel Fertilizer",
      type: "Organic",
      difficulty: "Easy",
      time: "2-3 days",
      ingredients: [
        "3-4 banana peels",
        "1 liter water",
        "Mason jar with lid"
      ],
      steps: [
        "Cut banana peels into small pieces",
        "Place peels in mason jar",
        "Fill jar with water",
        "Cover and let steep for 2-3 days",
        "Strain liquid into spray bottle",
        "Dilute with equal parts water",
        "Apply around plant base weekly"
      ],
      benefits: ["High in potassium", "Promotes flowering", "Boosts fruit production"]
    },
    {
      name: "Eggshell Calcium Boost",
      type: "Organic",
      difficulty: "Easy",
      time: "1 week",
      ingredients: [
        "10-12 clean eggshells",
        "1 liter water",
        "Glass jar"
      ],
      steps: [
        "Wash and dry eggshells completely",
        "Crush eggshells into small pieces",
        "Place in jar and add water",
        "Let mixture steep for 1 week, stirring daily",
        "Strain liquid",
        "Use undiluted as calcium supplement",
        "Pour around base of calcium-loving plants"
      ],
      benefits: ["Prevents blossom end rot", "Strengthens cell walls", "Improves tomato health"]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-primary" />
            Organic Fertilizer Recipes
          </DialogTitle>
          <DialogDescription>
            Create your own nutrient-rich fertilizers from kitchen scraps
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {recipes.map((recipe, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                {recipe.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {recipes.map((recipe, index) => (
            <TabsContent key={index} value={index.toString()}>
              <Card className="p-6 border-2 border-primary/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{recipe.type}</Badge>
                      <Badge variant="outline">{recipe.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{recipe.time}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-primary" />
                      Ingredients
                    </h4>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                          <span>{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-primary" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {recipe.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Step-by-Step Instructions</h4>
                  <div className="space-y-3">
                    {recipe.steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary">{i + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
