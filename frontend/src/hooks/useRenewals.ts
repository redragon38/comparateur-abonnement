import { useState, useEffect } from 'react';

const RENEWALS_KEY = 'subscription-renewals';

export interface Renewal {
  subscriptionId: string;
  subscriptionName: string;
  nextRenewalDate: string; // ISO date string
  billingCycle: 'monthly' | 'yearly' | 'weekly';
  price: number;
  alertDaysBefore: number; // Days before to alert (default 7)
  autoRenew: boolean;
  createdAt: number;
}

export const useRenewals = () => {
  const [renewals, setRenewals] = useState<Record<string, Renewal>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(RENEWALS_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(RENEWALS_KEY, JSON.stringify(renewals));
  }, [renewals]);

  const addRenewal = (renewal: Omit<Renewal, 'createdAt'>) => {
    setRenewals(prev => ({
      ...prev,
      [renewal.subscriptionId]: {
        ...renewal,
        createdAt: Date.now()
      }
    }));
  };

  const updateRenewal = (subscriptionId: string, updates: Partial<Renewal>) => {
    setRenewals(prev => {
      if (!prev[subscriptionId]) return prev;
      return {
        ...prev,
        [subscriptionId]: {
          ...prev[subscriptionId],
          ...updates
        }
      };
    });
  };

  const deleteRenewal = (subscriptionId: string) => {
    setRenewals(prev => {
      const newRenewals = { ...prev };
      delete newRenewals[subscriptionId];
      return newRenewals;
    });
  };

  const getRenewal = (subscriptionId: string) => {
    return renewals[subscriptionId];
  };

  const getUpcomingRenewals = (daysAhead: number = 30) => {
    const now = Date.now();
    const futureDate = now + (daysAhead * 24 * 60 * 60 * 1000);

    return Object.values(renewals)
      .filter(renewal => {
        const renewalDate = new Date(renewal.nextRenewalDate).getTime();
        return renewalDate >= now && renewalDate <= futureDate;
      })
      .sort((a, b) => 
        new Date(a.nextRenewalDate).getTime() - new Date(b.nextRenewalDate).getTime()
      );
  };

  const getAlertsNeeded = () => {
    const now = Date.now();
    
    return Object.values(renewals)
      .filter(renewal => {
        const renewalDate = new Date(renewal.nextRenewalDate).getTime();
        const alertDate = renewalDate - (renewal.alertDaysBefore * 24 * 60 * 60 * 1000);
        return now >= alertDate && now <= renewalDate;
      });
  };

  return {
    renewals,
    addRenewal,
    updateRenewal,
    deleteRenewal,
    getRenewal,
    getUpcomingRenewals,
    getAlertsNeeded,
    renewalsCount: Object.keys(renewals).length
  };
};
