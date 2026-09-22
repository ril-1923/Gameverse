import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { UserProfile } from '../types';

const defaultUser: UserProfile = {
  username: 'ShadowPlayer',
  avatar: 'https://picsum.photos/seed/gv-current-user/200/200',
  bio: 'Gamer. Explorer. Always looking for the next great world to dive into.',
  level: 14,
  xp: 3200,
  xpToNextLevel: 5000,
  gamesPlayed: 47,
  hoursPlayed: 312,
  joinDate: '2024-03-12',
};

interface UserContextValue {
  user: UserProfile;
  addXp: (amount: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<UserProfile>('gv_user', defaultUser);

  const addXp = (amount: number) => {
    setUser((prev) => {
      let xp = prev.xp + amount;
      let level = prev.level;
      let xpToNextLevel = prev.xpToNextLevel;
      while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = Math.round(xpToNextLevel * 1.15);
      }
      return { ...prev, xp, level, xpToNextLevel };
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, addXp, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
