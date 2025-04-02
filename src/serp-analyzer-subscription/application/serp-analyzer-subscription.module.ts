import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthModule } from '../../admin-auth/application/admin-auth.module';
import { UserAuthModule } from '../../user-auth/application/user-auth.module';
import { CreateSubscriptionCommandHandler } from './command-handlers/create-subscription.command-handler';
import { SubscriptionService } from './services/subscription.service';
import { AdminSubscriptionController } from '../presenters/http/admin-subscription.controller';

@Module({
  imports: [InfrastructureModule, AdminAuthModule, UserAuthModule],
  controllers: [AdminSubscriptionController],
  providers: [
    AdminAuthGuard,
    AuthGuard,
    CreateSubscriptionCommandHandler,
    SubscriptionService,
  ],
})
export class SerpAnalyzerSubscriptionModule {}
