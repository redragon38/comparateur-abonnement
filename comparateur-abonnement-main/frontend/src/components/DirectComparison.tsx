import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscriptions, formatPrice, calculateTotalCost, type DurationOption } from "@/data/subscriptions";
import { Badge } from "@/components/ui/badge";

interface DirectComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  comparedIds: string[];
  duration: DurationOption;
}

const DirectComparison = ({ isOpen, onClose, comparedIds, duration }: DirectComparisonProps) => {
  const comparedSubs = comparedIds
    .map(id => subscriptions.find(s => s.id === id))
    .filter(Boolean);

  if (comparedSubs.length === 0) return null;

  // Trouver le prix le plus bas pour chaque ligne
  const getLowestPrice = (prices: number[]) => Math.min(...prices);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong border-white/10 max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Comparaison directe
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-foreground/60 font-medium">Service</th>
                {comparedSubs.map(sub => (
                  <th key={sub!.id} className="p-3 text-center min-w-[150px]">
                    <div className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: sub!.color + "20" }}
                      >
                        {sub!.logo}
                      </div>
                      <span className="font-bold text-foreground">{sub!.name}</span>
                      <Badge variant="outline">{sub!.category}</Badge>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Prix minimum */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-foreground/80 font-medium">Prix minimum</td>
                {comparedSubs.map(sub => {
                  const minPrice = Math.min(...sub!.plans.map(p => p.monthlyPrice));
                  const allMinPrices = comparedSubs.map(s => 
                    Math.min(...s!.plans.map(p => p.monthlyPrice))
                  );
                  const isLowest = minPrice === getLowestPrice(allMinPrices);
                  
                  return (
                    <td key={sub!.id} className="p-3 text-center">
                      <div className={`${isLowest ? 'text-accent font-bold' : 'text-foreground'}`}>
                        {formatPrice(minPrice)}/mois
                        {isLowest && <Check className="inline-block w-4 h-4 ml-1" />}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Prix maximum */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-foreground/80 font-medium">Prix maximum</td>
                {comparedSubs.map(sub => {
                  const maxPrice = Math.max(...sub!.plans.map(p => p.monthlyPrice));
                  return (
                    <td key={sub!.id} className="p-3 text-center text-foreground">
                      {formatPrice(maxPrice)}/mois
                    </td>
                  );
                })}
              </tr>

              {/* Nombre de formules */}
              <tr className="border-b border-white/10">
                <td className="p-3 text-foreground/80 font-medium">Formules disponibles</td>
                {comparedSubs.map(sub => {
                  const maxPlans = Math.max(...comparedSubs.map(s => s!.plans.length));
                  const hasMaxPlans = sub!.plans.length === maxPlans;
                  
                  return (
                    <td key={sub!.id} className="p-3 text-center">
                      <span className={hasMaxPlans ? 'text-accent font-bold' : 'text-foreground'}>
                        {sub!.plans.length}
                        {hasMaxPlans && <Check className="inline-block w-4 h-4 ml-1" />}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Coût sur la durée sélectionnée (plan le moins cher) */}
              <tr className="border-b border-white/10 bg-white/5">
                <td className="p-3 text-foreground/80 font-medium">
                  Coût minimum sur {duration.label}
                </td>
                {comparedSubs.map(sub => {
                  const minPrice = Math.min(...sub!.plans.map(p => p.monthlyPrice));
                  const totalCost = calculateTotalCost(minPrice, duration.months);
                  const allTotalCosts = comparedSubs.map(s => {
                    const min = Math.min(...s!.plans.map(p => p.monthlyPrice));
                    return calculateTotalCost(min, duration.months);
                  });
                  const isLowest = totalCost === getLowestPrice(allTotalCosts);
                  
                  return (
                    <td key={sub!.id} className="p-3 text-center">
                      <div className={`font-bold ${isLowest ? 'text-accent text-lg' : 'text-foreground'}`}>
                        {formatPrice(totalCost)}
                        {isLowest && <Check className="inline-block w-5 h-5 ml-1" />}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Plans détaillés */}
              <tr>
                <td colSpan={comparedSubs.length + 1} className="p-3">
                  <p className="text-foreground/60 text-sm font-medium mb-2">Plans disponibles</p>
                </td>
              </tr>
              {comparedSubs.map(sub => (
                <tr key={`plans-${sub!.id}`} className="border-b border-white/10">
                  <td className="p-3 text-foreground/80 font-medium align-top">
                    {sub!.name}
                  </td>
                  <td colSpan={comparedSubs.length} className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {sub!.plans.map((plan, idx) => (
                        <div key={idx} className="glass px-3 py-2 rounded-lg">
                          <span className="text-foreground font-medium text-sm">{plan.name}</span>
                          <span className="text-foreground/60 text-sm ml-2">
                            {formatPrice(plan.monthlyPrice)}/mois
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DirectComparison;
