import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Brand} from "../../brands/entities/brand.entity";
import {Category} from "../../categories/entities/category.entity";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    sale: number;

    @Column()
    availability: number;

    @Column()
    image: string;

    @ManyToMany(() => User)
    users_favorites: User[];

    @ManyToOne(() => Brand)
    brand: Brand;

    @ManyToOne(() => Category)
    category: Category;

    // @ManyToOne
    // baskets: Basket[]; //TODO промежуточная таблица
}
