import { apiRequest } from '@/lib/api_client';

import type { CreateTaskInput, Task, UpdateTaskInput } from '../types';

export function listTasks(): Promise<Task[]> {
  return apiRequest<Task[]>('/api/tasks');
}

export function createTask(input: CreateTaskInput): Promise<Task> {
  return apiRequest<Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  return apiRequest<Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteTask(id: string): Promise<null> {
  return apiRequest<null>(`/api/tasks/${id}`, { method: 'DELETE' });
}

