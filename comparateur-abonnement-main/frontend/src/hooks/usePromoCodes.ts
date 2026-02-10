import { useState } from 'react';

const PROMO_CODES_KEY = 'subscription-promo-codes';

export interface PromoCode {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  code: string;
  description: string;
  discount: string;
  expiryDate?: string;
  isActive: boolean;
  createdAt: number;
}

export const usePromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(PROMO_CODES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const addPromoCode = (
    subscriptionId: string,
    subscriptionName: string,
    code: string,
    description: string,
    discount: string,
    expiryDate?: string
  ) => {
    const newPromo: PromoCode = {
      id: Date.now().toString(),
      subscriptionId,
      subscriptionName,
      code,
      description,
      discount,
      expiryDate,
      isActive: true,
      createdAt: Date.now()
    };

    setPromoCodes(prev => {
      const updated = [...prev, newPromo];
      localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes(prev => {
      const updated = prev.map(p => 
        p.id === id ? { ...p, isActive: !p.isActive } : p
      );
      localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getActivePromoCodes = () => {
    return promoCodes.filter(p => p.isActive && (!p.expiryDate || new Date(p.expiryDate) > new Date()));
  };

  const getPromoCodesForSubscription = (subscriptionId: string) => {
    return promoCodes.filter(p => p.subscriptionId === subscriptionId);
  };

  return {
    promoCodes,
    addPromoCode,
    deletePromoCode,
    togglePromoCode,
    getActivePromoCodes,
    getPromoCodesForSubscription,
    promoCodesCount: promoCodes.length
  };
};
