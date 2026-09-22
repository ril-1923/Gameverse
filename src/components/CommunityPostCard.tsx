import type { CommunityPost } from '../types';
import SafeImage from './SafeImage';
import { useCommunity } from '../contexts/CommunityContext';

export default function CommunityPostCard({ post }: { post: CommunityPost }) {
  const { toggleLike, toggleSave } = useCommunity();

  return (
    <div className="community-post glass-card">
      <div className="d-flex align-items-center gap-3 mb-2">
        <SafeImage src={post.avatar} alt={post.username} className="review-avatar" />
        <div>
          <div className="fw-semibold">{post.username}</div>
          <div className="text-muted smaller">{post.category} &middot; {post.time}</div>
        </div>
      </div>
      <h5>{post.title}</h5>
      <p className="text-muted-light">{post.description}</p>
      <div className="d-flex gap-3">
        <button
          type="button"
          className={`btn btn-sm btn-ghost ${post.likedByUser ? 'is-active' : ''}`}
          onClick={() => toggleLike(post.id)}
          aria-pressed={post.likedByUser}
        >
          <i className={`bi ${post.likedByUser ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`} aria-hidden="true" /> {post.likes}
        </button>
        <button type="button" className="btn btn-sm btn-ghost" disabled>
          <i className="bi bi-chat" aria-hidden="true" /> {post.comments}
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-ghost ms-auto ${post.savedByUser ? 'is-active' : ''}`}
          onClick={() => toggleSave(post.id)}
          aria-pressed={post.savedByUser}
        >
          <i className={`bi ${post.savedByUser ? 'bi-bookmark-fill' : 'bi-bookmark'}`} aria-hidden="true" /> Save
        </button>
      </div>
    </div>
  );
}
