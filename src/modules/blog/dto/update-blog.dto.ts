import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({ example: 'Frist blog', description: 'Post title' })
  readonly title: string;
  @ApiProperty({
    example: 'This is content.',
    description: 'Post content (body)',
  })
  readonly content: string;
  @ApiProperty({ example: 'some img', description: 'Post image' })
  readonly image: string;
  @ApiProperty({ example: 'This is summary.', description: 'Post summary' })
  readonly summary: string;
}
