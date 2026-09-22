import type { Game } from '../types';
import GameCard from './GameCard';

export default function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) return null;
  return (
    <div className="row g-4">
      {games.map((game) => (
        <div key={game.id} className="col-12 col-sm-6 col-lg-3">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}
