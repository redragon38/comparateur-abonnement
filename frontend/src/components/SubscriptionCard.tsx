import { calculateTotalCost, formatPrice, type Subscription, type DurationOption } from "@/data/subscriptions";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, GitCompare, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getBadgesForSubscription, calculateValueScore } from "@/lib/badgesUtils";
import { Badge } from "./ui/badge";

interface SubscriptionCardProps {
  subscription: Subscription;
  duration: DurationOption;
  selectedPlanIndex: number;
  onPlanChange: (index: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const SubscriptionCard = ({ 
  subscription, 
  duration, 
  selectedPlanIndex, 
  onPlanChange,
  isFavorite = false,
  onToggleFavorite,
  isCompared = false,
  onToggleCompare,
  onQuickView
}: SubscriptionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = subscription.plans[selectedPlanIndex];
  const totalCost = calculateTotalCost(plan.monthlyPrice, duration.months);
  const isExpensive = totalCost > 500;
  const badges = getBadgesForSubscription(subscription);
  const valueScore = calculateValueScore(subscription);

  const handleCardClick = (e: React.MouseEvent) => {
    // Ne pas naviguer si on clique sur un bouton de plan ou une action
    if (
      (e.target as HTMLElement).closest('button[data-plan-button]') ||
      (e.target as HTMLElement).closest('button[data-action-button]')
    ) {
      return;
    }
    navigate(`/subscription/${subscription.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(subscription.id);
      toast({
        title: isFavorite ? "Retiré des favoris" : "Ajouté aux favoris",
        description: `${subscription.name} ${isFavorite ? 'a été retiré de' : 'a été ajouté à'} vos favoris`,
        duration: 2000,
      });
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleCompare) {
      onToggleCompare(subscription.id);
      toast({
        title: isCompared ? "Retiré de la comparaison" : "Ajouté à la comparaison",
        description: `${subscription.name} ${isCompared ? 'a été retiré de' : 'a été ajouté à'} la comparaison`,
        duration: 2000,
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(subscription.id);
    }
  };

  return (
    <motion.div 
      className="glass-card rounded-2xl p-5 flex flex-col group cursor-pointer overflow-hidden relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ 
        y: -6,
        backgroundColor: "hsl(0 0% 100% / 0.12)",
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? "0 25px 50px -12px hsl(0 0% 0% / 0.3), 0 0 30px -5px hsl(200 85% 55% / 0.15)"
            : "none"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <motion.span 
          className="text-3xl w-12 h-12 rounded-xl glass-strong flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {subscription.logo}
        </motion.span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-foreground truncate">{subscription.name}</h3>
          <span className="text-xs text-foreground/40">{subscription.category}</span>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-1">
          {onQuickView && (
            <motion.button
              data-action-button
              onClick={handleQuickView}
              className="p-2 rounded-lg glass text-foreground/40 hover:text-accent transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Aperçu rapide"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          )}
          {onToggleFavorite && (
            <motion.button
              data-action-button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-lg transition-all ${
                isFavorite 
                  ? 'text-red-400 bg-red-400/10' 
                  : 'text-foreground/40 hover:text-red-400 glass'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Favori"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
          )}
          {onToggleCompare && (
            <motion.button
              data-action-button
              onClick={handleCompareClick}
              className={`p-2 rounded-lg transition-all ${
                isCompared 
                  ? 'text-accent bg-accent/10' 
                  : 'text-foreground/40 hover:text-accent glass'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Comparer"
            >
              <GitCompare className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
          {badges.map((badge, idx) => (
            <Badge key={idx} className={`${badge.color} border text-xs px-2 py-0.5`}>
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Value score */}
      <div className="flex items-center gap-1 mb-3 relative z-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-xs ${star <= valueScore ? 'text-yellow-500' : 'text-foreground/20'}`}>
            ⭐
          </span>
        ))}
        <span className="text-xs text-foreground/60 ml-1">{valueScore.toFixed(1)}</span>
      </div>

      {/* Plan selector */}
      {subscription.plans.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
          {subscription.plans.map((p, i) => (
            <motion.button
              key={p.name}
              data-plan-button
              onClick={(e) => {
                e.stopPropagation();
                onPlanChange(i);
              }}
              className={`
                text-xs px-3 py-1.5 rounded-lg transition-all font-medium
                ${
                  i === selectedPlanIndex
                    ? "stat-card-shock text-white"
                    : "glass text-foreground/50 hover:text-foreground"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {p.name}
            </motion.button>
          ))}
        </div>
      )}

      {/* Pricing */}
      <div className="mt-auto space-y-3 relative z-10">
        <motion.div 
          className="flex items-baseline justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-foreground/40">Par mois</span>
          <span className="text-lg font-semibold text-foreground/80">{formatPrice(plan.monthlyPrice)}</span>
        </motion.div>

        <div className="h-px bg-white/10" />

        <motion.div 
          className="flex items-baseline justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm text-foreground/40">Sur {duration.label}</span>
          <motion.span 
            className={`text-2xl font-bold ${isExpensive ? "text-gradient-shock" : "text-foreground"}`}
            key={totalCost}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {formatPrice(totalCost)}
          </motion.span>
        </motion.div>

        {isExpensive && (
          <motion.div 
            className="stat-card-shock rounded-xl text-white text-xs font-bold px-3 py-2.5 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            💸 {formatPrice(totalCost)} partis en {duration.label}
          </motion.div>
        )}

        {/* Click indicator */}
        <motion.div
          className="text-center text-xs text-foreground/30 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Cliquez pour plus d'infos →
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;
