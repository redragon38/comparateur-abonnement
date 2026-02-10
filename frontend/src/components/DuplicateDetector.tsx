import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { detectDuplicates, getRecommendationsForDuplicates } from "@/lib/duplicateDetector";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/data/subscriptions";
import { useState } from "react";

interface DuplicateDetectorProps {
  selectedPlans: Record<string, number>;
}

const DuplicateDetector = ({ selectedPlans }: DuplicateDetectorProps) => {
  const [dismissed, setDismissed] = useState<string[]>([]);
  
  const duplicates = detectDuplicates(selectedPlans);
  const recommendations = getRecommendationsForDuplicates(duplicates);

  const visibleRecommendations = recommendations.filter(
    rec => rec && !dismissed.includes(`${rec.subscription1.id}-${rec.subscription2.id}`)
  );

  if (visibleRecommendations.length === 0) return null;

  const handleDismiss = (sub1Id: string, sub2Id: string) => {
    setDismissed(prev => [...prev, `${sub1Id}-${sub2Id}`]);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {visibleRecommendations.map((rec, index) => (
          <motion.div
            key={`${rec!.subscription1.id}-${rec!.subscription2.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Alert className="border-orange-400/30 bg-orange-400/10 relative pr-12">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <AlertDescription className="text-orange-400">
                <div className="space-y-2">
                  <p className="font-medium">
                    Doublon détecté : {rec!.subscription1.name} et {rec!.subscription2.name}
                  </p>
                  <p className="text-sm">
                    {rec!.reason}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-white/10 text-white">
                      {rec!.recommendation}
                    </Badge>
                    {rec!.savings > 0 && (
                      <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400/30">
                        Économisez {formatPrice(rec!.savings)}/mois
                      </Badge>
                    )}
                  </div>
                </div>
              </AlertDescription>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 text-orange-400/60 hover:text-orange-400"
                onClick={() => handleDismiss(rec!.subscription1.id, rec!.subscription2.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </Alert>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DuplicateDetector;
