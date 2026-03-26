'use client';

import styles from './member_list.module.css';
import type { Member } from '../types';

export function MemberList({
  members,
  onEdit,
  onDelete,
  deletingId,
}: {
  members: Member[];
  onEdit: (m: Member) => void;
  onDelete: (m: Member) => void | Promise<void>;
  deletingId?: string;
}) {
  if (!members.length) {
    return <div className={styles.empty}>No members yet. Add the first one.</div>;
  }

  return (
    <ul className={styles.list}>
      {members.map((m) => (
        <li key={m.id} className={styles.item}>
          <div className={styles.main}>
            <div className={styles.name}>
              {m.firstName} {m.lastName}
            </div>
            <div className={styles.meta}>
              <span className={styles.pill}>{m.role}</span>
              <span className={styles.email}>{m.email}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.button} onClick={() => onEdit(m)}>
              Edit
            </button>
            <button
              className={styles.danger}
              onClick={() => onDelete(m)}
              disabled={deletingId === m.id}
            >
              {deletingId === m.id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

