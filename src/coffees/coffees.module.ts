import { Module, Injectable } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity])],
    controllers: [
        CoffeesController
    ],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            inject: [CoffeeBrandsFactory]
        },
    ],
    exports:[CoffeesService]
})
export class CoffeesModule {}
