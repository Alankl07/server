import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>){}

    async getAll(){
        return await this.userModel.find().exec();
    }

    async getOne(Body: User){
        return await this.userModel.findOne({ userName: Body.userName }).exec();
    }

    async create(user: User){
        const use = await this.getOne(user);
        if(use == null){
            user.password = (randomBytes(2).toString('hex'));
            const createUser = new this.userModel(user);
            return createUser.save()
        }else{
            return {message: "Usuário já existe."}
        }
    }

    async logar(Body: User){
        const user = await this.getOne(Body);
        try{
            if(user && user.password === Body.password){
                return user
            }else{
                return {message: "Usuário não cadastrado", status: 401}
            }
            
        }catch(err){
            console.log(err)
            return user;
        }
    }

    async delete(id: string){
        return this.userModel.deleteOne({ _id: id}).exec();
    }
}
