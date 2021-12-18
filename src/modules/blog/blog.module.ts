import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [SequelizeModule.forFeature([Blog, User]), FilesModule],
})
export class BlogModule {}
