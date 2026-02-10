import { useState, useEffect } from 'react';

const BUDGET_KEY = 'subscription-budget';

export interface Budget {
  monthly: number;
  alertThreshold: number; // Percentage (0-100)
  enabled: boolean;
}

export const useBudget = () => {
  const [budget, setBudget] = useState<Budget>(() => {
    if (typeof window === 'undefined') {
      return { monthly: 0, alertThreshold: 80, enabled: false };
    }
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? JSON.parse(saved) : { monthly: 0, alertThreshold: 80, enabled: false };
  });

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  }, [budget]);

  const updateBudget = (newBudget: Partial<Budget>) => {
    setBudget(prev => ({ ...prev, ...newBudget }));
  };

  const calculateUsage = (totalSpent: number) => {
    if (!budget.enabled || budget.monthly === 0) return null;
    
    const percentage = (totalSpent / budget.monthly) * 100;
    const remaining = budget.monthly - totalSpent;
    const isOverBudget = totalSpent > budget.monthly;
    const isNearThreshold = percentage >= budget.alertThreshold && !isOverBudget;

    return {
      percentage: Math.min(percentage, 100),
      remaining,
      spent: totalSpent,
      isOverBudget,
      isNearThreshold,
      budgetLimit: budget.monthly
    };
  };

  return {
    budget,
    updateBudget,
    calculateUsage
  };
};
