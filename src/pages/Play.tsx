import { Link, Route, Routes } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import TicTacToe from './play/TicTacToe';
import Snake from './play/Snake';
import RockPaperScissors from './play/RockPaperScissors';
import MemoryMatch from './play/MemoryMatch';
import QuizChallenge from './play/QuizChallenge';

const miniGames = [
  { path: 'tic-tac-toe', name: 'Tic Tac Toe', icon: 'bi-grid-3x3', desc: 'Classic two-player strategy game.' },
  { path: 'snake', name: 'Snake', icon: 'bi-controller', desc: 'Guide the snake and grow as long as you can.' },
  { path: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: 'bi-hand-index-thumb', desc: 'Beat the computer in this timeless game.' },
  { path: 'memory-match', name: 'Memory Match', icon: 'bi-brain', desc: 'Flip cards and find every matching pair.' },
  { path: 'quiz-challenge', name: 'Quiz Challenge', icon: 'bi-patch-question', desc: 'Test your gaming trivia knowledge.' },
];

function PlayHub() {
  usePageMeta('Play', 'Play free browser mini-games on GameVerse.');
  return (
    <div className="container py-5">
      <h1 className="section-title mb-2">Mini Games</h1>
      <p className="text-muted mb-4">Take a break and play a quick game right in your browser.</p>
      <div className="row g-4">
        {miniGames.map((g) => (
          <div className="col-12 col-sm-6 col-lg-4" key={g.path}>
            <Link to={g.path} className="minigame-card glass-card d-block h-100 text-center">
              <i className={`bi ${g.icon} minigame-icon`} aria-hidden="true" />
              <h5 className="mt-3">{g.name}</h5>
              <p className="text-muted small">{g.desc}</p>
              <span className="btn btn-neon btn-sm">Play Now</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Play() {
  return (
    <Routes>
      <Route index element={<PlayHub />} />
      <Route path="tic-tac-toe" element={<TicTacToe />} />
      <Route path="snake" element={<Snake />} />
      <Route path="rock-paper-scissors" element={<RockPaperScissors />} />
      <Route path="memory-match" element={<MemoryMatch />} />
      <Route path="quiz-challenge" element={<QuizChallenge />} />
    </Routes>
  );
}
