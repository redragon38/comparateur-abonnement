import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const SEOContent = () => {
  const { language } = useLanguage();

  if (language === 'en') {
    return (
      <section className="py-16 border-t border-white/10" aria-labelledby="seo-content">
        <div className="container max-w-4xl">
          <motion.article
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="seo-content" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Ultimate Subscription Price Comparator
            </h2>
            
            <div className="text-foreground/70 space-y-4 text-sm leading-relaxed">
              <p>
                <strong className="text-foreground">CombienÇaCoûte</strong> is the free and independent comparator 
                that reveals the real cost of your subscriptions over time. We analyze the prices of 
                <Link to="/subscription/netflix" className="text-primary hover:underline"> Netflix</Link>, 
                <Link to="/subscription/spotify" className="text-primary hover:underline"> Spotify</Link>, 
                <Link to="/subscription/disney-plus" className="text-primary hover:underline"> Disney+</Link>, 
                <Link to="/subscription/amazon-prime" className="text-primary hover:underline"> Amazon Prime</Link> 
                and 50+ other services.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6">How much does Netflix cost in 2026?</h3>
              <p>
                In 2026, Netflix offers several plans: Standard with ads at €5.99/month, Standard at €13.49/month, 
                and Premium at €22.99/month. Over 5 years, that represents between €359 and €1,379 depending on your plan.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6">How to save on your streaming subscriptions?</h3>
              <p>
                Several strategies allow you to reduce your costs: family sharing (up to 6 people), 
                annual subscriptions (up to 20% savings), promo codes, and canceling unused services. 
                Our users save an average of 35% on their subscriptions.
              </p>
              
              <h3 className="text-lg font-semibold text-foreground mt-6">Compare all your subscriptions</h3>
              <p>
                Our comparator covers all categories: video streaming (Netflix, Disney+, HBO Max, Paramount+), 
                music (Spotify, Apple Music, Deezer), gaming (Xbox Game Pass, PlayStation Plus, Nintendo Online), 
                productivity (Microsoft 365, Adobe Creative Cloud), and much more.
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-t border-white/10" aria-labelledby="seo-content">
      <div className="container max-w-4xl">
        <motion.article
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="seo-content" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Le comparateur ultime du prix des abonnements
          </h2>
          
          <div className="text-foreground/70 space-y-4 text-sm leading-relaxed">
            <p>
              <strong className="text-foreground">CombienÇaCoûte</strong> est le comparateur gratuit et indépendant 
              qui révèle le vrai coût de vos abonnements dans le temps. Nous analysons les prix de 
              <Link to="/subscription/netflix" className="text-primary hover:underline"> Netflix</Link>, 
              <Link to="/subscription/spotify" className="text-primary hover:underline"> Spotify</Link>, 
              <Link to="/subscription/disney-plus" className="text-primary hover:underline"> Disney+</Link>, 
              <Link to="/subscription/amazon-prime" className="text-primary hover:underline"> Amazon Prime</Link> 
              et plus de 50 autres services.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6">Combien coûte Netflix en 2026 ?</h3>
            <p>
              En 2026, Netflix propose plusieurs formules : Essentiel avec pub à 5,99€/mois, Standard à 13,49€/mois, 
              et Premium à 22,99€/mois. Sur 5 ans, cela représente entre 359€ et 1 379€ selon votre forfait. 
              Découvrez le <Link to="/subscription/netflix" className="text-primary hover:underline">prix détaillé de Netflix</Link>.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6">Combien coûte Spotify Premium ?</h3>
            <p>
              L'abonnement Spotify Premium coûte 10,99€/mois pour un utilisateur, ou 17,99€/mois pour le forfait Famille (6 comptes). 
              Sur 10 ans, un abonnement individuel représente 1 319€. 
              Consultez nos <Link to="/subscription/spotify" className="text-primary hover:underline">astuces pour Spotify</Link>.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6">Comment économiser sur ses abonnements streaming ?</h3>
            <p>
              Plusieurs stratégies permettent de réduire vos coûts : le partage familial (jusqu'à 6 personnes), 
              les abonnements annuels (jusqu'à 20% d'économie), les codes promo disponibles, et la résiliation 
              des services non utilisés. Nos utilisateurs économisent en moyenne 35% sur leurs abonnements.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6">Comparez tous vos abonnements</h3>
            <p>
              Notre comparateur couvre toutes les catégories : streaming vidéo (Netflix, Disney+, HBO Max, Paramount+), 
              musique (Spotify, Apple Music, Deezer, YouTube Music), gaming (Xbox Game Pass, PlayStation Plus, Nintendo Online), 
              productivité (Microsoft 365, Adobe Creative Cloud, Notion), stockage cloud (Google One, iCloud, Dropbox), 
              et bien plus encore.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6">Prix des abonnements streaming 2026</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 not-prose">
              {[
                { name: 'Netflix', price: '5,99€ - 22,99€', link: '/subscription/netflix' },
                { name: 'Spotify', price: '10,99€ - 17,99€', link: '/subscription/spotify' },
                { name: 'Disney+', price: '5,99€ - 11,99€', link: '/subscription/disney-plus' },
                { name: 'Amazon Prime', price: '6,99€', link: '/subscription/amazon-prime' },
                { name: 'Apple TV+', price: '9,99€', link: '/subscription/apple-tv-plus' },
                { name: 'Canal+', price: '24,99€', link: '/subscription/canal-plus' },
                { name: 'Xbox Game Pass', price: '10,99€ - 14,99€', link: '/subscription/xbox-game-pass' },
                { name: 'PlayStation Plus', price: '8,99€ - 16,99€', link: '/subscription/playstation-plus' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="glass rounded-lg p-3 text-center hover:glass-strong transition-all"
                >
                  <p className="font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="text-xs text-foreground/50">{item.price}/mois</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default SEOContent;
