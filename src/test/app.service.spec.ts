import { Test } from '@nestjs/testing';
import { PulsarProducerService } from '../pulsar/pulsar-producer.service';
import { AppService } from '../app.service';
import { TEST_TOPIC } from '../app.constants';

describe('AppService', () => {
  let appService: AppService;
  let pulsarProducerService: PulsarProducerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PulsarProducerService,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    pulsarProducerService = moduleRef.get<PulsarProducerService>(
      PulsarProducerService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('produce', () => {
    it('should call produce', async () => {
      const message = { test: 'test' };
      await appService.sendMessage(message);

      expect(pulsarProducerService.produce).toHaveBeenCalledTimes(11);
      expect(pulsarProducerService.produce).toHaveBeenCalledWith(
        TEST_TOPIC,
        message,
      );
    });
  });
});
