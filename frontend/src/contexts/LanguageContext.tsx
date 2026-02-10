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
  'nav.download': { fr: 'Télécharger', en: 'Download' },
  'nav.downloading': { fr: 'Téléchargement...', en: 'Downloading...' },
  'nav.propose': { fr: 'Proposer', en: 'Suggest' },
  'nav.mobileCompare': { fr: 'Comparer les abonnements', en: 'Compare subscriptions' },
  'nav.mobileTips': { fr: 'Astuces économies', en: 'Saving tips' },
  'nav.mobileFaq': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'nav.mobileDownload': { fr: 'Télécharger le projet', en: 'Download project' },
  'nav.mobilePropose': { fr: 'Proposer un abonnement', en: 'Suggest a subscription' },

  // Hero
  'hero.badge': { fr: 'Calculateur gratuit · Aucun compte requis', en: 'Free calculator · No account required' },
  'hero.title1': { fr: 'Tes abonnements', en: 'Your subscriptions' },
  'hero.title2': { fr: 'te coûtent', en: 'really cost you' },
  'hero.title3': { fr: 'vraiment', en: 'how much' },
  'hero.title4': { fr: 'combien ?', en: '?' },
  'hero.subtitle': { fr: 'Netflix, Spotify, Disney+... On affiche le', en: 'Netflix, Spotify, Disney+... We show the' },
  'hero.realPrice': { fr: 'prix réel', en: 'real price' },
  'hero.subtitleEnd': { fr: 'de tes abonnements sur', en: 'of your subscriptions over' },
  'hero.years': { fr: '1, 3, 5 ou 10 ans', en: '1, 3, 5 or 10 years' },
  'hero.surprise': { fr: 'Les résultats vont te surprendre.', en: 'The results will surprise you.' },
  'hero.cta': { fr: 'Voir le vrai prix', en: 'See the real price' },
  'hero.stat1': { fr: 'services comparés', en: 'services compared' },
  'hero.stat2': { fr: 'gratuit sans pub', en: 'free no ads' },
  'hero.stat3': { fr: 'prix à jour', en: 'updated prices' },

  // Comparison Section
  'compare.title1': { fr: 'Compare le', en: 'Compare the' },
  'compare.title2': { fr: 'vrai prix', en: 'real price' },
  'compare.title3': { fr: 'de tes abonnements', en: 'of your subscriptions' },
  'compare.subtitle': { fr: 'Sélectionne une durée pour voir combien Netflix, Spotify, Disney+ te coûtent réellement.', en: 'Select a duration to see how much Netflix, Spotify, Disney+ really cost you.' },
  'compare.ifSubscribed': { fr: 'Si tu étais abonné à', en: 'If you subscribed to' },
  'compare.all': { fr: 'tout...', en: 'everything...' },
  'compare.perMonth': { fr: 'PAR MOIS', en: 'PER MONTH' },
  'compare.over': { fr: 'SUR', en: 'OVER' },
  'compare.mostExpensive': { fr: 'LE PLUS CHER', en: 'MOST EXPENSIVE' },
  'compare.inYears': { fr: 'en', en: 'in' },
  'compare.carPrice': { fr: "c'est le prix d'une voiture d'occasion !", en: "that's the price of a used car!" },
  'compare.search': { fr: 'Rechercher un service... (tapez /)', en: 'Search a service... (type /)' },
  'compare.sort': { fr: 'Trier', en: 'Sort' },
  'compare.favorites': { fr: 'Favoris', en: 'Favorites' },
  'compare.price': { fr: 'Prix', en: 'Price' },
  'compare.all_cat': { fr: 'Tous', en: 'All' },
  'compare.streaming': { fr: 'Streaming vidéo', en: 'Video streaming' },
  'compare.music': { fr: 'Musique', en: 'Music' },
  'compare.multiServices': { fr: 'Multi-services', en: 'Multi-services' },
  'compare.gaming': { fr: 'Jeux vidéo', en: 'Video games' },
  'compare.productivity': { fr: 'Productivité', en: 'Productivity' },
  'compare.storage': { fr: 'Stockage', en: 'Storage' },
  'compare.communication': { fr: 'Communication', en: 'Communication' },
  'compare.education': { fr: 'Éducation', en: 'Education' },
  'compare.audiobooks': { fr: 'Livres audio', en: 'Audiobooks' },
  'compare.books': { fr: 'Livres', en: 'Books' },
  'compare.wellness': { fr: 'Bien-être', en: 'Wellness' },
  'compare.sport': { fr: 'Sport', en: 'Sport' },
  'compare.news': { fr: 'Actualités', en: 'News' },
  'compare.marketing': { fr: 'Marketing', en: 'Marketing' },

  // Duration
  'duration.1year': { fr: '1 an', en: '1 year' },
  'duration.3years': { fr: '3 ans', en: '3 years' },
  'duration.5years': { fr: '5 ans', en: '5 years' },
  'duration.10years': { fr: '10 ans', en: '10 years' },

  // Cards
  'card.perMonth': { fr: '/mois', en: '/month' },
  'card.over': { fr: 'sur', en: 'over' },
  'card.years': { fr: 'ans', en: 'years' },
  'card.year': { fr: 'an', en: 'year' },
  'card.details': { fr: 'Voir détails', en: 'View details' },
  'card.affiliate': { fr: "S'abonner", en: 'Subscribe' },

  // Calculator
  'calc.title': { fr: 'Calcule tes dépenses', en: 'Calculate your expenses' },
  'calc.subtitle': { fr: 'Additionne tes abonnements pour voir le total', en: 'Add your subscriptions to see the total' },

  // Tips
  'tips.title': { fr: 'Comment économiser', en: 'How to save' },
  'tips.subtitle': { fr: 'Nos astuces pour réduire tes dépenses', en: 'Our tips to reduce your expenses' },

  // FAQ
  'faq.title': { fr: 'Questions fréquentes', en: 'Frequently asked questions' },
  'faq.q1': { fr: 'Comment sont calculés les prix ?', en: 'How are prices calculated?' },
  'faq.a1': { fr: "On multiplie simplement le prix mensuel officiel par le nombre de mois. Pas de frais cachés ni d'augmentation estimée — juste le coût brut sur la durée choisie.", en: "We simply multiply the official monthly price by the number of months. No hidden fees or estimated increases — just the raw cost over the chosen duration." },
  'faq.q2': { fr: 'Les prix sont-ils à jour ?', en: 'Are prices up to date?' },
  'faq.a2': { fr: 'Nous mettons régulièrement à jour les tarifs en nous basant sur les sites officiels des services. Les dernières vérifications datent de 2025.', en: 'We regularly update prices based on official service websites. Last checks were in 2025.' },
  'faq.q3': { fr: 'Pourquoi ce comparateur est gratuit ?', en: 'Why is this comparator free?' },
  'faq.a3': { fr: "Notre objectif est d'informer et de sensibiliser sur le coût réel des abonnements. Le site peut contenir des liens d'affiliation qui nous permettent de financer le projet.", en: "Our goal is to inform and raise awareness about the real cost of subscriptions. The site may contain affiliate links that help fund the project." },

  // Footer
  'footer.madeWith': { fr: 'Fait avec', en: 'Made with' },
  'footer.by': { fr: 'par', en: 'by' },
  'footer.rights': { fr: 'Tous droits réservés', en: 'All rights reserved' },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.contact': { fr: 'Contact', en: 'Contact' },

  // Misc
  'misc.loading': { fr: 'Chargement...', en: 'Loading...' },
  'misc.error': { fr: 'Erreur', en: 'Error' },
  'misc.back': { fr: 'Retour', en: 'Back' },
  'misc.close': { fr: 'Fermer', en: 'Close' },
  'misc.save': { fr: 'Enregistrer', en: 'Save' },
  'misc.cancel': { fr: 'Annuler', en: 'Cancel' },
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
