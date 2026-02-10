import { useState, useEffect } from 'react';

const SPENDING_HISTORY_KEY = 'subscription-spending-history';

export interface SpendingSnapshot {
  id: string;
  timestamp: number;
  date: string; // YYYY-MM format
  totalMonthly: number;
  totalYearly: number;
  subscriptionCount: number;
  subscriptions: Array<{
    id: string;
    name: string;
    monthlyPrice: number;
  }>;
}

export const useSpendingHistory = () => {
  const [spendingHistory, setSpendingHistory] = useState<SpendingSnapshot[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(SPENDING_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(SPENDING_HISTORY_KEY, JSON.stringify(spendingHistory));
  }, [spendingHistory]);

  const saveSnapshot = (
    totalMonthly: number,
    totalYearly: number,
    subscriptionCount: number,
    subscriptions: Array<{ id: string; name: string; monthlyPrice: number }>
  ) => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Check if snapshot for current month already exists
    const existingIndex = spendingHistory.findIndex(s => s.date === date);

    const snapshot: SpendingSnapshot = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      date,
      totalMonthly,
      totalYearly,
      subscriptionCount,
      subscriptions
    };

    if (existingIndex >= 0) {
      // Update existing snapshot
      setSpendingHistory(prev => {
        const updated = [...prev];
        updated[existingIndex] = snapshot;
        return updated;
      });
    } else {
      // Add new snapshot
      setSpendingHistory(prev => [...prev, snapshot]);
    }
  };

  const getLastMonths = (months: number = 6) => {
    return spendingHistory.slice(-months);
  };

  const getEvolution = () => {
    if (spendingHistory.length < 2) return null;

    const latest = spendingHistory[spendingHistory.length - 1];
    const previous = spendingHistory[spendingHistory.length - 2];

    const monthlyChange = latest.totalMonthly - previous.totalMonthly;
    const percentageChange = (monthlyChange / previous.totalMonthly) * 100;

    return {
      monthlyChange,
      percentageChange,
      direction: monthlyChange > 0 ? 'up' : monthlyChange < 0 ? 'down' : 'stable'
    };
  };

  const clearHistory = () => {
    setSpendingHistory([]);
  };

  return {
    spendingHistory,
    saveSnapshot,
    getLastMonths,
    getEvolution,
    clearHistory,
    snapshotsCount: spendingHistory.length
  };
};
