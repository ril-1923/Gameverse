import type { Platform } from '../types';

const icons: Record<Platform, string> = {
  PC: 'bi-windows',
  PlayStation: 'bi-playstation',
  Xbox: 'bi-xbox',
  'Nintendo Switch': 'bi-nintendo-switch',
  Mobile: 'bi-phone',
};

export default function PlatformIcons({ platforms }: { platforms: Platform[] }) {
  return (
    <span className="platform-icons d-inline-flex gap-2">
      {platforms.map((p) => (
        <i key={p} className={`bi ${icons[p] ?? 'bi-controller'}`} title={p} aria-label={p} />
      ))}
    </span>
  );
}
