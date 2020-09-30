import { Document } from 'mongoose';
export class Noite extends Document {
    noite: String;
    data: String;
    horario: String;
    tema: String;
    homenagiados: String;
    vagas: number;
    posicaoAtual: number;
    posicaoAnterior: number;
}
