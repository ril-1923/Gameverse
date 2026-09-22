import { useMemo, useState } from 'react';
import { discussionCategories } from '../data/misc';
import { useCommunity } from '../contexts/CommunityContext';
import { useUser } from '../contexts/UserContext';
import { useAchievements } from '../contexts/AchievementsContext';
import CommunityPostCard from '../components/CommunityPostCard';
import Modal from '../components/Modal';
import { EmptyState } from '../components/Feedback';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Community() {
  usePageMeta('Community', 'Join discussions with the GameVerse community.');
  const { posts, createPost } = useCommunity();
  const { user } = useUser();
  const { unlockAchievement } = useAchievements();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(discussionCategories[0]);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory],
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    createPost({ title: title.trim(), description: description.trim(), category, username: user.username, avatar: user.avatar });
    unlockAchievement('ach-8');
    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h1 className="section-title mb-0">Community</h1>
        <button type="button" className="btn btn-neon" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-lg me-1" aria-hidden="true" />New Post
        </button>
      </div>

      <div className="row g-4">
        <aside className="col-lg-3">
          <div className="filter-sidebar glass-card">
            <h6>Discussion Categories</h6>
            <div className="d-flex flex-column gap-2 mt-2">
              <button type="button" className={`filter-chip text-start ${activeCategory === 'All' ? 'is-active' : ''}`} onClick={() => setActiveCategory('All')}>All</button>
              {discussionCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filter-chip text-start ${activeCategory === c ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="col-lg-9">
          {filtered.length === 0 ? (
            <EmptyState icon="bi-chat-square-text" title="No posts yet" message="Be the first to start a discussion in this category." action={{ label: 'New Post', onClick: () => setShowModal(true) }} />
          ) : (
            <div className="d-flex flex-column gap-3">
              {filtered.map((post) => <CommunityPostCard post={post} key={post.id} />)}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal title="Create a Post" onClose={() => setShowModal(false)}>
          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <label htmlFor="postCategory" className="form-label small">Category</label>
              <select id="postCategory" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {discussionCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="postTitle" className="form-label small">Title</label>
              <input id="postTitle" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="postDesc" className="form-label small">Description</label>
              <textarea id="postDesc" className="form-control" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-neon w-100">Post</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
