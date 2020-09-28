import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FlavorEntity } from './flavor.entity';

@Entity()
export class CoffeeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => FlavorEntity,
        (flavor) => flavor.coffess,
        {
            cascade: true,
        }
    )
    flavors: FlavorEntity[];
}