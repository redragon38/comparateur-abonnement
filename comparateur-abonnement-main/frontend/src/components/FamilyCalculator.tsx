import { useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { formatPrice, calculateTotalCost, type DurationOption } from "@/data/subscriptions";

interface FamilyCalculatorProps {
  selectedPlans: Record<string, number>;
  duration: DurationOption;
}

const FamilyCalculator = ({ selectedPlans, duration }: FamilyCalculatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [familySize, setFamilySize] = useState(2);
  const [sharedServices, setSharedServices] = useState<string[]>([]);

  // Calculate if not available
  if (Object.keys(selectedPlans).length === 0) return null;

  const calculateFamilyCost = () => {
    let totalIndividual = 0;
    let totalShared = 0;

    Object.entries(selectedPlans).forEach(([subId, planIndex]) => {
      const sub = require("@/data/subscriptions").subscriptions.find((s: any) => s.id === subId);
      if (!sub) return;

      const plan = sub.plans[planIndex];
      const cost = calculateTotalCost(plan.monthlyPrice, duration.months);

      if (sharedServices.includes(subId)) {
        totalShared += cost;
      } else {
        totalIndividual += cost * familySize;
      }
    });

    const totalWithoutSharing = Object.values(selectedPlans).reduce((sum, planIndex, idx) => {
      const subId = Object.keys(selectedPlans)[idx];
      const sub = require("@/data/subscriptions").subscriptions.find((s: any) => s.id === subId);
      if (!sub) return sum;
      return sum + calculateTotalCost(sub.plans[planIndex].monthlyPrice, duration.months) * familySize;
    }, 0);

    return {
      individual: totalIndividual,
      shared: totalShared,
      total: totalIndividual + totalShared,
      savings: totalWithoutSharing - (totalIndividual + totalShared),
      perPerson: (totalIndividual + totalShared) / familySize
    };
  };

  const costs = calculateFamilyCost();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="glass border-white/10 hover:glass-strong">
          <Users className="w-4 h-4 mr-2" />
          Calculateur Familial
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-accent" />
            Calculateur Familial
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Family size selector */}
          <div className="space-y-3">
            <Label className="text-foreground">Nombre de personnes dans le foyer</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[familySize]}
                onValueChange={(value) => setFamilySize(value[0])}
                min={1}
                max={10}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={familySize}
                onChange={(e) => setFamilySize(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                className="w-20 glass border-white/10"
                min={1}
                max={10}
              />
            </div>
          </div>

          {/* Services to share */}
          <div className="space-y-3">
            <Label className="text-foreground">Services partagés</Label>
            <div className="glass rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
              {Object.keys(selectedPlans).map(subId => {
                const sub = require("@/data/subscriptions").subscriptions.find((s: any) => s.id === subId);
                if (!sub) return null;

                return (
                  <label key={subId} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={sharedServices.includes(subId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSharedServices([...sharedServices, subId]);
                        } else {
                          setSharedServices(sharedServices.filter(id => id !== subId));
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-2xl">{sub.logo}</span>
                    <span className="text-foreground flex-1">{sub.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div className="glass-strong rounded-xl p-6 space-y-4">
            <h4 className="font-bold text-foreground text-lg mb-4">Résultat</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4">
                <p className="text-foreground/60 text-sm mb-1">Abonnements individuels</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(costs.individual)}</p>
              </div>
              
              <div className="glass rounded-lg p-4">
                <p className="text-foreground/60 text-sm mb-1">Abonnements partagés</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(costs.shared)}</p>
              </div>
            </div>

            <div className="stat-card-shock rounded-xl p-4 text-center">
              <p className="text-white/80 text-sm mb-1">Coût total pour {familySize} personne{familySize > 1 ? 's' : ''}</p>
              <p className="text-3xl font-bold text-white">{formatPrice(costs.total)}</p>
              <p className="text-white/60 text-sm mt-2">
                Soit {formatPrice(costs.perPerson)} par personne
              </p>
            </div>

            {costs.savings > 0 && (
              <motion.div
                className="glass rounded-xl p-4 border-2 border-green-400/30"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <TrendingDown className="w-5 h-5" />
                  <p className="font-bold">Économie : {formatPrice(costs.savings)}</p>
                </div>
                <p className="text-center text-foreground/60 text-sm mt-1">
                  en partageant vs {familySize} abonnements séparés
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyCalculator;
