import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { subscriptions, formatPrice, type Subscription } from "@/data/subscriptions";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface SimilarSubscriptionsProps {
  currentId: string;
  category: string;
}

const SimilarSubscriptions = ({ currentId, category }: SimilarSubscriptionsProps) => {
  const { language } = useLanguage();

  // Trouver des abonnements similaires (même catégorie, exclure l'actuel)
  const similarSubs = subscriptions
    .filter(s => s.category === category && s.id !== currentId)
    .slice(0, 4);

  // Ajouter quelques abonnements populaires d'autres catégories
  const popularOthers = subscriptions
    .filter(s => s.category !== category && ['netflix', 'spotify', 'disney-plus', 'amazon-prime', 'xbox-game-pass'].includes(s.id))
    .filter(s => s.id !== currentId)
    .slice(0, 2);

  const allSimilar = [...similarSubs, ...popularOthers].slice(0, 6);

  if (allSimilar.length === 0) return null;

  return (
    <section className="py-12 border-t border-white/10" aria-labelledby="similar-title">
      <div className="container">
        <h2 id="similar-title" className="text-xl font-bold text-foreground mb-6">
          {language === 'fr' ? 'Vous pourriez aussi comparer' : 'You might also compare'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allSimilar.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/subscription/${sub.id}`}
                className="glass rounded-xl p-4 flex flex-col items-center gap-2 hover:glass-strong transition-all group text-center"
              >
                <span className="text-3xl">{sub.logo}</span>
                <span className="font-semibold text-foreground text-sm">{sub.name}</span>
                <span className="text-xs text-foreground/50">
                  {language === 'fr' ? 'à partir de' : 'from'} {formatPrice(sub.plans[0].monthlyPrice)}/{language === 'fr' ? 'mois' : 'mo'}
                </span>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  {language === 'fr' ? 'Voir' : 'View'} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA vers comparateur */}
        <div className="text-center mt-8">
          <Link
            to="/#comparateur"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            {language === 'fr' ? 'Voir tous les abonnements' : 'View all subscriptions'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimilarSubscriptions;
