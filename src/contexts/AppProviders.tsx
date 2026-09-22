import type { ReactNode } from 'react';
import { ToastProvider } from './ToastContext';
import { SettingsProvider } from './SettingsContext';
import { UserProvider } from './UserContext';
import { FavoritesProvider } from './FavoritesContext';
import { AchievementsProvider } from './AchievementsContext';
import { NotificationsProvider } from './NotificationsContext';
import { CommunityProvider } from './CommunityContext';
import { ReviewsProvider } from './ReviewsContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <SettingsProvider>
        <UserProvider>
          <FavoritesProvider>
            <AchievementsProvider>
              <NotificationsProvider>
                <CommunityProvider>
                  <ReviewsProvider>{children}</ReviewsProvider>
                </CommunityProvider>
              </NotificationsProvider>
            </AchievementsProvider>
          </FavoritesProvider>
        </UserProvider>
      </SettingsProvider>
    </ToastProvider>
  );
}
