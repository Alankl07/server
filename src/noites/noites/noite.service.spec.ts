import { Test, TestingModule } from '@nestjs/testing';
import { NoiteService } from './noite.service';

describe('NoiteService', () => {
  let provider: NoiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoiteService],
    }).compile();

    provider = module.get<NoiteService>(NoiteService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
