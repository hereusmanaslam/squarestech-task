import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

import type { TaskStatus } from '../task.entity';

const statuses: TaskStatus[] = ['todo', 'in_progress', 'done'];

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Set up CI' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @ApiPropertyOptional({ example: 'Add lint + build checks' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string | null;

  @ApiPropertyOptional({ enum: statuses, example: 'in_progress' })
  @IsOptional()
  @IsIn(statuses)
  status?: TaskStatus;

  @ApiPropertyOptional({ example: '3b2d3a9a-6b2b-4df3-9c1a-1234567890ab', nullable: true })
  @IsOptional()
  @IsUUID()
  assigneeId?: string | null;
}
