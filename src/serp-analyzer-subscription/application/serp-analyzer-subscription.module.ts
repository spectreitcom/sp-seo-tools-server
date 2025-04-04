import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthModule } from '../../admin-auth/application/admin-auth.module';
import { UserAuthModule } from '../../user-auth/application/user-auth.module';
import { CreateSubscriptionCommandHandler } from './command-handlers/create-subscription.command-handler';
import { SubscriptionService } from './services/subscription.service';
import { AdminSubscriptionController } from '../presenters/http/admin-subscription.controller';
import { SubscriptionActivatedEventHandler } from './event-handlers/subscription-activated.event-handler';
import { SubscriptionDeactivatedEventHandler } from './event-handlers/subscription-deactivated.event-handler';
import { CreateCheckoutSessionCommandHandler } from './command-handlers/create-checkout-session.command-handler';
import { SubscriptionController } from '../presenters/http/subscription.controller';
import { PaymentsController } from '../presenters/http/payments.controller';
import { PaymentService } from './services/payment.service';
import { CreateSessionPortalCommandHandler } from './command-handlers/create-session-portal.command-handler';
import { DeactivateSubscriptionCommandHandler } from './command-handlers/deactivate-subscription.command-handler';
import { GetSubscriptionsQueryHandler } from './query-handlers/get-subscriptions.query-handler';

@Module({
  imports: [InfrastructureModule, AdminAuthModule, UserAuthModule],
  controllers: [
    AdminSubscriptionController,
    SubscriptionController,
    PaymentsController,
  ],
  providers: [
    AdminAuthGuard,
    AuthGuard,
    CreateSubscriptionCommandHandler,
    SubscriptionService,
    SubscriptionActivatedEventHandler,
    SubscriptionDeactivatedEventHandler,
    CreateCheckoutSessionCommandHandler,
    PaymentService,
    CreateSessionPortalCommandHandler,
    DeactivateSubscriptionCommandHandler,
    GetSubscriptionsQueryHandler,
  ],
})
export class SerpAnalyzerSubscriptionModule {}
