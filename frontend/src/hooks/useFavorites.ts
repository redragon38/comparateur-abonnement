import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'subscription-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (subscriptionId: string) => {
    setFavorites(prev => 
      prev.includes(subscriptionId)
        ? prev.filter(id => id !== subscriptionId)
        : [...prev, subscriptionId]
    );
  };

  const isFavorite = (subscriptionId: string) => {
    return favorites.includes(subscriptionId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};
