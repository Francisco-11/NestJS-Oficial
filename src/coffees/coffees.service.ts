import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(CoffeeEntity)
        private readonly coffeRepository: Repository<CoffeeEntity>,
    ) { }

    fiandAll() {
        return this.coffeRepository.find();
    }

    async findOne(id:string) {
        const coffee = await this.coffeRepository.findOne(id);
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    create(createCoffeDto: CreateCoffeeDto) {
        const coffee = this.coffeRepository.create(createCoffeDto);
        return this.coffeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
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
}
