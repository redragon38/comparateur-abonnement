import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Clock, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { subscriptions, formatPrice } from "@/data/subscriptions";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface ROICalculatorProps {
  selectedPlans: Record<string, number>;
}

const ROICalculator = ({ selectedPlans }: ROICalculatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState<Record<string, string>>({});

  if (Object.keys(selectedPlans).length === 0) return null;

  const calculateROI = (subscriptionId: string, planIndex: number) => {
    const sub = subscriptions.find(s => s.id === subscriptionId);
    if (!sub) return null;

    const hours = parseFloat(hoursPerWeek[subscriptionId] || '0');
    if (hours === 0) return null;

    const monthlyPrice = sub.plans[planIndex].monthlyPrice;
    const monthlyHours = hours * 4.33; // Average weeks per month
    const costPerHour = monthlyPrice / monthlyHours;
    const yearlyTotal = monthlyPrice * 12;
    const yearlyHours = hours * 52;

    return {
      name: sub.name,
      monthlyPrice,
      monthlyHours,
      costPerHour,
      yearlyTotal,
      yearlyHours,
      isGoodValue: costPerHour < 3 // Less than 3€/hour is good value
    };
  };

  const allROIs = Object.entries(selectedPlans)
    .map(([subId, planIndex]) => calculateROI(subId, planIndex))
    .filter(Boolean);

  const totalMonthly = Object.entries(selectedPlans).reduce((sum, [subId, planIndex]) => {
    const sub = subscriptions.find(s => s.id === subId);
    return sum + (sub ? sub.plans[planIndex].monthlyPrice : 0);
  }, 0);

  const totalHours = allROIs.reduce((sum, roi) => sum + (roi!.monthlyHours || 0), 0);
  const avgCostPerHour = totalHours > 0 ? totalMonthly / totalHours : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
          <Calculator className="w-4 h-4 mr-2" />
          Calculer ROI
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10 max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Calculateur de Retour sur Investissement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-foreground/70">
            Estimez combien vous coûte chaque heure d'utilisation de vos abonnements
          </p>

          {/* Global stats if data available */}
          {allROIs.length > 0 && totalHours > 0 && (
            <div className="stat-card-shock rounded-xl p-6 text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white/70 text-sm mb-1">Coût moyen/heure</p>
                  <p className="text-2xl font-bold">{formatPrice(avgCostPerHour)}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Heures mensuelles</p>
                  <p className="text-2xl font-bold">{totalHours.toFixed(0)}h</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm mb-1">Coût total</p>
                  <p className="text-2xl font-bold">{formatPrice(totalMonthly)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Individual services */}
          <div className="space-y-4">
            {Object.entries(selectedPlans).map(([subId, planIndex], index) => {
              const sub = subscriptions.find(s => s.id === subId);
              if (!sub) return null;

              const roi = calculateROI(subId, planIndex);
              const hours = hoursPerWeek[subId] || '';

              return (
                <motion.div
                  key={subId}
                  className="glass rounded-xl p-4 space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sub.logo}</span>
                      <div>
                        <h4 className="font-bold text-foreground">{sub.name}</h4>
                        <p className="text-sm text-foreground/60">
                          {formatPrice(sub.plans[planIndex].monthlyPrice)}/mois
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Heures d'utilisation par semaine</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-foreground/40" />
                      <Input
                        type="number"
                        placeholder="10"
                        value={hours}
                        onChange={(e) => setHoursPerWeek({ ...hoursPerWeek, [subId]: e.target.value })}
                        className="glass border-white/10"
                        min="0"
                        step="0.5"
                      />
                      <span className="text-sm text-foreground/60">h/semaine</span>
                    </div>
                  </div>

                  {roi && (
                    <motion.div
                      className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="glass-strong rounded-lg p-3">
                        <p className="text-xs text-foreground/60 mb-1">Coût par heure</p>
                        <p className="text-lg font-bold text-foreground flex items-center gap-2">
                          {formatPrice(roi.costPerHour)}
                          {roi.isGoodValue && (
                            <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-xs">
                              ✓ Bon rapport
                            </Badge>
                          )}
                        </p>
                      </div>
                      <div className="glass-strong rounded-lg p-3">
                        <p className="text-xs text-foreground/60 mb-1">Heures/mois</p>
                        <p className="text-lg font-bold text-foreground">
                          {roi.monthlyHours.toFixed(1)}h
                        </p>
                      </div>
                      <div className="glass-strong rounded-lg p-3">
                        <p className="text-xs text-foreground/60 mb-1">Coût annuel</p>
                        <p className="text-sm font-bold text-foreground">
                          {formatPrice(roi.yearlyTotal)}
                        </p>
                      </div>
                      <div className="glass-strong rounded-lg p-3">
                        <p className="text-xs text-foreground/60 mb-1">Heures/an</p>
                        <p className="text-sm font-bold text-foreground">
                          {roi.yearlyHours.toFixed(0)}h
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="glass rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-accent" />
              Conseils d'optimisation
            </h4>
            <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
              <li>Un bon rapport qualité-prix : moins de 3€/heure</li>
              <li>Si vous utilisez peu un service, envisagez de le supprimer</li>
              <li>Partagez vos abonnements en famille pour réduire le coût par personne</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ROICalculator;
