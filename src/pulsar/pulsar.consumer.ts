import { Logger } from '@nestjs/common';
import { nextTick } from 'process';
import { Client, Consumer, ConsumerConfig, Message } from 'pulsar-client';

export abstract class PulsarConsumer<T> {
  private consumer: Consumer;
  private readonly logger = new Logger(this.config.topic);
  protected running = true;

  constructor(
    private readonly pulsarClient: Client,
    private readonly config: ConsumerConfig,
    private readonly onMassageFn: (message: T) => void,
  ) {}

  protected async connect() {
    this.consumer = await this.pulsarClient.subscribe(this.config);
    nextTick(this.consume.bind(this));
  }

  private async consume() {
    while (this.running) {
      let message: Message;

      try {
        message = await this.consumer.receive();
        const data: T = JSON.parse(message.getData().toString());
        console.log(data, message.getMessageId().toString());
        this.onMassageFn(data);
      } catch (error) {
        this.logger.error('Error consuming.', error);
      }

      try {
        if (message) {
          await this.consumer.acknowledge(message);
        }
      } catch (error) {
        this.logger.error('Error acking.', error);
      }
    }
  }
}
