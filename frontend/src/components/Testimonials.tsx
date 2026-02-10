import { motion } from "framer-motion";
import { Heart, Sparkles, Target, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 overflow-hidden" aria-labelledby="creator-message-title">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.header
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="creator-message-title" className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'fr' ? (
                <>Un mot du <span className="text-gradient-accent">créateur</span></>
              ) : (
                <>A word from the <span className="text-gradient-accent">creator</span></>
              )}
            </h2>
          </motion.header>

          {/* Message Card */}
          <motion.article
            className="glass-card rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Creator info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-3xl">
                👨‍💻
              </div>
              <div>
                <p className="font-bold text-xl text-foreground">
                  {language === 'fr' ? 'Le Créateur' : 'The Creator'}
                </p>
                <p className="text-foreground/60">
                  {language === 'fr' ? 'Fondateur de CombienÇaCoûte' : 'Founder of CombienÇaCoûte'}
                </p>
              </div>
            </div>

            {/* Message content */}
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                {language === 'fr' ? (
                  <>
                    <span className="text-2xl mr-2">👋</span>
                    Salut ! J'ai créé ce comparateur parce que, comme beaucoup d'entre vous, 
                    j'étais choqué de découvrir combien mes abonnements me coûtaient vraiment 
                    sur le long terme.
                  </>
                ) : (
                  <>
                    <span className="text-2xl mr-2">👋</span>
                    Hi! I created this comparator because, like many of you, 
                    I was shocked to discover how much my subscriptions really cost me 
                    in the long run.
                  </>
                )}
              </p>
              <p>
                {language === 'fr' ? (
                  <>
                    L'idée est simple : vous donner une vision claire et transparente du vrai coût 
                    de vos abonnements numériques. Netflix, Spotify, Disney+... on additionne rarement 
                    ces petites dépenses mensuelles, mais sur 5 ou 10 ans, ça fait une sacrée somme ! 💸
                  </>
                ) : (
                  <>
                    The idea is simple: give you a clear and transparent view of the real cost 
                    of your digital subscriptions. Netflix, Spotify, Disney+... we rarely add up 
                    these small monthly expenses, but over 5 or 10 years, it adds up! 💸
                  </>
                )}
              </p>
              <p>
                {language === 'fr' ? (
                  <>
                    Mon objectif ? Vous aider à faire des choix éclairés et à optimiser 
                    vos dépenses. Pas de jugement, juste de l'information ! 🎯
                  </>
                ) : (
                  <>
                    My goal? Help you make informed choices and optimize 
                    your spending. No judgment, just information! 🎯
                  </>
                )}
              </p>
            </div>

            {/* Features highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {language === 'fr' ? '100% Gratuit' : '100% Free'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {language === 'fr' ? 'Sans inscription' : 'No signup'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {language === 'fr' ? 'Transparent' : 'Transparent'}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {language === 'fr' ? 'Fait avec ❤️' : 'Made with ❤️'}
                </p>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
