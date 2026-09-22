import { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  icon: string;
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCard({ icon, value, suffix = '', label }: StatCardProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-card glass-card text-center" ref={ref}>
      <i className={`bi ${icon} stat-icon`} aria-hidden="true" />
      <div className="stat-value gradient-text">{display.toLocaleString()}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
