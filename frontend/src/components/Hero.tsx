import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32" aria-labelledby="hero-title">
      {/* Decorative blurred orbs with animation */}
      <motion.div 
        className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-primary/20 blur-[140px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-accent/15 blur-[120px] pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-foreground/70 text-sm font-medium"
            variants={itemVariants}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" aria-hidden="true" />
            <span>Calculateur gratuit · Aucun compte requis</span>
          </motion.div>

          <motion.h1 
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
            variants={itemVariants}
          >
            Tes abonnements{" "}
            <br className="hidden sm:block" />
            te coûtent{" "}
            <span className="text-gradient-shock">vraiment</span>
            {" "}combien ?
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            <strong>Netflix</strong>, <strong>Spotify</strong>, <strong>Disney+</strong>… On affiche le{" "}
            <strong className="text-foreground/80">prix réel</strong> de tes abonnements
            sur <strong>1, 3, 5 ou 10 ans</strong>. Les résultats vont te surprendre.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
            variants={itemVariants}
          >
            <motion.a
              href="#comparateur"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl stat-card-shock text-white font-bold text-lg transition-all glow-shock"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Aller au comparateur pour voir le vrai prix de vos abonnements"
            >
              Voir le vrai prix
              <motion.span 
                aria-hidden="true"
                className="text-xl"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.a>
          </motion.div>

          {/* Stats pills */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 pt-6"
            variants={itemVariants}
            role="list"
            aria-label="Statistiques du comparateur"
          >
            <motion.div 
              className="glass rounded-xl px-5 py-3 flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "hsl(0 0% 100% / 0.12)" }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <span className="text-2xl font-bold text-gradient-shock">20+</span>
              <span className="text-xs text-foreground/50">services<br />comparés</span>
            </motion.div>
            <motion.div 
              className="glass rounded-xl px-5 py-3 flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "hsl(0 0% 100% / 0.12)" }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <span className="text-2xl font-bold text-gradient-accent">100%</span>
              <span className="text-xs text-foreground/50">gratuit<br />sans pub</span>
            </motion.div>
            <motion.div 
              className="glass rounded-xl px-5 py-3 flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "hsl(0 0% 100% / 0.12)" }}
              transition={{ duration: 0.2 }}
              role="listitem"
            >
              <span className="text-2xl font-bold text-foreground">2025</span>
              <span className="text-xs text-foreground/50">prix<br />à jour</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
