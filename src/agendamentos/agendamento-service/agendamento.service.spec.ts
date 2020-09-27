import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentoService } from './agendamento.service';

describe('AgendamentoService', () => {
  let provider: AgendamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendamentoService],
    }).compile();

    provider = module.get<AgendamentoService>(AgendamentoService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
