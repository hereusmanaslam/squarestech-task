'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, deleteTask, listTasks, updateTask } from '../api/tasks_api';
import type { CreateTaskInput, UpdateTaskInput } from '../types';

const tasksKey = ['tasks'] as const;

export function useTasksQuery() {
  return useQuery({
    queryKey: tasksKey,
    queryFn: listTasks,
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKey });
    },
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) => updateTask(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKey });
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksKey });
    },
  });
}

