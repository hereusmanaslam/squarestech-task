import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: 'Ada' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  firstName!: string;

  @ApiProperty({ example: 'Lovelace' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  lastName!: string;

  @ApiProperty({ example: 'ada@squarestech.com' })
  @IsEmail()
  @MaxLength(200)
  email!: string;

  @ApiProperty({ example: 'Frontend Engineer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  role!: string;
}
