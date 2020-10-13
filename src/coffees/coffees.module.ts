import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from '../events/entities/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, EventEntity])],
    controllers: [
        CoffeesController
    ],
    providers: [
        CoffeesService,
    ],
})
export class CoffeesModule {}
