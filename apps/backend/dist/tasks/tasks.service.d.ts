import { Repository } from 'typeorm';
import { MemberEntity } from '../members/member.entity';
import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { TaskEntity } from './task.entity';
export declare class TasksService {
    private readonly tasksRepo;
    private readonly membersRepo;
    constructor(tasksRepo: Repository<TaskEntity>, membersRepo: Repository<MemberEntity>);
    list(): Promise<TaskEntity[]>;
    create(dto: CreateTaskDto): Promise<TaskEntity>;
    update(id: string, dto: UpdateTaskDto): Promise<TaskEntity>;
    remove(id: string): Promise<void>;
}
