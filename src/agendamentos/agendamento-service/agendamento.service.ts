import { Injectable } from '@nestjs/common';
import { Agendamento } from './agendamento';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AgendamentoService {
    
    constructor(@InjectModel('agendamentos') private readonly agendamentoModel: Model<Agendamento> ){}
    async getAll(){
        return await this.agendamentoModel.find().exec();
    }

    async getOne(id: string){
        const agendamento = await  this.agendamentoModel.findById(id).exec();

        return agendamento;
    }

    async create(agendamento: Agendamento){
        
        const createAgendamento = new this.agendamentoModel(agendamento);

        return await createAgendamento.save();
    }

    async update(id: string, agendamento: Agendamento){
        
        await this.agendamentoModel.updateOne({ _id: id }, agendamento).exec();

        return this.getOne(id);
    }

    async delete(id: string){
        return await this.agendamentoModel.deleteOne({ _id: id }).exec();
    }
}
