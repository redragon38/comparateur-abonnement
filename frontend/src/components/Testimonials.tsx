import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialsFr = [
  {
    id: 1,
    name: "Marie L.",
    role: "Étudiante",
    avatar: "👩‍🎓",
    rating: 5,
    text: "J'ai réalisé que mes abonnements me coûtaient 3000€ sur 5 ans ! Grâce aux codes promo j'ai économisé 40%.",
    savings: "480€/an"
  },
  {
    id: 2,
    name: "Thomas D.",
    role: "Développeur",
    avatar: "👨‍💻",
    rating: 5,
    text: "Enfin un site qui montre le vrai coût sur le long terme. J'ai annulé 3 abonnements que j'utilisais plus.",
    savings: "360€/an"
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Mère de famille",
    avatar: "👩‍👧‍👦",
    rating: 5,
    text: "Le partage famille était la solution ! On divise Netflix, Spotify et Disney+ entre 4 foyers.",
    savings: "720€/an"
  },
  {
    id: 4,
    name: "Lucas P.",
    role: "Freelance",
    avatar: "🧑‍💼",
    rating: 4,
    text: "Super comparateur, j'aurais aimé avoir plus de détails sur les offres professionnelles.",
    savings: "240€/an"
  }
];

const testimonialsEn = [
  {
    id: 1,
    name: "Marie L.",
    role: "Student",
    avatar: "👩‍🎓",
    rating: 5,
    text: "I realized my subscriptions were costing me €3000 over 5 years! Thanks to promo codes I saved 40%.",
    savings: "€480/year"
  },
  {
    id: 2,
    name: "Thomas D.",
    role: "Developer",
    avatar: "👨‍💻",
    rating: 5,
    text: "Finally a site that shows the real long-term cost. I canceled 3 subscriptions I wasn't using anymore.",
    savings: "€360/year"
  },
  {
    id: 3,
    name: "Sophie M.",
    role: "Mother",
    avatar: "👩‍👧‍👦",
    rating: 5,
    text: "Family sharing was the solution! We split Netflix, Spotify and Disney+ between 4 households.",
    savings: "€720/year"
  },
  {
    id: 4,
    name: "Lucas P.",
    role: "Freelancer",
    avatar: "🧑‍💼",
    rating: 4,
    text: "Great comparator, I would have liked more details on professional offers.",
    savings: "€240/year"
  }
];

const Testimonials = () => {
  const { language } = useLanguage();
  const testimonials = language === 'fr' ? testimonialsFr : testimonialsEn;

  return (
    <section className="py-16 md:py-20 overflow-hidden" aria-labelledby="testimonials-title">
      <div className="container">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold mb-3">
            {language === 'fr' ? (
              <>Ils ont <span className="text-gradient-accent">économisé</span></>
            ) : (
              <>They <span className="text-gradient-accent">saved</span></>
            )}
          </h2>
          <p className="text-foreground/60">
            {language === 'fr' 
              ? "Découvrez comment nos utilisateurs réduisent leurs dépenses"
              : "See how our users reduce their expenses"}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              className="glass-card rounded-2xl p-6 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              {/* Text */}
              <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-4">
                "{testimonial.text}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-foreground/20'}`}
                  />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-foreground/50">{testimonial.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/50">{language === 'fr' ? 'Économisé' : 'Saved'}</p>
                  <p className="text-sm font-bold text-green-400">{testimonial.savings}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
