import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface BlogCreationAttrs {
  title: string;
  content: string;
  image: string;
  summary: string;
}

@Table({ tableName: 'blog' })
export class Blog extends Model<Blog, BlogCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.CHAR,
    unique: true,
    allowNull: true, // change to false, after implementation of slugs
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  published: boolean;

  @Column({
    type: DataType.BLOB({
      length: 'long',
    }),
    allowNull: true,
    defaultValue: null,
  })
  image: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  summary: string;
}
