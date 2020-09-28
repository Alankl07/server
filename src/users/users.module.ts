import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { UserService } from './users-services/user.service';
import { UsersController } from './users.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'user', schema: UsersSchema}])],
    controllers: [UsersController],
    providers: [UserService]
})
export class UsersModule {}
