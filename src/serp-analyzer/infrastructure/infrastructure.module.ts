import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserSubscriptionInfoRepository } from '../application/ports/user-subscription-info.repository';
import { PrismaUserSubscriptionInfoRepository } from './persistence/prisma-user-subscription-info.repository';
import { TestingModeRepository } from '../application/ports/testing-mode.repository';
import { PrismaTestingModeRepository } from './persistence/prisma-testing-mode.repository';
import { LocalizationRepository } from '../application/ports/localization.repository';
import { PrismaLocalizationRepository } from './persistence/prisma-localization.repository';

@Module({
  imports: [DatabaseModule],
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
  ],
  exports: [
    UserSubscriptionInfoRepository,
    TestingModeRepository,
    LocalizationRepository,
  ],
})
export class InfrastructureModule {}
