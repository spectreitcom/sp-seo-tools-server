import { Module } from '@nestjs/common';
import { GoogleScraperService } from '../application/ports/google-scraper.service';
import { AppGoogleScraperService } from './google-scraper-service/app-google-scraper.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AppGoogleScraperDevService } from './google-scraper-service/app-google-scraper-dev.service';
import { QueryRepository } from '../application/ports/query.repository';
import { PrismaQueryRepository } from './persistence/prisma-query.repository';
import { DatabaseModule } from '../../database/database.module';
import { CheckingQueryQueueService } from '../application/ports/checking-query-queue.service';
import { AppCheckingQueryQueueService } from './queues/app-checking-query-queue.service';
import { CheckingQueryProducer } from './queues/procucers/checking-query.producer';
import { BullModule } from '@nestjs/bullmq';
import { CHECKING_QUERY_QUEUE } from './queues/constants';
import { CheckingQueryConsumer } from './queues/consumers/checking-query.consumer';

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
      useFactory: (
        httpService: HttpService,
        configService: ConfigService,
        queryRepository: QueryRepository,
      ) =>
        configService.get<string>('NODE_ENV') === 'staging'
          ? new AppGoogleScraperService(
              configService,
              httpService,
              queryRepository,
            )
          : new AppGoogleScraperDevService(queryRepository),
      inject: [HttpService, ConfigService, QueryRepository],
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
  ],
  exports: [GoogleScraperService, QueryRepository, CheckingQueryQueueService],
})
export default class InfrastructureModule {}
