import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendamentoService} from './agendamento-service/agendamento.service';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentoSchema } from './schema/agendamentos.schema';

@Module({
    imports: [ MongooseModule.forFeature([{ name: 'agendamentos', schema: AgendamentoSchema }])],
    controllers: [AgendamentosController],
    providers: [AgendamentoService]
})
export class AgendamentosModule {}
