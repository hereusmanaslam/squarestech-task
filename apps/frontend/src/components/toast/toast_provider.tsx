'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

import styles from './toast_provider.module.css';

export type ToastKind = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
};

type ToastContextValue = {
  push: (toast: Omit<Toast, 'id'>) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function randomId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = randomId();
    setToasts((prev) => [{ ...toast, id }, ...prev].slice(0, 4));
    const timeout = window.setTimeout(() => {
      timers.current.delete(id);
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
    timers.current.set(id, timeout);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.stack} aria-live="polite" aria-relevant="additions removals">
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${styles[t.kind]}`}>
            <div className={styles.title}>{t.title}</div>
            {t.message ? <div className={styles.message}>{t.message}</div> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

