import { Injectable } from '@nestjs/common';
import { Agendamento } from './agendamento';
import { Noite } from '../../noites/noites/noite';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users-services/user';

@Injectable()
export class AgendamentoService {

    constructor(@InjectModel('agendamentos') private readonly agendamentoModel: Model<Agendamento>, @InjectModel('noite') private readonly noites: Model<Noite>, @InjectModel('user') private readonly users: Model<User>) { }
    async getAll() {
        return await this.agendamentoModel.find().exec();
    }

    async getOne(id: string) {
        const agendamento = await this.agendamentoModel.findById(id).exec();

        return agendamento;
    }

    async getAgendamentoUser(idUser: string) {
        const agendamento = await this.agendamentoModel.find({ idUser: idUser }).exec();
        return agendamento;
    }

    async updateNoite(endPoint: string, id: any, posicao = null) {

        const noite = await this.noites.findById(id).exec();

        if (endPoint == 'Delete') {
            if(noite.vagas < 50){
                var newVagas = noite.vagas + 1;
                    await this.noites.updateOne({ _id: id }, { vagas: newVagas })
            }
        }

        if (endPoint == 'DeleteAgendamento') {
            if(noite.vagas < 50){
                var newVagas = noite.vagas + 1;
            }else{
                var newVagas = noite.vagas ;
            }
            await this.noites.updateOne({ _id: id }, { vagas: newVagas })
        }

        if (endPoint == 'Agendar') {
            if(noite.vagas > 0){
                var newVagas = noite.vagas - 1;
                await this.noites.updateOne({ _id: id }, { vagas: newVagas })
            }
        }

        if (endPoint == 'Posicao') {
            return this.noites.updateOne({ _id: id }, { posicaoAtual: posicao })
        }

        return noite;
    }

    async create(agendamento: Agendamento) {

        try {

            const getNoites = await this.noites.find().exec();
            const getUser = await this.agendamentoModel.findOne({ idUser: agendamento.idUser, idNoite: agendamento.idNoite }).exec();
            const getNoiteDisponivel = await this.noites.
                find({ posicaoAtual: 0}).exec();

                console.log(getUser);


            if (getUser) {
                if (getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0)) {
                    console.log(getNoiteDisponivel.map(value => value._id))
                    this.updateNoite('Posicao', getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0).id, 15);
                }
                return { message: "No momento você não pode agendar mais de uma noite." };
            }

            // console.log('::: ',getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(elem => elem.id != agendamento.idNoite) == undefined)
            // console.log(agendamento.idNoite)

            if (getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.id == agendamento.idNoite) == undefined) {
                if (getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0)) {
                    console.log(getNoiteDisponivel.map(value => value._id))
                    this.updateNoite('Posicao', getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0).id, 15);
                }
                return { message: `No momento a noite disponível para agendamento é a ${getNoiteDisponivel.map(value => value.noite)}` };
            }

            if (getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0 && element.id == agendamento.idNoite)) {
                this.updateNoite('Posicao', getNoiteDisponivel.map(value => ({vagas: value.vagas, id: value._id})).find(element => element.vagas <= 0).id, 15);
                return { message: "Vagas esgotadas para esta noite." };
            }

            const data = new Date();
            if (data.getMonth() + 1 < 10) {
                var mes = '0' + (data.getMonth() + 1)
            }
            agendamento.dataSolicitacao = `${data.getDate()}/${mes}/${data.getFullYear()}`;
            const createAgendamento = new this.agendamentoModel(agendamento);

            this.updateNoite('Agendar', agendamento.idNoite);
            return await createAgendamento.save();
        } catch (err) {
            console.log(err)
            return {message: "Não conseguimos confirmar seu agendamento. Por favor tente mais tarde."}
        }

    }

    async atualizaVagas(id: string) {
        const noite = await this.noites.findOne({ _id: id }).exec();
        if (noite) {
            if (noite.vagas <= 0) {
                const result = await this.noites.updateOne({ _id: id }, { posicaoAtual: noite.posicaoAnterior })
            }
        }
    }

    async update(id: string, agendamento: Agendamento) {

        await this.agendamentoModel.updateOne({ _id: id }, agendamento).exec();

        return this.getOne(id);
    }

    async delete(id: string) {
        const noite = await this.agendamentoModel.findById(id);
        this.updateNoite('Delete', noite.idNoite);

        return await this.agendamentoModel.deleteOne({ _id: id }).exec();
    }

    async deleteAgendamento(ids: any) {
        console.log(ids);
        this.atualizaVagas(ids.idNoite);
        this.updateNoite('DeleteAgendamento', ids.idNoite);
        
        const { deletedCount  } = await this.agendamentoModel.deleteOne({ idUser: ids.idUser, idNoite: ids.idNoite }).exec();
        if(deletedCount){
            return {message: true}
        }else{
            return {message: false}
        }
    }

    async agendados(idNoite: string) {
        const ids = await this.getAll();
        var Allagendados = [];
        for (var i = 0; i < ids.length; i++) {
            if (ids[i].idNoite == idNoite) {
                const user = await this.users.findOne({ _id: ids[i].idUser }).exec();
                const noite = await this.noites.findOne({ _id: ids[i].idNoite }).exec();
                Allagendados.push({ noite: noite.noite, usuario: user.nomeCompleto })
            }
        }
        return Allagendados;
    }
}
