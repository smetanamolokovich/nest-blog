import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'must be string' })
  readonly value: string;

  @IsNumber({ allowNaN: false }, { message: 'must be number' })
  readonly userId: number;
}
