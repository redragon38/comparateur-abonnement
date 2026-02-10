import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { useSpendingHistory } from "@/hooks/useSpendingHistory";
import { formatPrice } from "@/data/subscriptions";
import { Badge } from "./ui/badge";

const SpendingEvolution = () => {
  const { spendingHistory, getLastMonths, getEvolution } = useSpendingHistory();
  const lastMonths = getLastMonths(6);
  const evolution = getEvolution();

  if (lastMonths.length < 2) return null;

  const maxValue = Math.max(...lastMonths.map(s => s.totalMonthly));

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Évolution des dépenses</h3>
        {evolution && (
          <Badge 
            variant="outline" 
            className={
              evolution.direction === 'up' ? 'bg-red-400/10 text-red-400 border-red-400/30' :
              evolution.direction === 'down' ? 'bg-green-400/10 text-green-400 border-green-400/30' :
              'bg-foreground/10 text-foreground border-foreground/30'
            }
          >
            {evolution.direction === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {evolution.direction === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {evolution.direction === 'stable' && <Minus className="w-3 h-3 mr-1" />}
            {evolution.percentageChange > 0 ? '+' : ''}{evolution.percentageChange.toFixed(1)}%
          </Badge>
        )}
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {lastMonths.map((snapshot, index) => {
          const heightPercentage = (snapshot.totalMonthly / maxValue) * 100;
          const date = new Date(snapshot.date + '-01');
          const monthName = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });

          return (
            <div key={snapshot.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">{monthName}</span>
                <span className="text-foreground font-medium">{formatPrice(snapshot.totalMonthly)}</span>
              </div>
              <div className="h-8 bg-foreground/10 rounded-lg overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-primary rounded-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${heightPercentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
                <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs text-white font-medium">
                  {snapshot.subscriptionCount} abonnement{snapshot.subscriptionCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      {evolution && (
        <div className="mt-6 glass rounded-xl p-4">
          <div className="flex items-start gap-3">
            {evolution.direction === 'up' ? (
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm text-foreground">
                {evolution.direction === 'up' && (
                  <>Vos dépenses ont <strong className="text-red-400">augmenté de {formatPrice(Math.abs(evolution.monthlyChange))}</strong> ce mois-ci</>
                )}
                {evolution.direction === 'down' && (
                  <>Vous avez <strong className="text-green-400">économisé {formatPrice(Math.abs(evolution.monthlyChange))}</strong> ce mois-ci</>
                )}
                {evolution.direction === 'stable' && (
                  <>Vos dépenses sont <strong>stables</strong> ce mois-ci</>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SpendingEvolution;
