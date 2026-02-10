import { motion } from "framer-motion";
import { Lightbulb, TrendingDown, AlertCircle, Target, Zap } from "lucide-react";
import { formatPrice, subscriptions } from "@/data/subscriptions";
import { useFavorites } from "@/hooks/useFavorites";
import { useBudget } from "@/hooks/useBudget";
import { useSavingsGoals } from "@/hooks/useSavingsGoals";
import { detectDuplicates } from "@/lib/duplicateDetector";

interface SmartInsightsProps {
  selectedPlans: Record<string, number>;
  totalMonthly: number;
}

const SmartInsights = ({ selectedPlans, totalMonthly }: SmartInsightsProps) => {
  const { favoritesCount } = useFavorites();
  const { budget, calculateUsage } = useBudget();
  const { activeGoals } = useSavingsGoals();
  
  const usage = calculateUsage(totalMonthly);
  const duplicates = detectDuplicates(selectedPlans);

  const insights: Array<{
    id: string;
    icon: any;
    title: string;
    description: string;
    color: string;
    priority: number;
  }> = [];

  // Budget insight
  if (usage) {
    if (usage.isOverBudget) {
      insights.push({
        id: 'budget-over',
        icon: AlertCircle,
        title: 'Budget dépassé',
        description: `Vous avez dépassé votre budget de ${formatPrice(Math.abs(usage.remaining))}. Supprimez des abonnements pour revenir dans les limites.`,
        color: 'text-red-400',
        priority: 10
      });
    } else if (usage.isNearThreshold) {
      insights.push({
        id: 'budget-near',
        icon: AlertCircle,
        title: 'Budget presque atteint',
        description: `Vous avez utilisé ${usage.percentage.toFixed(0)}% de votre budget. Faites attention aux nouveaux ajouts.`,
        color: 'text-yellow-400',
        priority: 8
      });
    } else if (usage.remaining > totalMonthly) {
      insights.push({
        id: 'budget-good',
        icon: Zap,
        title: 'Budget bien géré',
        description: `Il vous reste ${formatPrice(usage.remaining)} sur votre budget. Vous pouvez ajouter d'autres services si nécessaire.`,
        color: 'text-green-400',
        priority: 3
      });
    }
  }

  // Duplicates insight
  if (duplicates.length > 0) {
    insights.push({
      id: 'duplicates',
      icon: AlertCircle,
      title: `${duplicates.length} doublon${duplicates.length > 1 ? 's' : ''} détecté${duplicates.length > 1 ? 's' : ''}`,
      description: 'Vous payez peut-être pour des services similaires. Vérifiez la section doublons pour économiser.',
      color: 'text-orange-400',
      priority: 9
    });
  }

  // Goals insight
  if (activeGoals.length > 0) {
    const avgProgress = activeGoals.reduce((sum, g) => sum + (g.currentAmount / g.targetAmount) * 100, 0) / activeGoals.length;
    
    if (avgProgress < 30) {
      insights.push({
        id: 'goals-low',
        icon: Target,
        title: 'Objectifs à actualiser',
        description: `Vos objectifs d'économie progressent lentement (${avgProgress.toFixed(0)}%). Réduisez vos abonnements pour accélérer.`,
        color: 'text-blue-400',
        priority: 6
      });
    } else if (avgProgress >= 80) {
      insights.push({
        id: 'goals-high',
        icon: Target,
        title: 'Objectifs presque atteints !',
        description: `Bravo ! Vous avez atteint ${avgProgress.toFixed(0)}% de vos objectifs d'économie. Continuez !`,
        color: 'text-green-400',
        priority: 4
      });
    }
  }

  // Expensive subscriptions insight
  const expensiveSubs = Object.entries(selectedPlans)
    .map(([subId, planIndex]) => {
      const sub = subscriptions.find(s => s.id === subId);
      if (!sub) return null;
      return {
        name: sub.name,
        price: sub.plans[planIndex].monthlyPrice
      };
    })
    .filter(Boolean)
    .filter(s => s!.price > 20);

  if (expensiveSubs.length > 0) {
    const totalExpensive = expensiveSubs.reduce((sum, s) => sum + s!.price, 0);
    insights.push({
      id: 'expensive',
      icon: TrendingDown,
      title: `${expensiveSubs.length} abonnement${expensiveSubs.length > 1 ? 's' : ''} coûteux`,
      description: `${expensiveSubs.length} de vos abonnements coûtent plus de 20€/mois (total: ${formatPrice(totalExpensive)}). Vérifiez s'il existe des alternatives moins chères.`,
      color: 'text-purple-400',
      priority: 5
    });
  }

  // Low engagement insight
  if (favoritesCount === 0 && Object.keys(selectedPlans).length > 3) {
    insights.push({
      id: 'engagement',
      icon: Lightbulb,
      title: 'Utilisez les favoris',
      description: 'Marquez vos abonnements essentiels en favoris pour les retrouver rapidement.',
      color: 'text-cyan-400',
      priority: 2
    });
  }

  // Optimization opportunity
  if (Object.keys(selectedPlans).length >= 5 && totalMonthly > 50) {
    const avgPrice = totalMonthly / Object.keys(selectedPlans).length;
    if (avgPrice > 12) {
      insights.push({
        id: 'optimize',
        icon: Zap,
        title: 'Opportunité d\'optimisation',
        description: `Votre prix moyen par abonnement est de ${formatPrice(avgPrice)}. Cherchez des plans moins chers pour économiser.`,
        color: 'text-indigo-400',
        priority: 7
      });
    }
  }

  // Sort by priority
  const sortedInsights = insights.sort((a, b) => b.priority - a.priority).slice(0, 3);

  if (sortedInsights.length === 0) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-foreground">Insights intelligents</h3>
      </div>

      <div className="space-y-3">
        {sortedInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <h4 className={`font-bold ${insight.color} text-sm mb-1`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-foreground/70">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SmartInsights;
