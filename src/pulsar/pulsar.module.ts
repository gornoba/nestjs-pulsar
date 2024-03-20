import { Module } from '@nestjs/common';
import { PULSAR_CLIENT } from './pulsar.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pulsar-client';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PULSAR_CLIENT,
      useFactory: (configService: ConfigService) => {
        new Client({
          serviceUrl: configService.getOrThrow('PULSAR_SERVICE_URL'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PulsarModule {}
