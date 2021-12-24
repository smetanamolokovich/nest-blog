import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'example@hello.com', description: 'User email' })
  @IsString({ message: 'must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'true', description: 'Is use banned' })
  @IsBoolean({ message: 'must be boolean' })
  readonly banned: boolean;

  @ApiProperty({ example: 'Some reason', description: 'Ban reason' })
  @IsString({ message: 'must be string' })
  readonly banReason: string;
}
