import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComparisonSection from "@/components/ComparisonSection";
import CustomCalculator from "@/components/CustomCalculator";
import Statistics from "@/components/Statistics";
import SavingTips from "@/components/SavingTips";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import AppReviews from "@/components/AppReviews";
import RecentHistory from "@/components/RecentHistory";
import Suggestions from "@/components/Suggestions";
import SavingsGoals from "@/components/SavingsGoals";
import BudgetTracker from "@/components/BudgetTracker";
import PersonalStats from "@/components/PersonalStats";
import RenewalCalendar from "@/components/RenewalCalendar";
import SummaryWidget from "@/components/SummaryWidget";
import ActivityLog from "@/components/ActivityLog";
import SpendingEvolution from "@/components/SpendingEvolution";
import DuplicateDetector from "@/components/DuplicateDetector";
import SmartInsights from "@/components/SmartInsights";
import SEO, { generateWebsiteSchema, generateOrganizationSchema, generateFAQSchema } from "@/components/SEO";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { durationOptions, subscriptions, type DurationOption } from "@/data/subscriptions";
import { useState, useEffect } from "react";
import { useSpendingHistory } from "@/hooks/useSpendingHistory";
import "@/styles/print.css";

// FAQ data for structured data
const faqData = [
  {
    question: "Comment sont calculés les prix ?",
    answer: "On multiplie simplement le prix mensuel officiel par le nombre de mois. Pas de frais cachés ni d'augmentation estimée — juste le coût brut sur la durée choisie."
  },
  {
    question: "Les prix sont-ils à jour ?",
    answer: "Nous mettons régulièrement à jour les tarifs en nous basant sur les sites officiels des services. Les dernières vérifications datent de 2025."
  },
  {
    question: "Pourquoi ce comparateur est gratuit ?",
    answer: "Notre objectif est d'informer et de sensibiliser sur le coût réel des abonnements. Le site peut contenir des liens d'affiliation qui nous permettent de financer le projet."
  },
  {
    question: "Puis-je suggérer un abonnement à ajouter ?",
    answer: "Bien sûr ! Contactez-nous via nos réseaux sociaux ou par email. Nous ajoutons régulièrement de nouveaux services."
  },
  {
    question: "Les hausses de prix sont-elles prises en compte ?",
    answer: "Pas encore. Pour l'instant, le calcul se base sur le tarif actuel sans projection d'augmentation. Une fonctionnalité de simulation de hausse est prévue prochainement."
  }
];

// Combine all structured data
const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    generateWebsiteSchema(),
    generateOrganizationSchema(),
    generateFAQSchema(faqData)
  ]
};

const Index = () => {
  const [selectedPlans] = useLocalStorage<Record<string, number>>('selected-plans', {});
  const [duration] = useState<DurationOption>(durationOptions[2]);
  const { saveSnapshot } = useSpendingHistory();

  // Calculate total spent for budget tracker
  const totalSpent = Object.entries(selectedPlans).reduce((sum, [subId, planIndex]) => {
    const sub = subscriptions.find(s => s.id === subId);
    if (!sub) return sum;
    return sum + sub.plans[planIndex].monthlyPrice;
  }, 0);

  // Save snapshot when selectedPlans change
  useEffect(() => {
    if (Object.keys(selectedPlans).length > 0) {
      const subs = Object.entries(selectedPlans).map(([subId, planIndex]) => {
        const sub = subscriptions.find(s => s.id === subId);
        if (!sub) return null;
        return {
          id: subId,
          name: sub.name,
          monthlyPrice: sub.plans[planIndex].monthlyPrice
        };
      }).filter(Boolean) as Array<{ id: string; name: string; monthlyPrice: number }>;

      saveSnapshot(totalSpent, totalSpent * 12, Object.keys(selectedPlans).length, subs);
    }
  }, [selectedPlans, totalSpent, saveSnapshot]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="CombienÇaCoûte — Le vrai prix de tes abonnements Netflix, Spotify, Disney+"
        description="Netflix, Spotify, Disney+ : découvre combien tes abonnements te coûtent vraiment sur 1, 3, 5 ou 10 ans. Comparateur gratuit et sans inscription."
        canonical="https://combien-ca-coute.fr/"
        structuredData={homeStructuredData}
      />
      
      <Navbar />
      
      <main className="flex-1" role="main">
        <Hero />
        
        {/* Personal Dashboard Section */}
        <section className="py-8" aria-label="Tableau de bord personnel">
          <div className="container space-y-6">
            <RecentHistory />
            <Suggestions />
            
            {/* Duplicate Detection */}
            {Object.keys(selectedPlans).length > 1 && (
              <DuplicateDetector selectedPlans={selectedPlans} />
            )}
            
            {/* Summary Widget */}
            {Object.keys(selectedPlans).length > 0 && (
              <SummaryWidget selectedPlans={selectedPlans} duration={duration} />
            )}
            
            {/* Smart Insights */}
            {Object.keys(selectedPlans).length > 0 && (
              <SmartInsights selectedPlans={selectedPlans} totalMonthly={totalSpent} />
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetTracker totalSpent={totalSpent} />
              <SavingsGoals />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RenewalCalendar />
              <ActivityLog />
            </div>
            
            <SpendingEvolution />
            
            <PersonalStats selectedPlans={selectedPlans} duration={duration} />
          </div>
        </section>

        <ComparisonSection />
        <Statistics />
        <CustomCalculator />
        <SavingTips />
        <FaqSection />
        
        {/* Section des avis */}
        <section className="py-12 md:py-20" aria-label="Avis des utilisateurs">
          <div className="container">
            <AppReviews 
              appId="subscription-comparator" 
              appName="Comparateur d'Abonnements"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
