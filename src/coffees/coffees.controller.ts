import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Res, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeesService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request,
    ) {
        console.log('CoffeesController created');
    }

    @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
    @Public()
    @Get()
    async findAll(
        @Protocol('https') protocol: string, 
        @Query() paginationQuery: PaginationQueryDto) {
        
        console.log(protocol);
        
        // await new Promise(resolve => setTimeout(resolve, 5000));

        return this.coffeesService.fiandAll(paginationQuery);
        // return `This actions return all coffees. Limit: ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        
        return this.coffeesService.findOne('' + id);
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
        // return this.coffeesService.update(id,updateCoffeDto)
        // return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
        // return `This action removes #${id} coffee`;
    }
}
