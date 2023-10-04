import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BasketsModule } from './baskets/baskets.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import {Basket} from "./baskets/entities/basket.entity";
import {Brand} from "./brands/entities/brand.entity";
import {Category} from "./categories/entities/category.entity";
import {Device} from "./devices/entities/device.entity";
import {Role} from "./roles/entities/role.entity";

const entity_modules = [
  BasketsModule,
  DevicesModule,
  BrandsModule,
  CategoriesModule,
  UsersModule,
  RolesModule
]

@Module({
  imports: [
      AuthModule,
    ...entity_modules,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'online_store',
      entities: [Basket, Brand, Category, Device, Role, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
