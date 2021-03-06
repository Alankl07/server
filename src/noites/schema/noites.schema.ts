import * as mongoose from 'mongoose';

export const NoiteSchema = new mongoose.Schema({
    noite: String,
    data: String,
    horario: String,
    tema: String,
    homenagiados: String,
    vagas: Number,
    posicaoAtual: Number,
    posicaoAnterior: Number,
})