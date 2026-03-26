import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    list(): Promise<TaskEntity[]>;
    create(dto: CreateTaskDto): Promise<TaskEntity>;
    update(id: string, dto: UpdateTaskDto): Promise<TaskEntity>;
    remove(id: string): Promise<void>;
}
