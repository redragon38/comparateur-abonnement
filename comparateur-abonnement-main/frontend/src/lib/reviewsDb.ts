// Service pour gérer les avis via notre backend MongoDB

const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || '';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  userInitials: string;
}

// Récupérer tous les avis pour une app
export async function getReviews(appId: string): Promise<Review[]> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reviews/${appId}`);

    if (!response.ok) {
      console.error('Erreur lors de la récupération des avis');
      return [];
    }

    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Créer un nouvel avis
export async function createReview(
  appId: string,
  userName: string,
  rating: number,
  comment: string
): Promise<Review> {
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

    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'avis');
    }

    const newReview = await response.json();
    return newReview;
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    throw error;
  }
}

// Incrémenter le compteur "Utile"
export async function incrementHelpful(appId: string, reviewId: string): Promise<void> {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/reviews/${appId}/${reviewId}/helpful`,
      {
        method: 'PUT',
      }
    );

    if (!response.ok) {
      throw new Error('Erreur lors du vote');
    }
  } catch (error) {
    console.error('Erreur lors du vote:', error);
    throw error;
  }
}
