import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function MiniGameShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container py-5">
      <Link to="/play" className="link-neon d-inline-flex align-items-center gap-1 mb-3">
        <i className="bi bi-arrow-left" aria-hidden="true" /> All Mini Games
      </Link>
      <h1 className="section-title mb-4">{title}</h1>
      <div className="minigame-shell glass-card">{children}</div>
    </div>
  );
}
