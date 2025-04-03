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

@Module({
  imports: [InfrastructureModule, UserAuthModule, AdminAuthModule],
  controllers: [TestingModeController],
  providers: [
    SubscriptionActivatedEventHandler,
    SubscriptionDeactivatedEventHandler,
    ActivateTestingModeCommandHandler,
    TestingModeService,
    AdminAuthGuard,
    AuthGuard,
  ],
})
export class SerpAnalyzerModule {}
