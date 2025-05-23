import { Module } from '@nestjs/common';
import { GoogleScraperService } from '../application/ports/google-scraper.service';
import { AppGoogleScraperService } from './google-scraper-service/app-google-scraper.service';
import { HttpModule } from '@nestjs/axios';
import { QueryRepository } from '../application/ports/query.repository';
import { PrismaQueryRepository } from './persistence/prisma-query.repository';
import { DatabaseModule } from '../../database/database.module';
import { CheckingQueryQueueService } from '../application/ports/checking-query-queue.service';
import { AppCheckingQueryQueueService } from './queues/app-checking-query-queue.service';
import { CheckingQueryProducer } from './queues/procucers/checking-query.producer';
import { BullModule } from '@nestjs/bullmq';
import { CHECKING_QUERY_QUEUE } from './queues/constants';
import { CheckingQueryConsumer } from './queues/consumers/checking-query.consumer';
import { DeviceValidatorService } from '../application/ports/device-validator.service';
import { AppDeviceValidatorService } from './device-validator-service/app-device-validator.service';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    BullModule.registerQueue({
      name: CHECKING_QUERY_QUEUE,
    }),
  ],
  providers: [
    {
      provide: GoogleScraperService,
      useClass: AppGoogleScraperService,
    },
    {
      provide: QueryRepository,
      useClass: PrismaQueryRepository,
    },
    {
      provide: CheckingQueryQueueService,
      useClass: AppCheckingQueryQueueService,
    },
    CheckingQueryProducer,
    CheckingQueryConsumer,
    {
      provide: DeviceValidatorService,
      useClass: AppDeviceValidatorService,
    },
  ],
  exports: [
    GoogleScraperService,
    QueryRepository,
    CheckingQueryQueueService,
    DeviceValidatorService,
  ],
})
export default class InfrastructureModule {}
