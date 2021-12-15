import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'example@hello.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'true', description: 'Is use banned' })
  readonly banned: boolean;

  @ApiProperty({ example: 'Some reason', description: 'Ban reason' })
  readonly banReason: string;
}
