import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create_member.dto';
import { UpdateMemberDto } from './dto/update_member.dto';
import { MemberEntity } from './member.entity';
export declare class MembersService {
    private readonly membersRepo;
    constructor(membersRepo: Repository<MemberEntity>);
    list(): Promise<MemberEntity[]>;
    create(dto: CreateMemberDto): Promise<MemberEntity>;
    update(id: string, dto: UpdateMemberDto): Promise<MemberEntity>;
    remove(id: string): Promise<void>;
}
