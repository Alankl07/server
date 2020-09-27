import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Noite } from './noites/noite';
import { NoiteService } from './noites/noite.service';

@Controller('noites')
export class NoitesController {

    constructor( private service: NoiteService ){}

    @Get()
    async getAll(): Promise<Noite[]>{
        return this.service.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Noite>{
        return this.service.getOne(id);
    }

    @Post()
    async create(@Body() body: Noite): Promise<Noite>{
        return this.service.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string,  @Body() Body: Noite): Promise<Noite>{
        return this.service.update(id, Body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        this.service.delete(id);
    }
}
