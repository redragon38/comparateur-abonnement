import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Copy, Check, Clock, Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { promoCodes, type PromoCode } from "@/data/promoCodes";

interface PromoCode {
  code: string;
  description: string;
  descriptionEn: string;
  discount: string;
  discountEn: string;
  expiresAt: string;
  isActive: boolean;
}

interface PromoCodesProps {
  subscriptionId: string;
  subscriptionName: string;
}

const PromoCodes = ({ subscriptionId, subscriptionName }: PromoCodesProps) => {
  const { language } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Récupérer les codes promo pour cet abonnement
  const codes: PromoCode[] = promoCodes[subscriptionId] || [];
  
  // Filtrer les codes actifs et non expirés
  const activeCodes = codes.filter(code => {
    if (!code.isActive) return false;
    const expiryDate = new Date(code.expiresAt);
    return expiryDate > new Date();
  });

  if (activeCodes.length === 0) {
    return null;
  }

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const formatExpiryDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  const getDaysRemaining = (dateStr: string) => {
    const expiryDate = new Date(dateStr);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <motion.section
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-labelledby="promo-codes-title"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl stat-card-accent flex items-center justify-center">
          <Gift className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 id="promo-codes-title" className="text-xl font-bold text-foreground">
            {language === 'fr' ? 'Codes Promo' : 'Promo Codes'}
          </h3>
          <p className="text-sm text-foreground/60">
            {language === 'fr' 
              ? `${activeCodes.length} offre${activeCodes.length > 1 ? 's' : ''} disponible${activeCodes.length > 1 ? 's' : ''} pour ${subscriptionName}`
              : `${activeCodes.length} offer${activeCodes.length > 1 ? 's' : ''} available for ${subscriptionName}`
            }
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {activeCodes.map((promo, index) => {
            const daysRemaining = getDaysRemaining(promo.expiresAt);
            const isExpiringSoon = daysRemaining <= 30;

            return (
              <motion.div
                key={promo.code}
                className="glass rounded-xl p-4 hover:glass-strong transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/20 text-accent font-bold text-sm">
                        <Tag className="w-3.5 h-3.5" />
                        {language === 'fr' ? promo.discount : promo.discountEn}
                      </span>
                      {isExpiringSoon && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          {language === 'fr' 
                            ? `${daysRemaining}j restants`
                            : `${daysRemaining}d left`
                          }
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 mb-2">
                      {language === 'fr' ? promo.description : promo.descriptionEn}
                    </p>
                    <p className="text-xs text-foreground/40">
                      {language === 'fr' ? 'Expire le' : 'Expires on'} {formatExpiryDate(promo.expiresAt)}
                    </p>
                  </div>

                  <motion.button
                    onClick={() => handleCopyCode(promo.code)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm font-bold transition-all
                      ${copiedCode === promo.code 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'stat-card-shock text-white hover:opacity-90'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`${language === 'fr' ? 'Copier le code' : 'Copy code'} ${promo.code}`}
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        {language === 'fr' ? 'Copié !' : 'Copied!'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {promo.code}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-xs text-foreground/30 mt-4 text-center">
        {language === 'fr' 
          ? "* Les codes peuvent être soumis à des conditions. Vérifiez sur le site officiel."
          : "* Codes may be subject to terms. Check on the official website."
        }
      </p>
    </motion.section>
  );
};

export default PromoCodes;
