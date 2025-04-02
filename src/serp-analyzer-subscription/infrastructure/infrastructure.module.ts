import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { SubscriptionRepository } from '../application/ports/subscription.repository';
import { PrismaSubscriptionRepository } from './persistence/prisma-subscription.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SubscriptionRepository,
      useClass: PrismaSubscriptionRepository,
    },
  ],
  exports: [SubscriptionRepository],
})
export class InfrastructureModule {}
