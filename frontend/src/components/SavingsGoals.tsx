import { motion } from "framer-motion";
import { PiggyBank, Plus, Trash2, TrendingUp, Calendar, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { useSavingsGoals } from "@/hooks/useSavingsGoals";
import { useState } from "react";
import { formatPrice } from "@/data/subscriptions";
import { Badge } from "./ui/badge";

const SavingsGoals = () => {
  const { goals, addGoal, updateGoalProgress, deleteGoal, completeGoal, activeGoals, completedGoals } = useSavingsGoals();
  const [isOpen, setIsOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDeadline, setNewGoalDeadline] = useState("");

  const handleAddGoal = () => {
    if (newGoalTitle && newGoalTarget) {
      addGoal(newGoalTitle, parseFloat(newGoalTarget), newGoalDeadline || undefined);
      setNewGoalTitle("");
      setNewGoalTarget("");
      setNewGoalDeadline("");
    }
  };

  const getDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (goals.length === 0) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Objectifs d'économie</h3>
          <Badge variant="outline">{activeGoals.length} actifs</Badge>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel objectif
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/10">
            <DialogHeader>
              <DialogTitle>Créer un objectif d'économie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal-title">Titre</Label>
                <Input
                  id="goal-title"
                  placeholder="Ex: Économiser pour les vacances"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="glass border-white/10 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="goal-target">Montant cible (€)</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="500"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="glass border-white/10 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="goal-deadline">Date limite (optionnel)</Label>
                <Input
                  id="goal-deadline"
                  type="date"
                  value={newGoalDeadline}
                  onChange={(e) => setNewGoalDeadline(e.target.value)}
                  className="glass border-white/10 mt-1"
                />
              </div>
              <Button onClick={handleAddGoal} className="w-full stat-card-shock text-white">
                Créer l'objectif
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Goals */}
      <div className="space-y-4">
        {activeGoals.map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isOverdue = daysRemaining !== null && daysRemaining < 0;

          return (
            <motion.div
              key={goal.id}
              className="glass rounded-xl p-4 space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{goal.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-foreground/60">
                      {formatPrice(goal.currentAmount)} / {formatPrice(goal.targetAmount)}
                    </span>
                    {daysRemaining !== null && (
                      <Badge variant="outline" className={isOverdue ? 'border-red-400/30 text-red-400' : ''}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {isOverdue ? `${Math.abs(daysRemaining)}j de retard` : `${daysRemaining}j restants`}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  {progress >= 100 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => completeGoal(goal.id)}
                      className="text-green-400 hover:bg-green-400/10"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="text-foreground/40 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={Math.min(progress, 100)} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/60">{progress.toFixed(0)}% atteint</span>
                  <span className="text-accent font-medium">
                    {formatPrice(goal.targetAmount - goal.currentAmount)} restants
                  </span>
                </div>
              </div>

              {progress < 100 && (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Ajouter..."
                    className="glass border-white/10 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget;
                        const amount = parseFloat(input.value);
                        if (amount > 0) {
                          updateGoalProgress(goal.id, goal.currentAmount + amount);
                          input.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border-white/10"
                    onClick={(e) => {
                      const input = e.currentTarget.previousSibling as HTMLInputElement;
                      const amount = parseFloat(input.value);
                      if (amount > 0) {
                        updateGoalProgress(goal.id, goal.currentAmount + amount);
                        input.value = '';
                      }
                    }}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-foreground/60 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Objectifs complétés ({completedGoals.length})
            </p>
            <div className="space-y-2">
              {completedGoals.map(goal => (
                <div key={goal.id} className="glass rounded-lg p-3 flex items-center justify-between opacity-60">
                  <span className="text-sm text-foreground line-through">{goal.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteGoal(goal.id)}
                    className="h-6 w-6 text-foreground/40 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SavingsGoals;
