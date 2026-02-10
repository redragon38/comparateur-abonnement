import { useState, useEffect } from 'react';

const NOTES_KEY = 'subscription-notes';

export interface Note {
  subscriptionId: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Record<string, Note>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(NOTES_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (subscriptionId: string, content: string) => {
    const now = Date.now();
    setNotes(prev => ({
      ...prev,
      [subscriptionId]: {
        subscriptionId,
        content,
        createdAt: prev[subscriptionId]?.createdAt || now,
        updatedAt: now
      }
    }));
  };

  const deleteNote = (subscriptionId: string) => {
    setNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[subscriptionId];
      return newNotes;
    });
  };

  const getNote = (subscriptionId: string) => {
    return notes[subscriptionId];
  };

  const hasNote = (subscriptionId: string) => {
    return !!notes[subscriptionId];
  };

  return {
    notes,
    addNote,
    deleteNote,
    getNote,
    hasNote,
    notesCount: Object.keys(notes).length
  };
};
