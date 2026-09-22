import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (gameId: string) => boolean;
  toggleFavorite: (gameId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('gv_favorites', []);
  const { showToast } = useToast();

  const isFavorite = (gameId: string) => favorites.includes(gameId);

  const toggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      if (prev.includes(gameId)) {
        showToast('Removed from favorites', 'info');
        return prev.filter((id) => id !== gameId);
      }
      showToast('Added to favorites', 'success');
      return [...prev, gameId];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
