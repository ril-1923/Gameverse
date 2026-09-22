import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  size?: 'md' | 'lg';
}

export default function Modal({ title, onClose, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="gv-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className={`gv-modal glass-card gv-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Dialog'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gv-modal-header">
          {title && <h5 className="mb-0">{title}</h5>}
          <button type="button" className="btn-close-toast" aria-label="Close dialog" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="gv-modal-body">{children}</div>
      </div>
    </div>
  );
}
