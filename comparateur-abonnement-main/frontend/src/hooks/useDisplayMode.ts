import { useState } from 'react';

const VIEW_MODE_KEY = 'display-mode';

export type DisplayMode = 'normal' | 'compact' | 'comfortable';

export const useDisplayMode = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => {
    if (typeof window === 'undefined') return 'normal';
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    return (saved as DisplayMode) || 'normal';
  });

  const changeDisplayMode = (mode: DisplayMode) => {
    setDisplayMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
  };

  const getCardClassName = () => {
    switch (displayMode) {
      case 'compact':
        return 'p-3 gap-2';
      case 'comfortable':
        return 'p-6 gap-4';
      default:
        return 'p-4 gap-3';
    }
  };

  const getTextSize = () => {
    switch (displayMode) {
      case 'compact':
        return { title: 'text-sm', subtitle: 'text-xs', price: 'text-lg' };
      case 'comfortable':
        return { title: 'text-lg', subtitle: 'text-sm', price: 'text-3xl' };
      default:
        return { title: 'text-base', subtitle: 'text-xs', price: 'text-2xl' };
    }
  };

  return {
    displayMode,
    changeDisplayMode,
    getCardClassName,
    getTextSize
  };
};
