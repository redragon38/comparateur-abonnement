import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingDown, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { subscriptions, formatPrice, calculateTotalCost, type DurationOption } from "@/data/subscriptions";
import { Badge } from "@/components/ui/badge";

interface RecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlans: Record<string, number>;
  duration: DurationOption;
}

interface Recommendation {
  subscriptionId: string;
  subscriptionName: string;
  currentPlan: string;
  currentCost: number;
  suggestedPlan: string;
  suggestedCost: number;
  savings: number;
  category: string;
}

const RecommendationsModal = ({ isOpen, onClose, selectedPlans, duration }: RecommendationsModalProps) => {
  // Générer les recommandations
  const recommendations: Recommendation[] = [];

  Object.entries(selectedPlans).forEach(([subId, planIndex]) => {
    const subscription = subscriptions.find(s => s.id === subId);
    if (!subscription || subscription.plans.length <= 1) return;

    const currentPlan = subscription.plans[planIndex];
    const currentCost = calculateTotalCost(currentPlan.monthlyPrice, duration.months);

    // Trouver un plan moins cher
    const cheaperPlans = subscription.plans
      .map((plan, idx) => ({ plan, idx }))
      .filter(({ idx }) => idx !== planIndex && subscription.plans[idx].monthlyPrice < currentPlan.monthlyPrice)
      .sort((a, b) => b.plan.monthlyPrice - a.plan.monthlyPrice); // Du plus cher au moins cher des options moins chères

    if (cheaperPlans.length > 0) {
      const suggested = cheaperPlans[0];
      const suggestedCost = calculateTotalCost(suggested.plan.monthlyPrice, duration.months);
      const savings = currentCost - suggestedCost;

      if (savings > 0) {
        recommendations.push({
          subscriptionId: subId,
          subscriptionName: subscription.name,
          currentPlan: currentPlan.name,
          currentCost,
          suggestedPlan: suggested.plan.name,
          suggestedCost,
          savings,
          category: subscription.category
        });
      }
    }
  });

  // Calculer les économies totales
  const totalSavings = recommendations.reduce((sum, rec) => sum + rec.savings, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            Recommandations d'économies
          </DialogTitle>
        </DialogHeader>

        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <TrendingDown className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <p className="text-foreground/60">
              Vous avez déjà sélectionné les plans les plus économiques ! 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Total des économies possibles */}
            <motion.div
              className="stat-card-shock p-6 rounded-xl text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-white/80 text-sm mb-1">Économies potentielles sur {duration.label}</p>
              <p className="text-3xl font-bold text-white">{formatPrice(totalSavings)}</p>
            </motion.div>

            {/* Liste des recommandations */}
            <div className="space-y-4">
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={rec.subscriptionId}
                  className="glass rounded-xl p-5 space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{rec.subscriptionName}</h3>
                      <Badge variant="outline" className="mt-1">{rec.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-accent font-bold text-xl">-{formatPrice(rec.savings)}</p>
                      <p className="text-xs text-foreground/60">d'économie</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="glass-strong p-3 rounded-lg">
                      <p className="text-foreground/60 text-xs mb-1">Plan actuel</p>
                      <p className="font-semibold text-foreground">{rec.currentPlan}</p>
                      <p className="text-foreground/80">{formatPrice(rec.currentCost)}</p>
                    </div>
                    <div className="glass-strong p-3 rounded-lg border-2 border-accent/30">
                      <p className="text-accent text-xs mb-1">Plan recommandé</p>
                      <p className="font-semibold text-foreground">{rec.suggestedPlan}</p>
                      <p className="text-foreground/80">{formatPrice(rec.suggestedCost)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button 
              onClick={onClose}
              className="w-full stat-card-shock text-white"
            >
              Compris !
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationsModal;
