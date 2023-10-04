import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Device} from "../../devices/entities/device.entity";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Device, (device) => device.brand)
    devices: Device[];
}
