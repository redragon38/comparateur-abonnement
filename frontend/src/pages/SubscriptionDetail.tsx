import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, ExternalLink, Calendar, MapPin, Globe } from "lucide-react";
import { subscriptions, durationOptions, calculateTotalCost, formatPrice, type DurationOption } from "@/data/subscriptions";
import { enrichedSubscriptions } from "@/data/enrichedSubscriptions";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppReviews from "@/components/AppReviews";
import SEO, { generateProductSchema } from "@/components/SEO";
import { useHistory } from "@/hooks/useHistory";
import { useLanguage } from "@/contexts/LanguageContext";

const SubscriptionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [duration, setDuration] = useState<DurationOption>(durationOptions[2]);
  const { addToHistory } = useHistory();
  const { language } = useLanguage();

  const subscription = subscriptions.find(s => s.id === id);
  const enrichedData = enrichedSubscriptions[id || ""];

  // Add to history when component mounts
  useEffect(() => {
    if (subscription) {
      addToHistory({
        id: subscription.id,
        name: subscription.name,
        logo: subscription.logo
      });
    }
  }, [subscription, addToHistory]);

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SEO 
          title={language === 'fr' ? "Abonnement non trouvé" : "Subscription not found"}
          description={language === 'fr' ? "L'abonnement que vous recherchez n'existe pas ou a été supprimé." : "The subscription you're looking for doesn't exist or has been removed."}
          noindex={true}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Abonnement non trouvé' : 'Subscription not found'}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="stat-card-shock text-white px-6 py-3 rounded-xl font-semibold"
          >
            {language === 'fr' ? "Retour à l'accueil" : 'Back to home'}
          </button>
        </div>
      </div>
    );
  }

  const selectedPlan = subscription.plans[selectedPlanIndex];
  const totalCost = calculateTotalCost(selectedPlan.monthlyPrice, duration.months);

  // Generate SEO data
  const pageTitle = `${subscription.name} : prix et coût réel sur ${duration.label}`;
  const pageDescription = enrichedData?.description 
    ? `${enrichedData.description} Découvre combien ${subscription.name} te coûte vraiment : ${formatPrice(totalCost)} sur ${duration.label}. Comparez tous les forfaits.`
    : `Découvre le vrai prix de ${subscription.name} : ${formatPrice(totalCost)} sur ${duration.label}. Comparateur gratuit avec tous les forfaits disponibles.`;

  // Generate Product structured data
  const productSchema = generateProductSchema({
    name: subscription.name,
    description: enrichedData?.description || `Service d'abonnement ${subscription.category}`,
    url: `https://combien-ca-coute.fr/subscription/${subscription.id}`,
    category: subscription.category,
    offers: subscription.plans.map(plan => ({
      name: plan.name,
      price: plan.monthlyPrice,
      priceCurrency: "EUR"
    }))
  });

  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: "Accueil", url: "https://combien-ca-coute.fr/" },
    { name: subscription.category, url: `https://combien-ca-coute.fr/#comparateur` },
    { name: subscription.name, url: `https://combien-ca-coute.fr/subscription/${subscription.id}` }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={pageTitle}
        description={pageDescription}
        canonical={`https://combien-ca-coute.fr/subscription/${subscription.id}`}
        type="product"
        structuredData={productSchema}
        breadcrumbs={breadcrumbs}
      />
      
      <Navbar />
      
      <main className="flex-1 py-12 md:py-20" role="main">
        <div className="container">
          {/* Breadcrumb navigation */}
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-foreground/60" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-foreground transition-colors">
                  <span itemProp="name">{language === 'fr' ? 'Accueil' : 'Home'}</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-foreground">{subscription.name}</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <motion.button
            onClick={() => navigate("/")}
            className="glass rounded-xl px-4 py-2 flex items-center gap-2 mb-8 hover:glass-strong transition-all"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Retour à l'accueil"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">{language === 'fr' ? 'Retour' : 'Back'}</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <article className="lg:col-span-2 space-y-8">
              {/* Header */}
              <motion.header
                className="glass-strong rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start gap-6">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl"
                    style={{ backgroundColor: subscription.color + "20" }}
                    role="img"
                    aria-label={`Logo ${subscription.name}`}
                  >
                    {subscription.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                          {subscription.name}
                        </h1>
                        <span className="inline-block px-3 py-1 rounded-lg glass text-sm font-medium text-foreground/70">
                          {subscription.category}
                        </span>
                      </div>
                      {enrichedData?.website && (
                        <motion.a
                          href={enrichedData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass rounded-lg p-3 hover:glass-strong transition-all"
                          whileHover={{ scale: 1.05 }}
                          aria-label={`Visiter le site officiel de ${subscription.name}`}
                        >
                          <ExternalLink className="w-5 h-5" aria-hidden="true" />
                        </motion.a>
                      )}
                    </div>
                    {enrichedData?.description && (
                      <p className="text-foreground/60 leading-relaxed mt-4">
                        {enrichedData.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company info */}
                {(enrichedData?.founded || enrichedData?.headquarters) && (
                  <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                    {enrichedData.founded && (
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>{language === 'fr' ? 'Fondé en' : 'Founded in'} {enrichedData.founded}</span>
                      </div>
                    )}
                    {enrichedData.headquarters && (
                      <div className="flex items-center gap-2 text-sm text-foreground/60">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>{enrichedData.headquarters}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.header>

              {/* Features */}
              {enrichedData?.features && (
                <motion.section
                  className="glass-strong rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  aria-labelledby="features-title"
                >
                  <h2 id="features-title" className="text-2xl font-bold text-foreground mb-6">{language === 'fr' ? 'Fonctionnalités' : 'Features'}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
                    {enrichedData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 glass rounded-lg p-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {/* Pros & Cons */}
              {(enrichedData?.pros || enrichedData?.cons) && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Pros */}
                  {enrichedData.pros && (
                    <section className="glass-strong rounded-2xl p-6" aria-labelledby="pros-title">
                      <h3 id="pros-title" className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">👍</span>
                        {language === 'fr' ? 'Points forts' : 'Pros'}
                      </h3>
                      <ul className="space-y-2" role="list">
                        {enrichedData.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Cons */}
                  {enrichedData.cons && (
                    <section className="glass-strong rounded-2xl p-6" aria-labelledby="cons-title">
                      <h3 id="cons-title" className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">👎</span>
                        {language === 'fr' ? 'Points faibles' : 'Cons'}
                      </h3>
                      <ul className="space-y-2" role="list">
                        {enrichedData.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </motion.div>
              )}

              {/* Devices */}
              {enrichedData?.devices && (
                <motion.section
                  className="glass-strong rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  aria-labelledby="devices-title"
                >
                  <h3 id="devices-title" className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" aria-hidden="true" />
                    {language === 'fr' ? 'Appareils compatibles' : 'Compatible devices'}
                  </h3>
                  <ul className="flex flex-wrap gap-2" role="list">
                    {enrichedData.devices.map((device, index) => (
                      <li
                        key={index}
                        className="glass rounded-lg px-3 py-2 text-sm text-foreground/70"
                      >
                        {device}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}
            </article>

            {/* Sidebar - Pricing */}
            <aside className="lg:col-span-1" aria-label="Tarifs et options">
              <motion.div
                className="glass-strong rounded-2xl p-6 sticky top-24 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-foreground">{language === 'fr' ? 'Tarifs' : 'Pricing'}</h3>

                {/* Plan selector */}
                {subscription.plans.length > 1 && (
                  <fieldset className="space-y-2">
                    <legend className="text-sm text-foreground/60">{language === 'fr' ? 'Choisir un forfait' : 'Choose a plan'}</legend>
                    <div className="space-y-2" role="radiogroup" aria-label="Sélection du forfait">
                      {subscription.plans.map((plan, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedPlanIndex(index)}
                          role="radio"
                          aria-checked={index === selectedPlanIndex}
                          className={`
                            w-full text-left px-4 py-3 rounded-xl transition-all
                            ${index === selectedPlanIndex
                              ? "stat-card-shock text-white"
                              : "glass hover:glass-strong text-foreground/70"
                            }
                          `}
                        >
                          <div className="font-semibold">{plan.name}</div>
                          <div className="text-sm opacity-90">{formatPrice(plan.monthlyPrice)}/{language === 'fr' ? 'mois' : 'month'}</div>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Duration selector */}
                <fieldset className="space-y-2">
                  <legend className="text-sm text-foreground/60">{language === 'fr' ? 'Durée' : 'Duration'}</legend>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Sélection de la durée">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt)}
                        role="radio"
                        aria-checked={duration.value === opt.value}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${duration.value === opt.value
                            ? "stat-card-accent text-white"
                            : "glass hover:glass-strong text-foreground/70"
                          }
                        `}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Price summary */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-foreground/60">{language === 'fr' ? 'Prix mensuel' : 'Monthly price'}</span>
                    <span className="text-xl font-bold text-foreground">
                      {formatPrice(selectedPlan.monthlyPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-foreground/60">{language === 'fr' ? 'Sur' : 'Over'} {language === 'en' ? (duration.months === 12 ? '1 year' : duration.months === 36 ? '3 years' : duration.months === 60 ? '5 years' : '10 years') : duration.label}</span>
                    <span className="text-2xl font-bold text-gradient-shock">
                      {formatPrice(totalCost)}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                {enrichedData?.website && (
                  <motion.a
                    href={enrichedData.website}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full stat-card-shock text-white text-center px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'fr' ? "Voir l'offre officielle" : 'View official offer'}
                  </motion.a>
                )}
              </motion.div>
            </aside>
          </div>

          {/* Section des avis */}
          <section className="mt-12" aria-labelledby="reviews-title">
            <h2 id="reviews-title" className="sr-only">{language === 'fr' ? `Avis des utilisateurs pour ${subscription.name}` : `User reviews for ${subscription.name}`}</h2>
            <AppReviews 
              appId={`subscription-${id}`} 
              appName={subscription.name}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubscriptionDetail;
