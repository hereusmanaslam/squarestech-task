'use client';

import styles from './confirm_dialog.module.css';

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  pending = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  pending?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        {description ? <div className={styles.description}>{description}</div> : null}

        <div className={styles.footer}>
          <button className={styles.secondary} onClick={onCancel} disabled={pending}>
            {cancelText}
          </button>
          <button
            className={`${styles.primary} ${danger ? styles.danger : ''}`}
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? 'Working…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

