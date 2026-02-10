import { useState, useEffect } from 'react';

const HISTORY_KEY = 'subscription-history';
const MAX_HISTORY_ITEMS = 10;

export interface HistoryItem {
  id: string;
  name: string;
  logo: string;
  timestamp: number;
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(h => h.id !== item.id);
      
      // Add to beginning
      const newHistory = [
        { ...item, timestamp: Date.now() },
        ...filtered
      ];

      // Keep only MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};
