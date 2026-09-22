import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { games } from '../data/games';
import { categories, initialCommunityPosts } from '../data/misc';
import { useLocalStorage } from '../hooks/useLocalStorage';
import GameGrid from '../components/GameGrid';
import { EmptyState } from '../components/Feedback';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Search() {
  usePageMeta('Search', 'Search games, categories, and community posts on GameVerse.');
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('gv_recent_searches', []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const lower = query.trim().toLowerCase();

  const gameResults = useMemo(() => (lower ? games.filter((g) => g.title.toLowerCase().includes(lower) || g.genre.toLowerCase().includes(lower)) : []), [lower]);
  const categoryResults = useMemo(() => (lower ? categories.filter((c) => c.name.toLowerCase().includes(lower)) : []), [lower]);
  const postResults = useMemo(() => (lower ? initialCommunityPosts.filter((p) => p.title.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower)) : []), [lower]);

  const hasResults = gameResults.length > 0 || categoryResults.length > 0 || postResults.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchParams({ q: trimmed });
    setRecentSearches((prev) => [trimmed, ...prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6));
  };

  return (
    <div className="container py-5">
      <h1 className="section-title mb-4">Search GameVerse</h1>
      <form onSubmit={handleSubmit} className="gv-search-form-page mb-4" role="search">
        <i className="bi bi-search" aria-hidden="true" />
        <label htmlFor="searchPageInput" className="visually-hidden">Search</label>
        <input
          id="searchPageInput"
          type="search"
          className="form-control"
          placeholder="Search games, categories, community posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-neon">Search</button>
      </form>

      {!lower && recentSearches.length > 0 && (
        <div className="mb-4">
          <h6 className="text-muted">Recent Searches</h6>
          <div className="filter-chip-group">
            {recentSearches.map((s) => (
              <button key={s} type="button" className="filter-chip" onClick={() => { setQuery(s); setSearchParams({ q: s }); }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {lower && !hasResults && (
        <EmptyState icon="bi-search" title="No results found" message={`We couldn't find anything matching "${query}".`} />
      )}

      {gameResults.length > 0 && (
        <section className="mb-5">
          <h4 className="section-title mb-3">Games</h4>
          <GameGrid games={gameResults} />
        </section>
      )}

      {categoryResults.length > 0 && (
        <section className="mb-5">
          <h4 className="section-title mb-3">Categories</h4>
          <div className="d-flex flex-wrap gap-2">
            {categoryResults.map((c) => (
              <Link key={c.id} to={`/games?genre=${encodeURIComponent(c.name)}`} className="filter-chip">{c.name}</Link>
            ))}
          </div>
        </section>
      )}

      {postResults.length > 0 && (
        <section className="mb-5">
          <h4 className="section-title mb-3">Community Posts</h4>
          <div className="d-flex flex-column gap-3">
            {postResults.map((p) => (
              <div key={p.id} className="glass-card">
                <h6>{p.title}</h6>
                <p className="text-muted small mb-0">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
