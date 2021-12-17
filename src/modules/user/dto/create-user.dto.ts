import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@hello.com', description: 'User email' })
  @IsString({ message: 'must be string' })
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '00998877', description: 'User password' })
  @IsString({ message: 'must be string' })
  @Length(6, 20, { message: 'must be at least 6 characters and at most 20' })
  readonly password: string;
}
