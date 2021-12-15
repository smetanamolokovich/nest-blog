import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
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
