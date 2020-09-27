import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Agendamento } from './agendamento-service/agendamento';
import { AgendamentoService } from './agendamento-service/agendamento.service';

@Controller('agendamentos')
export class AgendamentosController {
    constructor(private service: AgendamentoService){}

    @Get()
    async getAll(): Promise<Agendamento[]>{
        return this.service.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Agendamento>{
        return this.service.getOne(id);
    }

    @Post()
    async create(@Body() body: Agendamento): Promise<Agendamento>{
        return this.service.create(body);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() Body: Agendamento): Promise<Agendamento>{
        return this.service.update(id ,Body)
    }

    @Delete(':id')

    async delete(@Param('id') id: string){
         this.service.delete(id);
    }
}
