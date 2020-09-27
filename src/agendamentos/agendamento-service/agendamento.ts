import { Document } from 'mongoose';

export class Agendamento extends Document {
    nome: string;
    data: string;
}
