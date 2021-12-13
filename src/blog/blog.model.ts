import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface BlogCreationAttrs {
  title: string;
  content: string;
  image: string;
  summary: string;
}

@Table({ tableName: 'articles' })
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
    allowNull: false,
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
    type: DataType.DATE,
  })
  published_at?: Date;

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
