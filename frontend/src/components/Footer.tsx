import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  
  return (
    <footer className="border-t border-white/10 py-8" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="/" className="inline-flex items-center gap-2.5 font-bold text-xl mb-3" aria-label="Retour à l'accueil">
              <span className="w-9 h-9 rounded-xl stat-card-shock flex items-center justify-center text-base" aria-hidden="true">
                💰
              </span>
              <span className="text-foreground">CombienÇaCoûte</span>
            </a>
            <p className="text-sm text-foreground/50">
              {language === 'fr' 
                ? "Le comparateur gratuit pour connaître le vrai prix de vos abonnements."
                : "The free comparator to know the real price of your subscriptions."}
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="text-center" aria-label="Navigation footer">
            <h4 className="font-semibold text-foreground mb-3">Navigation</h4>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/#comparateur" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Comparateur' : 'Comparator'}
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Questions fréquentes' : 'FAQ'}
                </a>
              </li>
              <li>
                <a href="/#astuces" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Astuces économies' : 'Saving tips'}
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Services populaires */}
          <nav className="text-center md:text-right" aria-label="Services populaires">
            <h4 className="font-semibold text-foreground mb-3">
              {language === 'fr' ? 'Services populaires' : 'Popular services'}
            </h4>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/subscription/netflix" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Prix Netflix' : 'Netflix Price'}
                </a>
              </li>
              <li>
                <a href="/subscription/spotify" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Prix Spotify' : 'Spotify Price'}
                </a>
              </li>
              <li>
                <a href="/subscription/disney-plus" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  {language === 'fr' ? 'Prix Disney+' : 'Disney+ Price'}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 text-center space-y-3">
          <p className="text-sm text-foreground/40">
            © {currentYear} CombienÇaCoûte — {language === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}
          </p>
          <p className="text-xs text-foreground/25 max-w-md mx-auto">
            {language === 'fr' 
              ? "Ce site est un outil informatif. Les prix affichés proviennent des sites officiels des services et peuvent être sujets à modification."
              : "This site is an informational tool. Displayed prices come from official service websites and may be subject to change."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
