import { CreateMemberDto } from './dto/create_member.dto';
import { UpdateMemberDto } from './dto/update_member.dto';
import { MemberEntity } from './member.entity';
import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    list(): Promise<MemberEntity[]>;
    create(dto: CreateMemberDto): Promise<MemberEntity>;
    update(id: string, dto: UpdateMemberDto): Promise<MemberEntity>;
    remove(id: string): Promise<void>;
}
