import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Blog } from '../blog/blog.model';
import { Category } from './categories.model';

@Table({ tableName: 'blog_categories', createdAt: false, updatedAt: false })
export class BlogCategories extends Model<BlogCategories> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER,
  })
  blog_id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
}
