import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Menu, X } from "lucide-react";
import ProposeSubscriptionModal from "./ProposeSubscriptionModal";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-white/10" role="banner">
        <nav className="container flex items-center justify-between h-16" aria-label="Navigation principale">
          <a 
            href="/" 
            className="flex items-center gap-2.5 font-bold text-xl"
            aria-label="CombienÇaCoûte - Retour à l'accueil"
          >
            <span className="w-9 h-9 rounded-xl stat-card-shock flex items-center justify-center text-base" aria-hidden="true">
              💰
            </span>
            <span className="text-foreground">CombienÇaCoûte</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#comparateur"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              {t('nav.compare')}
            </a>
            <a
              href="#astuces"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              {t('nav.tips')}
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              {t('nav.faq')}
            </a>
            
            {/* Sélecteur de langue */}
            <LanguageSelector />
            
            {/* Bouton pour proposer un abonnement */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl stat-card-accent text-white font-medium text-sm glow-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('nav.propose')}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{t('nav.propose')}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button 
              className="p-2 glass rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav 
            id="mobile-menu"
            className="md:hidden border-t border-white/10 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            aria-label="Menu mobile"
          >
            <div className="container flex flex-col gap-3">
              <a
                href="#comparateur"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.mobileCompare')}
              </a>
              <a
                href="#astuces"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.mobileTips')}
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.mobileFaq')}
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl stat-card-accent text-white font-medium text-sm w-fit"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{t('nav.mobilePropose')}</span>
              </button>
            </div>
          </motion.nav>
        )}
      </header>

      {/* Modal */}
      <ProposeSubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
