import { useState } from 'react';
import MiniGameShell from './MiniGameShell';
import { quizQuestions } from '../../data/misc';
import { useAchievements } from '../../contexts/AchievementsContext';

export default function QuizChallenge() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const { unlockAchievement } = useAchievements();

  const question = quizQuestions[index];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= quizQuestions.length) {
      if (selected === question.correct && score + 1 === quizQuestions.length) unlockAchievement('ach-12');
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <MiniGameShell title="Quiz Challenge">
        <div className="text-center py-4">
          <i className="bi bi-trophy-fill display-3 text-warning" aria-hidden="true" />
          <h3 className="mt-3">You scored {score} / {quizQuestions.length}</h3>
          <p className="text-muted">{score === quizQuestions.length ? 'Perfect score! You are a true gaming expert.' : 'Nice effort — try again to beat your score.'}</p>
          <button type="button" className="btn btn-neon mt-2" onClick={restart}>Play Again</button>
        </div>
      </MiniGameShell>
    );
  }

  return (
    <MiniGameShell title="Quiz Challenge">
      <div className="d-flex justify-content-between small text-muted mb-3">
        <span>Question {index + 1} / {quizQuestions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="xp-bar mb-4"><div className="xp-bar-fill" style={{ width: `${(index / quizQuestions.length) * 100}%` }} /></div>
      <h5 className="mb-4">{question.question}</h5>
      <div className="d-flex flex-column gap-2">
        {question.answers.map((answer, i) => {
          const isCorrect = i === question.correct;
          const isSelected = i === selected;
          let cls = 'quiz-answer-btn';
          if (selected !== null) {
            if (isCorrect) cls += ' is-correct';
            else if (isSelected) cls += ' is-wrong';
          }
          return (
            <button key={answer} type="button" className={cls} onClick={() => handleAnswer(i)} disabled={selected !== null}>
              {answer}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="text-center mt-4">
          <button type="button" className="btn btn-neon" onClick={next}>
            {index + 1 >= quizQuestions.length ? 'See Results' : 'Next Question'}
          </button>
        </div>
      )}
    </MiniGameShell>
  );
}
