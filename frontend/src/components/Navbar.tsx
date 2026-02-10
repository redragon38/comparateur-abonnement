import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Menu, X, Download } from "lucide-react";
import ProposeSubscriptionModal from "./ProposeSubscriptionModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadProject = async () => {
    setIsDownloading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/download-project`);
      
      if (!response.ok) throw new Error('Erreur lors du téléchargement');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combien-ca-coute-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du téléchargement du projet');
    } finally {
      setIsDownloading(false);
    }
  };

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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#comparateur"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Comparer
            </a>
            <a
              href="#astuces"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Astuces
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              FAQ
            </a>
            
            {/* Bouton télécharger le projet */}
            <motion.button
              onClick={handleDownloadProject}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-foreground font-medium text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Télécharger le projet"
              data-testid="download-project-btn"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} aria-hidden="true" />
              <span>{isDownloading ? 'Téléchargement...' : 'Télécharger'}</span>
            </motion.button>
            
            {/* Bouton pour proposer un abonnement */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl stat-card-accent text-white font-medium text-sm glow-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Proposer un nouvel abonnement"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Proposer</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 glass rounded-lg"
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
                Comparer les abonnements
              </a>
              <a
                href="#astuces"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Astuces économies
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Questions fréquentes
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleDownloadProject();
                }}
                disabled={isDownloading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-foreground font-medium text-sm w-fit disabled:opacity-50"
              >
                <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} aria-hidden="true" />
                <span>{isDownloading ? 'Téléchargement...' : 'Télécharger le projet'}</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl stat-card-accent text-white font-medium text-sm w-fit"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Proposer un abonnement</span>
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
