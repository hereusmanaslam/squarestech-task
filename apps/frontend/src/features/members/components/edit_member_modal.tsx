'use client';

import { useState } from 'react';

import styles from './edit_member_modal.module.css';
import { useToast } from '@/components/toast/toast_provider';
import { useUpdateMemberMutation } from '../hooks/use_members';
import type { Member, UpdateMemberInput } from '../types';

export function EditMemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const updateMutation = useUpdateMemberMutation();
  const toast = useToast();
  const [form, setForm] = useState<UpdateMemberInput>({
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    role: member.role,
  });

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>Edit member</div>
            <div className={styles.subtitle}>{member.email}</div>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await updateMutation.mutateAsync({ id: member.id, input: form });
              toast.push({ kind: 'success', title: 'Member updated' });
              onClose();
            } catch (err) {
              toast.push({
                kind: 'error',
                title: 'Could not update member',
                message: err instanceof Error ? err.message : 'Request failed',
              });
            }
          }}
        >
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>First name</span>
              <input
                className={styles.input}
                value={form.firstName ?? ''}
                onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                maxLength={80}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Last name</span>
              <input
                className={styles.input}
                value={form.lastName ?? ''}
                onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                maxLength={80}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              value={form.email ?? ''}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              maxLength={200}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Role</span>
            <input
              className={styles.input}
              value={form.role ?? ''}
              onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
              maxLength={120}
            />
          </label>

          {updateMutation.isError ? (
            <div className={styles.error}>
              {(updateMutation.error as Error).message || 'Failed to update member'}
            </div>
          ) : null}

          <div className={styles.footer}>
            <button className={styles.secondary} type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={styles.primary} type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

