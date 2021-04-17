import { Test } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
  });

  describe('pong', () => {
    it('should return ok and object', async () => {
      const findAllResult = await controller.pong();
      console.log(findAllResult);
      expect(findAllResult).toBe({});
    });
  });
});
