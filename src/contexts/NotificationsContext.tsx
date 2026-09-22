import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { AppNotification } from '../types';

const defaultNotifications: AppNotification[] = [
  { id: 'n1', title: 'Welcome to GameVerse', message: 'Explore trending games and start earning achievements.', time: 'Just now', read: false },
  { id: 'n2', title: 'New Release', message: 'Solar Vanguard just launched — check it out!', time: '2h ago', read: false },
  { id: 'n3', title: 'Community', message: 'Your post received new comments.', time: '1d ago', read: true },
];

interface NotificationsContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  addNotification: (title: string, message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useLocalStorage<AppNotification[]>('gv_notifications', defaultNotifications);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const addNotification = (title: string, message: string) => {
    setNotifications((prev) => [
      { id: `n-${Date.now()}`, title, message, time: 'Just now', read: false },
      ...prev,
    ]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAllRead, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}
