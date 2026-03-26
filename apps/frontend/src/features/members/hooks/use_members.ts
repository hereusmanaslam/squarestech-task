'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createMember, deleteMember, listMembers, updateMember } from '../api/members_api';
import type { CreateMemberInput, UpdateMemberInput } from '../types';

const membersKey = ['members'] as const;

export function useMembersQuery() {
  return useQuery({
    queryKey: membersKey,
    queryFn: listMembers,
  });
}

export function useCreateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMemberInput) => createMember(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: membersKey });
    },
  });
}

export function useUpdateMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateMemberInput }) => updateMember(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: membersKey });
    },
  });
}

export function useDeleteMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: membersKey });
    },
  });
}

