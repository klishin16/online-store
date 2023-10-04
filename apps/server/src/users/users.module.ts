import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Role} from "../roles/entities/role.entity";
import {UsersRolesService} from "./users-roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRolesService],
  exports: [UsersService]
})
export class UsersModule {}
