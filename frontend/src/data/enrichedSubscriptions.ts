import { Subscription } from './subscriptions';

export const enrichedSubscriptions: Record<string, Partial<Subscription>> = {
  netflix: {
    description: "Le leader mondial du streaming vidéo avec un catalogue varié de séries, films et documentaires originaux.",
    features: [
      "Catalogue de films et séries illimité",
      "Productions originales exclusives",
      "Disponible sur tous les appareils",
      "Téléchargement pour visionnage hors ligne",
      "Profils multiples",
      "Recommandations personnalisées"
    ],
    pros: [
      "Catalogue très vaste et varié",
      "Productions originales de qualité",
      "Interface intuitive",
      "Disponible sur de nombreux appareils",
      "Pas de publicité"
    ],
    cons: [
      "Prix en augmentation régulière",
      "Contenu qui varie selon les pays",
      "Suppression fréquente de contenus",
      "Plan le moins cher avec publicité"
    ],
    devices: ["Smart TV", "Smartphone", "Tablette", "Ordinateur", "Console de jeux", "Chromecast", "Apple TV"],
    website: "https://www.netflix.com",
    founded: "1997",
    headquarters: "Los Gatos, Californie, USA"
  },
  spotify: {
    description: "Le service de streaming musical le plus populaire au monde avec plus de 100 millions de titres.",
    features: [
      "Plus de 100 millions de titres",
      "Podcasts et audiobooks",
      "Playlists personnalisées",
      "Mode hors ligne",
      "Qualité audio jusqu'à 320 kbps",
      "Lyrics en temps réel"
    ],
    pros: [
      "Catalogue musical immense",
      "Découverte musicale excellente",
      "Playlists personnalisées de qualité",
      "Compatible avec de nombreux appareils",
      "Plan famille avantageux"
    ],
    cons: [
      "Version gratuite avec publicités",
      "Qualité audio limitée vs Hi-Fi",
      "Rémunération des artistes critiquée",
      "Pas de version Hi-Fi abordable"
    ],
    devices: ["Smartphone", "Ordinateur", "Smart TV", "Enceintes connectées", "Consoles", "Voiture"],
    website: "https://www.spotify.com",
    founded: "2006",
    headquarters: "Stockholm, Suède"
  },
  "amazon-prime": {
    description: "Service multi-avantages incluant livraison gratuite, streaming vidéo, musique et plus encore.",
    features: [
      "Livraison gratuite en 1 jour",
      "Prime Video avec films et séries",
      "Amazon Music (2 millions de titres)",
      "Prime Reading (livres et magazines)",
      "Amazon Photos (stockage illimité)",
      "Offres exclusives Prime Day"
    ],
    pros: [
      "Excellent rapport qualité-prix",
      "Nombreux avantages combinés",
      "Livraison rapide et gratuite",
      "Prime Video inclus",
      "Essai gratuit 30 jours"
    ],
    cons: [
      "Encourage la surconsommation",
      "Catalogue vidéo moins fourni que Netflix",
      "Musique limitée sans Music Unlimited",
      "Interface parfois complexe"
    ],
    devices: ["Tous appareils", "Fire TV", "Alexa", "Kindle"],
    website: "https://www.amazon.fr/prime",
    founded: "2005",
    headquarters: "Seattle, Washington, USA"
  },
  "disney-plus": {
    description: "Le streaming de Disney avec Marvel, Star Wars, Pixar, National Geographic et Star.",
    features: [
      "Catalogue Disney complet",
      "Marvel et Star Wars",
      "Pixar et National Geographic",
      "Contenus Star (adultes)",
      "4K HDR disponible",
      "Téléchargements illimités"
    ],
    pros: [
      "Catalogue familial exceptionnel",
      "Qualité 4K incluse",
      "Interface claire et simple",
      "Contenu exclusif Marvel/Star Wars",
      "Prix compétitif"
    ],
    cons: [
      "Moins de contenu pour adultes",
      "Sorties de films parfois tardives",
      "Catalogue moins vaste que Netflix",
      "Plan avec pub récent"
    ],
    devices: ["Smart TV", "Smartphone", "Tablette", "Ordinateur", "Console", "Apple TV"],
    website: "https://www.disneyplus.com",
    founded: "2019",
    headquarters: "Burbank, Californie, USA"
  },
  "xbox-game-pass": {
    description: "Netflix des jeux vidéo avec accès à des centaines de jeux Xbox et PC.",
    features: [
      "Plus de 400 jeux disponibles",
      "Jeux day one (dès la sortie)",
      "Xbox Game Studios inclus",
      "EA Play inclus (Ultimate)",
      "Cloud Gaming (Ultimate)",
      "Jeux PC et console"
    ],
    pros: [
      "Énorme bibliothèque de jeux",
      "Nouveautés dès leur sortie",
      "Excellent rapport qualité-prix",
      "Cloud gaming très pratique",
      "Compatible PC et Xbox"
    ],
    cons: [
      "Les jeux peuvent quitter le service",
      "Nécessite une bonne connexion (cloud)",
      "Pas tous les AAA day one",
      "Catalogue qui varie selon les régions"
    ],
    devices: ["Xbox Series X/S", "Xbox One", "PC Windows", "Mobile (cloud)", "Smart TV"],
    website: "https://www.xbox.com/game-pass",
    founded: "2017",
    headquarters: "Redmond, Washington, USA"
  },
  "apple-music": {
    description: "Le service de streaming musical d'Apple avec audio spatial et qualité lossless.",
    features: [
      "100 millions de titres",
      "Audio spatial Dolby Atmos",
      "Lossless et Hi-Res Lossless",
      "Apple Music Classical inclus",
      "Paroles en temps réel",
      "Intégration parfaite avec Apple"
    ],
    pros: [
      "Qualité audio exceptionnelle",
      "Audio spatial immersif",
      "Intégration iOS/macOS parfaite",
      "Pas de surcoût pour Hi-Fi",
      "Apple Music Classical gratuit"
    ],
    cons: [
      "Interface moins intuitive que Spotify",
      "Découverte musicale moins bonne",
      "Exclusif Apple pour certaines fonctions",
      "Lossless incompatible Bluetooth"
    ],
    devices: ["iPhone", "iPad", "Mac", "Apple Watch", "Apple TV", "HomePod", "Android", "PC"],
    website: "https://www.apple.com/apple-music",
    founded: "2015",
    headquarters: "Cupertino, Californie, USA"
  },
  "youtube-premium": {
    description: "YouTube sans publicité avec YouTube Music inclus et lecture en arrière-plan.",
    features: [
      "YouTube sans publicité",
      "YouTube Music inclus",
      "Lecture en arrière-plan",
      "Téléchargements hors ligne",
      "Accès à YouTube Originals",
      "Picture-in-Picture"
    ],
    pros: [
      "Supprime toutes les pubs YouTube",
      "YouTube Music inclus",
      "Lecture arrière-plan mobile",
      "Qualité sonore excellente",
      "Vaut le coup si vous utilisez beaucoup YouTube"
    ],
    cons: [
      "Prix élevé",
      "Peu de YouTube Originals intéressants",
      "YouTube Music moins bon que Spotify",
      "Nécessite un compte Google"
    ],
    devices: ["Smartphone", "Tablette", "Ordinateur", "Smart TV", "Console"],
    website: "https://www.youtube.com/premium",
    founded: "2018",
    headquarters: "San Bruno, Californie, USA"
  },
  "canal-plus": {
    description: "Chaîne française premium avec cinéma, séries, sport et divertissement.",
    features: [
      "Chaînes Canal+ en direct",
      "Films en avant-première",
      "Séries HBO et Showtime",
      "Sport (Ligue 1, F1, etc.)",
      "Replay 7 jours",
      "myCANAL sur tous supports"
    ],
    pros: [
      "Cinéma en avant-première",
      "Sport de qualité",
      "Séries HBO incluses",
      "Production française originale",
      "Application performante"
    ],
    cons: [
      "Prix très élevé",
      "Sport optionnel sur certains forfaits",
      "Interface parfois lourde",
      "Engagement souvent requis"
    ],
    devices: ["Smart TV", "Décodeur", "Smartphone", "Tablette", "Ordinateur"],
    website: "https://www.canalplus.com",
    founded: "1984",
    headquarters: "Paris, France"
  }
};

export function getEnrichedSubscription(id: string): Subscription | undefined {
  const base = require('./subscriptions.json').subscriptions.find((s: Subscription) => s.id === id);
  if (!base) return undefined;
  
  return {
    ...base,
    ...enrichedSubscriptions[id]
  };
}
