import { useState, useEffect } from 'react';

const GOALS_KEY = 'subscription-goals';

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string; // ISO date string
  createdAt: number;
  completed: boolean;
}

export const useSavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(GOALS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = (title: string, targetAmount: number, deadline?: string) => {
    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      title,
      targetAmount,
      currentAmount: 0,
      deadline,
      createdAt: Date.now(),
      completed: false
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoalProgress = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.max(0, amount);
        return {
          ...goal,
          currentAmount: newAmount,
          completed: newAmount >= goal.targetAmount
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
  };

  const completeGoal = (goalId: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));
  };

  return {
    goals,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    completeGoal,
    activeGoals: goals.filter(g => !g.completed),
    completedGoals: goals.filter(g => g.completed)
  };
};
