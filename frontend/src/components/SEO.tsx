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
}

const DEFAULT_TITLE = 'CombienÇaCoûte — Le vrai prix de tes abonnements';
const DEFAULT_DESCRIPTION = 'Netflix, Spotify, Disney+ : découvre combien tes abonnements te coûtent vraiment sur 1, 3, 5 ou 10 ans. Comparateur gratuit et sans inscription.';
const SITE_URL = 'https://combien-ca-coute.fr';
const DEFAULT_IMAGE = 'https://lovable.dev/opengraph-image-p98pqg.png';

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = SITE_URL,
  type = 'website',
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
  breadcrumbs,
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
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="CombienÇaCoûte" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="CombienÇaCoûte" />
      <meta name="publisher" content="CombienÇaCoûte" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      <meta name="content-language" content="fr" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Export structured data generators
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
  image?: string;
  url: string;
  offers: Array<{ name: string; price: number; priceCurrency?: string }>;
  category: string;
  aggregateRating?: { ratingValue: number; reviewCount: number };
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "url": product.url,
  "category": product.category,
  "offers": product.offers.map(offer => ({
    "@type": "Offer",
    "name": offer.name,
    "price": offer.price,
    "priceCurrency": offer.priceCurrency || "EUR",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
  })),
  ...(product.aggregateRating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.aggregateRating.ratingValue,
      "reviewCount": product.aggregateRating.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    }
  })
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CombienÇaCoûte",
  "alternateName": ["Combien Ca Coute", "CombienCaCoute"],
  "url": SITE_URL,
  "description": DEFAULT_DESCRIPTION,
  "inLanguage": "fr-FR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/#comparateur?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CombienÇaCoûte",
  "url": SITE_URL,
  "logo": DEFAULT_IMAGE,
  "description": "Comparateur gratuit du coût réel des abonnements sur le long terme",
  "foundingDate": "2025",
  "areaServed": "FR",
  "serviceType": "Comparateur d'abonnements"
});

export const generateItemListSchema = (items: Array<{ name: string; url: string; position: number }>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": items.map(item => ({
    "@type": "ListItem",
    "position": item.position,
    "name": item.name,
    "url": item.url
  }))
});
