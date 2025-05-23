import { Module } from '@nestjs/common';
import { PositionCheckerCron } from './cron/position-checker.cron';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AddDomainCommandHandler } from './command-handlers/add-domain.command-handler';
import { LocalizationCreatedEventHandler } from './event-handlers/localization-created.event-handler';
import { DomainsController } from '../presenters/http/domains.controller';
import { DomainService } from './services/domain.service';
import { TestingModeService } from './services/testing-mode.service';
import { TestingModeCheckerCron } from './cron/testing-mode-checker.cron';
import { GetUserKeywordsListQueryHandler } from './query-handlers/get-user-keywords-list.query-handler';
import { KeywordsController } from '../presenters/http/keywords.controller';
import { TestingModesController } from '../presenters/http/testing-modes.controller';
import { KeywordService } from './services/keyword.service';
import { DeleteKeywordCommandHandler } from './command-handlers/delete-keyword.command-handler';
import { GetUserDomainsListQueryHandler } from './query-handlers/get-user-domains-list.query-handler';
import { GetAllDevicesQueryHandler } from './query-handlers/get-all-devices.query-handler';
import { DevicesController } from '../presenters/http/devices.controller';
import { DevicesService } from './services/devices.service';
import { GetAllLocalizationsCountryCodesQueryHandler } from './query-handlers/get-all-localizations-country-codes.query-handler';
import { LocalizationsController } from '../presenters/http/localizations.controller';
import { LocalizationsService } from './services/localizations.service';
import { AuthGuard } from './guards/auth.guard';
import { UserAuthModule } from '../../user-auth/application/user-auth.module';
import { SubscriptionActivatedEventHandler } from './event-handlers/subscription-activated.event-handler';
import { SubscriptionDeactivatedEventHandler } from './event-handlers/subscription-deactivated.event-handler';
import { DeleteDomainCommandHandler } from './command-handlers/delete-domain.command-handler';
import { GetLocalizationsQueryHandler } from './query-handlers/get-localizations.query-handler';
import { AddKeywordCommandHandler } from './command-handlers/add-keyword.command-handler';
import { GetAllAvailableForUserDevicesQueryHandler } from './query-handlers/get-all-available-for-user-devices.query-handler';
import { GetUserKeywordQueryHandler } from './query-handlers/get-user-keyword.query-handler';
import { GetUserDomainQueryHandler } from './query-handlers/get-user-domain.query-handler';
import { GetAvailableKeywordsQuantityQueryHandler } from './query-handlers/get-available-keywords-quantity.query-handler';
import { GetUserTestingModeInfoQueryHandler } from './query-handlers/get-user-testing-mode-info.query-handler';
import { ActivateTestingModeCommandHandler } from './command-handlers/activate-testing-mode.command-handler';
import { GetDomainPositionHistoryQueryHandler } from './query-handlers/get-domain-position-history.query-handler';
import { DomainHistoryPositionService } from './services/domain-history-position.service';
import { DomainPositionHistoryController } from '../presenters/http/domain-position-history.controller';
import { SeedCommand } from './cli/seed.command';
import { DomainPositionProcessingCron } from './cron/domain-position-processing.cron';
import { DomainPositionCreatedEventHandler } from './event-handlers/domain-position-created.event-handler';
import { DomainPositionStatusUpdatedEventHandler } from './event-handlers/domain-position-status-updated.event-handler';
import { KeywordAddedEventHandler } from './event-handlers/keyword-added.event-handler';
import { LocalizationSyncEventHandler } from './event-handlers/localization-sync.event-handler';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [InfrastructureModule, UserAuthModule, SharedModule],
  controllers: [
    DomainsController,
    KeywordsController,
    TestingModesController,
    DevicesController,
    LocalizationsController,
    DomainPositionHistoryController,
  ],
  providers: [
    PositionCheckerCron,
    AddDomainCommandHandler,
    LocalizationCreatedEventHandler,
    DomainService,
    TestingModeService,
    TestingModeCheckerCron,
    GetUserKeywordsListQueryHandler,
    KeywordService,
    DeleteKeywordCommandHandler,
    GetUserDomainsListQueryHandler,
    GetAllDevicesQueryHandler,
    DevicesService,
    GetAllLocalizationsCountryCodesQueryHandler,
    LocalizationsService,
    AuthGuard,
    SubscriptionActivatedEventHandler,
    SubscriptionDeactivatedEventHandler,
    DeleteDomainCommandHandler,
    GetLocalizationsQueryHandler,
    AddKeywordCommandHandler,
    GetAllAvailableForUserDevicesQueryHandler,
    GetUserKeywordQueryHandler,
    GetUserDomainQueryHandler,
    GetAvailableKeywordsQuantityQueryHandler,
    GetUserTestingModeInfoQueryHandler,
    ActivateTestingModeCommandHandler,
    GetDomainPositionHistoryQueryHandler,
    DomainHistoryPositionService,
    SeedCommand,
    DomainPositionProcessingCron,
    DomainPositionCreatedEventHandler,
    DomainPositionStatusUpdatedEventHandler,
    KeywordAddedEventHandler,
    LocalizationSyncEventHandler,
  ],
})
export class RankTrackerModule {}
