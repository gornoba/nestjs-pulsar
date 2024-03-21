import { Module } from '@nestjs/common';
import { PULSAR_CLIENT } from './pulsar.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pulsar-client';
import { PulsarProducerService } from './pulsar-producer.service';
import { PulsarClientService } from './pulsar-client.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PULSAR_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new Client({
          serviceUrl: configService.getOrThrow('PULSAR_SERVICE_URL'),
        });
      },
      inject: [ConfigService],
    },
    PulsarProducerService,
    PulsarClientService,
  ],
  exports: [PulsarProducerService, PULSAR_CLIENT],
})
export class PulsarModule {}
