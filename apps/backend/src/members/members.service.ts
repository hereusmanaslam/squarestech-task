import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMemberDto } from './dto/create_member.dto';
import { UpdateMemberDto } from './dto/update_member.dto';
import { MemberEntity } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly membersRepo: Repository<MemberEntity>,
  ) {}

  async list(): Promise<MemberEntity[]> {
    return this.membersRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateMemberDto): Promise<MemberEntity> {
    const existing = await this.membersRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const entity = this.membersRepo.create(dto);
    return this.membersRepo.save(entity);
  }

  async update(id: string, dto: UpdateMemberDto): Promise<MemberEntity> {
    const entity = await this.membersRepo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Member not found');
    }

    if (dto.email && dto.email !== entity.email) {
      const existing = await this.membersRepo.findOne({ where: { email: dto.email } });
      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(entity, dto);
    return this.membersRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const res = await this.membersRepo.delete({ id });
    if (!res.affected) {
      throw new NotFoundException('Member not found');
    }
  }
}
