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
import { HtmlService } from '../application/ports/html.service';
import { AppHtmlService } from './app-html.service';
import { HttpModule } from '@nestjs/axios';
import { ProcessHtmlStructureService } from './queues/services/process-html-structure.service';
import { ProcessPageSpeedService } from './queues/services/process-page-speed.service';
import { HtmlParserModule } from '../../html-parser/application/html-parser.module';
import { ProcessH1Service } from './queues/services/processH1.service';
import { ProcessH2Service } from './queues/services/processH2.service';
import { ProcessH3Service } from './queues/services/processH3.service';
import { ProcessH4Service } from './queues/services/processH4.service';
import { ProcessH5Service } from './queues/services/processH5.service';
import { ProcessPService } from './queues/services/processP.service';
import { ProcessImgAltService } from './queues/services/processImgAlt.service';
import { ProcessStrongService } from './queues/services/processStrong.service';
import { ProcessTitleService } from './queues/services/processTitle.service';
import { ProcessMetaDescService } from './queues/services/processMetaDesc.service';
import { ProcessBodyService } from './queues/services/processBody.service';
import { ProcessLinkService } from './queues/services/processLink.service';
import { ProcessImageService } from './queues/services/processImage.service';
import { ProcessH6Service } from './queues/services/processH6.service';
import { PageFactorRepository } from '../application/ports/page-factor.repository';
import { PrismaPageFactorRepository } from './persistence/prisma-page-factor.repository';

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
    HttpModule,
    HtmlParserModule,
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
    {
      provide: HtmlService,
      useClass: AppHtmlService,
    },
    ProcessHtmlStructureService,
    ProcessPageSpeedService,
    ProcessH1Service,
    ProcessH2Service,
    ProcessH3Service,
    ProcessH4Service,
    ProcessH5Service,
    ProcessH6Service,
    ProcessPService,
    ProcessStrongService,
    ProcessImgAltService,
    ProcessTitleService,
    ProcessMetaDescService,
    ProcessLinkService,
    ProcessBodyService,
    ProcessImageService,
    {
      provide: PageFactorRepository,
      useClass: PrismaPageFactorRepository,
    },
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
    HtmlService,
    PageFactorRepository,
  ],
})
export class InfrastructureModule {}
