import { Module, Injectable, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}

@Module({
    imports: [
        TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity]),
        ConfigModule.forFeature(coffeesConfig)],
    controllers: [
        CoffeesController
    ],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: () => ['buddy brew', 'nescafe'],
            scope: Scope.TRANSIENT,
        },
    ],
    exports:[CoffeesService]
})
export class CoffeesModule {}
