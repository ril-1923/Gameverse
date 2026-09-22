import { useEffect, useState } from 'react';
import MiniGameShell from './MiniGameShell';
import { useAchievements } from '../../contexts/AchievementsContext';

const ICONS = ['bi-controller', 'bi-joystick', 'bi-dpad-fill', 'bi-trophy-fill', 'bi-lightning-fill', 'bi-star-fill', 'bi-heart-fill', 'bi-gem'];

interface CardData {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(): CardData[] {
  const pairs = [...ICONS, ...ICONS];
  return pairs
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardData[]>(buildDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const { unlockAchievement } = useAchievements();

  const allMatched = cards.every((c) => c.matched);

  useEffect(() => {
    if (!running || allMatched) return;
    const interval = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(interval);
  }, [running, allMatched]);

  useEffect(() => {
    if (allMatched) {
      setRunning(false);
      if (moves <= 20) unlockAchievement('ach-11');
    }
  }, [allMatched, moves, unlockAchievement]);

  const handleFlip = (id: number) => {
    if (selected.length === 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newSelected = [...selected, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newSelected;
      const first = cards.find((c) => c.id === firstId);
      const second = card;
      if (first && first.icon === second.icon) {
        setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, matched: true } : c)));
        setSelected([]);
      } else {
        window.setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c)));
          setSelected([]);
        }, 700);
      }
    }
  };

  const reset = () => {
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setSeconds(0);
    setRunning(true);
  };

  return (
    <MiniGameShell title="Memory Match">
      <div className="d-flex justify-content-between mb-3">
        <span className="small text-muted">Moves: {moves}</span>
        <span className="small text-muted">Time: {seconds}s</span>
        <button type="button" className="btn btn-outline-neon btn-sm" onClick={reset}>Restart</button>
      </div>
      <div className="memory-grid mx-auto">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`memory-card ${card.flipped || card.matched ? 'is-flipped' : ''} ${card.matched ? 'is-matched' : ''}`}
            onClick={() => handleFlip(card.id)}
            aria-label={card.flipped || card.matched ? `Card showing ${card.icon}` : 'Hidden card'}
          >
            <div className="memory-card-inner">
              <div className="memory-card-front"><i className="bi bi-question-lg" /></div>
              <div className="memory-card-back"><i className={`bi ${card.icon}`} /></div>
            </div>
          </button>
        ))}
      </div>
      {allMatched && (
        <p className="text-center fw-semibold mt-4 gradient-text">You matched every pair in {moves} moves and {seconds}s!</p>
      )}
    </MiniGameShell>
  );
}
