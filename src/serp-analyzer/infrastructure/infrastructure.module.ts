import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserSubscriptionInfoRepository } from '../application/ports/user-subscription-info.repository';
import { PrismaUserSubscriptionInfoRepository } from './persistence/prisma-user-subscription-info.repository';
import { TestingModeRepository } from '../application/ports/testing-mode.repository';
import { PrismaTestingModeRepository } from './persistence/prisma-testing-mode.repository';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/prisma-localization.repository';
import { TestingModeCheckerQueueService } from '../application/ports/testing-mode-checker-queue.service';
import { AppTestingModeCheckerQueueService } from './queues/app-testing-mode-checker-queue.service';
import { BullModule } from '@nestjs/bullmq';
import { TESTING_MODE_CHECKER_QUEUE } from './queues/constants';
import { TestingModeCheckerProducer } from './queues/producers/testing-mode-checker.producer';
import { TestingModeCheckerConsumer } from './queues/consumers/testing-mode-checker.consumer';
import { AnalysisRepository } from '../application/ports/analysis.repository';
import { PrismaAnalysisRepository } from './persistence/prisma-analysis.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: TESTING_MODE_CHECKER_QUEUE,
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: UserSubscriptionInfoRepository,
      useClass: PrismaUserSubscriptionInfoRepository,
    },
    {
      provide: TestingModeRepository,
      useClass: PrismaTestingModeRepository,
    },
    {
      provide: LocalizationRepository,
      useClass: PrismaLocalizationRepository,
    },
    {
      provide: TestingModeCheckerQueueService,
      useClass: AppTestingModeCheckerQueueService,
    },
    TestingModeCheckerProducer,
    TestingModeCheckerConsumer,
    {
      provide: AnalysisRepository,
      useClass: PrismaAnalysisRepository,
    },
  ],
  exports: [
    UserSubscriptionInfoRepository,
    TestingModeRepository,
    LocalizationRepository,
    TestingModeCheckerQueueService,
    AnalysisRepository,
  ],
})
export class InfrastructureModule {}
