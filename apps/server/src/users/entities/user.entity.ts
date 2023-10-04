import {Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../roles/entities/role.entity";
import {Device} from "../../devices/entities/device.entity";
import {Basket} from "../../baskets/entities/basket.entity";

@Entity()
export class User {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({ nullable: false })
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column()
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({ default: false })
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({ nullable: true })
    banReason: string;

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];

    @ManyToMany(() => Device)
    @JoinTable()
    favorite_devices: Device[];

    @OneToOne(() => Basket)
    basket: Basket
}
