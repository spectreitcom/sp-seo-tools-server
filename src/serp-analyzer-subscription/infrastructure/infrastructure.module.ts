import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SubscriptionRepository } from '../application/ports/subscription.repository';
import { PrismaSubscriptionRepository } from './persistence/prisma-subscription.repository';
import { StripeService } from '../application/ports/stripe.service';
import { AppStripeService } from './app-stripe.service';
import { UserSubscriptionRepository } from '../application/ports/user-subscription.repository';
import { PrismaUserSubscriptionRepository } from './persistence/prisma-user-subscription.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionRepository,
    },
    {
      provide: StripeService,
      useClass: AppStripeService,
    },
    {
      provide: UserSubscriptionRepository,
      useClass: PrismaUserSubscriptionRepository,
    },
  ],
  exports: [SubscriptionRepository, StripeService, UserSubscriptionRepository],
})
export class InfrastructureModule {}
