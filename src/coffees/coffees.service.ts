import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {

    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Francisc Vera',
            brand: 'Buddy Brew',
            flavors: ['chocolate', 'vanilla'],
        },
    ];


    fiandAll() {
        
        return this.coffees;
    }

    findOne(id:string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
    create(createCoffeDto: any) {
        this.coffees.push(createCoffeDto);
    }


    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            
        }
        // return `This action updates #${id} coffee`;
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex) {
            
        }
        // return `This action removes #${id} coffee`;
    }
}
