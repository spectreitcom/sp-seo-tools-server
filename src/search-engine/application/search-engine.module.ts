import { Module } from '@nestjs/common';
import { AddLocalizationCommandHandler } from './command-handlers/add-localization.command-handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AdminSearchEngineController } from '../presenters/http/admin-search-engine.controller';
import { SearchEngineService } from './services/search-engine.service';
import { LocalizationCreatedEventHandler } from './event-handlers/localization-created.event-handler';
import { AdminAuthModule } from '../../admin-auth/application/admin-auth.module';
import { AdminAuthGuard } from './guards/admin-auth.guard';

@Module({
  imports: [InfrastructureModule, AdminAuthModule],
  controllers: [AdminSearchEngineController],
  providers: [
    AddLocalizationCommandHandler,
    SearchEngineService,
    LocalizationCreatedEventHandler,
    AdminAuthGuard,
  ],
})
export class SearchEngineModule {}
