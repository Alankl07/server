import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly userModel: Model<User>){}

    async getAll(){
        return await this.userModel.find().exec();
    }

    async getOne(Body: User){
        console.log(Body.userName)
        return await this.userModel.findOne({ userName: Body.userName }).exec();
    }

    async create(user: User){
        const use = await this.getOne(user);
        if(use == null){
            const createUser = new this.userModel(user);
            return createUser.save()
        }else{
            return {message: "Usuario já existe."}
        }
    }

    async logar(Body: User){
        const user = await this.getOne(Body);

        try{
            console.log(user)
            return user
        }catch(err){
            console.log(err)
            return user;
        }
    }
}
