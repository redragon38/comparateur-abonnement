import { useState, useEffect } from 'react';

const TAGS_KEY = 'subscription-tags';

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

export interface SubscriptionTags {
  [subscriptionId: string]: string[]; // Array of tag IDs
}

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(TAGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [subscriptionTags, setSubscriptionTags] = useState<SubscriptionTags>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('subscription-tags-mapping');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('subscription-tags-mapping', JSON.stringify(subscriptionTags));
  }, [subscriptionTags]);

  const createTag = (name: string, color: string) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      createdAt: Date.now()
    };
    setTags(prev => [...prev, newTag]);
    return newTag;
  };

  const deleteTag = (tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
    // Remove tag from all subscriptions
    setSubscriptionTags(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(subId => {
        updated[subId] = updated[subId].filter(id => id !== tagId);
      });
      return updated;
    });
  };

  const addTagToSubscription = (subscriptionId: string, tagId: string) => {
    setSubscriptionTags(prev => ({
      ...prev,
      [subscriptionId]: [...(prev[subscriptionId] || []), tagId]
    }));
  };

  const removeTagFromSubscription = (subscriptionId: string, tagId: string) => {
    setSubscriptionTags(prev => ({
      ...prev,
      [subscriptionId]: (prev[subscriptionId] || []).filter(id => id !== tagId)
    }));
  };

  const getSubscriptionTags = (subscriptionId: string): Tag[] => {
    const tagIds = subscriptionTags[subscriptionId] || [];
    return tags.filter(tag => tagIds.includes(tag.id));
  };

  const getSubscriptionsWithTag = (tagId: string): string[] => {
    return Object.entries(subscriptionTags)
      .filter(([, tagIds]) => tagIds.includes(tagId))
      .map(([subId]) => subId);
  };

  return {
    tags,
    subscriptionTags,
    createTag,
    deleteTag,
    addTagToSubscription,
    removeTagFromSubscription,
    getSubscriptionTags,
    getSubscriptionsWithTag,
    tagsCount: tags.length
  };
};
