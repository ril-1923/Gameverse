import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { games } from '../data/games';
import type { Genre, Platform } from '../types';
import GameGrid from '../components/GameGrid';
import { EmptyState } from '../components/Feedback';
import { usePageMeta } from '../hooks/usePageMeta';

const genres: (Genre | 'All')[] = ['All', 'Action', 'Adventure', 'RPG', 'Racing', 'Sports', 'Strategy', 'Horror', 'Simulation'];
const platforms: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'];
const ratingOptions = [
  { label: 'All', value: 0 },
  { label: '4+', value: 4 },
  { label: '4.5+', value: 4.5 },
  { label: '4.8+', value: 4.8 },
];
const yearOptions = ['All', '2026', '2025', '2024', 'Older'];
type SortOption = 'Popularity' | 'Rating' | 'Newest' | 'Oldest' | 'A-Z';

const PAGE_SIZE = 12;

export default function Games() {
  usePageMeta('Explore Games', 'Browse and filter the full GameVerse game catalog.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<Genre | 'All'>((searchParams.get('genre') as Genre) || 'All');
  const [platform, setPlatform] = useState<Platform | 'All'>('All');
  const [minRating, setMinRating] = useState(0);
  const [year, setYear] = useState('All');
  const [sort, setSort] = useState<SortOption>('Popularity');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let result = games.filter((g) => {
      if (genre !== 'All' && g.genre !== genre) return false;
      if (platform !== 'All' && !g.platforms.includes(platform)) return false;
      if (g.rating < minRating) return false;
      if (query && !g.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (year !== 'All') {
        const gYear = new Date(g.releaseDate).getFullYear();
        if (year === 'Older') {
          if (gYear >= 2024) return false;
        } else if (gYear !== parseInt(year, 10)) {
          return false;
        }
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'Rating': return b.rating - a.rating;
        case 'Newest': return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'Oldest': return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        case 'A-Z': return a.title.localeCompare(b.title);
        default: return b.popularity - a.popularity;
      }
    });

    return result;
  }, [genre, platform, minRating, query, year, sort]);

  const visibleGames = filtered.slice(0, visibleCount);

  const handleGenreChange = (g: Genre | 'All') => {
    setGenre(g);
    setVisibleCount(PAGE_SIZE);
    if (g === 'All') {
      searchParams.delete('genre');
    } else {
      searchParams.set('genre', g);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="container py-5">
      <h1 className="section-title mb-4">Explore Games</h1>

      <div className="mb-4">
        <label htmlFor="gameSearch" className="visually-hidden">Search games</label>
        <div className="gv-search-form-page">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            id="gameSearch"
            type="search"
            className="form-control"
            placeholder="Search games..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
          />
        </div>
      </div>

      <div className="row g-4">
        <aside className="col-lg-3">
          <div className="filter-sidebar glass-card">
            <div className="filter-group">
              <h6>Genre</h6>
              <div className="filter-chip-group">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`filter-chip ${genre === g ? 'is-active' : ''}`}
                    onClick={() => handleGenreChange(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h6>Platform</h6>
              <div className="filter-chip-group">
                <button type="button" className={`filter-chip ${platform === 'All' ? 'is-active' : ''}`} onClick={() => setPlatform('All')}>All</button>
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`filter-chip ${platform === p ? 'is-active' : ''}`}
                    onClick={() => setPlatform(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h6>Rating</h6>
              <div className="filter-chip-group">
                {ratingOptions.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    className={`filter-chip ${minRating === r.value ? 'is-active' : ''}`}
                    onClick={() => setMinRating(r.value)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h6>Release Year</h6>
              <div className="filter-chip-group">
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    type="button"
                    className={`filter-chip ${year === y ? 'is-active' : ''}`}
                    onClick={() => setYear(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h6>Sort</h6>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort games"
              >
                {(['Popularity', 'Rating', 'Newest', 'Oldest', 'A-Z'] as SortOption[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="col-lg-9">
          <p className="text-muted mb-3">Showing {visibleGames.length} of {filtered.length} games</p>
          {filtered.length === 0 ? (
            <EmptyState icon="bi-emoji-frown" title="No games found" message="Try adjusting your filters or search term." />
          ) : (
            <>
              <GameGrid games={visibleGames} />
              {visibleCount < filtered.length && (
                <div className="text-center mt-4">
                  <button type="button" className="btn btn-outline-neon" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
