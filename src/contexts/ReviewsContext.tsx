import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateReviewsForGame } from '../data/misc';
import type { Review } from '../types';
import { useToast } from './ToastContext';

interface ReviewsContextValue {
  localReviews: Review[];
  getReviewsForGame: (gameId: string) => Review[];
  addReview: (gameId: string, rating: number, text: string, username: string, avatar: string) => void;
}

const ReviewsContext = createContext<ReviewsContextValue | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [localReviews, setLocalReviews] = useLocalStorage<Review[]>('gv_local_reviews', []);
  const { showToast } = useToast();

  const getReviewsForGame = (gameId: string) => {
    const generated = generateReviewsForGame(gameId);
    const mine = localReviews.filter((r) => r.gameId === gameId);
    return [...mine, ...generated];
  };

  const addReview = (gameId: string, rating: number, text: string, username: string, avatar: string) => {
    const review: Review = {
      id: `local-${Date.now()}`,
      gameId,
      username,
      avatar,
      rating,
      date: new Date().toISOString().slice(0, 10),
      text,
      isLocal: true,
    };
    setLocalReviews((prev) => [review, ...prev]);
    showToast('Review submitted', 'success');
  };

  return (
    <ReviewsContext.Provider value={{ localReviews, getReviewsForGame, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider');
  return ctx;
}
