import { motion } from "framer-motion";
import { History, ArrowRight, X } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { subscriptions } from "@/data/subscriptions";

const RecentlyViewed = () => {
  const { history, removeFromHistory, clearHistory } = useHistory();
  const { language } = useLanguage();

  if (history.length === 0) return null;

  // Enrichir avec les données actuelles
  const enrichedHistory = history.map(item => {
    const sub = subscriptions.find(s => s.id === item.id);
    return { ...item, price: sub?.plans[0]?.monthlyPrice || 0 };
  });

  return (
    <motion.section
      className="py-8 border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-labelledby="recent-title"
    >
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-foreground/50" />
            <h3 id="recent-title" className="font-semibold text-foreground">
              {language === 'fr' ? 'Vus récemment' : 'Recently viewed'}
            </h3>
          </div>
          <button
            onClick={clearHistory}
            className="text-xs text-foreground/40 hover:text-foreground transition-colors"
          >
            {language === 'fr' ? 'Effacer' : 'Clear'}
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {enrichedHistory.slice(0, 8).map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/subscription/${item.id}`}
                className="glass rounded-xl p-3 flex items-center gap-3 hover:glass-strong transition-all group min-w-[180px]"
              >
                <span className="text-2xl">{item.logo}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-foreground/50">{item.price}€/{language === 'fr' ? 'mois' : 'mo'}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground transition-colors" />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFromHistory(item.id);
                }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecentlyViewed;
