import { Document } from 'mongoose';

export class Agendamento extends Document {
    nome: string;
    idNoite: string;
    dataSolicitacao: string;
}
