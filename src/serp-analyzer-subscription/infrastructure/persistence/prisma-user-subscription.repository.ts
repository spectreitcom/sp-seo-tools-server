import { Injectable } from '@nestjs/common';
import { UserSubscriptionRepository } from '../../application/ports/user-subscription.repository';
import { UserSubscription } from '../../domain/user-subscription';
import { DatabaseService } from '../../../database/database.service';
import { UserSubscriptionMapper } from '../../domain/mappers/user-subscription.mapper';

@Injectable()
export class PrismaUserSubscriptionRepository
  implements UserSubscriptionRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async save(userSubscription: UserSubscription): Promise<void> {
    const userSubscriptionModel =
      await this.databaseService.saUserSubscription.findUnique({
        where: {
          id: userSubscription.getUserSubscriptionId(),
        },
      });

    if (userSubscriptionModel) {
      await this.databaseService.saUserSubscription.update({
        where: {
          id: userSubscription.getUserSubscriptionId(),
        },
        data: {
          userId: userSubscription.getUserId(),
          subscriptionId: userSubscription.getSubscriptionId(),
          active: userSubscription.getActive(),
          customerId: userSubscription.getCustomerId(),
          sessionId: userSubscription.getSessionId(),
        },
      });
      return;
    }

    await this.databaseService.saUserSubscription.create({
      data: {
        id: userSubscription.getUserSubscriptionId(),
        userId: userSubscription.getUserId(),
        subscriptionId: userSubscription.getSubscriptionId(),
        active: userSubscription.getActive(),
        customerId: userSubscription.getCustomerId(),
        sessionId: userSubscription.getSessionId(),
      },
    });
  }

  async findByUser(userId: string): Promise<UserSubscription> {
    const model = await this.databaseService.saUserSubscription.findUnique({
      where: {
        userId,
      },
    });
    if (!model) return null;
    return UserSubscriptionMapper.toDomain(model);
  }

  async findByCustomer(customerId: string): Promise<UserSubscription> {
    const model = await this.databaseService.saUserSubscription.findUnique({
      where: {
        customerId,
      },
    });
    if (!model) return null;
    return UserSubscriptionMapper.toDomain(model);
  }
}
