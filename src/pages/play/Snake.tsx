import { useCallback, useEffect, useRef, useState } from 'react';
import MiniGameShell from './MiniGameShell';
import { useAchievements } from '../../contexts/AchievementsContext';

const GRID_SIZE = 16;
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function Snake() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(() => randomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const directionRef = useRef(direction);
  const { unlockAchievement } = useAchievements();

  useEffect(() => { directionRef.current = direction; }, [direction]);

  const reset = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood(INITIAL_SNAKE));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setStarted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = { ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT' };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      const opposite: Record<Direction, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
      if (opposite[dir] !== directionRef.current) setDirection(dir);
      if (!started) setStarted(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started]);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = window.setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const deltas: Record<Direction, Point> = { UP: { x: 0, y: -1 }, DOWN: { x: 0, y: 1 }, LEFT: { x: -1, y: 0 }, RIGHT: { x: 1, y: 0 } };
        const d = deltas[directionRef.current];
        const newHead = { x: head.x + d.x, y: head.y + d.y };

        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prev.some((s) => s.x === newHead.x && s.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prev];
        if (ateFood) {
          setScore((s) => {
            const newScore = s + 1;
            if (newScore > 20) unlockAchievement('ach-5');
            return newScore;
          });
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 140);
    return () => window.clearInterval(interval);
  }, [started, gameOver, food, unlockAchievement]);

  return (
    <MiniGameShell title="Snake">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-semibold">Score: {score}</span>
        <button type="button" className="btn btn-outline-neon btn-sm" onClick={reset}>
          {started ? 'Restart' : 'Start Game'}
        </button>
      </div>
      <div className="snake-board mx-auto" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          return <div key={i} className={`snake-cell ${isHead ? 'is-head' : isSnake ? 'is-snake' : ''} ${isFood ? 'is-food' : ''}`} />;
        })}
      </div>
      {!started && <p className="text-center text-muted mt-3">Use arrow keys to move. Press Start to begin.</p>}
      {gameOver && (
        <div className="text-center mt-3">
          <p className="fw-semibold text-danger mb-2">Game Over! Final score: {score}</p>
          <button type="button" className="btn btn-neon" onClick={reset}>Play Again</button>
        </div>
      )}
    </MiniGameShell>
  );
}
