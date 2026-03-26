import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MemberEntity } from '../members/member.entity';

export type TaskStatus = 'todo' | 'in_progress' | 'done';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'title', type: 'text' })
  @Index()
  title!: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'status', type: 'text' })
  status!: TaskStatus;

  @Column({ name: 'assignee_id', type: 'text', nullable: true })
  @Index()
  assigneeId!: string | null;

  @ManyToOne(() => MemberEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignee_id' })
  assignee?: MemberEntity | null;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}
