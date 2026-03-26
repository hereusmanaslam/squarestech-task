'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

import styles from './team_directory_page.module.css';
import { ConfirmDialog } from '@/components/modal/confirm_dialog';
import { useToast } from '@/components/toast/toast_provider';
import { MemberForm } from '@/features/members/components/member_form';
import { MemberList } from '@/features/members/components/member_list';
import { useDeleteMemberMutation, useMembersQuery } from '@/features/members/hooks/use_members';
import { TaskBoard } from '@/features/tasks/components/task_board';
import type { Member } from '@/features/members/types';

const EditMemberModal = dynamic(
  () => import('@/features/members/components/edit_member_modal').then((m) => m.EditMemberModal),
  { ssr: false, loading: () => null },
);

export function TeamDirectoryPage() {
  const membersQuery = useMembersQuery();
  const deleteMutation = useDeleteMemberMutation();
  const toast = useToast();

  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [confirmDeleteMember, setConfirmDeleteMember] = useState<Member | null>(null);

  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Team Directory</h1>
          <p className={styles.subtitle}>
            Full CRUD synced with the backend API. Edit opens a lazy-loaded modal.
          </p>
        </div>
        <a className={styles.docsLink} href="http://localhost:3001/docs" target="_blank" rel="noreferrer">
          API Docs
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Add member</h2>
          <MemberForm />
        </section>

        <section className={styles.card}>
          <div className={styles.listHeader}>
            <h2 className={styles.cardTitle}>Members</h2>
            {membersQuery.isFetching ? <span className={styles.badge}>Refreshing…</span> : null}
          </div>

          {membersQuery.isLoading ? <div className={styles.state}>Loading…</div> : null}
          {membersQuery.isError ? (
            <div className={styles.stateError}>
              Failed to load members.{' '}
              <button className={styles.linkButton} onClick={() => membersQuery.refetch()}>
                Retry
              </button>
            </div>
          ) : null}

          {!membersQuery.isLoading && !membersQuery.isError ? (
            <MemberList
              members={members}
              onEdit={(m) => setEditingMember(m)}
              onDelete={(m) => setConfirmDeleteMember(m)}
              deletingId={deleteMutation.variables}
            />
          ) : null}
        </section>
      </main>

      <TaskBoard />

      <ConfirmDialog
        open={!!confirmDeleteMember}
        title="Delete member?"
        description={
          confirmDeleteMember
            ? `This will permanently remove ${confirmDeleteMember.firstName} ${confirmDeleteMember.lastName} from the directory.`
            : undefined
        }
        confirmText="Delete"
        cancelText="Cancel"
        danger
        pending={deleteMutation.isPending}
        onCancel={() => setConfirmDeleteMember(null)}
        onConfirm={async () => {
          if (!confirmDeleteMember) return;
          try {
            await deleteMutation.mutateAsync(confirmDeleteMember.id);
            toast.push({ kind: 'success', title: 'Member deleted' });
            setConfirmDeleteMember(null);
          } catch (err) {
            toast.push({
              kind: 'error',
              title: 'Could not delete member',
              message: err instanceof Error ? err.message : 'Request failed',
            });
          }
        }}
      />

      {editingMember ? (
        <EditMemberModal member={editingMember} onClose={() => setEditingMember(null)} />
      ) : null}
    </div>
  );
}

