import { useMemo } from "react";
import { subscriptions, calculateTotalCost, formatPrice, type DurationOption } from "@/data/subscriptions";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShockBannerProps {
  duration: DurationOption;
  selectedPlans: Record<string, number>;
}

const ShockBanner = ({ duration, selectedPlans }: ShockBannerProps) => {
  const { t, language } = useLanguage();

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

  const getDurationLabel = () => {
    if (language === 'en') {
      if (duration.months === 12) return '1 year';
      if (duration.months === 36) return '3 years';
      if (duration.months === 60) return '5 years';
      if (duration.months === 120) return '10 years';
    }
    return duration.label;
  };

  return (
    <div className="glass-strong rounded-2xl p-6 md:p-8">
      <h3 className="text-base font-semibold text-foreground/50 mb-6 text-center">
        {t('shock.ifSubscribed')} <span className="text-foreground">{t('shock.all')}</span>…
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {/* Monthly total */}
        <div className="glass rounded-2xl p-5 space-y-1">
          <p className="text-xs text-foreground/40 uppercase tracking-wider font-medium">{t('shock.perMonth')}</p>
          <p className="text-3xl font-bold text-foreground">{formatPrice(monthlyTotal)}</p>
        </div>

        {/* Total over period */}
        <div className="stat-card-shock rounded-2xl p-5 space-y-1 glow-shock">
          <p className="text-xs text-white/70 uppercase tracking-wider font-medium">{t('shock.over')} {getDurationLabel()}</p>
          <p className="text-3xl font-bold text-white">{formatPrice(totalAllSubs)}</p>
        </div>

        {/* Most expensive */}
        <div className="stat-card-accent rounded-2xl p-5 space-y-1 glow-accent">
          <p className="text-xs text-white/70 uppercase tracking-wider font-medium">{t('shock.mostExpensive')}</p>
          <p className="text-xl font-bold text-white">{mostExpensive.name}</p>
          <p className="text-sm text-white/70">{formatPrice(mostExpensive.cost)}</p>
        </div>
      </div>

      {totalAllSubs > 3000 && (
        <p className="text-center mt-6 text-primary font-bold text-sm animate-fade-in">
          🔥 {formatPrice(totalAllSubs)} {language === 'fr' ? 'en' : 'in'} {getDurationLabel()} — {t('shock.carPrice')}
        </p>
      )}
      {totalAllSubs > 1500 && totalAllSubs <= 3000 && (
        <p className="text-center mt-6 text-primary font-bold text-sm animate-fade-in">
          💸 {formatPrice(totalAllSubs)} {language === 'fr' ? 'en' : 'in'} {getDurationLabel()} — {t('shock.vacation')}
        </p>
      )}
    </div>
  );
};

export default ShockBanner;
