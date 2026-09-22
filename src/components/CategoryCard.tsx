import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';
import SafeImage from './SafeImage';
import { gameCountForCategory } from '../data/misc';

export default function CategoryCard({ category }: { category: Category }) {
  const navigate = useNavigate();
  const count = gameCountForCategory(category.name);

  return (
    <div className="category-card glass-card h-100">
      <div className="category-card-media">
        <SafeImage src={category.image} alt={`${category.name} games`} className="category-card-img" />
        <div className="category-card-shade" />
        <span className="category-count-badge">{count} games</span>
      </div>
      <div className="category-card-body">
        <h5>{category.name}</h5>
        <p className="text-muted small">{category.description}</p>
        <button
          type="button"
          className="btn btn-outline-neon btn-sm"
          onClick={() => navigate(`/games?genre=${encodeURIComponent(category.name)}`)}
        >
          Explore <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
