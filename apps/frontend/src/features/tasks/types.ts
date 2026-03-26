export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'status' | 'assigneeId'>;
export type UpdateTaskInput = Partial<CreateTaskInput>;

