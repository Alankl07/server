import * as mongoose from 'mongoose';

export const AgendamentoSchema = new mongoose.Schema({
    nome: String,
    data: String
})