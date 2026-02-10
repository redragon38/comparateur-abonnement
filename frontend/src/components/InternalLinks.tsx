import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { subscriptions } from "@/data/subscriptions";

const InternalLinks = () => {
  const { language } = useLanguage();

  // Grouper par catégorie
  const categories = [
    { 
      name: language === 'fr' ? 'Streaming Vidéo' : 'Video Streaming',
      subs: subscriptions.filter(s => s.category === 'Streaming vidéo').slice(0, 6)
    },
    { 
      name: language === 'fr' ? 'Musique' : 'Music',
      subs: subscriptions.filter(s => s.category === 'Musique').slice(0, 6)
    },
    { 
      name: language === 'fr' ? 'Jeux Vidéo' : 'Gaming',
      subs: subscriptions.filter(s => s.category === 'Jeux vidéo').slice(0, 6)
    },
    { 
      name: language === 'fr' ? 'Productivité' : 'Productivity',
      subs: subscriptions.filter(s => s.category === 'Productivité').slice(0, 6)
    },
  ];

  return (
    <section className="py-12 border-t border-white/10" aria-labelledby="quick-links">
      <div className="container">
        <h2 id="quick-links" className="text-xl font-bold text-foreground mb-6 text-center">
          {language === 'fr' ? 'Comparer les prix par catégorie' : 'Compare prices by category'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.nav
              key={category.name}
              className="glass rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              aria-label={category.name}
            >
              <h3 className="font-semibold text-foreground mb-3 text-sm border-b border-white/10 pb-2">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.subs.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      to={`/subscription/${sub.id}`}
                      className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors group"
                    >
                      <span className="text-base">{sub.logo}</span>
                      <span className="group-hover:underline">
                        {language === 'fr' ? `Prix ${sub.name}` : `${sub.name} Price`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* Related searches */}
        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/40 mb-3">
            {language === 'fr' ? 'Recherches populaires :' : 'Popular searches:'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              language === 'fr' ? 'combien coute netflix' : 'how much is netflix',
              language === 'fr' ? 'prix spotify 2026' : 'spotify price 2026',
              language === 'fr' ? 'disney+ tarif' : 'disney+ pricing',
              language === 'fr' ? 'comparateur streaming' : 'streaming comparator',
              language === 'fr' ? 'économiser abonnement' : 'save on subscriptions',
              language === 'fr' ? 'code promo netflix' : 'netflix promo code',
            ].map((term) => (
              <span
                key={term}
                className="px-3 py-1 rounded-full glass text-xs text-foreground/50"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalLinks;
