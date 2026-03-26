import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MemberEntity } from '../members/member.entity';
import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepo: Repository<TaskEntity>,
    @InjectRepository(MemberEntity)
    private readonly membersRepo: Repository<MemberEntity>,
  ) {}

  async list(): Promise<TaskEntity[]> {
    return this.tasksRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateTaskDto): Promise<TaskEntity> {
    const assigneeId = dto.assigneeId ?? null;
    if (assigneeId) {
      const assignee = await this.membersRepo.findOne({ where: { id: assigneeId } });
      if (!assignee) throw new BadRequestException('Assignee does not exist');
    }

    const entity = this.tasksRepo.create({
      title: dto.title,
      description: dto.description ?? null,
      status: dto.status,
      assigneeId,
    });
    return this.tasksRepo.save(entity);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<TaskEntity> {
    const entity = await this.tasksRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Task not found');

    if (dto.assigneeId !== undefined) {
      const assigneeId = dto.assigneeId ?? null;
      if (assigneeId) {
        const assignee = await this.membersRepo.findOne({ where: { id: assigneeId } });
        if (!assignee) throw new BadRequestException('Assignee does not exist');
      }
      entity.assigneeId = assigneeId;
    }

    if (dto.title !== undefined) entity.title = dto.title;
    if (dto.description !== undefined) entity.description = dto.description ?? null;
    if (dto.status !== undefined) entity.status = dto.status;

    return this.tasksRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const res = await this.tasksRepo.delete({ id });
    if (!res.affected) throw new NotFoundException('Task not found');
  }
}
