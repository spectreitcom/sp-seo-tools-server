import { Module } from '@nestjs/common';
import { PositionCheckerCron } from './cron/position-checker.cron';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AddDomainCommandHandler } from './command-handlers/add-domain.command-handler';
import { SearchEngineCreatedEventHandler } from './event-handlers/search-engine-created.event-handler';
import { LocalizationCreatedEventHandler } from './event-handlers/localization-created.event-handler';
import { DomainsController } from '../presenters/http/domains.controller';
import { DomainService } from './services/domain.service';
import { ActivateTestingModeCommand } from './commands/activate-testing-mode.command';
import { DeactivateTestingModeCommandHandler } from './command-handlers/deactivate-testing-mode.command-handler';
import { TestingModeService } from './services/testing-mode.service';
import { TestingModeCheckerCron } from './cron/testing-mode-checker.cron';
import { GetUserKeywordsListQueryHandler } from './query-handlers/get-user-keywords-list.query-handler';
import { KeywordsController } from '../presenters/http/keywords.controller';
import { TestingModesController } from '../presenters/http/testing-modes.controller';
import { KeywordService } from './services/keyword.service';
import { DeleteKeywordCommandHandler } from './command-handlers/delete-keyword.command-handler';
import { GetUserDomainsListQueryHandler } from './query-handlers/get-user-domains-list.query-handler';
import { GetAllSearchEnginesQueryHandler } from './query-handlers/get-all-search-engines.query-handler';
import { SearchEngineService } from './services/search-engine.service';
import { SearchEnginesController } from '../presenters/http/search-engines.controller';
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

@Module({
  imports: [InfrastructureModule, UserAuthModule],
  controllers: [
    DomainsController,
    KeywordsController,
    TestingModesController,
    SearchEnginesController,
    DevicesController,
    LocalizationsController,
  ],
  providers: [
    PositionCheckerCron,
    AddDomainCommandHandler,
    SearchEngineCreatedEventHandler,
    LocalizationCreatedEventHandler,
    DomainService,
    ActivateTestingModeCommand,
    DeactivateTestingModeCommandHandler,
    TestingModeService,
    TestingModeCheckerCron,
    GetUserKeywordsListQueryHandler,
    KeywordService,
    DeleteKeywordCommandHandler,
    GetUserDomainsListQueryHandler,
    GetAllSearchEnginesQueryHandler,
    SearchEngineService,
    GetAllDevicesQueryHandler,
    DevicesService,
    GetAllLocalizationsCountryCodesQueryHandler,
    LocalizationsService,
    AuthGuard,
    SubscriptionActivatedEventHandler,
    SubscriptionDeactivatedEventHandler,
  ],
})
export class RankTrackerModule {}
