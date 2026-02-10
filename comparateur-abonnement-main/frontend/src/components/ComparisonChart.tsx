import { motion } from "framer-motion";
import { formatPrice, type Subscription, type DurationOption } from "@/data/subscriptions";
import { BarChart3 } from "lucide-react";

interface ComparisonChartProps {
  subscriptions: Subscription[];
  duration: DurationOption;
  selectedPlans: Record<string, number>;
}

const ComparisonChart = ({ subscriptions, duration, selectedPlans }: ComparisonChartProps) => {
  // Calculer les coûts totaux
  const costs = subscriptions.map((sub) => {
    const planIndex = selectedPlans[sub.id] ?? 0;
    const plan = sub.plans[planIndex];
    const totalCost = plan.monthlyPrice * duration.months;
    return {
      name: sub.name,
      cost: totalCost,
      logo: sub.logo,
    };
  });

  // Trier par coût décroissant
  const sortedCosts = [...costs].sort((a, b) => b.cost - a.cost);
  const maxCost = sortedCosts[0]?.cost || 1;
  const totalCost = costs.reduce((sum, item) => sum + item.cost, 0);

  return (
    <motion.div 
      className="glass-strong rounded-2xl p-6 space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl stat-card-purple flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Comparaison visuelle</h3>
          <p className="text-sm text-foreground/50">Coût total sur {duration.label}</p>
        </div>
      </div>

      {/* Total global */}
      <div className="glass rounded-xl p-4 text-center">
        <p className="text-sm text-foreground/50 mb-1">Coût total de tous les abonnements</p>
        <p className="text-3xl font-bold text-gradient-shock">{formatPrice(totalCost)}</p>
        <p className="text-xs text-foreground/40 mt-1">sur {duration.label}</p>
      </div>

      {/* Barres de comparaison */}
      <div className="space-y-3">
        {sortedCosts.map((item, index) => {
          const percentage = (item.cost / maxCost) * 100;
          
          return (
            <motion.div 
              key={item.name}
              className="space-y-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.logo}</span>
                  <span className="text-foreground/70">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{formatPrice(item.cost)}</span>
              </div>
              
              <div className="h-3 rounded-full glass overflow-hidden">
                <motion.div 
                  className="h-full rounded-full stat-card-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="space-y-2 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/50">Service le plus cher</span>
          <span className="font-semibold text-foreground">{sortedCosts[0]?.name}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/50">Coût moyen par service</span>
          <span className="font-semibold text-foreground">
            {formatPrice(totalCost / costs.length)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonChart;
