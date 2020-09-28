import { Document } from 'mongoose';
export class User extends Document {
    nomeCompleto: string;
    userName: string
}
