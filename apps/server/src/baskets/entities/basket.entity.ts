import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Device} from "../../devices/entities/device.entity";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Basket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: true })
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User

    @ManyToMany(() => Device)
    devices: Device[];
}
