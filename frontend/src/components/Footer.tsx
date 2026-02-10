const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
              Le comparateur gratuit pour connaître le vrai prix de vos abonnements.
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="text-center" aria-label="Navigation footer">
            <h4 className="font-semibold text-foreground mb-3">Navigation</h4>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/#comparateur" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Comparateur
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Questions fréquentes
                </a>
              </li>
              <li>
                <a href="/#astuces" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Astuces économies
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Services populaires */}
          <nav className="text-center md:text-right" aria-label="Services populaires">
            <h4 className="font-semibold text-foreground mb-3">Services populaires</h4>
            <ul className="space-y-2" role="list">
              <li>
                <a href="/subscription/netflix" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Prix Netflix
                </a>
              </li>
              <li>
                <a href="/subscription/spotify" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Prix Spotify
                </a>
              </li>
              <li>
                <a href="/subscription/disney-plus" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Prix Disney+
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 text-center space-y-3">
          <p className="text-sm text-foreground/40">
            © {currentYear} CombienÇaCoûte — Tous droits réservés
          </p>
          <p className="text-xs text-foreground/25 max-w-md mx-auto">
            Ce site est un outil informatif. Les prix affichés proviennent des sites officiels
            des services et peuvent être sujets à modification.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
