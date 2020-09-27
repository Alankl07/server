import { Document } from 'mongoose';
export class Noite extends Document {
    noite: String;
    data: String;
    horario: String;
    tema: String;
    testemunha: String;
    vagas: number;
}
