import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'members' })
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName!: string;

  @Column({ name: 'email', type: 'text', unique: true })
  email!: string;

  @Column({ name: 'role', type: 'text' })
  role!: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt!: Date;
}
