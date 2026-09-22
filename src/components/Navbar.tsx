import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNotifications } from '../contexts/NotificationsContext';
import { useUser } from '../contexts/UserContext';
import SafeImage from './SafeImage';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/categories', label: 'Categories' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/community', label: 'Community' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { favorites } = useFavorites();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('navSearch') as HTMLInputElement;
    if (input.value.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.value.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="gv-navbar sticky-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid px-3 px-lg-4">
          <Link to="/" className="navbar-brand gv-brand">
            <i className="bi bi-controller me-2" aria-hidden="true" />
            Game<span className="gradient-text">Verse</span>
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
          </button>

          <div className={`gv-nav-collapse ${menuOpen ? 'is-open' : ''}`}>
            <ul className="navbar-nav me-auto gv-nav-links">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <form className="gv-search-form d-flex" role="search" onSubmit={handleSearchSubmit}>
              <label htmlFor="navSearch" className="visually-hidden">Search games</label>
              <input
                id="navSearch"
                name="navSearch"
                type="search"
                className="form-control"
                placeholder="Search games, categories..."
              />
              <button type="submit" className="btn btn-icon" aria-label="Search">
                <i className="bi bi-search" aria-hidden="true" />
              </button>
            </form>

            <div className="gv-nav-actions">
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-icon"
                  aria-label="Notifications"
                  onClick={() => { setShowNotifications((s) => !s); if (!showNotifications) markAllRead(); }}
                >
                  <i className="bi bi-bell" aria-hidden="true" />
                  {unreadCount > 0 && <span className="notif-dot" aria-hidden="true" />}
                </button>
                {showNotifications && (
                  <div className="notif-panel glass-card">
                    <h6 className="px-3 pt-3">Notifications</h6>
                    {notifications.length === 0 ? (
                      <p className="text-muted px-3 pb-3">No notifications yet.</p>
                    ) : (
                      <ul className="list-unstyled mb-0">
                        {notifications.slice(0, 6).map((n) => (
                          <li key={n.id} className="notif-item">
                            <strong>{n.title}</strong>
                            <p className="mb-0 small text-muted">{n.message}</p>
                            <span className="text-muted smaller">{n.time}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <Link to="/favorites" className="btn btn-icon position-relative" aria-label="Favorites" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-heart" aria-hidden="true" />
                {favorites.length > 0 && <span className="badge-count">{favorites.length}</span>}
              </Link>

              <Link to="/profile" className="gv-avatar-link" onClick={() => setMenuOpen(false)} aria-label="Profile">
                <SafeImage src={user.avatar} alt={user.username} className="gv-avatar" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
