import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingDown, PiggyBank, Share2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { subscriptions, formatPrice, calculateTotalCost, durationOptions } from "@/data/subscriptions";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

const SavingsCalculator = () => {
  const { language } = useLanguage();
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const popularSubs = subscriptions.filter(s => 
    ['netflix', 'spotify', 'disney-plus', 'amazon-prime', 'youtube-premium', 'apple-music', 'xbox-game-pass', 'playstation-plus', 'deezer', 'canal-plus', 'hbo-max', 'apple-tv-plus'].includes(s.id)
  );

  const toggleSub = (id: string) => {
    setSelectedSubs(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculations = useMemo(() => {
    const selectedSubscriptions = subscriptions.filter(s => selectedSubs.includes(s.id));
    const monthlyTotal = selectedSubscriptions.reduce((sum, sub) => sum + sub.plans[0].monthlyPrice, 0);
    
    return {
      monthly: monthlyTotal,
      yearly: monthlyTotal * 12,
      fiveYears: monthlyTotal * 60,
      tenYears: monthlyTotal * 120,
      subscriptionCount: selectedSubscriptions.length,
      // Estimation d'économies potentielles (partage famille, promos)
      potentialSavings: Math.round(monthlyTotal * 12 * 0.25), // ~25% d'économies possibles
      // Équivalents fun
      coffees: Math.round((monthlyTotal * 12) / 4), // 4€ par café
      weekends: Math.round((monthlyTotal * 60) / 300), // 300€ par weekend
      vacations: Math.round((monthlyTotal * 120) / 1500), // 1500€ par vacances
    };
  }, [selectedSubs]);

  const shareResults = () => {
    const text = language === 'fr' 
      ? `💰 Mes abonnements me coûtent ${formatPrice(calculations.yearly)}/an ! Découvre ton coût réel sur CombienÇaCoûte`
      : `💰 My subscriptions cost me ${formatPrice(calculations.yearly)}/year! Find out your real cost on CombienÇaCoûte`;
    
    if (navigator.share) {
      navigator.share({ title: 'CombienÇaCoûte', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
    }
  };

  return (
    <section id="calculateur" className="py-16 md:py-20" aria-labelledby="calc-title">
      <div className="container max-w-4xl">
        <motion.div
          className="glass-strong rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl stat-card-accent mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 id="calc-title" className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'fr' ? (
                <>Calcule <span className="text-gradient-accent">tes dépenses</span></>
              ) : (
                <>Calculate <span className="text-gradient-accent">your expenses</span></>
              )}
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto">
              {language === 'fr' 
                ? "Sélectionne tes abonnements pour voir combien tu dépenses vraiment"
                : "Select your subscriptions to see how much you really spend"}
            </p>
          </div>

          {/* Selection grid */}
          <div className="mb-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {popularSubs.map(sub => (
                <motion.button
                  key={sub.id}
                  onClick={() => toggleSub(sub.id)}
                  className={`
                    relative p-3 rounded-xl transition-all flex flex-col items-center gap-2
                    ${selectedSubs.includes(sub.id) 
                      ? 'stat-card-shock text-white ring-2 ring-white/30' 
                      : 'glass hover:glass-strong text-foreground/70'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{sub.logo}</span>
                  <span className="text-xs font-medium truncate w-full text-center">{sub.name}</span>
                  {selectedSubs.includes(sub.id) && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <span className="text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Expand button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full mt-4 py-2 glass rounded-lg text-sm text-foreground/60 hover:text-foreground flex items-center justify-center gap-2 transition-colors"
            >
              {isExpanded 
                ? (language === 'fr' ? 'Voir moins' : 'Show less')
                : (language === 'fr' ? `Voir tous les services (${subscriptions.length})` : `See all services (${subscriptions.length})`)
              }
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4 pt-4 border-t border-white/10">
                    {subscriptions.filter(s => !popularSubs.find(p => p.id === s.id)).slice(0, 24).map(sub => (
                      <motion.button
                        key={sub.id}
                        onClick={() => toggleSub(sub.id)}
                        className={`
                          relative p-3 rounded-xl transition-all flex flex-col items-center gap-2
                          ${selectedSubs.includes(sub.id) 
                            ? 'stat-card-shock text-white ring-2 ring-white/30' 
                            : 'glass hover:glass-strong text-foreground/70'
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{sub.logo}</span>
                        <span className="text-xs font-medium truncate w-full text-center">{sub.name}</span>
                        {selectedSubs.includes(sub.id) && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <span className="text-xs">✓</span>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results */}
          <AnimatePresence>
            {selectedSubs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Main stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">
                      {language === 'fr' ? 'Par mois' : 'Per month'}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{formatPrice(calculations.monthly)}</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">
                      {language === 'fr' ? 'Par an' : 'Per year'}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{formatPrice(calculations.yearly)}</p>
                  </div>
                  <div className="stat-card-shock rounded-xl p-4 text-center glow-shock">
                    <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                      {language === 'fr' ? 'Sur 5 ans' : 'Over 5 years'}
                    </p>
                    <p className="text-2xl font-bold text-white">{formatPrice(calculations.fiveYears)}</p>
                  </div>
                  <div className="stat-card-accent rounded-xl p-4 text-center glow-accent">
                    <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                      {language === 'fr' ? 'Sur 10 ans' : 'Over 10 years'}
                    </p>
                    <p className="text-2xl font-bold text-white">{formatPrice(calculations.tenYears)}</p>
                  </div>
                </div>

                {/* Fun equivalents */}
                <div className="glass rounded-xl p-5">
                  <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    {language === 'fr' ? 'Ça représente...' : 'That represents...'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-3xl mb-1">☕</p>
                      <p className="text-xl font-bold text-foreground">{calculations.coffees}</p>
                      <p className="text-xs text-foreground/50">{language === 'fr' ? 'cafés par an' : 'coffees per year'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-3xl mb-1">🏖️</p>
                      <p className="text-xl font-bold text-foreground">{calculations.weekends}</p>
                      <p className="text-xs text-foreground/50">{language === 'fr' ? 'weekends en 5 ans' : 'weekends in 5 years'}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-3xl mb-1">✈️</p>
                      <p className="text-xl font-bold text-foreground">{calculations.vacations}</p>
                      <p className="text-xs text-foreground/50">{language === 'fr' ? 'voyages en 10 ans' : 'trips in 10 years'}</p>
                    </div>
                  </div>
                </div>

                {/* Savings tip */}
                <div className="stat-card-purple rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <PiggyBank className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">
                      {language === 'fr' ? 'Économie potentielle' : 'Potential savings'}
                    </p>
                    <p className="text-white/80 text-sm">
                      {language === 'fr' 
                        ? `En optimisant (partage famille, promos), tu pourrais économiser ~${formatPrice(calculations.potentialSavings)}/an`
                        : `By optimizing (family sharing, promos), you could save ~${formatPrice(calculations.potentialSavings)}/year`
                      }
                    </p>
                  </div>
                </div>

                {/* Share button */}
                <div className="text-center">
                  <Button
                    onClick={shareResults}
                    className="stat-card-shock text-white hover:opacity-90"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Partager mes résultats' : 'Share my results'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {selectedSubs.length === 0 && (
            <div className="text-center py-8 text-foreground/40">
              <p className="text-lg">
                {language === 'fr' 
                  ? '👆 Sélectionne tes abonnements ci-dessus'
                  : '👆 Select your subscriptions above'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
