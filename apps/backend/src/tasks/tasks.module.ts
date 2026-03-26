import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberEntity } from '../members/member.entity';
import { TaskEntity } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, MemberEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
