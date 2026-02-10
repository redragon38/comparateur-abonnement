export interface PromoCode {
  code: string;
  description: string;
  descriptionEn: string;
  discount: string;
  discountEn: string;
  expiresAt: string;
  isActive: boolean;
}

export const promoCodes: Record<string, PromoCode[]> = {
  "netflix": [
    {
      code: "NETFLIX30",
      description: "30 jours gratuits pour les nouveaux abonnés",
      descriptionEn: "30 days free for new subscribers",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-12-31",
      isActive: true
    },
    {
      code: "FAMnetflix",
      description: "10% de réduction sur l'abonnement famille",
      descriptionEn: "10% off on family subscription",
      discount: "-10%",
      discountEn: "-10%",
      expiresAt: "2025-06-30",
      isActive: true
    }
  ],
  "spotify": [
    {
      code: "SPOTIFY3FREE",
      description: "3 mois Premium gratuits",
      descriptionEn: "3 months Premium free",
      discount: "3 mois offerts",
      discountEn: "3 months free",
      expiresAt: "2025-12-31",
      isActive: true
    },
    {
      code: "STUDIFY50",
      description: "50% pour les étudiants",
      descriptionEn: "50% off for students",
      discount: "-50%",
      discountEn: "-50%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "disney-plus": [
    {
      code: "DISNEY2024",
      description: "1 mois offert sur l'abonnement annuel",
      descriptionEn: "1 month free on annual subscription",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-08-31",
      isActive: true
    },
    {
      code: "MARVEL20",
      description: "20% de réduction",
      descriptionEn: "20% discount",
      discount: "-20%",
      discountEn: "-20%",
      expiresAt: "2025-07-15",
      isActive: true
    }
  ],
  "amazon-prime": [
    {
      code: "PRIME30DAYS",
      description: "30 jours d'essai gratuit",
      descriptionEn: "30 days free trial",
      discount: "Essai gratuit",
      discountEn: "Free trial",
      expiresAt: "2025-12-31",
      isActive: true
    },
    {
      code: "STUDENT50",
      description: "50% pour les étudiants pendant 4 ans",
      descriptionEn: "50% off for students for 4 years",
      discount: "-50%",
      discountEn: "-50%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "apple-tv-plus": [
    {
      code: "APPLETV3M",
      description: "3 mois gratuits avec un nouvel appareil Apple",
      descriptionEn: "3 months free with new Apple device",
      discount: "3 mois offerts",
      discountEn: "3 months free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "canal-plus": [
    {
      code: "CANAL25",
      description: "25% de réduction la première année",
      descriptionEn: "25% off first year",
      discount: "-25%",
      discountEn: "-25%",
      expiresAt: "2025-09-30",
      isActive: true
    }
  ],
  "youtube-premium": [
    {
      code: "YTFAMILY",
      description: "1 mois gratuit sur l'abonnement famille",
      descriptionEn: "1 month free on family plan",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "deezer": [
    {
      code: "DEEZER3FREE",
      description: "3 mois Premium gratuits",
      descriptionEn: "3 months Premium free",
      discount: "3 mois offerts",
      discountEn: "3 months free",
      expiresAt: "2025-10-31",
      isActive: true
    }
  ],
  "apple-music": [
    {
      code: "APPLEMUSIC1",
      description: "1 mois gratuit pour les nouveaux abonnés",
      descriptionEn: "1 month free for new subscribers",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "hbo-max": [
    {
      code: "HBO2024",
      description: "20% sur l'abonnement annuel",
      descriptionEn: "20% off annual subscription",
      discount: "-20%",
      discountEn: "-20%",
      expiresAt: "2025-11-30",
      isActive: true
    }
  ],
  "paramount-plus": [
    {
      code: "PARAMOUNT50",
      description: "50% la première année",
      descriptionEn: "50% off first year",
      discount: "-50%",
      discountEn: "-50%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "xbox-game-pass": [
    {
      code: "GAMEPASS1",
      description: "Premier mois à 1€",
      descriptionEn: "First month for €1",
      discount: "1€ le 1er mois",
      discountEn: "€1 first month",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "playstation-plus": [
    {
      code: "PSNOW25",
      description: "25% sur l'abonnement annuel",
      descriptionEn: "25% off annual subscription",
      discount: "-25%",
      discountEn: "-25%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "nintendo-switch-online": [
    {
      code: "NINTY7DAYS",
      description: "7 jours d'essai gratuit",
      descriptionEn: "7 days free trial",
      discount: "7 jours gratuits",
      discountEn: "7 days free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "adobe-creative-cloud": [
    {
      code: "ADOBE40STU",
      description: "40% pour les étudiants et enseignants",
      descriptionEn: "40% off for students and teachers",
      discount: "-40%",
      discountEn: "-40%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "microsoft-365": [
    {
      code: "M365FAMILY",
      description: "15% sur l'abonnement famille",
      descriptionEn: "15% off family subscription",
      discount: "-15%",
      discountEn: "-15%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "notion": [
    {
      code: "NOTIONPLUS",
      description: "Crédit de 10$ sur le plan Plus",
      descriptionEn: "$10 credit on Plus plan",
      discount: "10$ offerts",
      discountEn: "$10 free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "dropbox": [
    {
      code: "DROP20",
      description: "20% sur le plan Plus",
      descriptionEn: "20% off Plus plan",
      discount: "-20%",
      discountEn: "-20%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "google-one": [
    {
      code: "GOOGLE1TB",
      description: "1 mois gratuit sur 2TB",
      descriptionEn: "1 month free on 2TB plan",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "icloud-plus": [
    {
      code: "ICLOUD50GB",
      description: "Premier mois gratuit",
      descriptionEn: "First month free",
      discount: "1 mois offert",
      discountEn: "1 month free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "audible": [
    {
      code: "AUDIBLE60",
      description: "60 jours d'essai gratuit",
      descriptionEn: "60 days free trial",
      discount: "60 jours gratuits",
      discountEn: "60 days free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "kindle-unlimited": [
    {
      code: "KINDLE3M",
      description: "3 mois pour 9,99€",
      descriptionEn: "3 months for €9.99",
      discount: "9,99€ / 3 mois",
      discountEn: "€9.99 / 3 months",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "headspace": [
    {
      code: "HEADSPACE50",
      description: "50% sur l'abonnement annuel",
      descriptionEn: "50% off annual subscription",
      discount: "-50%",
      discountEn: "-50%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "calm": [
    {
      code: "CALM40",
      description: "40% la première année",
      descriptionEn: "40% off first year",
      discount: "-40%",
      discountEn: "-40%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "strava": [
    {
      code: "STRAVA60",
      description: "60 jours d'essai Premium",
      descriptionEn: "60 days Premium trial",
      discount: "60 jours gratuits",
      discountEn: "60 days free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "crunchyroll": [
    {
      code: "CRUNCHY14",
      description: "14 jours d'essai gratuit",
      descriptionEn: "14 days free trial",
      discount: "14 jours gratuits",
      discountEn: "14 days free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "nordvpn": [
    {
      code: "NORDVPN70",
      description: "70% sur l'abonnement 2 ans",
      descriptionEn: "70% off 2-year plan",
      discount: "-70%",
      discountEn: "-70%",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ],
  "expressvpn": [
    {
      code: "EXPRESS3M",
      description: "3 mois gratuits sur l'abonnement annuel",
      descriptionEn: "3 months free on annual plan",
      discount: "3 mois offerts",
      discountEn: "3 months free",
      expiresAt: "2025-12-31",
      isActive: true
    }
  ]
};
