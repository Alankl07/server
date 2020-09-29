import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoiteSchema } from 'src/noites/schema/noites.schema';
import { UsersSchema } from 'src/users/schema/users.schema';
import { AgendamentoService} from './agendamento-service/agendamento.service';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentoSchema } from './schema/agendamentos.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'agendamentos', schema: AgendamentoSchema }, { name: 'noite', schema: NoiteSchema }, { name: 'user', schema: UsersSchema }])],
    controllers: [AgendamentosController],
    providers: [AgendamentoService]
})
export class AgendamentosModule {}
