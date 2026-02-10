import { motion } from "framer-motion";
import { TrendingDown, Users, Eye, Award } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "10K+",
      label: "Utilisateurs actifs",
      color: "stat-card-shock"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      value: "€2.4M",
      label: "Économies identifiées",
      color: "stat-card-accent"
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      value: "35%",
      label: "Économie moyenne",
      color: "stat-card-purple"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "300+",
      label: "Services comparés",
      color: "stat-card-shock"
    }
  ];

  const testimonials = [
   
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="container relative">
        {/* Statistics */}
        <motion.div 
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Des <span className="text-gradient-shock">résultats</span> concrets
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg">
            Rejoins des milliers d'utilisateurs qui ont repris le contrôle de leurs abonnements.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-strong rounded-2xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={`w-16 h-16 rounded-xl ${stat.color} flex items-center justify-center text-white mx-auto mb-4`}>
                {stat.icon}
              </div>
              <motion.p 
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div 
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glass-card rounded-2xl p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/50">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed italic">
                "{testimonial.comment}"
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">⭐</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
