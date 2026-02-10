import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { subscriptions, type Subscription } from "@/data/subscriptions";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const Suggestions = () => {
  const { favorites } = useFavorites();
  const { history } = useHistory();
  const navigate = useNavigate();

  const suggestedSubscriptions = useMemo(() => {
    // Get categories from favorites and history
    const favoriteCategories = favorites
      .map(id => subscriptions.find(s => s.id === id)?.category)
      .filter(Boolean) as string[];

    const historyCategories = history
      .map(h => subscriptions.find(s => s.id === h.id)?.category)
      .filter(Boolean) as string[];

    const allCategories = [...favoriteCategories, ...historyCategories];
    
    if (allCategories.length === 0) {
      // No data, show popular ones
      return subscriptions
        .filter(s => ['netflix', 'spotify', 'disney-plus', 'youtube-premium'].includes(s.id))
        .slice(0, 4);
    }

    // Count category frequency
    const categoryCount = allCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get most common category
    const topCategory = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)[0][0];

    // Exclude already favorited and in history
    const excludeIds = [...favorites, ...history.map(h => h.id)];

    // Get suggestions from same category
    const suggestions = subscriptions
      .filter(s => s.category === topCategory && !excludeIds.includes(s.id))
      .sort((a, b) => {
        // Sort by cheapest option
        const minA = Math.min(...a.plans.map(p => p.monthlyPrice));
        const minB = Math.min(...b.plans.map(p => p.monthlyPrice));
        return minA - minB;
      })
      .slice(0, 4);

    return suggestions;
  }, [favorites, history]);

  if (suggestedSubscriptions.length === 0) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-bold text-foreground">Vous pourriez aimer</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {suggestedSubscriptions.map((sub, index) => (
          <motion.div
            key={sub.id}
            className="glass rounded-xl p-4 cursor-pointer hover:glass-strong transition-all text-center"
            onClick={() => navigate(`/subscription/${sub.id}`)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="text-3xl mb-2">{sub.logo}</div>
            <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
            <p className="text-xs text-foreground/40 mt-1">{sub.category}</p>
            <p className="text-xs text-accent font-medium mt-2">
              Dès {Math.min(...sub.plans.map(p => p.monthlyPrice)).toFixed(2)}€/mois
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Suggestions;
