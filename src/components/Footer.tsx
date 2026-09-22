import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gv-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="gv-brand mb-2">
              <i className="bi bi-controller me-2" aria-hidden="true" />
              Game<span className="gradient-text">Verse</span>
            </div>
            <p className="text-muted small">
              Your hub for discovering games, tracking achievements, and connecting with the community.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <h6>Explore</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6>Account</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/achievements">Achievements</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6>Play</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/play">Mini Games</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6>Follow</h6>
            <div className="d-flex gap-3 fs-5">
              <a href="#" aria-label="Discord" onClick={(e) => e.preventDefault()}><i className="bi bi-discord" /></a>
              <a href="#" aria-label="Twitter / X" onClick={(e) => e.preventDefault()}><i className="bi bi-twitter-x" /></a>
              <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()}><i className="bi bi-youtube" /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-muted small mb-0 text-center">&copy; {new Date().getFullYear()} GameVerse. All rights reserved. A fictional gaming showcase.</p>
      </div>
    </footer>
  );
}
