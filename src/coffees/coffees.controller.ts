import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('flavors')
    fiandAll() {
        return 'This actions return all coffees';
    }

    @Get(':id')
    fiandOne(@Param('id') id:string) {
        return `This actions return #${id} coffe`;
    }
    
    @Post()
    // @HttpCode()
    create(@Body() body) {
        return body;
    }
}
