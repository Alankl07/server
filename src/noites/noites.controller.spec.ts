import { Test, TestingModule } from '@nestjs/testing';
import { NoitesController } from './noites.controller';

describe('NoitesController', () => {
  let controller: NoitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoitesController],
    }).compile();

    controller = module.get<NoitesController>(NoitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
