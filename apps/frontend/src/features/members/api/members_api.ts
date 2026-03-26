import { apiRequest } from '@/lib/api_client';

import type { CreateMemberInput, Member, UpdateMemberInput } from '../types';

export function listMembers(): Promise<Member[]> {
  return apiRequest<Member[]>('/api/members');
}

export function createMember(input: CreateMemberInput): Promise<Member> {
  return apiRequest<Member>('/api/members', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateMember(id: string, input: UpdateMemberInput): Promise<Member> {
  return apiRequest<Member>(`/api/members/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteMember(id: string): Promise<null> {
  return apiRequest<null>(`/api/members/${id}`, {
    method: 'DELETE',
  });
}

