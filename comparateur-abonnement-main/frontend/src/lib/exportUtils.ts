import { subscriptions, type DurationOption, calculateTotalCost, formatPrice } from "@/data/subscriptions";

export interface ExportData {
  subscriptionId: string;
  subscriptionName: string;
  planName: string;
  monthlyPrice: number;
  totalCost: number;
  category: string;
}

export const exportToCSV = (
  selectedPlans: Record<string, number>,
  duration: DurationOption
) => {
  const data: ExportData[] = [];

  Object.entries(selectedPlans).forEach(([subId, planIndex]) => {
    const subscription = subscriptions.find(s => s.id === subId);
    if (!subscription) return;

    const plan = subscription.plans[planIndex];
    const totalCost = calculateTotalCost(plan.monthlyPrice, duration.months);

    data.push({
      subscriptionId: subId,
      subscriptionName: subscription.name,
      planName: plan.name,
      monthlyPrice: plan.monthlyPrice,
      totalCost,
      category: subscription.category
    });
  });

  // Créer le CSV
  const headers = ['Service', 'Formule', 'Prix mensuel', `Total ${duration.label}`, 'Catégorie'];
  const rows = data.map(item => [
    item.subscriptionName,
    item.planName,
    `${item.monthlyPrice.toFixed(2)}€`,
    `${item.totalCost.toFixed(2)}€`,
    item.category
  ]);

  // Calculer le total
  const grandTotal = data.reduce((sum, item) => sum + item.totalCost, 0);
  rows.push(['', '', '', `TOTAL: ${grandTotal.toFixed(2)}€`, '']);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Télécharger
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `mes-abonnements-${duration.label}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const shareSelection = (
  selectedPlans: Record<string, number>,
  duration: DurationOption
) => {
  const data: ExportData[] = [];
  
  Object.entries(selectedPlans).forEach(([subId, planIndex]) => {
    const subscription = subscriptions.find(s => s.id === subId);
    if (!subscription) return;

    const plan = subscription.plans[planIndex];
    const totalCost = calculateTotalCost(plan.monthlyPrice, duration.months);

    data.push({
      subscriptionId: subId,
      subscriptionName: subscription.name,
      planName: plan.name,
      monthlyPrice: plan.monthlyPrice,
      totalCost,
      category: subscription.category
    });
  });

  const grandTotal = data.reduce((sum, item) => sum + item.totalCost, 0);
  
  const text = `Mes abonnements (${duration.label}) :\n\n` +
    data.map(item => 
      `${item.subscriptionName} - ${item.planName}: ${formatPrice(item.totalCost)}`
    ).join('\n') +
    `\n\nTOTAL: ${formatPrice(grandTotal)}`;

  if (navigator.share) {
    navigator.share({
      title: 'Mes abonnements',
      text: text
    }).catch(() => {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
    });
  } else {
    navigator.clipboard.writeText(text);
  }
};
