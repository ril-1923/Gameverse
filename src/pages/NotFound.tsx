import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('404 — Game Over', 'The page you are looking for could not be found.');
  return (
    <div className="container py-5 text-center not-found-page">
      <i className="bi bi-controller display-1 gradient-text" aria-hidden="true" />
      <h1 className="mt-4">404 — Game Over</h1>
      <p className="text-muted mb-4">The level you're looking for doesn't exist, or has been moved.</p>
      <Link to="/" className="btn btn-neon btn-lg">Return to Home</Link>
    </div>
  );
}
