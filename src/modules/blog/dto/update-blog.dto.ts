import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Category } from '../../categories/categories.model';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({ example: 'Frist blog', description: 'Post title' })
  @IsString({ message: 'must be string' })
  readonly title: string;

  @ApiProperty({
    example: 'This is content.',
    description: 'Post content (body)',
  })
  @IsString({ message: 'must be string' })
  readonly content: string;

  @ApiProperty({ example: 'This is summary.', description: 'Post summary' })
  @IsString({ message: 'must be string' })
  readonly summary: string;

  @ApiProperty({
    example: 'This is categories.',
    description: 'Post categories',
  })
  @IsString({ message: 'must be string' })
  categories: string;
}
