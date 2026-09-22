import { categories } from '../data/misc';
import CategoryCard from '../components/CategoryCard';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Categories() {
  usePageMeta('Categories', 'Browse GameVerse games by category.');
  return (
    <div className="container py-5">
      <h1 className="section-title mb-2">Browse Categories</h1>
      <p className="text-muted mb-4">Find your next favorite game by genre.</p>
      <div className="row g-4">
        {categories.map((cat) => (
          <div className="col-12 col-sm-6 col-lg-3" key={cat.id}>
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>
    </div>
  );
}
