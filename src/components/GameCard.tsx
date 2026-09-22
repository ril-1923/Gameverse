import { Link } from 'react-router-dom';
import type { Game } from '../types';
import SafeImage from './SafeImage';
import GameRating from './GameRating';
import PlatformIcons from './PlatformIcons';
import { useFavorites } from '../contexts/FavoritesContext';

export default function GameCard({ game }: { game: Game }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(game.id);
  const year = new Date(game.releaseDate).getFullYear();

  return (
    <div className="game-card glass-card h-100">
      <Link to={`/games/${game.slug}`} className="game-card-media-link">
        <div className="game-card-media">
          <SafeImage src={game.coverImage} alt={`${game.title} cover art`} className="game-card-img" />
          <div className="game-card-overlay">
            <span className="btn btn-sm btn-neon">View Details</span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`favorite-btn ${fav ? 'is-active' : ''}`}
        onClick={() => toggleFavorite(game.id)}
        aria-pressed={fav}
        aria-label={fav ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
      >
        <i className={`bi ${fav ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden="true" />
      </button>
      <div className="game-card-body">
        <Link to={`/games/${game.slug}`} className="game-card-title">{game.title}</Link>
        <div className="d-flex justify-content-between align-items-center mt-1 mb-2">
          <span className="badge-genre">{game.genre}</span>
          <GameRating rating={game.rating} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <PlatformIcons platforms={game.platforms} />
          <span className="text-muted small">{year}</span>
        </div>
      </div>
    </div>
  );
}
