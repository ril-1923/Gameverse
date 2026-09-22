import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { allAchievements } from '../data/misc';
import type { Achievement } from '../types';
import { useToast } from './ToastContext';
import { useUser } from './UserContext';

interface AchievementsContextValue {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

const AchievementsContext = createContext<AchievementsContextValue | undefined>(undefined);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('gv_achievements', allAchievements);
  const { showToast } = useToast();
  const { addXp } = useUser();

  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const target = prev.find((a) => a.id === id);
      if (!target || target.unlocked) return prev;
      showToast(`Achievement unlocked: ${target.name}!`, 'success');
      addXp(target.xpReward);
      return prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
    });
  };

  return (
    <AchievementsContext.Provider value={{ achievements, unlockAchievement }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error('useAchievements must be used within AchievementsProvider');
  return ctx;
}
