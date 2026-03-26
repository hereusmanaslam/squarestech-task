import { MemberEntity } from '../members/member.entity';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export declare class TaskEntity {
    id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    assigneeId: string | null;
    assignee?: MemberEntity | null;
    createdAt: Date;
    updatedAt: Date;
}
