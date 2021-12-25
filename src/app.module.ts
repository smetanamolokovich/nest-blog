import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './modules/blog/blog.module';
import { Blog } from './modules/blog/blog.model';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.model';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.model';
import { UserRoles } from './modules/roles/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './modules/categories/categories.module';
import * as path from 'path';
import { BlogCategories } from './modules/categories/blog-categories.model';
import { Category } from './modules/categories/categories.model';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Blog, User, Role, UserRoles, BlogCategories, Category],
      autoLoadModels: true,
    }),
    BlogModule,
    UserModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
