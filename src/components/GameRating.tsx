interface GameRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function GameRating({ rating, size = 'sm' }: GameRatingProps) {
  const fontSize = size === 'lg' ? '1.1rem' : size === 'md' ? '0.95rem' : '0.8rem';
  return (
    <span className="game-rating d-inline-flex align-items-center gap-1" style={{ fontSize }} aria-label={`Rating ${rating} out of 5`}>
      <i className="bi bi-star-fill text-warning" aria-hidden="true" />
      <span className="fw-semibold">{rating.toFixed(1)}</span>
    </span>
  );
}
