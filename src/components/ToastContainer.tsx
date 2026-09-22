import { useToast } from '../contexts/ToastContext';

const iconFor = { success: 'bi-check-circle-fill', info: 'bi-info-circle-fill', warning: 'bi-exclamation-triangle-fill', danger: 'bi-x-circle-fill' };

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();
  return (
    <div className="gv-toast-container" role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((t) => (
        <div key={t.id} className={`gv-toast gv-toast-${t.variant}`}>
          <i className={`bi ${iconFor[t.variant]}`} aria-hidden="true" />
          <span>{t.message}</span>
          <button type="button" className="btn-close-toast" aria-label="Dismiss" onClick={() => dismissToast(t.id)}>
            <i className="bi bi-x" />
          </button>
        </div>
      ))}
    </div>
  );
}
