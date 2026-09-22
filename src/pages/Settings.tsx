import { useSettings } from '../contexts/SettingsContext';
import { useToast } from '../contexts/ToastContext';
import { usePageMeta } from '../hooks/usePageMeta';

const accents: { key: 'purple' | 'blue' | 'cyan' | 'pink'; label: string }[] = [
  { key: 'purple', label: 'Neon Purple' },
  { key: 'blue', label: 'Electric Blue' },
  { key: 'cyan', label: 'Cyan' },
  { key: 'pink', label: 'Magenta Pink' },
];

export default function Settings() {
  usePageMeta('Settings', 'Manage your GameVerse appearance, notifications, and privacy settings.');
  const { settings, updateSettings } = useSettings();
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved', 'success');
  };

  return (
    <div className="container py-5" style={{ maxWidth: 760 }}>
      <h1 className="section-title mb-4">Settings</h1>
      <form onSubmit={handleSave}>
        <section className="glass-card mb-4">
          <h5 className="mb-3">Appearance</h5>
          <div className="mb-3">
            <span className="form-label small d-block">Theme</span>
            <div className="btn-group" role="group" aria-label="Theme selection">
              <button type="button" className={`btn btn-toggle ${settings.theme === 'dark' ? 'is-active' : ''}`} onClick={() => updateSettings({ theme: 'dark' })}>
                <i className="bi bi-moon-stars-fill me-1" />Dark Mode
              </button>
              <button type="button" className={`btn btn-toggle ${settings.theme === 'light' ? 'is-active' : ''}`} onClick={() => updateSettings({ theme: 'light' })}>
                <i className="bi bi-sun-fill me-1" />Light Mode
              </button>
            </div>
          </div>
          <div>
            <span className="form-label small d-block">Accent Preference</span>
            <div className="d-flex flex-wrap gap-2">
              {accents.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  className={`filter-chip accent-${a.key} ${settings.accent === a.key ? 'is-active' : ''}`}
                  onClick={() => updateSettings({ accent: a.key })}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card mb-4">
          <h5 className="mb-3">Notifications</h5>
          <ToggleRow
            label="Game updates"
            checked={settings.notifyGameUpdates}
            onChange={(v) => updateSettings({ notifyGameUpdates: v })}
          />
          <ToggleRow
            label="Community notifications"
            checked={settings.notifyCommunity}
            onChange={(v) => updateSettings({ notifyCommunity: v })}
          />
          <ToggleRow
            label="Achievement notifications"
            checked={settings.notifyAchievements}
            onChange={(v) => updateSettings({ notifyAchievements: v })}
          />
        </section>

        <section className="glass-card mb-4">
          <h5 className="mb-3">Privacy</h5>
          <ToggleRow
            label="Public profile"
            checked={settings.publicProfile}
            onChange={(v) => updateSettings({ publicProfile: v })}
          />
          <ToggleRow
            label="Show activity"
            checked={settings.showActivity}
            onChange={(v) => updateSettings({ showActivity: v })}
          />
        </section>

        <button type="submit" className="btn btn-neon">Save Settings</button>
      </form>
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="form-check form-switch d-flex justify-content-between align-items-center py-2 toggle-row">
      <label className="form-check-label" htmlFor={`toggle-${label}`}>{label}</label>
      <input
        id={`toggle-${label}`}
        className="form-check-input"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
