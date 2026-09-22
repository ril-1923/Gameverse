import type { LeaderboardPlayer } from '../types';
import SafeImage from './SafeImage';

export default function LeaderboardTable({ players }: { players: LeaderboardPlayer[] }) {
  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div>
      <div className="row g-3 mb-4">
        {top3.map((p) => (
          <div className="col-12 col-md-4" key={p.username}>
            <div className={`podium-card glass-card text-center rank-${p.rank} ${p.isCurrentUser ? 'is-you' : ''}`}>
              <div className="podium-rank">#{p.rank}</div>
              <SafeImage src={p.avatar} alt={p.username} className="podium-avatar" />
              <h5 className="mt-2 mb-0">{p.username}</h5>
              <p className="text-muted small mb-2">Level {p.level}</p>
              <p className="gradient-text fw-bold mb-0">{p.xp.toLocaleString()} XP</p>
            </div>
          </div>
        ))}
      </div>

      <div className="table-responsive glass-card p-2">
        <table className="table gv-table mb-0 align-middle">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player</th>
              <th scope="col">Level</th>
              <th scope="col">XP</th>
              <th scope="col">Games Played</th>
              <th scope="col">Achievements</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((p) => (
              <tr key={p.username} className={p.isCurrentUser ? 'is-you-row' : ''}>
                <td>#{p.rank}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <SafeImage src={p.avatar} alt={p.username} className="table-avatar" />
                    <span>{p.username}{p.isCurrentUser && <span className="badge-genre ms-2">You</span>}</span>
                  </div>
                </td>
                <td>{p.level}</td>
                <td>{p.xp.toLocaleString()}</td>
                <td>{p.gamesPlayed}</td>
                <td>{p.achievements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
