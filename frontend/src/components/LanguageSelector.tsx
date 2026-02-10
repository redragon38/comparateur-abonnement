import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-foreground font-medium text-sm hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
      data-testid="language-selector"
    >
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span className="font-semibold">{language === 'fr' ? 'EN' : 'FR'}</span>
    </motion.button>
  );
};

export default LanguageSelector;
