import { Module } from '@nestjs/common';
import { KeywordRepository } from '../application/ports/keyword.repository';
import { PrismaKeywordRepository } from './persistence/repositories/prisma-keyword.repository';
import { BullModule } from '@nestjs/bullmq';
import {
  POSITION_CHECKER_QUEUE,
  TESTING_MODE_CHECKER_QUEUE,
} from './queues/constants';
import { PositionCheckerQueueService } from '../application/ports/position-checker-queue.service';
import { NestPositionCheckerQueueService } from './queues/nest-position-checker-queue.service';
import { DomainRepository } from '../application/ports/domain.repository';
import { PrismaDomainRepository } from './persistence/repositories/prisma-domain.repository';
import { DatabaseModule } from '../../database/database.module';
import { PositionCheckerProducer } from './queues/producers/position-checker.producer';
import { PositionCheckerConsumer } from './queues/consumers/position-checker.consumer';
import { SerpapiClient } from './serpapi/serpapi.client';
import { HttpModule } from '@nestjs/axios';
import { SearchEngineRepository } from '../application/ports/search-engine.repository';
import { PrismaSearchEngineRepository } from './persistence/repositories/prisma-search-engine.repository';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/repositories/prisma-localization.repository';
import { TestingModeRepository } from '../application/ports/testing-mode.repository';
import { PrismaTestingModeRepository } from './persistence/repositories/prisma-testing-mode.repository';
import { TestingModeCheckerQueueService } from '../application/ports/testing-mode-checker-queue.service';
import { NestTestingModeCheckerQueueService } from './queues/nest-testing-mode-checker-queue.service';
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
import { SearchEnginesListRepository } from '../application/ports/search-engines-list.repository';
import { PrismaSearchEnginesListRepository } from './persistence/repositories/prisma-search-engines-list.repository';
import { LocalizationsCountryCodeRepository } from '../application/ports/localizations-country-code.repository';
import { PrismaLocalizationsCountryCodeRepository } from './persistence/repositories/prisma-localizations-country-code.repository';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: POSITION_CHECKER_QUEUE,
      },
      {
        name: TESTING_MODE_CHECKER_QUEUE,
      },
    ),
    DatabaseModule,
    HttpModule,
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
      useClass: NestPositionCheckerQueueService,
    },
    {
      provide: SearchEngineRepository,
      useClass: PrismaSearchEngineRepository,
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
      useClass: NestTestingModeCheckerQueueService,
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
      provide: SearchEnginesListRepository,
      useClass: PrismaSearchEnginesListRepository,
    },
    {
      provide: LocalizationsCountryCodeRepository,
      useClass: PrismaLocalizationsCountryCodeRepository,
    },
    PositionCheckerProducer,
    PositionCheckerConsumer,
    SerpapiClient,
    TestingModeCheckerProducer,
    TestingModeCheckerConsumer,
  ],
  exports: [
    KeywordRepository,
    PositionCheckerQueueService,
    DomainRepository,
    SearchEngineRepository,
    LocalizationRepository,
    TestingModeRepository,
    TestingModeCheckerQueueService,
    UserSubscriptionInfoRepository,
    UserKeywordsListRepository,
    UserDomainsListRepository,
    SearchEnginesListRepository,
    LocalizationsCountryCodeRepository,
  ],
})
export class InfrastructureModule {}
