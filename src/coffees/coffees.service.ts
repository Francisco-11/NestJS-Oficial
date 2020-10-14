import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { FlavorEntity } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { EventEntity } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(CoffeeEntity)
        private readonly coffeRepository: Repository<CoffeeEntity>,
        @InjectRepository(FlavorEntity)
        private readonly flavorRepository: Repository<FlavorEntity>,
        private readonly connection: Connection,
        @Inject(COFFEE_BRANDS) coffeBrands: string[],
    )
    {
        console.log(coffeBrands);
    }

    fiandAll(paginationQuery: PaginationQueryDto) {
        const { offset, limit } = paginationQuery;
        return this.coffeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit
        });
    }

    async findOne(id:string) {
        const coffee = await this.coffeRepository.findOne(
            id, {
            relations: ['flavors']
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    async create(createCoffeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );

        const coffee = this.coffeRepository.create({
            ...createCoffeDto,
            flavors
        });
        return this.coffeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto, flavors) {
        const coffee = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors,
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }

    async recomendedCoffee(coffee: CoffeeEntity) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recomendations++;

            const recommendEvent = new EventEntity();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}
