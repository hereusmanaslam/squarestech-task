import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create_task.dto';
import { UpdateTaskDto } from './dto/update_task.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: [TaskEntity] })
  list(): Promise<TaskEntity[]> {
    return this.tasksService.list();
  }

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() dto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskEntity })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<TaskEntity> {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
  }
}
