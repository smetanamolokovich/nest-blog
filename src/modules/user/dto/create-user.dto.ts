import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'example@hello.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: '00998877', description: 'User password' })
  readonly password: string;
}
