import { useState } from 'react';
import MiniGameShell from './MiniGameShell';
import { useAchievements } from '../../contexts/AchievementsContext';

type Cell = 'X' | 'O' | null;

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calculateWinner(board: Cell[]): Cell | 'draw' | null {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every((c) => c !== null) ? 'draw' : null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const { unlockAchievement } = useAchievements();

  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
    const result = calculateWinner(next);
    if (result === 'X' || result === 'O') {
      setScores((s) => ({ ...s, [result]: s[result] + 1 }));
      unlockAchievement('ach-9');
    } else if (result === 'draw') {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const status = winner === 'draw' ? "It's a draw!" : winner ? `Player ${winner} wins!` : `Player ${xIsNext ? 'X' : 'O'}'s turn`;

  return (
    <MiniGameShell title="Tic Tac Toe">
      <p className="text-center fw-semibold mb-3">{status}</p>
      <div className="ttt-board mx-auto">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            className={`ttt-cell ${cell ? `ttt-${cell}` : ''}`}
            onClick={() => handleClick(i)}
            aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ', empty'}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="d-flex justify-content-center gap-4 mt-4 small text-muted">
        <span>X wins: {scores.X}</span>
        <span>O wins: {scores.O}</span>
        <span>Draws: {scores.draws}</span>
      </div>
      <div className="text-center mt-3">
        <button type="button" className="btn btn-outline-neon" onClick={reset}>Reset Game</button>
      </div>
    </MiniGameShell>
  );
}
