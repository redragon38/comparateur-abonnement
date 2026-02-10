import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.compare': { fr: 'Comparer', en: 'Compare' },
  'nav.tips': { fr: 'Astuces', en: 'Tips' },
  'nav.faq': { fr: 'FAQ', en: 'FAQ' },
  'nav.propose': { fr: 'Proposer', en: 'Suggest' },
  'nav.mobileCompare': { fr: 'Comparer les abonnements', en: 'Compare subscriptions' },
  'nav.mobileTips': { fr: 'Astuces économies', en: 'Saving tips' },
  'nav.mobileFaq': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'nav.mobilePropose': { fr: 'Proposer un abonnement', en: 'Suggest a subscription' },

  // Hero
  'hero.badge': { fr: 'Calculateur gratuit · Aucun compte requis', en: 'Free calculator · No account required' },
  'hero.cta': { fr: 'Voir le vrai prix', en: 'See the real price' },
  'hero.stat1': { fr: 'services comparés', en: 'services compared' },
  'hero.stat2': { fr: 'gratuit sans pub', en: 'free no ads' },
  'hero.stat3': { fr: 'prix à jour', en: 'updated prices' },

  // Comparison Section
  'compare.title1': { fr: 'Compare le', en: 'Compare the' },
  'compare.title2': { fr: 'vrai prix', en: 'real price' },
  'compare.title3': { fr: 'de tes abonnements', en: 'of your subscriptions' },
  'compare.subtitle': { fr: 'Sélectionne une durée pour voir combien Netflix, Spotify, Disney+ te coûtent réellement.', en: 'Select a duration to see how much Netflix, Spotify, Disney+ really cost you.' },
  
  // Shock Banner
  'shock.ifSubscribed': { fr: 'Si tu étais abonné à', en: 'If you subscribed to' },
  'shock.all': { fr: 'tout', en: 'everything' },
  'shock.perMonth': { fr: 'Par mois', en: 'Per month' },
  'shock.over': { fr: 'Sur', en: 'Over' },
  'shock.mostExpensive': { fr: 'Le plus cher', en: 'Most expensive' },
  'shock.carPrice': { fr: "c'est le prix d'une voiture d'occasion !", en: "that's the price of a used car!" },
  'shock.vacation': { fr: 'de quoi partir en vacances !', en: 'enough for a vacation!' },

  // Filter Bar
  'filter.search': { fr: 'Rechercher un service... (tapez /)', en: 'Search a service... (type /)' },
  'filter.categories': { fr: 'Catégories', en: 'Categories' },
  'filter.all': { fr: 'Tous', en: 'All' },
  'filter.sort': { fr: 'Trier', en: 'Sort' },
  'filter.favorites': { fr: 'Favoris', en: 'Favorites' },
  'filter.price': { fr: 'Prix', en: 'Price' },

  // Categories
  'cat.streaming': { fr: 'Streaming vidéo', en: 'Video streaming' },
  'cat.music': { fr: 'Musique', en: 'Music' },
  'cat.multiServices': { fr: 'Multi-services', en: 'Multi-services' },
  'cat.gaming': { fr: 'Jeux vidéo', en: 'Video games' },
  'cat.productivity': { fr: 'Productivité', en: 'Productivity' },
  'cat.storage': { fr: 'Stockage', en: 'Storage' },
  'cat.communication': { fr: 'Communication', en: 'Communication' },
  'cat.education': { fr: 'Éducation', en: 'Education' },
  'cat.audiobooks': { fr: 'Livres audio', en: 'Audiobooks' },
  'cat.books': { fr: 'Livres', en: 'Books' },
  'cat.wellness': { fr: 'Bien-être', en: 'Wellness' },
  'cat.sport': { fr: 'Sport', en: 'Sport' },
  'cat.news': { fr: 'Actualités', en: 'News' },
  'cat.marketing': { fr: 'Marketing', en: 'Marketing' },

  // Duration
  'duration.1year': { fr: '1 an', en: '1 year' },
  'duration.3years': { fr: '3 ans', en: '3 years' },
  'duration.5years': { fr: '5 ans', en: '5 years' },
  'duration.10years': { fr: '10 ans', en: '10 years' },

  // Cards
  'card.perMonth': { fr: 'Par mois', en: 'Per month' },
  'card.over': { fr: 'Sur', en: 'Over' },
  'card.spent': { fr: 'partis en', en: 'spent in' },
  'card.clickMore': { fr: "Cliquez pour plus d'infos →", en: 'Click for more info →' },
  'card.addedFavorites': { fr: 'Ajouté aux favoris', en: 'Added to favorites' },
  'card.removedFavorites': { fr: 'Retiré des favoris', en: 'Removed from favorites' },
  'card.addedCompare': { fr: 'Ajouté à la comparaison', en: 'Added to comparison' },
  'card.removedCompare': { fr: 'Retiré de la comparaison', en: 'Removed from comparison' },
  'card.quickView': { fr: 'Aperçu rapide', en: 'Quick view' },
  'card.favorite': { fr: 'Favori', en: 'Favorite' },
  'card.compare': { fr: 'Comparer', en: 'Compare' },

  // Sort options
  'sort.nameAsc': { fr: 'Nom A-Z', en: 'Name A-Z' },
  'sort.nameDesc': { fr: 'Nom Z-A', en: 'Name Z-A' },
  'sort.priceAsc': { fr: 'Prix croissant', en: 'Price low to high' },
  'sort.priceDesc': { fr: 'Prix décroissant', en: 'Price high to low' },
  'sort.popular': { fr: 'Popularité', en: 'Popularity' },

  // Comparison
  'comparison.title': { fr: 'Comparaison directe', en: 'Direct comparison' },
  'comparison.select': { fr: 'Sélectionnez jusqu\'à 3 abonnements', en: 'Select up to 3 subscriptions' },
  'comparison.clear': { fr: 'Effacer', en: 'Clear' },
  'comparison.limit': { fr: 'Limite atteinte', en: 'Limit reached' },
  'comparison.limitDesc': { fr: 'Vous ne pouvez comparer que 3 abonnements à la fois', en: 'You can only compare 3 subscriptions at a time' },

  // Pagination
  'pagination.previous': { fr: 'Précédent', en: 'Previous' },
  'pagination.next': { fr: 'Suivant', en: 'Next' },
  'pagination.page': { fr: 'Page', en: 'Page' },
  'pagination.of': { fr: 'sur', en: 'of' },

  // Misc
  'misc.loading': { fr: 'Chargement...', en: 'Loading...' },
  'misc.error': { fr: 'Erreur', en: 'Error' },
  'misc.back': { fr: 'Retour', en: 'Back' },
  'misc.close': { fr: 'Fermer', en: 'Close' },
  'misc.save': { fr: 'Enregistrer', en: 'Save' },
  'misc.cancel': { fr: 'Annuler', en: 'Cancel' },
  'misc.noResults': { fr: 'Aucun résultat', en: 'No results' },
  'misc.showMore': { fr: 'Voir plus', en: 'Show more' },
  'misc.showLess': { fr: 'Voir moins', en: 'Show less' },

  // Keyboard shortcuts
  'shortcuts.title': { fr: 'Raccourcis clavier', en: 'Keyboard shortcuts' },
  'shortcuts.search': { fr: 'Rechercher', en: 'Search' },
  'shortcuts.clearSearch': { fr: 'Effacer la recherche', en: 'Clear search' },
  'shortcuts.showShortcuts': { fr: 'Afficher les raccourcis', en: 'Show shortcuts' },
  'shortcuts.filterFavorites': { fr: 'Filtrer les favoris', en: 'Filter favorites' },
  'shortcuts.changeView': { fr: 'Changer de vue', en: 'Change view' },

  // Views
  'view.grid': { fr: 'Grille', en: 'Grid' },
  'view.chart': { fr: 'Graphique', en: 'Chart' },

  // Subscription detail
  'detail.back': { fr: '← Retour au comparateur', en: '← Back to comparator' },
  'detail.perMonth': { fr: '/mois', en: '/month' },
  'detail.totalOver': { fr: 'Total sur', en: 'Total over' },
  'detail.features': { fr: 'Caractéristiques', en: 'Features' },
  'detail.pricing': { fr: 'Tarification', en: 'Pricing' },
  'detail.reviews': { fr: 'Avis', en: 'Reviews' },
  'detail.writeReview': { fr: 'Écrire un avis', en: 'Write a review' },
  'detail.subscribe': { fr: "S'abonner", en: 'Subscribe' },
  'detail.officialSite': { fr: 'Site officiel', en: 'Official site' },

  // Propose modal
  'propose.title': { fr: 'Proposer un abonnement', en: 'Suggest a subscription' },
  'propose.name': { fr: 'Nom du service', en: 'Service name' },
  'propose.price': { fr: 'Prix mensuel (€)', en: 'Monthly price (€)' },
  'propose.category': { fr: 'Catégorie', en: 'Category' },
  'propose.website': { fr: 'Site web', en: 'Website' },
  'propose.submit': { fr: 'Envoyer', en: 'Submit' },
  'propose.success': { fr: 'Merci pour votre suggestion !', en: 'Thank you for your suggestion!' },

  // Reviews
  'reviews.title': { fr: 'Avis des utilisateurs', en: 'User reviews' },
  'reviews.write': { fr: 'Écrire un avis', en: 'Write a review' },
  'reviews.yourName': { fr: 'Votre nom', en: 'Your name' },
  'reviews.yourReview': { fr: 'Votre avis', en: 'Your review' },
  'reviews.rating': { fr: 'Note', en: 'Rating' },
  'reviews.helpful': { fr: 'Utile', en: 'Helpful' },
  'reviews.submit': { fr: 'Publier', en: 'Publish' },
  'reviews.noReviews': { fr: 'Aucun avis pour le moment', en: 'No reviews yet' },

  // Export
  'export.title': { fr: 'Exporter', en: 'Export' },
  'export.csv': { fr: 'Télécharger CSV', en: 'Download CSV' },
  'export.share': { fr: 'Partager', en: 'Share' },
  'export.print': { fr: 'Imprimer', en: 'Print' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
