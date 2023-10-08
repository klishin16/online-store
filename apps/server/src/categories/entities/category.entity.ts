import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {Device} from "../../devices/entities/device.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
@Tree('closure-table')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Category;

    @Column({ type: "int", nullable: true })
    parentCategoryId: number;

    @TreeParent()
    @JoinColumn({ name: "parentCategoryId" })
    parent: Category;

    @OneToMany(() => Device, (device) => device.category)
    devices: Device[];
}
