import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'must be string' })
  readonly value: string;

  @IsString({ message: 'must be string' })
  readonly description: string;
}
