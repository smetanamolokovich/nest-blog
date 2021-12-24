import { forwardRef, Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './blog.model';
import { User } from '../user/user.model';
import { FilesModule } from '../files/files.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { UserRoles } from '../roles/user-roles.model';
import { Role } from '../roles/roles.model';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [
    SequelizeModule.forFeature([Blog, User, Role, UserRoles]),
    FilesModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class BlogModule {}
