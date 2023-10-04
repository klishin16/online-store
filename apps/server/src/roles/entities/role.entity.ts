import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное Значение роли '})
    @Column({ unique: true, nullable: false})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({ nullable: false})
    description: string;

    @ManyToMany(() => User)
    users: User[];
}
