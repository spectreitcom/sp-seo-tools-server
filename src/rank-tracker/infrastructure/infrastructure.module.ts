import { Module } from '@nestjs/common';
import { KeywordRepository } from '../application/ports/keyword.repository';
import { PrismaKeywordRepository } from './persistence/repositories/prisma-keyword.repository';
import { BullModule } from '@nestjs/bullmq';
import {
  DOMAIN_POSITION_PROCESSING_QUEUE,
  POSITION_CHECKER_QUEUE,
  TESTING_MODE_CHECKER_QUEUE,
} from './queues/constants';
import { PositionCheckerQueueService } from '../application/ports/position-checker-queue.service';
import { AppPositionCheckerQueueService } from './queues/app-position-checker-queue.service';
import { DomainRepository } from '../application/ports/domain.repository';
import { PrismaDomainRepository } from './persistence/repositories/prisma-domain.repository';
import { DatabaseModule } from '../../database/database.module';
import { PositionCheckerProducer } from './queues/producers/position-checker.producer';
import { PositionCheckerConsumer } from './queues/consumers/position-checker.consumer';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/repositories/prisma-localization.repository';
import { TestingModeRepository } from '../application/ports/testing-mode.repository';
import { PrismaTestingModeRepository } from './persistence/repositories/prisma-testing-mode.repository';
import { TestingModeCheckerQueueService } from '../application/ports/testing-mode-checker-queue.service';
import { AppTestingModeCheckerQueueService } from './queues/app-testing-mode-checker-queue.service';
import { TestingModeCheckerProducer } from './queues/producers/testing-mode-checker.producer';
import { TestingModeCheckerConsumer } from './queues/consumers/testing-mode-checker.consumer';
import { UserSubscriptionInfoRepository } from '../application/ports/user-subscription-info.repository';
import { PrismaUserSubscriptionInfoRepository } from './persistence/repositories/prisma-user-subscription-info.repository';
import { DomainPositionRepository } from '../application/ports/domain-position.repository';
import { PrismaDomainPositionRepository } from './persistence/repositories/prisma-domain-position.repository';
import { UserKeywordsListRepository } from '../application/ports/user-keywords-list.repository';
import { PrismaUserKeywordsListRepository } from './persistence/repositories/prisma-user-keywords-list.repository';
import { UserDomainsListRepository } from '../application/ports/user-domains-list.repository';
import { PrismaUserDomainsListRepository } from './persistence/repositories/prisma-user-domains-list.repository';
import { LocalizationsCountryCodeRepository } from '../application/ports/localizations-country-code.repository';
import { PrismaLocalizationsCountryCodeRepository } from './persistence/repositories/prisma-localizations-country-code.repository';
import { GoogleScraperModule } from '../../google-scraper/application/google-scraper.module';
import { DomainPositionHistoryRepository } from '../application/ports/domain-position-history.repository';
import { PrismaDomainPositionHistoryRepository } from './persistence/repositories/prisma-domain-position-history.repository';
import { SeederService } from '../application/ports/seeder.service';
import { AppSeederService } from './app-seeder.service';
import { DomainPositionProcessingQueueService } from '../application/ports/domain-position-processing-queue.service';
import { AppDomainPositionProcessingQueueService } from './queues/app-domain-position-processing-queue.service';
import { DomainPositionProcessingProducer } from './queues/producers/domain-position-processing.producer';
import { DomainPositionProcessingConsumer } from './queues/consumers/domain-position-processing.consumer';
import { PositionCheckerService } from '../application/ports/position-checker.service';
import { AppPositionCheckerService } from './app-position-checker.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: POSITION_CHECKER_QUEUE,
      },
      {
        name: TESTING_MODE_CHECKER_QUEUE,
      },
      {
        name: DOMAIN_POSITION_PROCESSING_QUEUE,
      },
    ),
    DatabaseModule,
    GoogleScraperModule,
    SharedModule,
  ],
  providers: [
    {
      provide: KeywordRepository,
      useClass: PrismaKeywordRepository,
    },
    {
      provide: DomainRepository,
      useClass: PrismaDomainRepository,
    },
    {
      provide: PositionCheckerQueueService,
      useClass: AppPositionCheckerQueueService,
    },
    {
      provide: LocalizationRepository,
      useClass: PrismaLocalizationRepository,
    },
    {
      provide: TestingModeRepository,
      useClass: PrismaTestingModeRepository,
    },
    {
      provide: TestingModeCheckerQueueService,
      useClass: AppTestingModeCheckerQueueService,
    },
    {
      provide: UserSubscriptionInfoRepository,
      useClass: PrismaUserSubscriptionInfoRepository,
    },
    {
      provide: DomainPositionRepository,
      useClass: PrismaDomainPositionRepository,
    },
    {
      provide: UserKeywordsListRepository,
      useClass: PrismaUserKeywordsListRepository,
    },
    {
      provide: UserDomainsListRepository,
      useClass: PrismaUserDomainsListRepository,
    },
    {
      provide: LocalizationsCountryCodeRepository,
      useClass: PrismaLocalizationsCountryCodeRepository,
    },
    {
      provide: DomainPositionHistoryRepository,
      useClass: PrismaDomainPositionHistoryRepository,
    },
    {
      provide: SeederService,
      useClass: AppSeederService,
    },
    {
      provide: DomainPositionProcessingQueueService,
      useClass: AppDomainPositionProcessingQueueService,
    },
    {
      provide: PositionCheckerService,
      useClass: AppPositionCheckerService,
    },
    PositionCheckerProducer,
    PositionCheckerConsumer,
    TestingModeCheckerProducer,
    TestingModeCheckerConsumer,
    DomainPositionProcessingProducer,
    DomainPositionProcessingConsumer,
  ],
  exports: [
    KeywordRepository,
    PositionCheckerQueueService,
    DomainRepository,
    LocalizationRepository,
    TestingModeRepository,
    TestingModeCheckerQueueService,
    UserSubscriptionInfoRepository,
    UserKeywordsListRepository,
    UserDomainsListRepository,
    LocalizationsCountryCodeRepository,
    DomainPositionHistoryRepository,
    DomainPositionRepository,
    SeederService,
    DomainPositionProcessingQueueService,
    PositionCheckerService,
  ],
})
export class InfrastructureModule {}
