import { useState } from 'react';
import MiniGameShell from './MiniGameShell';
import { useAchievements } from '../../contexts/AchievementsContext';

type Choice = 'Rock' | 'Paper' | 'Scissors';
const choices: Choice[] = ['Rock', 'Paper', 'Scissors'];
const icons: Record<Choice, string> = { Rock: 'bi-hand-index-thumb-fill', Paper: 'bi-file-earmark-fill', Scissors: 'bi-scissors' };

function decideWinner(player: Choice, computer: Choice): 'win' | 'lose' | 'draw' {
  if (player === computer) return 'draw';
  const beats: Record<Choice, Choice> = { Rock: 'Scissors', Paper: 'Rock', Scissors: 'Paper' };
  return beats[player] === computer ? 'win' : 'lose';
}

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 });
  const { unlockAchievement } = useAchievements();

  const play = (choice: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const outcome = decideWinner(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(outcome === 'win' ? 'You win this round!' : outcome === 'lose' ? 'Computer wins this round.' : "It's a draw!");
    setScores((s) => {
      const next = {
        wins: s.wins + (outcome === 'win' ? 1 : 0),
        losses: s.losses + (outcome === 'lose' ? 1 : 0),
        draws: s.draws + (outcome === 'draw' ? 1 : 0),
      };
      if (next.wins >= 5) unlockAchievement('ach-10');
      return next;
    });
  };

  return (
    <MiniGameShell title="Rock Paper Scissors">
      <p className="text-center text-muted mb-4">Choose your move against the computer.</p>
      <div className="d-flex justify-content-center gap-3 mb-4">
        {choices.map((c) => (
          <button key={c} type="button" className="rps-choice-btn" onClick={() => play(c)} aria-label={`Choose ${c}`}>
            <i className={`bi ${icons[c]}`} aria-hidden="true" />
            <span>{c}</span>
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="rps-result glass-card mb-4 mx-auto">
          <div className="d-flex justify-content-around align-items-center text-center">
            <div>
              <i className={`bi ${icons[playerChoice]} rps-result-icon`} aria-hidden="true" />
              <p className="mb-0 small">You: {playerChoice}</p>
            </div>
            <span className="fw-bold">VS</span>
            <div>
              <i className={`bi ${icons[computerChoice]} rps-result-icon`} aria-hidden="true" />
              <p className="mb-0 small">CPU: {computerChoice}</p>
            </div>
          </div>
          <p className="text-center fw-semibold mt-3 mb-0">{result}</p>
        </div>
      )}

      <div className="d-flex justify-content-center gap-4 small text-muted">
        <span>Wins: {scores.wins}</span>
        <span>Losses: {scores.losses}</span>
        <span>Draws: {scores.draws}</span>
      </div>
    </MiniGameShell>
  );
}
