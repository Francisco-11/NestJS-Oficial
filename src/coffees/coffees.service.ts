import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { FlavorEntity } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(CoffeeEntity)
        private readonly coffeRepository: Repository<CoffeeEntity>,
        @InjectRepository(FlavorEntity)
        private readonly flavorRepository: Repository<FlavorEntity>
    ) { }

    fiandAll() {
        return this.coffeRepository.find({
            relations: ['flavors'],
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
}
