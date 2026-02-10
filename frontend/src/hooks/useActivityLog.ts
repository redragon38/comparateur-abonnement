import { useState, useEffect } from 'react';

const ACTIVITY_LOG_KEY = 'subscription-activity-log';

export interface ActivityLogEntry {
  id: string;
  timestamp: number;
  action: 'add' | 'remove' | 'modify' | 'favorite' | 'unfavorite' | 'note' | 'budget' | 'goal' | 'tag' | 'renewal';
  subscriptionId?: string;
  subscriptionName?: string;
  details: string;
  previousValue?: any;
  newValue?: any;
}

export const useActivityLog = () => {
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(ACTIVITY_LOG_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Keep only last 100 entries
    const trimmed = activityLog.slice(-100);
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(trimmed));
  }, [activityLog]);

  const logActivity = (
    action: ActivityLogEntry['action'],
    details: string,
    subscriptionId?: string,
    subscriptionName?: string,
    previousValue?: any,
    newValue?: any
  ) => {
    const entry: ActivityLogEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      action,
      subscriptionId,
      subscriptionName,
      details,
      previousValue,
      newValue
    };

    setActivityLog(prev => [...prev, entry]);
  };

  const clearActivityLog = () => {
    setActivityLog([]);
  };

  const getRecentActivity = (days: number = 7) => {
    const cutoffDate = Date.now() - (days * 24 * 60 * 60 * 1000);
    return activityLog.filter(entry => entry.timestamp >= cutoffDate);
  };

  const getActivityBySubscription = (subscriptionId: string) => {
    return activityLog.filter(entry => entry.subscriptionId === subscriptionId);
  };

  return {
    activityLog,
    logActivity,
    clearActivityLog,
    getRecentActivity,
    getActivityBySubscription,
    activityCount: activityLog.length
  };
};
