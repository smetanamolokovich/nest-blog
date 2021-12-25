import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { BlogModule } from '../blog/blog.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from '../blog/blog.model';
import { Category } from './categories.model';
import { BlogCategories } from './blog-categories.model';
import { UserRoles } from '../roles/user-roles.model';
import { Role } from '../roles/roles.model';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([
      Blog,
      Category,
      BlogCategories,
      Role,
      UserRoles,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => BlogModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
