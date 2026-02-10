import { useMemo } from "react";
import { subscriptions, calculateTotalCost, formatPrice, type DurationOption } from "@/data/subscriptions";

interface ShockBannerProps {
  duration: DurationOption;
  selectedPlans: Record<string, number>;
}

const ShockBanner = ({ duration, selectedPlans }: ShockBannerProps) => {
  const totalAllSubs = useMemo(() => {
    return subscriptions.reduce((acc, sub) => {
      const planIndex = selectedPlans[sub.id] ?? 0;
      return acc + calculateTotalCost(sub.plans[planIndex].monthlyPrice, duration.months);
    }, 0);
  }, [duration, selectedPlans]);

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce((acc, sub) => {
      const planIndex = selectedPlans[sub.id] ?? 0;
      return acc + sub.plans[planIndex].monthlyPrice;
    }, 0);
  }, [selectedPlans]);

  const mostExpensive = useMemo(() => {
    let max = { name: "", cost: 0 };
    subscriptions.forEach((sub) => {
      const planIndex = selectedPlans[sub.id] ?? 0;
      const cost = calculateTotalCost(sub.plans[planIndex].monthlyPrice, duration.months);
      if (cost > max.cost) max = { name: sub.name, cost };
    });
    return max;
  }, [duration, selectedPlans]);

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-semibold text-foreground/50 mb-6 text-center">
        Si tu étais abonné à <span className="text-foreground">tout</span>…
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {/* Monthly total */}
        <div className="glass rounded-2xl p-5 space-y-1">
          <p className="text-xs text-foreground/40 uppercase tracking-wider font-medium">Par mois</p>
          <p className="text-3xl font-bold text-foreground">{formatPrice(monthlyTotal)}</p>
        </div>

        {/* Total over period */}
        <div className="stat-card-shock rounded-2xl p-5 space-y-1 glow-shock">
          <p className="text-xs text-white/70 uppercase tracking-wider font-medium">Sur {duration.label}</p>
          <p className="text-3xl font-bold text-white">{formatPrice(totalAllSubs)}</p>
        </div>

        {/* Most expensive */}
        <div className="stat-card-accent rounded-2xl p-5 space-y-1 glow-accent">
          <p className="text-xs text-white/70 uppercase tracking-wider font-medium">Le plus cher</p>
          <p className="text-xl font-bold text-white">{mostExpensive.name}</p>
          <p className="text-sm text-white/70">{formatPrice(mostExpensive.cost)}</p>
        </div>
      </div>

      {totalAllSubs > 3000 && (
        <p className="text-center mt-6 text-primary font-bold text-sm animate-fade-in">
          🔥 {formatPrice(totalAllSubs)} en {duration.label} — c'est le prix d'une voiture d'occasion !
        </p>
      )}
      {totalAllSubs > 1500 && totalAllSubs <= 3000 && (
        <p className="text-center mt-6 text-primary font-bold text-sm animate-fade-in">
          💸 {formatPrice(totalAllSubs)} en {duration.label} — de quoi partir en vacances !
        </p>
      )}
    </div>
  );
};

export default ShockBanner;
