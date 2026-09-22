export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5" role="status">
      <div className="loading-spinner" aria-hidden="true" />
      <span className="text-muted mt-3">{label}</span>
    </div>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="empty-state text-center py-5">
      <i className={`bi ${icon}`} aria-hidden="true" />
      <h4 className="mt-3">{title}</h4>
      <p className="text-muted">{message}</p>
      {action && (
        <button type="button" className="btn btn-neon mt-2" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
