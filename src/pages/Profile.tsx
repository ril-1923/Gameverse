import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAchievements } from '../contexts/AchievementsContext';
import { useCommunity } from '../contexts/CommunityContext';
import { useReviews } from '../contexts/ReviewsContext';
import { games } from '../data/games';
import SafeImage from '../components/SafeImage';
import GameGrid from '../components/GameGrid';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Profile() {
  usePageMeta('My Profile', 'View your GameVerse profile, stats, and activity.');
  const { user } = useUser();
  const { favorites } = useFavorites();
  const { achievements } = useAchievements();
  const { posts } = useCommunity();
  const { localReviews } = useReviews();

  const unlockedAchievements = achievements.filter((a) => a.unlocked).slice(-3).reverse();
  const favoriteGames = games.filter((g) => favorites.includes(g.id));
  const myPosts = posts.filter((p) => p.username === user.username).slice(0, 3);
  const xpPercent = Math.min(100, Math.round((user.xp / user.xpToNextLevel) * 100));

  return (
    <div className="container py-5">
      <div className="profile-header glass-card mb-4">
        <SafeImage src={user.avatar} alt={user.username} className="profile-avatar" />
        <div className="flex-grow-1">
          <h2 className="mb-1">{user.username}</h2>
          <p className="text-muted mb-2">{user.bio}</p>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge-genre">Level {user.level}</span>
            <span className="text-muted small">{user.xp} / {user.xpToNextLevel} XP</span>
          </div>
          <div className="xp-bar"><div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} /></div>
        </div>
        <Link to="/settings" className="btn btn-outline-neon align-self-start">
          <i className="bi bi-gear me-1" aria-hidden="true" />Edit Settings
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-6 col-lg-3"><div className="glass-card text-center"><div className="stat-value gradient-text">{user.gamesPlayed}</div><div className="stat-label">Games Played</div></div></div>
        <div className="col-6 col-lg-3"><div className="glass-card text-center"><div className="stat-value gradient-text">{user.hoursPlayed}</div><div className="stat-label">Hours Played</div></div></div>
        <div className="col-6 col-lg-3"><div className="glass-card text-center"><div className="stat-value gradient-text">{achievements.filter((a) => a.unlocked).length}</div><div className="stat-label">Achievements</div></div></div>
        <div className="col-6 col-lg-3"><div className="glass-card text-center"><div className="stat-value gradient-text">{favoriteGames.length}</div><div className="stat-label">Favorite Games</div></div></div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <h4 className="section-title mb-3">Gaming Activity</h4>
          <div className="glass-card mb-3">
            <h6>Recently Earned Achievements</h6>
            {unlockedAchievements.length === 0 ? <p className="text-muted small mb-0">No achievements yet.</p> : (
              <ul className="list-unstyled mb-0">
                {unlockedAchievements.map((a) => (
                  <li key={a.id} className="d-flex align-items-center gap-2 py-1">
                    <i className={`bi ${a.icon} text-warning`} aria-hidden="true" /> {a.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="glass-card mb-3">
            <h6>Recent Reviews</h6>
            {localReviews.length === 0 ? <p className="text-muted small mb-0">No reviews submitted yet.</p> : (
              <ul className="list-unstyled mb-0">
                {localReviews.slice(0, 3).map((r) => (
                  <li key={r.id} className="py-1 small text-muted-light">"{r.text.slice(0, 60)}{r.text.length > 60 ? '...' : ''}"</li>
                ))}
              </ul>
            )}
          </div>
          <div className="glass-card">
            <h6>Recent Community Activity</h6>
            {myPosts.length === 0 ? <p className="text-muted small mb-0">No posts yet.</p> : (
              <ul className="list-unstyled mb-0">
                {myPosts.map((p) => <li key={p.id} className="py-1 small">{p.title}</li>)}
              </ul>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <h4 className="section-title mb-3">Favorite Games</h4>
          {favoriteGames.length === 0 ? (
            <p className="text-muted">You haven't favorited any games yet.</p>
          ) : (
            <GameGrid games={favoriteGames.slice(0, 4)} />
          )}
        </div>
      </div>
    </div>
  );
}
