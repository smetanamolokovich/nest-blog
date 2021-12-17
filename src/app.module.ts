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

@Module({
  imports: [
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
      models: [Blog, User, Role, UserRoles],
      autoLoadModels: true,
    }),
    BlogModule,
    UserModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
