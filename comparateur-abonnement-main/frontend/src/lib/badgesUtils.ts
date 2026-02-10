import { subscriptions, type Subscription } from "@/data/subscriptions";

export interface Badge {
  label: string;
  color: string;
  icon?: string;
}

export const getBadgesForSubscription = (subscription: Subscription): Badge[] => {
  const badges: Badge[] = [];
  const prices = subscription.plans.map(p => p.monthlyPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  // Prix le plus bas de sa catégorie
  const categorySubscriptions = subscriptions.filter(s => s.category === subscription.category);
  const categoryMinPrices = categorySubscriptions.map(s => 
    Math.min(...s.plans.map(p => p.monthlyPrice))
  );
  const categoryLowestPrice = Math.min(...categoryMinPrices);

  if (minPrice === categoryLowestPrice) {
    badges.push({ label: '💰 Meilleur prix', color: 'bg-green-500/20 text-green-400 border-green-400/30' });
  }

  // Bon rapport qualité/prix (prix < moyenne)
  const allMinPrices = subscriptions.map(s => Math.min(...s.plans.map(p => p.monthlyPrice)));
  const globalAvg = allMinPrices.reduce((a, b) => a + b, 0) / allMinPrices.length;

  if (minPrice < globalAvg * 0.7) {
    badges.push({ label: '⭐ Excellent rapport', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' });
  }

  // Beaucoup de formules
  if (subscription.plans.length >= 3) {
    badges.push({ label: '🎯 Choix variés', color: 'bg-blue-500/20 text-blue-400 border-blue-400/30' });
  }

  // Streaming populaire
  const popularServices = ['netflix', 'spotify', 'disney-plus', 'youtube-premium', 'amazon-prime'];
  if (popularServices.includes(subscription.id)) {
    badges.push({ label: '🔥 Populaire', color: 'bg-orange-500/20 text-orange-400 border-orange-400/30' });
  }

  // Gratuit ou très bon marché
  if (minPrice === 0) {
    badges.push({ label: '🎁 Gratuit', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' });
  } else if (minPrice < 3) {
    badges.push({ label: '💸 Petit prix', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30' });
  }

  return badges.slice(0, 2); // Max 2 badges per card
};

export const calculateValueScore = (subscription: Subscription): number => {
  const prices = subscription.plans.map(p => p.monthlyPrice);
  const minPrice = Math.min(...prices);
  const plansCount = subscription.plans.length;

  // Score based on:
  // - Lower price = higher score
  // - More plans = higher score
  // - Popular category = slight bonus

  let score = 5.0; // Start at max

  // Price factor (0-50€ range)
  const priceFactor = Math.max(0, (50 - minPrice) / 50);
  score *= priceFactor;

  // Plans variety bonus (max +1 point)
  const plansBonus = Math.min(plansCount / 5, 1);
  score += plansBonus;

  // Popular category bonus
  const popularCategories = ['Streaming vidéo', 'Musique', 'Jeux vidéo'];
  if (popularCategories.includes(subscription.category)) {
    score += 0.5;
  }

  return Math.min(Math.max(score, 1), 5); // Keep between 1-5
};
