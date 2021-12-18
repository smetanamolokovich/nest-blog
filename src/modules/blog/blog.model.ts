import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface BlogCreationAttrs {
  readonly title: string;
  readonly content: string;
  readonly image: string;
  readonly summary: string;
}

@Table({ tableName: 'blog' })
export class Blog extends Model<Blog, BlogCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique post id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'first-blog', description: 'Post slug' })
  @Column({
    type: DataType.CHAR,
    unique: true,
    allowNull: true, // change to false, after implementation of slugs
  })
  slug: string;

  @ApiProperty({ example: 'Frist blog', description: 'Post title' })
  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'This is content.',
    description: 'Post content (body)',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ApiProperty({ example: 'true', description: 'Post state' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  published: boolean;

  @ApiProperty({ example: 'some img', description: 'Post image' })
  @Column({
    type: DataType.BLOB({
      length: 'long',
    }),
    allowNull: true,
    defaultValue: null,
  })
  image: string;

  @ApiProperty({ example: 'This is summary.', description: 'Post summary' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  summary: string;
}
