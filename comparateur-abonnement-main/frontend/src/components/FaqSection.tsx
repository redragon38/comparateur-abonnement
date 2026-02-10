import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
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

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 md:py-20" aria-labelledby="faq-title">
      <div className="container max-w-2xl">
        <header className="text-center mb-10">
          <h2 id="faq-title" className="text-3xl md:text-4xl font-bold">
            Questions fréquentes
          </h2>
          <p className="text-foreground/60 mt-3">
            Tout ce que vous devez savoir sur notre comparateur d'abonnements
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
            Vous avez d'autres questions ? Utilisez le bouton "Proposer" pour nous contacter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
