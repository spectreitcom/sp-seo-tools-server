import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SubscriptionRepository } from '../application/ports/subscription.repository';
import { PrismaSubscriptionRepository } from './persistence/repositories/prisma-subscription.repository';
import { UserSubscriptionRepository } from '../application/ports/user-subscription.repository';
import { PrismaUserSubscriptionRepository } from './persistence/repositories/prisma-user-subscription.repository';
import { StripeService } from '../application/ports/stripe.service';
import { AppStripeService } from './app-stripe.service';
import { SubscriptionsListRepository } from '../application/ports/subscriptions-list.repository';
import { PrismaSubscriptionsListRepository } from './persistence/repositories/prisma-subscriptions-list.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionRepository,
    },
    {
      provide: UserSubscriptionRepository,
      useClass: PrismaUserSubscriptionRepository,
    },
    {
      provide: StripeService,
      useClass: AppStripeService,
    },
    {
      provide: SubscriptionsListRepository,
      useClass: PrismaSubscriptionsListRepository,
    },
  ],
  exports: [
    SubscriptionRepository,
    UserSubscriptionRepository,
    StripeService,
    SubscriptionsListRepository,
  ],
})
export class InfrastructureModule {}
