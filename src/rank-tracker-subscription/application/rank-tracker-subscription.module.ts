import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { SubscriptionCreatedEventHandler } from './event-handlers/subscription-created.event-handler';
import { CreateSubscriptionCommandHandler } from './command-handlers/create-subscription.command-handler';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminAuthModule } from '../../admin-auth/application/admin-auth.module';
import { SubscriptionService } from './services/subscription.service';
import { AdminSubscriptionController } from '../presenters/http/admin-subscription.controller';
import { PaymentService } from './services/payment.service';
import { CreateCheckoutSessionCommandHandler } from './command-handlers/create-checkout-session.command-handler';
import { AuthGuard } from './guards/auth.guard';
import { UserAuthModule } from '../../user-auth/application/user-auth.module';
import { GetSubscriptionsQueryHandler } from './query-handlers/get-subscriptions.query-handler';
import { SubscriptionController } from '../presenters/http/subscription.controller';
import { SubscriptionActivatedEventHandler } from './event-handlers/subscription-activated.event-handler';
import { GetCurrentPlanQueryHandler } from './query-handlers/get-current-plan.query-handler';
import { CreateSessionPortalCommandHandler } from './command-handlers/create-session-portal.command-handler';
import { SubscriptionDeactivatedEventHandler } from './event-handlers/subscription-deactivated.event-handler';
import { DeactivateSubscriptionCommandHandler } from './command-handlers/deactivate-subscription.command-handler';

@Module({
  imports: [InfrastructureModule, AdminAuthModule, UserAuthModule],
  controllers: [AdminSubscriptionController, SubscriptionController],
  providers: [
    SubscriptionCreatedEventHandler,
    CreateSubscriptionCommandHandler,
    AdminAuthGuard,
    SubscriptionService,
    PaymentService,
    CreateCheckoutSessionCommandHandler,
    AuthGuard,
    GetSubscriptionsQueryHandler,
    SubscriptionActivatedEventHandler,
    GetCurrentPlanQueryHandler,
    CreateSessionPortalCommandHandler,
    SubscriptionDeactivatedEventHandler,
    DeactivateSubscriptionCommandHandler,
  ],
})
export class RankTrackerSubscriptionModule {}
