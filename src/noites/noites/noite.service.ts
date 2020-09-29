import { Injectable } from '@nestjs/common';
import { Noite } from './noite';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoiteService {

    constructor( @InjectModel('noite') private readonly noiteModel: Model<Noite> ){}

    async getAll(){
        const noites = await this.noiteModel.find().exec();  
      return noites
    }

    async getOne(id: string){
        const noite = await this.noiteModel.findById(id).exec();

        return noite;
    }

    async create(noite: Noite){
        const createNoite = new this.noiteModel(noite);
        return await createNoite.save();
    }

    async update(id: string, noite: Noite){
        await this.noiteModel.updateOne({ _id: id }, noite).exec();

        return this.getOne(id);
    }

    async delete(id: string){
        return await this.noiteModel.deleteOne({_id: id}).exec();
    }
}
