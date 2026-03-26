import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

import type { TaskStatus } from '../task.entity';

const statuses: TaskStatus[] = ['todo', 'in_progress', 'done'];

export class CreateTaskDto {
  @ApiProperty({ example: 'Set up CI' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @ApiPropertyOptional({ example: 'Add lint + build checks' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ enum: statuses, example: 'todo' })
  @IsIn(statuses)
  status!: TaskStatus;

  @ApiPropertyOptional({ example: '3b2d3a9a-6b2b-4df3-9c1a-1234567890ab' })
  @IsOptional()
  @IsUUID()
  assigneeId?: string | null;
}
