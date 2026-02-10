import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

const DEFAULT_TITLE = 'CombienÇaCoûte — Le vrai prix de tes abonnements Netflix, Spotify, Disney+';
const DEFAULT_DESCRIPTION = 'Comparateur gratuit pour calculer le vrai coût de vos abonnements Netflix, Spotify, Disney+, Amazon Prime sur 1, 3, 5 ou 10 ans. Codes promo et astuces pour économiser jusqu\'à 40%.';
const DEFAULT_KEYWORDS = 'comparateur abonnement, prix netflix, prix spotify, prix disney plus, coût abonnement streaming, calculateur abonnement, économiser abonnement, code promo netflix, code promo spotify, abonnement pas cher, prix amazon prime, combien coute netflix, combien coute spotify, tarif streaming 2026';
const SITE_URL = 'https://combien-ca-coute.fr';
const DEFAULT_IMAGE = 'https://combien-ca-coute.fr/og-image.png';

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
  breadcrumbs,
  keywords = DEFAULT_KEYWORDS,
  datePublished = '2026-01-01',
  dateModified = '2026-02-10',
  author = 'CombienÇaCoûte',
}: SEOProps) => {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | CombienÇaCoûte`;

  // Generate BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="CombienÇaCoûte - Comparateur d'abonnements" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="CombienÇaCoûte" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@combien_ca_coute" />
      <meta name="twitter:site" content="@combien_ca_coute" />
      
      {/* Article specific */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={datePublished} />
          <meta property="article:modified_time" content={dateModified} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Finance" />
          <meta property="article:tag" content="abonnement" />
          <meta property="article:tag" content="streaming" />
          <meta property="article:tag" content="économies" />
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content={author} />
      <meta name="publisher" content="CombienÇaCoûte" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      <meta name="content-language" content="fr, en" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Mobile & App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="CombienÇaCoûte" />
      <meta name="application-name" content="CombienÇaCoûte" />
      <meta name="theme-color" content="#0a0a0f" />
      <meta name="msapplication-TileColor" content="#0a0a0f" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumbs Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

// Schema generators
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CombienÇaCoûte",
  "alternateName": ["Combien Ca Coute", "Comparateur Abonnements"],
  "url": SITE_URL,
  "description": DEFAULT_DESCRIPTION,
  "inLanguage": ["fr", "en"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CombienÇaCoûte",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Comparateur gratuit d'abonnements streaming, musique, jeux vidéo et plus",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/combien_ca_coute",
    "https://facebook.com/combien.ca.coute"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["French", "English"]
  }
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  priceCurrency?: string;
  url: string;
  category: string;
  rating?: number;
  reviewCount?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "url": product.url,
  "category": product.category,
  "brand": {
    "@type": "Brand",
    "name": product.name
  },
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.priceCurrency || "EUR",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": product.url
  },
  ...(product.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount || 100,
      "bestRating": "5",
      "worstRating": "1"
    }
  })
});

export const generateServiceSchema = (service: {
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": service.provider
  },
  "serviceType": service.serviceType,
  "areaServed": service.areaServed
});

export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "totalTime": howTo.totalTime || "PT5M",
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export default SEO;
