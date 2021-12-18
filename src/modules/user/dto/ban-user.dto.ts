import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber({ allowNaN: false }, { message: 'must be number' })
  readonly userId: number;

  @IsString({ message: 'must be string' })
  readonly banReason: string;
}
