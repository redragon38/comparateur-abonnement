import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Clock, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LiveStats = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    visitors: 12847,
    comparisons: 45623,
    savings: 2847000,
    rating: 4.8
  });

  // Simuler des updates en temps réel pour l'engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        comparisons: prev.comparisons + Math.floor(Math.random() * 5),
        savings: prev.savings + Math.floor(Math.random() * 1000),
        rating: prev.rating
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const statsData = [
    {
      icon: Users,
      value: formatNumber(stats.visitors),
      label: language === 'fr' ? 'Visiteurs ce mois' : 'Visitors this month',
      color: 'stat-card-shock'
    },
    {
      icon: TrendingUp,
      value: formatNumber(stats.comparisons),
      label: language === 'fr' ? 'Comparaisons faites' : 'Comparisons made',
      color: 'stat-card-accent'
    },
    {
      icon: Clock,
      value: formatNumber(stats.savings) + '€',
      label: language === 'fr' ? 'Économies identifiées' : 'Savings identified',
      color: 'stat-card-purple'
    },
    {
      icon: Star,
      value: stats.rating.toFixed(1),
      label: language === 'fr' ? 'Note moyenne' : 'Average rating',
      color: 'glass-strong'
    }
  ];

  return (
    <section className="py-12 border-y border-white/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.color} rounded-2xl p-5 text-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color === 'glass-strong' ? 'text-yellow-500' : 'text-white/80'}`} />
              <motion.p 
                className={`text-2xl md:text-3xl font-bold ${stat.color === 'glass-strong' ? 'text-foreground' : 'text-white'}`}
                key={stat.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
              >
                {stat.value}
              </motion.p>
              <p className={`text-xs mt-1 ${stat.color === 'glass-strong' ? 'text-foreground/60' : 'text-white/70'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
