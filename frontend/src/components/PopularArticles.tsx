import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const articlesFr = [
  {
    id: 1,
    title: "Netflix vs Disney+ : Quel service choisir en 2026 ?",
    excerpt: "Comparaison détaillée des deux géants du streaming : catalogue, prix, qualité...",
    readTime: "5 min",
    category: "Comparatif",
    trending: true,
    link: "/subscription/netflix"
  },
  {
    id: 2,
    title: "Comment économiser 40% sur vos abonnements streaming",
    excerpt: "Nos astuces testées pour réduire drastiquement vos dépenses mensuelles.",
    readTime: "4 min",
    category: "Astuces",
    trending: true,
    link: "/#astuces"
  },
  {
    id: 3,
    title: "Le vrai coût de Spotify sur 10 ans",
    excerpt: "Analyse choc : votre abonnement musical vous coûte bien plus que vous ne pensez.",
    readTime: "3 min",
    category: "Analyse",
    trending: false,
    link: "/subscription/spotify"
  },
  {
    id: 4,
    title: "Les meilleurs codes promo streaming 2026",
    excerpt: "Tous les codes valides pour Netflix, Disney+, Spotify et plus encore.",
    readTime: "6 min",
    category: "Bons plans",
    trending: true,
    link: "/subscription/netflix"
  }
];

const articlesEn = [
  {
    id: 1,
    title: "Netflix vs Disney+: Which service to choose in 2026?",
    excerpt: "Detailed comparison of the two streaming giants: catalog, price, quality...",
    readTime: "5 min",
    category: "Comparison",
    trending: true,
    link: "/subscription/netflix"
  },
  {
    id: 2,
    title: "How to save 40% on your streaming subscriptions",
    excerpt: "Our tested tips to drastically reduce your monthly expenses.",
    readTime: "4 min",
    category: "Tips",
    trending: true,
    link: "/#astuces"
  },
  {
    id: 3,
    title: "The real cost of Spotify over 10 years",
    excerpt: "Shocking analysis: your music subscription costs you way more than you think.",
    readTime: "3 min",
    category: "Analysis",
    trending: false,
    link: "/subscription/spotify"
  },
  {
    id: 4,
    title: "Best streaming promo codes 2026",
    excerpt: "All valid codes for Netflix, Disney+, Spotify and more.",
    readTime: "6 min",
    category: "Deals",
    trending: true,
    link: "/subscription/netflix"
  }
];

const PopularArticles = () => {
  const { language } = useLanguage();
  const articles = language === 'fr' ? articlesFr : articlesEn;

  return (
    <section className="py-16 md:py-20" aria-labelledby="articles-title">
      <div className="container">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="articles-title" className="text-3xl md:text-4xl font-bold mb-3">
            {language === 'fr' ? (
              <>Guides <span className="text-gradient-shock">populaires</span></>
            ) : (
              <>Popular <span className="text-gradient-shock">guides</span></>
            )}
          </h2>
          <p className="text-foreground/60 max-w-lg mx-auto">
            {language === 'fr'
              ? "Nos articles les plus lus pour économiser sur vos abonnements"
              : "Our most read articles to save on your subscriptions"}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="glass-card rounded-2xl p-6 hover:glass-strong transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={article.link} className="block">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-medium stat-card-accent text-white">
                    {article.category}
                  </span>
                  {article.trending && (
                    <span className="flex items-center gap-1 text-xs text-orange-400">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-foreground/40 ml-auto">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-foreground/60 mb-4">
                  {article.excerpt}
                </p>
                
                <span className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  {language === 'fr' ? 'Lire la suite' : 'Read more'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;
