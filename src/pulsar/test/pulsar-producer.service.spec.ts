import { Test } from '@nestjs/testing';
import { PULSAR_CLIENT } from '../pulsar.constants';
import { PulsarProducerService } from '../pulsar-producer.service';

// 임의로 변수 만듬
const stub = () => ({
  topic: 'test-topic',
  message: { key: 'testKey', value: 'testMessage' },
});

// mock prodocer 객체 생성
const mockProducer = {
  send: jest.fn().mockImplementation((message) => {
    const messageBuffer = Buffer.from(JSON.stringify(message));
    return Promise.resolve(messageBuffer); // 메시지 버퍼 반환
  }),
};

// mock pulsarClient 객체 생성
const mockPulsarClient = {
  createProducer: jest.fn().mockReturnValue(mockProducer), // createProducer 호출 시 mockProducer 반환
};

describe('PulsarProducerService', () => {
  let testPulsarProducerService: PulsarProducerService;

  // 테스트 전에 모듈 생성 및 주입 완료 대기 시킴
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        PulsarProducerService,
        {
          provide: PULSAR_CLIENT,
          useValue: mockPulsarClient, // mockPulsarClient 사용하여 PULSAR_CLIENT 주입
        },
      ],
    }).compile();

    testPulsarProducerService = module.get<PulsarProducerService>(
      PulsarProducerService,
    );
  });

  // 각 테스트 후에 mock 함수 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('produce', () => {
    it('call createProducer with topic', async () => {
      const { topic, message } = stub();
      await testPulsarProducerService.produce(topic, message);

      // createProducer가 주어진 topic으로 호출되었는지 검증
      expect(mockPulsarClient.createProducer).toHaveBeenCalledWith({ topic });

      // mockProducer.send가 호출된 인자를 Buffer에서 문자열로 변환하여 검증
      const sentMessage = mockProducer.send.mock.calls[0][0];
      const sentMessageData = JSON.parse(sentMessage.data.toString()); // Buffer를 문자열로 변환 후 JSON 파싱
      expect(sentMessageData).toEqual(message); // 변환된 데이터와 예상 메시지 비교
    });
  });

  it.todo('produce');
});
