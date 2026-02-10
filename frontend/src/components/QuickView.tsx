import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Heart, GitCompare } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { subscriptions, formatPrice, calculateTotalCost, type DurationOption, type Subscription } from "@/data/subscriptions";
import { enrichedSubscriptions } from "@/data/enrichedSubscriptions";
import { Badge } from "./ui/badge";
import { getBadgesForSubscription, calculateValueScore } from "@/lib/badgesUtils";

interface QuickViewProps {
  subscriptionId: string | null;
  isOpen: boolean;
  onClose: () => void;
  duration: DurationOption;
  selectedPlanIndex: number;
  onPlanChange: (index: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isCompared?: boolean;
  onToggleCompare?: () => void;
}

const QuickView = ({
  subscriptionId,
  isOpen,
  onClose,
  duration,
  selectedPlanIndex,
  onPlanChange,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare
}: QuickViewProps) => {
  if (!subscriptionId) return null;

  const subscription = subscriptions.find(s => s.id === subscriptionId);
  const enrichedData = enrichedSubscriptions[subscriptionId];

  if (!subscription) return null;

  const selectedPlan = subscription.plans[selectedPlanIndex];
  const totalCost = calculateTotalCost(selectedPlan.monthlyPrice, duration.months);
  const badges = getBadgesForSubscription(subscription);
  const valueScore = calculateValueScore(subscription);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/10 max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ backgroundColor: subscription.color + "20" }}
            >
              {subscription.logo}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {subscription.name}
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline">{subscription.category}</Badge>
                {badges.map((badge, idx) => (
                  <Badge key={idx} className={`${badge.color} border`}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
              
              {/* Value score */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/60">Score de valeur:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= valueScore ? 'text-yellow-500' : 'text-foreground/20'}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {valueScore.toFixed(1)}/5
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {onToggleFavorite && (
                <Button
                  variant="outline"
                  size="icon"
                  className={`glass border-white/10 ${isFavorite ? 'bg-red-400/10 border-red-400/30' : ''}`}
                  onClick={onToggleFavorite}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-400' : ''}`} />
                </Button>
              )}
              {onToggleCompare && (
                <Button
                  variant="outline"
                  size="icon"
                  className={`glass border-white/10 ${isCompared ? 'bg-accent/10 border-accent/30' : ''}`}
                  onClick={onToggleCompare}
                >
                  <GitCompare className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          {enrichedData?.description && (
            <p className="text-foreground/70 leading-relaxed">{enrichedData.description}</p>
          )}

          {/* Plans */}
          <div className="space-y-3">
            <h3 className="font-bold text-foreground">Formules disponibles</h3>
            <div className="grid gap-3">
              {subscription.plans.map((plan, index) => {
                const cost = calculateTotalCost(plan.monthlyPrice, duration.months);
                const isSelected = index === selectedPlanIndex;

                return (
                  <motion.div
                    key={plan.name}
                    className={`glass rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-accent bg-accent/5' : 'hover:glass-strong'
                    }`}
                    onClick={() => onPlanChange(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-foreground">{plan.name}</p>
                        <p className="text-sm text-foreground/60">
                          {formatPrice(plan.monthlyPrice)}/mois
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">
                          {formatPrice(cost)}
                        </p>
                        <p className="text-xs text-foreground/60">sur {duration.label}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Website link */}
          {enrichedData?.website && (
            <Button
              variant="outline"
              className="w-full glass border-white/10 hover:glass-strong"
              onClick={() => window.open(enrichedData.website, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visiter le site officiel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;
