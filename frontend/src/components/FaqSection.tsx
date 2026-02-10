import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const faqsFr = [
  {
    q: "Comment sont calculés les prix des abonnements ?",
    a: "On multiplie simplement le prix mensuel officiel par le nombre de mois. Pas de frais cachés ni d'augmentation estimée — juste le coût brut sur la durée choisie.",
  },
  {
    q: "Les prix de Netflix, Spotify et Disney+ sont-ils à jour ?",
    a: "Nous mettons régulièrement à jour les tarifs en nous basant sur les sites officiels des services. Les dernières vérifications datent de juillet 2025.",
  },
  {
    q: "Pourquoi ce comparateur d'abonnements est gratuit ?",
    a: "Notre objectif est d'informer et de sensibiliser sur le coût réel des abonnements. Le site peut contenir des liens d'affiliation qui nous permettent de financer le projet sans frais pour vous.",
  },
  {
    q: "Puis-je suggérer un abonnement à ajouter au comparateur ?",
    a: "Bien sûr ! Utilisez le bouton \"Proposer\" dans la barre de navigation pour nous suggérer de nouveaux services. Nous ajoutons régulièrement de nouveaux abonnements.",
  },
  {
    q: "Les hausses de prix futures sont-elles prises en compte ?",
    a: "Pas encore. Pour l'instant, le calcul se base sur le tarif actuel sans projection d'augmentation. Une fonctionnalité de simulation de hausse est prévue prochainement.",
  },
  {
    q: "Combien coûte Netflix sur 5 ans ?",
    a: "Netflix coûte entre 359€ (formule Standard avec pub à 5,99€/mois) et 1 379€ (formule Premium à 22,99€/mois) sur 5 ans, selon la formule choisie.",
  },
  {
    q: "Quel est le meilleur rapport qualité-prix entre les services de streaming ?",
    a: "Cela dépend de vos besoins. Disney+ offre un bon rapport qualité-prix pour le contenu familial. Netflix et Amazon Prime proposent le catalogue le plus large. Utilisez notre comparateur pour voir les coûts réels sur le long terme.",
  },
];

const faqsEn = [
  {
    q: "How are subscription prices calculated?",
    a: "We simply multiply the official monthly price by the number of months. No hidden fees or estimated increases — just the raw cost over the chosen duration.",
  },
  {
    q: "Are Netflix, Spotify, and Disney+ prices up to date?",
    a: "We regularly update prices based on official service websites. Last checks were done in July 2025.",
  },
  {
    q: "Why is this subscription comparator free?",
    a: "Our goal is to inform and raise awareness about the real cost of subscriptions. The site may contain affiliate links that help fund the project at no cost to you.",
  },
  {
    q: "Can I suggest a subscription to add to the comparator?",
    a: "Of course! Use the \"Suggest\" button in the navigation bar to suggest new services. We regularly add new subscriptions.",
  },
  {
    q: "Are future price increases taken into account?",
    a: "Not yet. For now, the calculation is based on the current rate without projected increases. A price increase simulation feature is planned soon.",
  },
  {
    q: "How much does Netflix cost over 5 years?",
    a: "Netflix costs between €359 (Standard with ads at €5.99/month) and €1,379 (Premium at €22.99/month) over 5 years, depending on the plan chosen.",
  },
  {
    q: "What's the best value for money among streaming services?",
    a: "It depends on your needs. Disney+ offers good value for family content. Netflix and Amazon Prime have the largest catalog. Use our comparator to see real costs over the long term.",
  },
];

const FaqSection = () => {
  const { language } = useLanguage();
  const faqs = language === 'fr' ? faqsFr : faqsEn;

  return (
    <section id="faq" className="py-16 md:py-20" aria-labelledby="faq-title">
      <div className="container max-w-2xl">
        <header className="text-center mb-10">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold">
            {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-foreground/60 mt-3">
            {language === 'fr' 
              ? 'Tout ce que vous devez savoir sur notre comparateur d\'abonnements'
              : 'Everything you need to know about our subscription comparator'}
          </p>
        </header>
        
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-xl px-5 border-0"
            >
              <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline text-foreground/90">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/50 text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {/* Additional SEO content */}
        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/40">
            {language === 'fr' 
              ? 'Vous avez d\'autres questions ? Utilisez le bouton "Proposer" pour nous contacter.'
              : 'Have more questions? Use the "Suggest" button to contact us.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
