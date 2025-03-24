import { Injectable } from '@nestjs/common';
import { UserSubscriptionRepository } from '../../../application/ports/user-subscription.repository';
import { UserSubscription } from 'src/rank-tracker-subscription/domain/user-subscription';
import { DatabaseService } from '../../../../database/database.service';
import { UserSubscriptionMapper } from '../../../domain/mappers/user-subscription.mapper';

@Injectable()
export class PrismaUserSubscriptionRepository
  implements UserSubscriptionRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(userSubscription: UserSubscription): Promise<void> {
    const model =
      await this.databaseService.rankTrackerUserSubscription.findUnique({
        where: {
          id: userSubscription.getUserSubscriptionId(),
        },
      });

    if (model) {
      await this.databaseService.rankTrackerUserSubscription.update({
        where: {
          id: userSubscription.getUserSubscriptionId(),
        },
        data: {
          userId: userSubscription.getUserId(),
          subscriptionId: userSubscription.getSubscriptionId(),
          active: userSubscription.getActive(),
          sessionId: userSubscription.getSessionId(),
          customerId: userSubscription.getCustomerId(),
        },
      });
      return;
    }

    await this.databaseService.rankTrackerUserSubscription.create({
      data: {
        id: userSubscription.getUserSubscriptionId(),
        userId: userSubscription.getUserId(),
        subscriptionId: userSubscription.getSubscriptionId(),
        active: userSubscription.getActive(),
        sessionId: userSubscription.getSessionId(),
        customerId: userSubscription.getCustomerId(),
      },
    });
  }

  async findByCustomer(customerId: string): Promise<UserSubscription | null> {
    const model =
      await this.databaseService.rankTrackerUserSubscription.findUnique({
        where: { customerId },
      });

    if (!model) return null;

    return UserSubscriptionMapper.toDomain(model);
  }

  async hasUserActiveSubscription(userId: string): Promise<boolean> {
    const model =
      await this.databaseService.rankTrackerUserSubscription.findUnique({
        where: { userId, active: true },
      });
    return !!model;
  }

  async findByUser(userId: string): Promise<UserSubscription | null> {
    const model =
      await this.databaseService.rankTrackerUserSubscription.findUnique({
        where: { userId },
      });

    if (!model) return null;

    return UserSubscriptionMapper.toDomain(model);
  }
}
