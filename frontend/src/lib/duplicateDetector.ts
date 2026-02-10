import { subscriptions } from "@/data/subscriptions";

export const detectDuplicates = (selectedPlans: Record<string, number>) => {
  const duplicates: Array<{
    subscription1: { id: string; name: string };
    subscription2: { id: string; name: string };
    reason: string;
  }> = [];

  const selectedIds = Object.keys(selectedPlans);
  
  // Check for exact name matches
  for (let i = 0; i < selectedIds.length; i++) {
    for (let j = i + 1; j < selectedIds.length; j++) {
      const sub1 = subscriptions.find(s => s.id === selectedIds[i]);
      const sub2 = subscriptions.find(s => s.id === selectedIds[j]);

      if (!sub1 || !sub2) continue;

      // Exact name match
      if (sub1.name.toLowerCase() === sub2.name.toLowerCase()) {
        duplicates.push({
          subscription1: { id: sub1.id, name: sub1.name },
          subscription2: { id: sub2.id, name: sub2.name },
          reason: 'Nom identique'
        });
      }

      // Similar category and type (e.g., two streaming services)
      if (sub1.category === sub2.category && 
          ['Streaming vidéo', 'Musique', 'Jeux vidéo'].includes(sub1.category)) {
        // Check if names are similar
        const name1 = sub1.name.toLowerCase();
        const name2 = sub2.name.toLowerCase();
        
        if (name1.includes(name2) || name2.includes(name1)) {
          duplicates.push({
            subscription1: { id: sub1.id, name: sub1.name },
            subscription2: { id: sub2.id, name: sub2.name },
            reason: 'Noms similaires dans la même catégorie'
          });
        }
      }
    }
  }

  return duplicates;
};

export const getRecommendationsForDuplicates = (duplicates: ReturnType<typeof detectDuplicates>) => {
  return duplicates.map(dup => {
    const sub1 = subscriptions.find(s => s.id === dup.subscription1.id);
    const sub2 = subscriptions.find(s => s.id === dup.subscription2.id);

    if (!sub1 || !sub2) return null;

    const minPrice1 = Math.min(...sub1.plans.map(p => p.monthlyPrice));
    const minPrice2 = Math.min(...sub2.plans.map(p => p.monthlyPrice));

    return {
      ...dup,
      recommendation: minPrice1 < minPrice2 
        ? `Privilégiez ${sub1.name} (${minPrice1.toFixed(2)}€/mois)`
        : `Privilégiez ${sub2.name} (${minPrice2.toFixed(2)}€/mois)`,
      savings: Math.abs(minPrice1 - minPrice2)
    };
  }).filter(Boolean);
};
