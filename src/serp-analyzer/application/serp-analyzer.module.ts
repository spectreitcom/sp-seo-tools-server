import { Module } from '@nestjs/common';
import { SubscriptionActivatedEventHandler } from './event-handlers/subscription-activated.event-handler';
import { SubscriptionDeactivatedEventHandler } from './event-handlers/subscription-deactivated.event-handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ActivateTestingModeCommandHandler } from './command-handlers/activate-testing-mode.command-handler';
import { TestingModeService } from './services/testing-mode.service';
import { TestingModeController } from '../presenters/http/testing-mode.controller';
import { UserAuthModule } from '../../user-auth/application/user-auth.module';
import { AdminAuthModule } from '../../admin-auth/application/admin-auth.module';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { LocalizationCreatedEventHandler } from './event-handlers/localization-created.event-handler';
import { TestingModeCheckerCron } from './cron/testing-mode-checker.cron';
import { AnalysisCreatedEventHandler } from './event-handlers/analysis-created.event-handler';
import { AnalysisFinishedEventHandler } from './event-handlers/analysis-finished.event-handler';
import { CreateAnalysisCommandHandler } from './command-handlers/create-analysis.command-handler';
import { GoogleScraperModule } from '../../google-scraper/application/google-scraper.module';
import { ScrapingFinishedEventHandler } from './event-handlers/scraping-finished.event-handler';
import { StageProcessingFinishedEventHandler } from './event-handlers/stage-processing-finished.event-handler';
import { AnalysisService } from './services/analysis.service';
import { AnalysisController } from '../presenters/http/analysis.controller';
import { GetUserAnalysisListQueryHandler } from './query-handlers/get-user-analysis-list.query-handler';
import { GetUserMonthlyUsageQueryHandler } from './query-handlers/get-user-monthly-usage.query-handler';
import { AnalysisProgressService } from './services/analysis-progress.service';
import { AnalysisProgressController } from '../presenters/http/analysis-progress.controller';
import { AddCompetitorCommandHandler } from './command-handlers/add-competitor.command-handler';
import { GetUserTestingModeInfoQueryHandler } from './query-handlers/get-user-testing-mode-info.query-handler';
import { GetAllDevicesQueryHandler } from './query-handlers/get-all-devices.query-handler';
import { DevicesController } from '../presenters/http/devices.controller';
import { DevicesService } from './services/devices.service';
import { GetLocalizationsQueryHandler } from './query-handlers/get-localizations.query-handler';
import { LocalizationService } from './services/localization.service';
import { LocalizationsController } from '../presenters/http/localizations.controller';
import { GetProgressQueryHandler } from './query-handlers/get-progress.query-handler';

@Module({
  imports: [
    InfrastructureModule,
    UserAuthModule,
    AdminAuthModule,
    GoogleScraperModule,
  ],
  controllers: [
    TestingModeController,
    AnalysisController,
    AnalysisProgressController,
    DevicesController,
    LocalizationsController,
  ],
  providers: [
    SubscriptionActivatedEventHandler,
    SubscriptionDeactivatedEventHandler,
    ActivateTestingModeCommandHandler,
    TestingModeService,
    AdminAuthGuard,
    AuthGuard,
    LocalizationCreatedEventHandler,
    TestingModeCheckerCron,
    AnalysisCreatedEventHandler,
    AnalysisFinishedEventHandler,
    CreateAnalysisCommandHandler,
    ScrapingFinishedEventHandler,
    StageProcessingFinishedEventHandler,
    AnalysisService,
    GetUserAnalysisListQueryHandler,
    GetUserMonthlyUsageQueryHandler,
    AnalysisProgressService,
    AddCompetitorCommandHandler,
    GetUserTestingModeInfoQueryHandler,
    GetAllDevicesQueryHandler,
    DevicesService,
    GetLocalizationsQueryHandler,
    LocalizationService,
    GetProgressQueryHandler,
  ],
})
export class SerpAnalyzerModule {}
