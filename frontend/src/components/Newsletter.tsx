import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Bell, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simuler l'envoi (en prod, connecter à un service comme Mailchimp)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sauvegarder en localStorage
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
    
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");
    
    toast({
      title: language === 'fr' ? "Inscription réussie !" : "Successfully subscribed!",
      description: language === 'fr' 
        ? "Vous recevrez nos alertes de prix et bons plans"
        : "You will receive our price alerts and deals",
    });
  };

  return (
    <section className="py-16 md:py-20" aria-labelledby="newsletter-title">
      <div className="container max-w-3xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-purple-500/30" />
          <div className="absolute inset-0 glass" />
          
          <div className="relative p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
              <Bell className="w-8 h-8 text-white" />
            </div>
            
            <h2 id="newsletter-title" className="text-2xl md:text-3xl font-bold text-white mb-3">
              {language === 'fr' 
                ? "Ne ratez plus aucune hausse de prix"
                : "Never miss a price increase"}
            </h2>
            
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              {language === 'fr'
                ? "Recevez des alertes quand Netflix, Spotify ou Disney+ augmentent leurs prix, plus nos meilleurs codes promo."
                : "Get alerts when Netflix, Spotify or Disney+ raise their prices, plus our best promo codes."}
            </p>

            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-400"
              >
                <Check className="w-6 h-6" />
                <span className="font-medium">
                  {language === 'fr' ? "Vous êtes inscrit(e) !" : "You're subscribed!"}
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'fr' ? "Votre email" : "Your email"}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 rounded-xl bg-white text-primary font-bold hover:bg-white/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {language === 'fr' ? "M'alerter" : "Alert me"}
                    </>
                  )}
                </motion.button>
              </form>
            )}
            
            <p className="text-white/40 text-xs mt-4">
              {language === 'fr'
                ? "Pas de spam. Désabonnement en 1 clic."
                : "No spam. Unsubscribe in 1 click."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
