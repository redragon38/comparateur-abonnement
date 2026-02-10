import { motion } from "framer-motion";
import { PieChart, BarChart3, TrendingUp, Users, Heart, Clock } from "lucide-react";
import { subscriptions, formatPrice, calculateTotalCost, type DurationOption } from "@/data/subscriptions";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { useNotes } from "@/hooks/useNotes";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PersonalStatsProps {
  selectedPlans: Record<string, number>;
  duration: DurationOption;
}

const PersonalStats = ({ selectedPlans, duration }: PersonalStatsProps) => {
  const { favoritesCount } = useFavorites();
  const { history } = useHistory();
  const { notesCount } = useNotes();

  // Calculate category distribution
  const categoryDistribution = Object.keys(selectedPlans).reduce((acc, subId) => {
    const sub = subscriptions.find(s => s.id === subId);
    if (sub) {
      acc[sub.category] = (acc[sub.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate average price
  const prices = Object.entries(selectedPlans).map(([subId, planIndex]) => {
    const sub = subscriptions.find(s => s.id === subId);
    return sub ? sub.plans[planIndex].monthlyPrice : 0;
  });

  const averagePrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;

  // Most visited categories from history
  const historyCategories = history
    .map(h => subscriptions.find(s => s.id === h.id)?.category)
    .filter(Boolean) as string[];
  
  const mostVisitedCategory = historyCategories.length > 0
    ? historyCategories
        .reduce((acc, cat) => {
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
    : {};

  const topCategory = Object.entries(mostVisitedCategory)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  // Engagement score (0-100)
  const engagementScore = Math.min(
    100,
    (favoritesCount * 10) +
    (history.length * 5) +
    (notesCount * 15) +
    (Object.keys(selectedPlans).length * 8)
  );

  const stats = [
    {
      title: "Abonnements actifs",
      value: Object.keys(selectedPlans).length,
      icon: BarChart3,
      color: "text-blue-400"
    },
    {
      title: "Favoris enregistrés",
      value: favoritesCount,
      icon: Heart,
      color: "text-red-400"
    },
    {
      title: "Services consultés",
      value: history.length,
      icon: Clock,
      color: "text-yellow-400"
    },
    {
      title: "Notes personnelles",
      value: notesCount,
      icon: Users,
      color: "text-green-400"
    }
  ];

  if (Object.keys(selectedPlans).length === 0 && favoritesCount === 0 && history.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-foreground">Vos statistiques</h3>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="glass rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-foreground/60">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Additional insights */}
      {Object.keys(selectedPlans).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <p className="text-foreground/60 text-sm mb-2">Prix moyen par mois</p>
            <p className="text-2xl font-bold text-foreground">{formatPrice(averagePrice)}</p>
          </div>

          {topCategory && (
            <div className="glass rounded-xl p-4">
              <p className="text-foreground/60 text-sm mb-2">Catégorie préférée</p>
              <p className="text-lg font-bold text-foreground">{topCategory}</p>
            </div>
          )}
        </div>
      )}

      {/* Engagement score */}
      <div className="stat-card-shock rounded-xl p-4 text-center">
        <p className="text-white/80 text-sm mb-2">Score d'engagement</p>
        <p className="text-4xl font-bold text-white mb-1">{engagementScore}</p>
        <p className="text-white/60 text-xs">
          {engagementScore >= 80 ? '🔥 Utilisateur expert !' :
           engagementScore >= 50 ? '⭐ Utilisateur actif' :
           '🌱 Débutant'}
        </p>
      </div>

      {/* Category distribution (simple pie visualization) */}
      {Object.keys(categoryDistribution).length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Répartition par catégorie
          </p>
          {Object.entries(categoryDistribution)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const percentage = (count / Object.keys(selectedPlans).length) * 100;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/80">{category}</span>
                    <span className="text-foreground/60">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </motion.div>
  );
};

export default PersonalStats;
