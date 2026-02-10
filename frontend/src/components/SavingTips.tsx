import { motion } from "framer-motion";
import { Lightbulb, TrendingDown, Users, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SavingTips = () => {
  const { language } = useLanguage();

  const tipsFr = [
    {
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      title: "Partage de compte",
      description: "Partage tes abonnements Netflix, Spotify ou Disney+ avec ta famille ou tes amis pour diviser les coûts jusqu'à 6 personnes.",
      color: "stat-card-shock"
    },
    {
      icon: <Calendar className="w-6 h-6" aria-hidden="true" />,
      title: "Abonnements annuels",
      description: "Opte pour des abonnements annuels au lieu de mensuels pour économiser jusqu'à 20% sur le prix total.",
      color: "stat-card-accent"
    },
    {
      icon: <TrendingDown className="w-6 h-6" aria-hidden="true" />,
      title: "Résilie les inutilisés",
      description: "Annule les abonnements streaming que tu n'utilises plus. Tu peux toujours te réabonner quand tu veux.",
      color: "stat-card-purple"
    },
    {
      icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
      title: "Alternatives gratuites",
      description: "Explore les alternatives gratuites comme YouTube, Pluto TV ou les périodes d'essai des services premium.",
      color: "stat-card-shock"
    }
  ];

  const tipsEn = [
    {
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      title: "Account sharing",
      description: "Share your Netflix, Spotify or Disney+ subscriptions with family or friends to split costs among up to 6 people.",
      color: "stat-card-shock"
    },
    {
      icon: <Calendar className="w-6 h-6" aria-hidden="true" />,
      title: "Annual subscriptions",
      description: "Choose annual subscriptions instead of monthly to save up to 20% on the total price.",
      color: "stat-card-accent"
    },
    {
      icon: <TrendingDown className="w-6 h-6" aria-hidden="true" />,
      title: "Cancel unused ones",
      description: "Cancel streaming subscriptions you no longer use. You can always resubscribe whenever you want.",
      color: "stat-card-purple"
    },
    {
      icon: <Lightbulb className="w-6 h-6" aria-hidden="true" />,
      title: "Free alternatives",
      description: "Explore free alternatives like YouTube, Pluto TV or free trials of premium services.",
      color: "stat-card-shock"
    }
  ];

  const tips = language === 'fr' ? tipsFr : tipsEn;

  return (
    <section id="astuces" className="py-16 md:py-20" aria-labelledby="tips-title">
      <div className="container">
        <motion.header 
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="tips-title" className="text-3xl md:text-5xl font-bold">
            {language === 'fr' ? (
              <>Comment <span className="text-gradient-accent">économiser</span> sur vos abonnements ?</>
            ) : (
              <>How to <span className="text-gradient-accent">save</span> on your subscriptions?</>
            )}
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg">
            {language === 'fr' 
              ? 'Quelques astuces simples pour réduire tes dépenses en abonnements streaming.'
              : 'Some simple tips to reduce your streaming subscription expenses.'}
          </p>
        </motion.header>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
          {tips.map((tip, index) => (
            <motion.li
              key={tip.title}
              className="glass-card rounded-2xl p-6 space-y-4 hover:glass-strong transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center text-white`} aria-hidden="true">
                {tip.icon}
              </div>
              <h3 className="font-bold text-lg text-foreground">{tip.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {tip.description}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Économie potentielle */}
        <motion.aside 
          className="mt-12 glass-strong rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          aria-label={language === 'fr' ? "Économie potentielle" : "Potential savings"}
        >
          <p className="text-foreground/70 mb-2">
            {language === 'fr' 
              ? 'En appliquant ces conseils, tu pourrais économiser'
              : 'By applying these tips, you could save'}
          </p>
          <p className="text-4xl md:text-5xl font-bold text-gradient-shock mb-2">
            {language === 'fr' ? "jusqu'à 40%" : "up to 40%"}
          </p>
          <p className="text-foreground/50 text-sm">
            {language === 'fr' 
              ? "sur tes dépenses d'abonnements annuelles (Netflix, Spotify, Disney+...)"
              : "on your annual subscription expenses (Netflix, Spotify, Disney+...)"}
          </p>
        </motion.aside>
      </div>
    </section>
  );
};

export default SavingTips;
