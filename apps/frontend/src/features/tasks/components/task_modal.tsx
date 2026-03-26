'use client';

import { useMemo, useState } from 'react';

import styles from './task_modal.module.css';
import { useToast } from '@/components/toast/toast_provider';
import type { Member } from '@/features/members/types';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../hooks/use_tasks';
import type { Task, TaskStatus } from '../types';

const statuses: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

export function TaskModal({
  task,
  members,
  onClose,
}: {
  task: Task;
  members: Member[];
  onClose: () => void;
}) {
  const toast = useToast();
  const createMutation = useCreateTaskMutation();
  const updateMutation = useUpdateTaskMutation();

  const isNew = task.id === 'new';

  const [form, setForm] = useState({
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    assigneeId: task.assigneeId ?? '',
  });

  const title = isNew ? 'New task' : 'Edit task';
  const subtitle = isNew ? 'Create a task on the board' : 'Update task details';

  const pending = createMutation.isPending || updateMutation.isPending;

  const assigneeOptions = useMemo(() => {
    return [
      { value: '', label: 'Unassigned' },
      ...members.map((m) => ({ value: m.id, label: `${m.firstName} ${m.lastName}` })),
    ];
  }, [members]);

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
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
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
              if (isNew) {
                await createMutation.mutateAsync({
                  title: form.title,
                  description: form.description ? form.description : null,
                  status: form.status,
                  assigneeId: form.assigneeId ? form.assigneeId : null,
                });
                toast.push({ kind: 'success', title: 'Task created' });
              } else {
                await updateMutation.mutateAsync({
                  id: task.id,
                  input: {
                    title: form.title,
                    description: form.description ? form.description : null,
                    status: form.status,
                    assigneeId: form.assigneeId ? form.assigneeId : null,
                  },
                });
                toast.push({ kind: 'success', title: 'Task updated' });
              }
              onClose();
            } catch (err) {
              toast.push({
                kind: 'error',
                title: isNew ? 'Could not create task' : 'Could not update task',
                message: err instanceof Error ? err.message : 'Request failed',
              });
            }
          }}
        >
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              className={styles.input}
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              required
              maxLength={120}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Description</span>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
              maxLength={2000}
              rows={4}
              placeholder="Optional. What’s the goal / acceptance criteria?"
            />
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Status</span>
              <select
                className={styles.select}
                value={form.status}
                onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as TaskStatus }))}
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Assignee</span>
              <select
                className={styles.select}
                value={form.assigneeId}
                onChange={(e) => setForm((s) => ({ ...s, assigneeId: e.target.value }))}
              >
                {assigneeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.footer}>
            <button className={styles.secondary} type="button" onClick={onClose} disabled={pending}>
              Cancel
            </button>
            <button className={styles.primary} type="submit" disabled={pending}>
              {pending ? 'Saving…' : isNew ? 'Create task' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

