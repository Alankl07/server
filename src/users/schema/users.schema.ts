 import { Mongoose } from "mongoose";
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    nomeCompleto: String,
    userName: String
})