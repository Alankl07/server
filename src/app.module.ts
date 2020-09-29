import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { Conection } from '../src/serve/conection';

import { MongooseModule } from '@nestjs/mongoose';
import { NoitesModule } from './noites/noites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AgendamentosModule, MongooseModule.forRoot(Conection), NoitesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
