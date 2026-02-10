import { motion } from "framer-motion";
import { Wallet, Settings, AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { useBudget } from "@/hooks/useBudget";
import { useState } from "react";
import { formatPrice } from "@/data/subscriptions";
import { Alert, AlertDescription } from "./ui/alert";

interface BudgetTrackerProps {
  totalSpent: number;
}

const BudgetTracker = ({ totalSpent }: BudgetTrackerProps) => {
  const { budget, updateBudget, calculateUsage } = useBudget();
  const [isOpen, setIsOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget.monthly.toString());
  const [tempThreshold, setTempThreshold] = useState(budget.alertThreshold);

  const usage = calculateUsage(totalSpent);

  const handleSave = () => {
    updateBudget({
      monthly: parseFloat(tempBudget) || 0,
      alertThreshold: tempThreshold
    });
    setIsOpen(false);
  };

  if (!budget.enabled && !isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="glass border-white/10 hover:glass-strong">
            <Wallet className="w-4 h-4 mr-2" />
            Définir un budget
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-strong border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-accent" />
              Configuration du budget
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="budget-amount">Budget mensuel (€)</Label>
              <Input
                id="budget-amount"
                type="number"
                placeholder="100"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                className="glass border-white/10"
              />
            </div>

            <div className="space-y-3">
              <Label>Seuil d'alerte: {tempThreshold}%</Label>
              <Slider
                value={[tempThreshold]}
                onValueChange={(value) => setTempThreshold(value[0])}
                min={50}
                max={100}
                step={5}
              />
              <p className="text-xs text-foreground/60">
                Vous serez alerté quand {tempThreshold}% du budget est atteint
              </p>
            </div>

            <div className="flex items-center justify-between glass rounded-lg p-3">
              <Label htmlFor="budget-enabled" className="cursor-pointer">
                Activer le suivi de budget
              </Label>
              <Switch
                id="budget-enabled"
                checked={budget.enabled}
                onCheckedChange={(checked) => updateBudget({ enabled: checked })}
              />
            </div>

            <Button onClick={handleSave} className="w-full stat-card-shock text-white">
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!usage) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Budget mensuel</h3>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground/60 hover:text-foreground">
              <Settings className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/10">
            <DialogHeader>
              <DialogTitle>Configuration du budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="budget-amount">Budget mensuel (€)</Label>
                <Input
                  id="budget-amount"
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                  className="glass border-white/10"
                />
              </div>

              <div className="space-y-3">
                <Label>Seuil d'alerte: {tempThreshold}%</Label>
                <Slider
                  value={[tempThreshold]}
                  onValueChange={(value) => setTempThreshold(value[0])}
                  min={50}
                  max={100}
                  step={5}
                />
              </div>

              <div className="flex items-center justify-between glass rounded-lg p-3">
                <Label htmlFor="budget-enabled-edit">Activer le suivi</Label>
                <Switch
                  id="budget-enabled-edit"
                  checked={budget.enabled}
                  onCheckedChange={(checked) => updateBudget({ enabled: checked })}
                />
              </div>

              <Button onClick={handleSave} className="w-full stat-card-shock text-white">
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {usage.isOverBudget && (
        <Alert className="mb-4 border-red-400/30 bg-red-400/10">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            Vous avez dépassé votre budget de {formatPrice(Math.abs(usage.remaining))} !
          </AlertDescription>
        </Alert>
      )}

      {usage.isNearThreshold && (
        <Alert className="mb-4 border-yellow-400/30 bg-yellow-400/10">
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-400">
            Attention : {usage.percentage.toFixed(0)}% de votre budget est utilisé
          </AlertDescription>
        </Alert>
      )}

      {/* Budget visualization */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <p className="text-foreground/60 text-sm mb-1">Dépensé</p>
            <p className="text-2xl font-bold text-foreground">{formatPrice(usage.spent)}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-foreground/60 text-sm mb-1">
              {usage.isOverBudget ? 'Dépassement' : 'Restant'}
            </p>
            <p className={`text-2xl font-bold ${usage.isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
              {formatPrice(Math.abs(usage.remaining))}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground/60">Progression</span>
            <span className="font-medium text-foreground">{usage.percentage.toFixed(0)}%</span>
          </div>
          <Progress 
            value={usage.percentage} 
            className={`h-3 ${usage.isOverBudget ? '[&>div]:bg-red-400' : usage.isNearThreshold ? '[&>div]:bg-yellow-400' : ''}`}
          />
        </div>

        {!usage.isOverBudget && usage.remaining > 0 && (
          <div className="flex items-center gap-2 text-sm text-green-400 glass rounded-lg p-3">
            <TrendingDown className="w-4 h-4" />
            <span>Super ! Il vous reste {formatPrice(usage.remaining)} ce mois-ci</span>
          </div>
        )}

        {usage.isOverBudget && (
          <div className="flex items-center gap-2 text-sm text-red-400 glass rounded-lg p-3">
            <TrendingUp className="w-4 h-4" />
            <span>Réduisez vos abonnements pour respecter votre budget</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetTracker;
