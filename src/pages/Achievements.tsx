import { useMemo, useState } from 'react';
import { useAchievements } from '../contexts/AchievementsContext';
import AchievementCard from '../components/AchievementCard';
import { usePageMeta } from '../hooks/usePageMeta';

type Filter = 'All' | 'Unlocked' | 'Locked';

export default function Achievements() {
  usePageMeta('Achievements', 'Track your unlocked GameVerse achievements and trophies.');
  const { achievements } = useAchievements();
  const [filter, setFilter] = useState<Filter>('All');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const percent = Math.round((unlockedCount / achievements.length) * 100);

  const filtered = useMemo(() => {
    if (filter === 'Unlocked') return achievements.filter((a) => a.unlocked);
    if (filter === 'Locked') return achievements.filter((a) => !a.unlocked);
    return achievements;
  }, [achievements, filter]);

  return (
    <div className="container py-5">
      <h1 className="section-title mb-2">Achievements</h1>
      <p className="text-muted mb-3">Unlocked: {unlockedCount} / {achievements.length}</p>
      <div className="xp-bar mb-4" style={{ maxWidth: 400 }}>
        <div className="xp-bar-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="gv-tabs mb-4" role="tablist">
        {(['All', 'Unlocked', 'Locked'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={`gv-tab ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="row g-3">
        {filtered.map((a) => (
          <div className="col-12 col-md-6 col-lg-4" key={a.id}>
            <AchievementCard achievement={a} />
          </div>
        ))}
      </div>
    </div>
  );
}
