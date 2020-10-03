import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

import { MongooseModule } from '@nestjs/mongoose';
import { NoitesModule } from './noites/noites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AgendamentosModule, MongooseModule.forRoot(process.env.MONGO_URL), NoitesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
