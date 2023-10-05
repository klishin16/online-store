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
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';

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
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid('development', 'production', 'test', 'provision')
            .default('development'),
        PORT: Joi.number().default(4000),
        DB_USER: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required()
      })
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT', undefined),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Basket, Brand, Category, Device, Role, User],
        synchronize: true,
        ssl: true
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
