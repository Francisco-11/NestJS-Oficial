import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FlavorEntity } from './flavor.entity';

@Entity()
export class CoffeeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recomendations: number;
    
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