import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeesService: CoffeesService,
    ){}

    @Get('flavors')
    fiandAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeesService.fiandAll();
        // return `This actions return all coffees. Limit: ${limit}, offset: ${offset}`;
    }

    @Get('flavors/:id')
    findOne(@Param('id') id:string) {
        return this.coffeesService.findOne(id);
        // return `This actions return #${id} coffe`;
    }
    
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        
        this.coffeesService.create(createCoffeeDto);
        return createCoffeeDto;
        // return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id,updateCoffeDto)
        // return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
        // return `This action removes #${id} coffee`;
    }
}
