import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMemberDto {
  @ApiPropertyOptional({ example: 'Ada' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Lovelace' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  lastName?: string;

  @ApiPropertyOptional({ example: 'ada@squarestech.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  email?: string;

  @ApiPropertyOptional({ example: 'Frontend Engineer' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  role?: string;
}
