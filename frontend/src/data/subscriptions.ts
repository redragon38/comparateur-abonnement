import subscriptionsData from './subscriptions.json';

export interface Subscription {
  id: string;
  name: string;
  logo: string;
  color: string;
  plans: Plan[];
  category: string;
  description?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  devices?: string[];
  videoQuality?: string[];
  simultaneousStreams?: number[];
  website?: string;
  founded?: string;
  headquarters?: string;
}

export interface Plan {
  name: string;
  monthlyPrice: number;
  features?: string[];
  videoQuality?: string;
  simultaneousStreams?: number;
  downloads?: boolean;
}

export type DurationOption = {
  label: string;
  months: number;
  value: string;
};

// Import des données depuis le JSON
export const subscriptions: Subscription[] = subscriptionsData.subscriptions;
export const durationOptions: DurationOption[] = subscriptionsData.durationOptions;

// Fonctions utilitaires
export function calculateTotalCost(monthlyPrice: number, months: number): number {
  return Math.round(monthlyPrice * months * 100) / 100;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getShockMessage(name: string, totalCost: number, duration: string): string {
  if (totalCost > 2000) return `${name} te coûte plus de ${formatPrice(totalCost)} sur ${duration}. C'est le prix d'un voyage !`;
  if (totalCost > 1000) return `${name} te coûte plus de ${formatPrice(totalCost)} sur ${duration}. Surpris ?`;
  if (totalCost > 500) return `${name} : ${formatPrice(totalCost)} partis en ${duration}. Tu le savais ?`;
  return `${name} = ${formatPrice(totalCost)} sur ${duration}`;
}
