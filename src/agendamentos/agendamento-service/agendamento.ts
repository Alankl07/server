import { Document } from 'mongoose';

export class Agendamento extends Document {
    idUser: string;
    idNoite: string;
    dataSolicitacao: string;
    dataNoite: string;
}
