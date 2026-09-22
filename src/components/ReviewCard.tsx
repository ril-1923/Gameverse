import type { Review } from '../types';
import SafeImage from './SafeImage';
import GameRating from './GameRating';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card glass-card">
      <div className="d-flex align-items-center gap-3 mb-2">
        <SafeImage src={review.avatar} alt={review.username} className="review-avatar" />
        <div>
          <div className="fw-semibold">{review.username} {review.isLocal && <span className="badge-genre ms-1">You</span>}</div>
          <div className="d-flex align-items-center gap-2">
            <GameRating rating={review.rating} />
            <span className="text-muted smaller">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="mb-0 text-muted-light">{review.text}</p>
    </div>
  );
}
