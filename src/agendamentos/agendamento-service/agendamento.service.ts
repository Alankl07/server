import { Injectable } from '@nestjs/common';
import { Agendamento } from './agendamento';
import { Noite } from '../../noites/noites/noite';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AgendamentoService {
    
    constructor(@InjectModel('agendamentos') private readonly agendamentoModel: Model<Agendamento>, @InjectModel('noite') private readonly noites: Model<Noite> ){}
    async getAll(){
        return await this.agendamentoModel.find().exec();
    }

    async getOne(id: string){
        const agendamento = await  this.agendamentoModel.findById(id).exec();

        return agendamento;
    }

    async updateNoite(endPoint: string, id: string){
        
        const noite = await this.noites.findById(id).exec();
        
        if(endPoint == 'Delete'){
            var newVagas = noite.vagas + 1;
        }

        if(endPoint == 'Agendar'){
            var newVagas = noite.vagas - 1;
        }
        
        await this.noites.updateOne({_id: id}, {vagas: newVagas})

        return noite;
    }

    async create(agendamento: Agendamento){

        try{
            
            const getUser = await this.agendamentoModel.findOne({ idUser: agendamento.idUser }).exec();
            const getNoite = await this.noites.findOne({ _id: agendamento.idNoite }).exec();
            
            if(getUser){
                return {message: "No momento você só pode agendar mais de uma noite."};
            }

            if(getNoite.vagas <= 0){
                return {message: "Vagas esgotadas para esta noite."};
            }

            const data = new Date();
            if(data.getMonth() + 1 < 10){
                var mes = '0' + (data.getMonth() + 1)
            }
            agendamento.dataSolicitacao = `${data.getDate()}/${mes}/${data.getFullYear()}`;
            const createAgendamento = new this.agendamentoModel(agendamento);

            this.updateNoite('Agendar', agendamento.idNoite);

            return await createAgendamento.save();
        }catch(err){
            console.log(err)
            // return {message: "Não conseguimos confirmar seu agendamento. Por favor tente mais tarde."}
        }
        
    }

    async update(id: string, agendamento: Agendamento){
        
        await this.agendamentoModel.updateOne({ _id: id }, agendamento).exec();

        return this.getOne(id);
    }

    async delete(id: string){
        const noite = await this.agendamentoModel.findById(id);
        this.updateNoite('Delete', noite.idNoite);

        return await this.agendamentoModel.deleteOne({ _id: id }).exec();
    }
}
