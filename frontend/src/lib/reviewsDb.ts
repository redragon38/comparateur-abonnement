// Service pour gérer les avis - Mode hybride (Backend ou LocalStorage)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL || '';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  userInitials: string;
}

// Vérifier si le backend est disponible
const isBackendAvailable = async (): Promise<boolean> => {
  if (!BACKEND_URL) return false;
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
};

// LocalStorage helpers
const getLocalReviews = (appId: string): Review[] => {
  const stored = localStorage.getItem(`reviews_${appId}`);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalReviews = (appId: string, reviews: Review[]): void => {
  localStorage.setItem(`reviews_${appId}`, JSON.stringify(reviews));
};

// Récupérer tous les avis pour une app
export async function getReviews(appId: string): Promise<Review[]> {
  // D'abord essayer le backend
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews/${appId}`);
      if (response.ok) {
        const reviews = await response.json();
        return reviews;
      }
    } catch (error) {
      console.warn('Backend non disponible, utilisation du localStorage');
    }
  }
  
  // Fallback sur localStorage
  return getLocalReviews(appId);
}

// Créer un nouvel avis
export async function createReview(
  appId: string,
  userName: string,
  rating: number,
  comment: string
): Promise<Review> {
  const userInitials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newReview: Review = {
    id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userName: userName.trim(),
    rating,
    comment: comment.trim(),
    date: new Date().toISOString(),
    helpful: 0,
    userInitials,
  };

  // D'abord essayer le backend
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appId,
          userName: userName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (response.ok) {
        const backendReview = await response.json();
        return backendReview;
      }
    } catch (error) {
      console.warn('Backend non disponible, sauvegarde en local');
    }
  }

  // Fallback sur localStorage
  const existingReviews = getLocalReviews(appId);
  existingReviews.unshift(newReview);
  saveLocalReviews(appId, existingReviews);
  return newReview;
}

// Incrémenter le compteur "Utile"
export async function incrementHelpful(appId: string, reviewId: string): Promise<void> {
  // D'abord essayer le backend
  if (BACKEND_URL) {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/reviews/${appId}/${reviewId}/helpful`,
        {
          method: 'PUT',
        }
      );

      if (response.ok) {
        return;
      }
    } catch (error) {
      console.warn('Backend non disponible, mise à jour locale');
    }
  }

  // Fallback sur localStorage
  const reviews = getLocalReviews(appId);
  const reviewIndex = reviews.findIndex(r => r.id === reviewId);
  if (reviewIndex !== -1) {
    reviews[reviewIndex].helpful += 1;
    saveLocalReviews(appId, reviews);
  }
}
