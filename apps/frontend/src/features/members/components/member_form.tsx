'use client';

import { useState } from 'react';

import styles from './member_form.module.css';
import { useToast } from '@/components/toast/toast_provider';
import { useCreateMemberMutation } from '../hooks/use_members';
import type { CreateMemberInput } from '../types';

const empty: CreateMemberInput = { firstName: '', lastName: '', email: '', role: '' };

export function MemberForm() {
  const createMutation = useCreateMemberMutation();
  const [form, setForm] = useState<CreateMemberInput>(empty);
  const toast = useToast();

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createMutation.mutateAsync(form);
          setForm(empty);
          toast.push({ kind: 'success', title: 'Member added' });
        } catch (err) {
          toast.push({
            kind: 'error',
            title: 'Could not add member',
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
            value={form.firstName}
            onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
            required
            maxLength={80}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Last name</span>
          <input
            className={styles.input}
            value={form.lastName}
            onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
            required
            maxLength={80}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
          maxLength={200}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Role</span>
        <input
          className={styles.input}
          value={form.role}
          onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
          required
          maxLength={120}
        />
      </label>

      {createMutation.isError ? (
        <div className={styles.error}>
          {(createMutation.error as Error).message || 'Failed to create member'}
        </div>
      ) : null}

      <button className={styles.submit} type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Adding…' : 'Add member'}
      </button>
    </form>
  );
}

