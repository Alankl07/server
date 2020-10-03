import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NoitesModule } from './noites/noites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AgendamentosModule, MongooseModule.forRoot('mongodb+srv://db_user:81801809@cluster0.bdywr.gcp.mongodb.net/dbAgendamento?retryWrites=true&w=majority'), NoitesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
