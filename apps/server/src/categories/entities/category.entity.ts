import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from "typeorm";
import {Device} from "../../devices/entities/device.entity";

@Entity()
@Tree('closure-table')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Category;

    @TreeParent()
    parent: Category;

    @OneToMany(() => Device, (device) => device.category)
    devices: Device[];
}
