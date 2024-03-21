import { Test } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { PulsarProducerService } from '../pulsar/pulsar-producer.service';

const stub = () => ({
  nest: 'js',
});

const mockAppService = {
  sendMessage: jest.fn(),
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
        {
          provide: PulsarProducerService,
          useValue: {},
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMessage', () => {
    it('should call sendMessage', async () => {
      const request = stub();
      await appController.sendMessage(request);

      expect(appService.sendMessage).toHaveBeenCalled();
      expect(appService.sendMessage).toHaveBeenCalledWith(request);
    });
  });
});
