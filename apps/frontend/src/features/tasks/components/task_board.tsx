'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import styles from './task_board.module.css';
import { ConfirmDialog } from '@/components/modal/confirm_dialog';
import { useToast } from '@/components/toast/toast_provider';
import { useMembersQuery } from '@/features/members/hooks/use_members';
import type { Member } from '@/features/members/types';
import { useDeleteTaskMutation, useTasksQuery, useUpdateTaskMutation } from '../hooks/use_tasks';
import type { Task, TaskStatus } from '../types';

const TaskModal = dynamic(
  () => import('./task_modal').then((m) => m.TaskModal),
  { ssr: false, loading: () => null },
);

const columns: { key: TaskStatus; title: string; hint: string }[] = [
  { key: 'todo', title: 'To do', hint: 'Unstarted' },
  { key: 'in_progress', title: 'In progress', hint: 'Currently being worked on' },
  { key: 'done', title: 'Done', hint: 'Completed' },
];

function groupByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  return {
    todo: tasks.filter((t) => t.status === 'todo'),
    in_progress: tasks.filter((t) => t.status === 'in_progress'),
    done: tasks.filter((t) => t.status === 'done'),
  };
}

function memberNameById(members: Member[], id: string | null): string | null {
  if (!id) return null;
  const m = members.find((x) => x.id === id);
  if (!m) return null;
  return `${m.firstName} ${m.lastName}`;
}

export function TaskBoard() {
  const toast = useToast();
  const tasksQuery = useTasksQuery();
  const membersQuery = useMembersQuery();

  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<Task | null>(null);

  const tasks = useMemo(() => tasksQuery.data ?? [], [tasksQuery.data]);
  const grouped = useMemo(() => groupByStatus(tasks), [tasks]);
  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data]);

  const isLoading = tasksQuery.isLoading || membersQuery.isLoading;
  const isError = tasksQuery.isError || membersQuery.isError;

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Task Board</h2>
          <p className={styles.subtitle}>
            Create tasks, assign them to members, and move them across statuses.
          </p>
        </div>
        <button
          className={styles.newButton}
          onClick={() =>
            setEditingTask({
              id: 'new',
              title: '',
              description: null,
              status: 'todo',
              assigneeId: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          }
        >
          New task
        </button>
      </div>

      {isLoading ? <div className={styles.state}>Loading…</div> : null}
      {isError ? (
        <div className={styles.stateError}>
          Failed to load tasks.{' '}
          <button className={styles.linkButton} onClick={() => void tasksQuery.refetch()}>
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className={styles.grid}>
          {columns.map((c) => {
            const items = grouped[c.key];
            return (
              <div key={c.key} className={styles.column}>
                <div className={styles.columnHeader}>
                  <div>
                    <div className={styles.columnTitle}>{c.title}</div>
                    <div className={styles.columnHint}>{c.hint}</div>
                  </div>
                  <div className={styles.counter}>{items.length}</div>
                </div>

                <div className={styles.cards}>
                  {items.length ? null : <div className={styles.empty}>No tasks</div>}

                  {items.map((t) => (
                    <div key={t.id} className={styles.card}>
                      <div className={styles.cardTop}>
                        <div className={styles.cardTitle}>{t.title}</div>
                        <div className={styles.cardActions}>
                          <button className={styles.smallButton} onClick={() => setEditingTask(t)}>
                            Edit
                          </button>
                          <button className={styles.smallDanger} onClick={() => setConfirmDeleteTask(t)}>
                            Delete
                          </button>
                        </div>
                      </div>

                      {t.description ? <div className={styles.cardDescription}>{t.description}</div> : null}

                      <div className={styles.cardMeta}>
                        <span className={styles.assignee}>
                          {memberNameById(members, t.assigneeId) ?? 'Unassigned'}
                        </span>
                        <div className={styles.move}>
                          {c.key !== 'todo' ? (
                            <button
                              className={styles.pill}
                              disabled={updateTaskMutation.isPending}
                              onClick={async () => {
                                try {
                                  await updateTaskMutation.mutateAsync({ id: t.id, input: { status: 'todo' } });
                                  toast.push({ kind: 'info', title: 'Moved to To do' });
                                } catch (err) {
                                  toast.push({
                                    kind: 'error',
                                    title: 'Could not move task',
                                    message: err instanceof Error ? err.message : 'Request failed',
                                  });
                                }
                              }}
                            >
                              To do
                            </button>
                          ) : null}
                          {c.key !== 'in_progress' ? (
                            <button
                              className={styles.pill}
                              disabled={updateTaskMutation.isPending}
                              onClick={async () => {
                                try {
                                  await updateTaskMutation.mutateAsync({
                                    id: t.id,
                                    input: { status: 'in_progress' },
                                  });
                                  toast.push({ kind: 'info', title: 'Moved to In progress' });
                                } catch (err) {
                                  toast.push({
                                    kind: 'error',
                                    title: 'Could not move task',
                                    message: err instanceof Error ? err.message : 'Request failed',
                                  });
                                }
                              }}
                            >
                              In progress
                            </button>
                          ) : null}
                          {c.key !== 'done' ? (
                            <button
                              className={styles.pill}
                              disabled={updateTaskMutation.isPending}
                              onClick={async () => {
                                try {
                                  await updateTaskMutation.mutateAsync({ id: t.id, input: { status: 'done' } });
                                  toast.push({ kind: 'info', title: 'Moved to Done' });
                                } catch (err) {
                                  toast.push({
                                    kind: 'error',
                                    title: 'Could not move task',
                                    message: err instanceof Error ? err.message : 'Request failed',
                                  });
                                }
                              }}
                            >
                              Done
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <ConfirmDialog
        open={!!confirmDeleteTask}
        title="Delete task?"
        description={confirmDeleteTask ? `This will permanently remove “${confirmDeleteTask.title}”.` : undefined}
        confirmText="Delete"
        cancelText="Cancel"
        danger
        pending={deleteTaskMutation.isPending}
        onCancel={() => setConfirmDeleteTask(null)}
        onConfirm={async () => {
          if (!confirmDeleteTask) return;
          try {
            await deleteTaskMutation.mutateAsync(confirmDeleteTask.id);
            toast.push({ kind: 'success', title: 'Task deleted' });
            setConfirmDeleteTask(null);
          } catch (err) {
            toast.push({
              kind: 'error',
              title: 'Could not delete task',
              message: err instanceof Error ? err.message : 'Request failed',
            });
          }
        }}
      />

      {editingTask ? (
        <TaskModal
          task={editingTask}
          members={members}
          onClose={() => setEditingTask(null)}
        />
      ) : null}
    </section>
  );
}

