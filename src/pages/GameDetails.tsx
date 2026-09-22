import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getGameBySlug, getSimilarGames } from '../data/games';
import { useFavorites } from '../contexts/FavoritesContext';
import { useReviews } from '../contexts/ReviewsContext';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import { useAchievements } from '../contexts/AchievementsContext';
import SafeImage from '../components/SafeImage';
import GameRating from '../components/GameRating';
import PlatformIcons from '../components/PlatformIcons';
import GameGrid from '../components/GameGrid';
import ReviewCard from '../components/ReviewCard';
import Modal from '../components/Modal';
import { usePageMeta } from '../hooks/usePageMeta';

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const game = id ? getGameBySlug(id) : undefined;
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getReviewsForGame, addReview } = useReviews();
  const { user } = useUser();
  const { showToast } = useToast();
  const { unlockAchievement } = useAchievements();
  const [wishlisted, setWishlisted] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  usePageMeta(game ? game.title : 'Game', game?.shortDescription);

  if (!game) {
    return <Navigate to="/404" replace />;
  }

  const reviews = getReviewsForGame(game.id);
  const similar = getSimilarGames(game);
  const fav = isFavorite(game.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    addReview(game.id, reviewRating, reviewText.trim(), user.username, user.avatar);
    unlockAchievement('ach-7');
    setReviewText('');
    setReviewRating(5);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => undefined);
    }
    showToast('Link copied to clipboard', 'info');
  };

  return (
    <div>
      <section className="details-hero">
        <SafeImage src={game.bannerImage} alt="" className="details-hero-img" aria-hidden="true" />
        <div className="details-hero-gradient" />
        <div className="container position-relative details-hero-content">
          <div className="row g-4 align-items-end">
            <div className="col-auto d-none d-md-block">
              <SafeImage src={game.coverImage} alt={`${game.title} cover`} className="details-cover" />
            </div>
            <div className="col">
              <span className="badge-genre mb-2 d-inline-block">{game.genre}</span>
              <h1 className="hero-title">{game.title}</h1>
              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <GameRating rating={game.rating} size="lg" />
                <span className="text-muted">{game.releaseDate}</span>
                <PlatformIcons platforms={game.platforms} />
                <span className="badge-genre">{game.ageRating}</span>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <button type="button" className="btn btn-neon" onClick={() => setShowTrailerModal(true)}>
                  <i className="bi bi-play-fill me-1" aria-hidden="true" />Play Demo
                </button>
                <button type="button" className={`btn btn-outline-neon ${fav ? 'is-active' : ''}`} onClick={() => toggleFavorite(game.id)}>
                  <i className={`bi ${fav ? 'bi-heart-fill' : 'bi-heart'} me-1`} aria-hidden="true" />Add to Favorites
                </button>
                <button
                  type="button"
                  className={`btn btn-ghost ${wishlisted ? 'is-active' : ''}`}
                  onClick={() => { setWishlisted((w) => !w); showToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', 'info'); }}
                >
                  <i className={`bi ${wishlisted ? 'bi-bookmark-fill' : 'bi-bookmark'} me-1`} aria-hidden="true" />Add to Wishlist
                </button>
                <button type="button" className="btn btn-ghost" onClick={handleShare}>
                  <i className="bi bi-share me-1" aria-hidden="true" />Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-8">
            <section className="mb-5">
              <h3 className="section-title mb-3">About</h3>
              <p className="text-muted-light">{game.description}</p>
            </section>

            <section className="mb-5">
              <h3 className="section-title mb-3">Screenshots</h3>
              <div className="screenshot-grid">
                {game.screenshots.map((src, i) => (
                  <button
                    type="button"
                    key={src}
                    className="screenshot-thumb-btn"
                    onClick={() => setLightboxSrc(src)}
                    aria-label={`View screenshot ${i + 1} full size`}
                  >
                    <SafeImage src={src} alt={`${game.title} screenshot ${i + 1}`} className="screenshot-thumb" />
                  </button>
                ))}
              </div>
            </section>

            <section className="mb-5">
              <h3 className="section-title mb-3">Trailer</h3>
              <button type="button" className="video-placeholder" onClick={() => setShowTrailerModal(true)} aria-label="Play trailer">
                <SafeImage src={game.bannerImage} alt="" className="video-placeholder-img" />
                <span className="video-play-btn"><i className="bi bi-play-fill" /></span>
              </button>
            </section>

            {game.platforms.includes('PC') && (
              <section className="mb-5">
                <h3 className="section-title mb-3">System Requirements</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="glass-card h-100">
                      <h6 className="mb-3">Minimum</h6>
                      <SysReqList req={game.systemRequirements.minimum} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="glass-card h-100">
                      <h6 className="mb-3">Recommended</h6>
                      <SysReqList req={game.systemRequirements.recommended} />
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="mb-5">
              <h3 className="section-title mb-3">Reviews</h3>
              <form className="glass-card mb-4" onSubmit={handleReviewSubmit}>
                <h6 className="mb-3">Write a review</h6>
                <div className="mb-3">
                  <label htmlFor="reviewRating" className="form-label small">Rating</label>
                  <select
                    id="reviewRating"
                    className="form-select w-auto"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="reviewText" className="form-label small">Your review</label>
                  <textarea
                    id="reviewText"
                    className="form-control"
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts on this game..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-neon">Submit Review</button>
              </form>
              <div className="d-flex flex-column gap-3">
                {reviews.map((r) => <ReviewCard review={r} key={r.id} />)}
              </div>
            </section>
          </div>

          <div className="col-lg-4">
            <div className="glass-card mb-4">
              <h6 className="mb-3">Game Information</h6>
              <InfoRow label="Developer" value={game.developer} />
              <InfoRow label="Publisher" value={game.publisher} />
              <InfoRow label="Release Date" value={game.releaseDate} />
              <InfoRow label="Genre" value={game.genre} />
              <InfoRow label="Platforms" value={game.platforms.join(', ')} />
              <InfoRow label="Age Rating" value={game.ageRating} />
              <InfoRow label="Price" value={game.price === 0 ? 'Free to Play' : `$${game.price.toFixed(2)}`} />
            </div>
          </div>
        </div>

        <section className="mt-4">
          <h3 className="section-title mb-4">Similar Games</h3>
          <GameGrid games={similar} />
        </section>
      </div>

      {lightboxSrc && (
        <Modal onClose={() => setLightboxSrc(null)} title="Screenshot" size="lg">
          <SafeImage src={lightboxSrc} alt="Full size screenshot" className="w-100 rounded" />
        </Modal>
      )}

      {showTrailerModal && (
        <Modal onClose={() => setShowTrailerModal(false)} title={`${game.title} — Trailer`} size="lg">
          <div className="video-placeholder-modal">
            <SafeImage src={game.bannerImage} alt="" className="video-placeholder-img" />
            <span className="video-play-btn"><i className="bi bi-play-fill" /></span>
            <p className="text-muted text-center mt-3 mb-0">Trailer playback is unavailable in this preview build.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="d-flex justify-content-between py-2 info-row">
      <span className="text-muted small">{label}</span>
      <span className="fw-semibold small text-end">{value}</span>
    </div>
  );
}

function SysReqList({ req }: { req: { os: string; processor: string; memory: string; graphics: string; storage: string } }) {
  return (
    <ul className="list-unstyled small mb-0 sysreq-list">
      <li><strong>OS:</strong> {req.os}</li>
      <li><strong>Processor:</strong> {req.processor}</li>
      <li><strong>Memory:</strong> {req.memory}</li>
      <li><strong>Graphics:</strong> {req.graphics}</li>
      <li><strong>Storage:</strong> {req.storage}</li>
    </ul>
  );
}
