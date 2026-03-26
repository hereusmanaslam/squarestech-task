import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateMemberDto } from './dto/create_member.dto';
import { UpdateMemberDto } from './dto/update_member.dto';
import { MemberEntity } from './member.entity';
import { MembersService } from './members.service';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOkResponse({ type: [MemberEntity] })
  list(): Promise<MemberEntity[]> {
    return this.membersService.list();
  }

  @Post()
  @ApiCreatedResponse({ type: MemberEntity })
  create(@Body() dto: CreateMemberDto): Promise<MemberEntity> {
    return this.membersService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MemberEntity })
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto): Promise<MemberEntity> {
    return this.membersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.membersService.remove(id);
  }
}
