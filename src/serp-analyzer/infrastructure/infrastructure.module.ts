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
import {
  STAGE_PROCESSING_QUEUE,
  TESTING_MODE_CHECKER_QUEUE,
} from './queues/constants';
import { TestingModeCheckerProducer } from './queues/producers/testing-mode-checker.producer';
import { TestingModeCheckerConsumer } from './queues/consumers/testing-mode-checker.consumer';
import { AnalysisRepository } from '../application/ports/analysis.repository';
import { PrismaAnalysisRepository } from './persistence/prisma-analysis.repository';
import { StageRepository } from '../application/ports/stage.repository';
import { PrismaStageRepository } from './persistence/prisma-stage.repository';
import { PageRepository } from '../application/ports/page.repository';
import { PrismaPageRepository } from './persistence/prisma-page.repository';
import { StageProcessingQueueService } from '../application/ports/stage-processing-queue.service';
import { AppStageProcessingQueueService } from './queues/app-stage-processing-queue.service';
import { StageProcessingProducer } from './queues/producers/stage-processing.producer';
import { StageProcessingConsumer } from './queues/consumers/stage-processing.consumer';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: TESTING_MODE_CHECKER_QUEUE,
      },
      {
        name: STAGE_PROCESSING_QUEUE,
      },
    ),

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
    {
      provide: StageRepository,
      useClass: PrismaStageRepository,
    },
    {
      provide: PageRepository,
      useClass: PrismaPageRepository,
    },
    {
      provide: StageProcessingQueueService,
      useClass: AppStageProcessingQueueService,
    },
    StageProcessingProducer,
    StageProcessingConsumer,
  ],
  exports: [
    UserSubscriptionInfoRepository,
    TestingModeRepository,
    LocalizationRepository,
    TestingModeCheckerQueueService,
    AnalysisRepository,
    StageRepository,
    PageRepository,
    StageProcessingQueueService,
  ],
})
export class InfrastructureModule {}
