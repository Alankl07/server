import * as mongoose from 'mongoose';

export const AgendamentoSchema = new mongoose.Schema({
    idUser: String,
    idNoite: String,
    dataSolicitacao: String,
})