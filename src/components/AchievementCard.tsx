import type { Achievement } from '../types';

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className={`achievement-card glass-card ${achievement.unlocked ? 'is-unlocked' : 'is-locked'}`}>
      <div className="achievement-icon">
        <i className={`bi ${achievement.icon}`} aria-hidden="true" />
        {!achievement.unlocked && <i className="bi bi-lock-fill achievement-lock" aria-hidden="true" />}
      </div>
      <div>
        <h6 className="mb-1">{achievement.name}</h6>
        <p className="text-muted small mb-1">{achievement.description}</p>
        <span className="badge-genre">+{achievement.xpReward} XP</span>
      </div>
    </div>
  );
}
