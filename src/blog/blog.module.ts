import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [SequelizeModule.forFeature([Blog])],
})
export class BlogModule {}
