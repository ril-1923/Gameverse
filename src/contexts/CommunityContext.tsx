import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialCommunityPosts } from '../data/misc';
import type { CommunityPost } from '../types';
import { useToast } from './ToastContext';

interface NewPostInput {
  title: string;
  description: string;
  category: string;
  username: string;
  avatar: string;
}

interface CommunityContextValue {
  posts: CommunityPost[];
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  createPost: (input: NewPostInput) => void;
}

const CommunityContext = createContext<CommunityContextValue | undefined>(undefined);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useLocalStorage<CommunityPost[]>('gv_community_posts', initialCommunityPosts);
  const { showToast } = useToast();

  const toggleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id
      ? { ...p, likedByUser: !p.likedByUser, likes: p.likes + (p.likedByUser ? -1 : 1) }
      : p)));
  };

  const toggleSave = (id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, savedByUser: !p.savedByUser } : p)));
    const post = posts.find((p) => p.id === id);
    showToast(post?.savedByUser ? 'Post removed from saved' : 'Post saved', 'info');
  };

  const createPost = (input: NewPostInput) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      category: input.category,
      username: input.username,
      avatar: input.avatar,
      title: input.title,
      description: input.description,
      likes: 0,
      comments: 0,
      time: 'Just now',
      likedByUser: false,
      savedByUser: false,
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast('Post created', 'success');
  };

  return (
    <CommunityContext.Provider value={{ posts, toggleLike, toggleSave, createPost }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error('useCommunity must be used within CommunityProvider');
  return ctx;
}
