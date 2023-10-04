import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {AddUserRoleDto} from "./dto/add-user-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {Roles} from "../auth/roles-auth.decorator";
import {UserRole} from "../roles/entities/user-role.enum";
import {RemoveUserRoleDto} from "./dto/remove-user-role.dto";
import {UsersRolesService} from "./users-roles.service";
import {RolesGuard} from "../auth/guards/role.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly usersRolesService: UsersRolesService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @ApiOperation({summary: 'Удалить пользователя'})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiQuery({name: 'role', enum: UserRole})
    @ApiResponse({status: 200})
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/add-role')
    addRole(@Body() addUserRoleDto: AddUserRoleDto) {
        return this.usersRolesService.addUserRole(addUserRoleDto);
    }

    @ApiOperation({summary: 'Убрать роль роль'})
    @ApiQuery({name: 'role', enum: UserRole})
    @ApiResponse({status: 200})
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/remove-role')
    removeRole(@Body() removeUserRoleDto: RemoveUserRoleDto) {
        return this.usersRolesService.removeUserRole(removeUserRoleDto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/ban')
    ban(@Body() banUserDto: BanUserDto) {
        return this.usersRolesService.banUser(banUserDto);
    }
}
