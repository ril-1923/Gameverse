import { useMemo, useState } from 'react';
import { leaderboards } from '../data/misc';
import { useUser } from '../contexts/UserContext';
import LeaderboardTable from '../components/LeaderboardTable';
import { usePageMeta } from '../hooks/usePageMeta';
import type { LeaderboardPlayer } from '../types';

type Tab = 'global' | 'weekly' | 'monthly' | 'friends';

export default function Leaderboard() {
  usePageMeta('Leaderboard', 'See the top players on GameVerse.');
  const [tab, setTab] = useState<Tab>('global');
  const { user } = useUser();

  const players = useMemo<LeaderboardPlayer[]>(() => {
    const base = leaderboards[tab];
    const you: LeaderboardPlayer = {
      rank: base.length + 1,
      username: user.username,
      avatar: user.avatar,
      level: user.level,
      xp: user.xp,
      gamesPlayed: user.gamesPlayed,
      achievements: 12,
      isCurrentUser: true,
    };
    const combined = [...base, you].sort((a, b) => b.xp - a.xp).map((p, i) => ({ ...p, rank: i + 1 }));
    return combined;
  }, [tab, user]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'global', label: 'Global' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'friends', label: 'Friends' },
  ];

  return (
    <div className="container py-5">
      <h1 className="section-title mb-4">Leaderboard</h1>
      <div className="gv-tabs mb-4" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`gv-tab ${tab === t.key ? 'is-active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <LeaderboardTable players={players} />
    </div>
  );
}
