import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from './users-services/user';
import { UserService } from './users-services/user.service';

@Controller('users')
export class UsersController {
    
    constructor(private service: UserService){}

    @Get()
    async getAll(): Promise<User[]>{
        return this.service.getAll();
    }

    @Get(':userName')
    async getOne(@Body() Body: User ): Promise<User>{
        return this.service.getOne(Body);
    }

    @Get('user/:id')
    async getOneUser(@Param('id') id: string ): Promise<User>{
        return this.service.getOneUser(id);
    }

    @Post()
    async create(@Body() Body: User){
        return this.service.create(Body);
    }

    @Post('login')
    async logar(@Body() Body: User): Promise<any>{
        return this.service.logar(Body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.service.delete(id);
    }

}
