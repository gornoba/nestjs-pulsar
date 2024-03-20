import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PulsarModule } from './pulsar/pulsar.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PulsarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
