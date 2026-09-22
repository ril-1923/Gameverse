import { Link } from 'react-router-dom';
import { games } from '../data/games';
import { categories } from '../data/misc';
import GameGrid from '../components/GameGrid';
import CategoryCard from '../components/CategoryCard';
import StatCard from '../components/StatCard';
import GameRating from '../components/GameRating';
import PlatformIcons from '../components/PlatformIcons';
import SafeImage from '../components/SafeImage';
import { useFavorites } from '../contexts/FavoritesContext';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta('Home', 'Discover trending games, categories, and community activity on GameVerse.');
  const { toggleFavorite, isFavorite } = useFavorites();
  const featured = games[0];
  const trending = [...games].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  const recent = [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 6);
  const topRated = [...games].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-bg">
          <SafeImage src={featured.bannerImage} alt="" className="hero-bg-img" aria-hidden="true" />
          <div className="hero-gradient" />
        </div>
        <div className="container position-relative py-5">
          <div className="hero-content">
            <span className="badge-genre mb-3 d-inline-block">{featured.genre} &middot; Featured</span>
            <h1 className="hero-title">{featured.title}</h1>
            <p className="hero-desc">{featured.shortDescription}</p>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <GameRating rating={featured.rating} size="lg" />
              <span className="text-muted">{new Date(featured.releaseDate).getFullYear()}</span>
              <PlatformIcons platforms={featured.platforms} />
            </div>
            <div className="d-flex flex-wrap gap-3">
              <Link to={`/games/${featured.slug}`} className="btn btn-neon btn-lg">Explore Game</Link>
              <Link to="/play" className="btn btn-outline-neon btn-lg">
                <i className="bi bi-play-fill me-1" aria-hidden="true" />Play Demo
              </Link>
              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={() => toggleFavorite(featured.id)}
              >
                <i className={`bi ${isFavorite(featured.id) ? 'bi-heart-fill' : 'bi-heart'} me-1`} aria-hidden="true" />
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="section-title">Trending Games</h2>
          <Link to="/games" className="link-neon">View all <i className="bi bi-arrow-right" /></Link>
        </div>
        <GameGrid games={trending} />
      </section>

      <section className="container py-5">
        <h2 className="section-title mb-4">Popular Categories</h2>
        <div className="row g-4">
          {categories.slice(0, 8).map((cat) => (
            <div className="col-12 col-sm-6 col-lg-3" key={cat.id}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title mb-4">Recently Released</h2>
        <div className="row g-4">
          {recent.map((g) => (
            <div className="col-12 col-md-6 col-lg-4" key={g.id}>
              <Link to={`/games/${g.slug}`} className="recent-game-card glass-card d-flex gap-3">
                <SafeImage src={g.coverImage} alt={g.title} className="recent-game-img" />
                <div>
                  <h6 className="mb-1">{g.title}</h6>
                  <p className="text-muted smaller mb-1">{g.releaseDate}</p>
                  <span className="badge-genre">{g.genre}</span>
                  <div className="mt-1"><GameRating rating={g.rating} /></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title mb-4">Top Rated Games</h2>
        <div className="glass-card">
          {topRated.map((g, i) => (
            <Link to={`/games/${g.slug}`} key={g.id} className="top-rated-row">
              <span className="top-rated-rank">{String(i + 1).padStart(2, '0')}</span>
              <SafeImage src={g.coverImage} alt="" className="top-rated-thumb" />
              <span className="top-rated-name">{g.title}</span>
              <PlatformIcons platforms={g.platforms} />
              <GameRating rating={g.rating} />
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title mb-4 text-center">Gaming Statistics</h2>
        <div className="row g-4">
          <div className="col-6 col-lg-3"><StatCard icon="bi-joystick" value={50} suffix="K+" label="Games" /></div>
          <div className="col-6 col-lg-3"><StatCard icon="bi-people-fill" value={1200} suffix="K+" label="Players" /></div>
          <div className="col-6 col-lg-3"><StatCard icon="bi-star-fill" value={25} suffix="K+" label="Reviews" /></div>
          <div className="col-6 col-lg-3"><StatCard icon="bi-grid-3x3-gap-fill" value={120} suffix="+" label="Genres" /></div>
        </div>
      </section>
    </div>
  );
}
