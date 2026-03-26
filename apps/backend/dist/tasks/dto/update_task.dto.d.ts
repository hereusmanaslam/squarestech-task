import type { TaskStatus } from '../task.entity';
export declare class UpdateTaskDto {
    title?: string;
    description?: string | null;
    status?: TaskStatus;
    assigneeId?: string | null;
}
