import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target } from "lucide-react";
import { formatPrice, calculateTotalCost, subscriptions, type DurationOption } from "@/data/subscriptions";
import { useBudget } from "@/hooks/useBudget";
import { useSavingsGoals } from "@/hooks/useSavingsGoals";
import { useRenewals } from "@/hooks/useRenewals";

interface SummaryWidgetProps {
  selectedPlans: Record<string, number>;
  duration: DurationOption;
}

const SummaryWidget = ({ selectedPlans, duration }: SummaryWidgetProps) => {
  const { budget, calculateUsage } = useBudget();
  const { activeGoals } = useSavingsGoals();
  const { getUpcomingRenewals } = useRenewals();

  // Calculate totals
  const monthlyTotal = Object.entries(selectedPlans).reduce((sum, [subId, planIndex]) => {
    const sub = subscriptions.find(s => s.id === subId);
    if (!sub) return sum;
    return sum + sub.plans[planIndex].monthlyPrice;
  }, 0);

  const yearlyTotal = monthlyTotal * 12;
  const usage = calculateUsage(monthlyTotal);
  const upcomingRenewals = getUpcomingRenewals(7);

  // Calculate total goal progress
  const totalGoalProgress = activeGoals.reduce((sum, goal) => {
    return sum + (goal.currentAmount / goal.targetAmount) * 100;
  }, 0) / (activeGoals.length || 1);

  if (Object.keys(selectedPlans).length === 0) return null;

  return (
    <motion.div
      className="stat-card-shock rounded-2xl p-6 text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5" />
        Récapitulatif
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Monthly cost */}
        <div className="glass-strong rounded-xl p-4 text-center">
          <p className="text-white/70 text-xs mb-1">Par mois</p>
          <p className="text-2xl font-bold">{formatPrice(monthlyTotal)}</p>
        </div>

        {/* Yearly cost */}
        <div className="glass-strong rounded-xl p-4 text-center">
          <p className="text-white/70 text-xs mb-1">Par an</p>
          <p className="text-2xl font-bold">{formatPrice(yearlyTotal)}</p>
        </div>

        {/* Active subscriptions */}
        <div className="glass-strong rounded-xl p-4 text-center">
          <p className="text-white/70 text-xs mb-1">Abonnements</p>
          <p className="text-2xl font-bold">{Object.keys(selectedPlans).length}</p>
        </div>

        {/* Average price */}
        <div className="glass-strong rounded-xl p-4 text-center">
          <p className="text-white/70 text-xs mb-1">Moy/service</p>
          <p className="text-2xl font-bold">
            {formatPrice(monthlyTotal / Object.keys(selectedPlans).length)}
          </p>
        </div>
      </div>

      {/* Budget status */}
      {usage && (
        <div className="mt-4 glass-strong rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Budget mensuel</span>
            <span className="text-sm font-medium">{usage.percentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                usage.isOverBudget ? 'bg-red-400' : 
                usage.isNearThreshold ? 'bg-yellow-400' : 
                'bg-green-400'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(usage.percentage, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-white/60">
              {formatPrice(usage.spent)} / {formatPrice(usage.budgetLimit)}
            </span>
            {!usage.isOverBudget && (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                {formatPrice(usage.remaining)} restant
              </span>
            )}
          </div>
        </div>
      )}

      {/* Goals progress */}
      {activeGoals.length > 0 && (
        <div className="mt-4 glass-strong rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Objectifs ({activeGoals.length})
            </span>
            <span className="text-sm font-medium">{totalGoalProgress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalGoalProgress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Upcoming renewals */}
      {upcomingRenewals.length > 0 && (
        <div className="mt-4 glass-strong rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm text-white/70">
              Renouvellements à venir (7j)
            </span>
          </div>
          <p className="text-lg font-bold">{upcomingRenewals.length} service{upcomingRenewals.length > 1 ? 's' : ''}</p>
          <p className="text-xs text-white/60 mt-1">
            Total: {formatPrice(upcomingRenewals.reduce((sum, r) => sum + r.price, 0))}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SummaryWidget;
