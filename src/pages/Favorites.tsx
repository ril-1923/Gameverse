import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { games } from '../data/games';
import SafeImage from '../components/SafeImage';
import GameRating from '../components/GameRating';
import { EmptyState } from '../components/Feedback';
import { usePageMeta } from '../hooks/usePageMeta';

type SortOption = 'Recently Added' | 'Rating' | 'A-Z';

export default function Favorites() {
  usePageMeta('Favorites', 'Games you have saved to your GameVerse favorites.');
  const { favorites, toggleFavorite } = useFavorites();
  const [sort, setSort] = useState<SortOption>('Recently Added');

  const favoriteGames = useMemo(() => {
    const list = games.filter((g) => favorites.includes(g.id));
    if (sort === 'Rating') return [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'A-Z') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return [...list].reverse();
  }, [favorites, sort]);

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h1 className="section-title mb-0">My Favorites</h1>
        {favoriteGames.length > 0 && (
          <select className="form-select w-auto" value={sort} onChange={(e) => setSort(e.target.value as SortOption)} aria-label="Sort favorites">
            <option>Recently Added</option>
            <option>Rating</option>
            <option>A-Z</option>
          </select>
        )}
      </div>

      {favoriteGames.length === 0 ? (
        <EmptyState
          icon="bi-heart"
          title="No favorites yet"
          message="Browse the game catalog and tap the heart icon to save games here."
          action={{ label: 'Browse Games', onClick: () => { window.location.hash = '#/games'; } }}
        />
      ) : (
        <div className="d-flex flex-column gap-3">
          {favoriteGames.map((g) => (
            <div key={g.id} className="favorite-row glass-card">
              <SafeImage src={g.coverImage} alt={g.title} className="favorite-thumb" />
              <div className="flex-grow-1">
                <Link to={`/games/${g.slug}`} className="favorite-title">{g.title}</Link>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <span className="badge-genre">{g.genre}</span>
                  <GameRating rating={g.rating} />
                </div>
              </div>
              <Link to={`/games/${g.slug}`} className="btn btn-outline-neon btn-sm">View</Link>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => toggleFavorite(g.id)}>
                <i className="bi bi-trash me-1" aria-hidden="true" />Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
