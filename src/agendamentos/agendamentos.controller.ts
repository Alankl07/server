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

    @Get('/get/:id')
    async getAgendamentoUser(@Param('id') id: string): Promise<any>{
        const agendamento = await this.service.getAgendamentoUser(id);
         return agendamento
    }

    @Get('agendados/:id')
    async getAgendados(@Param('id') id: string){
        return this.service.agendados(id);
    }

    @Post()
    async create(@Body() body: Agendamento): Promise<any>{
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

    @Post('cancel') 
    async deleteAgendamento(@Body() Body: {}){
        return this.service.deleteAgendamento(Body);
    }
}
