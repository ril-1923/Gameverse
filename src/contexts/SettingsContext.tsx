import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AppSettings } from '../types';

const defaultSettings: AppSettings = {
  theme: 'dark',
  accent: 'purple',
  notifyGameUpdates: true,
  notifyCommunity: true,
  notifyAchievements: true,
  publicProfile: true,
  showActivity: true,
};

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AppSettings>('gv_settings', defaultSettings);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('data-accent', settings.accent);
  }, [settings.theme, settings.accent]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

export function useTheme() {
  const { settings, updateSettings } = useSettings();
  return {
    theme: settings.theme,
    toggleTheme: () => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' }),
  };
}
