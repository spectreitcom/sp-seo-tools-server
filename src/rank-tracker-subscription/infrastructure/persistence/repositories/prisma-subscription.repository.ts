import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../../application/ports/subscription.repository';
import { Subscription } from 'src/rank-tracker-subscription/domain/subscription';
import { DatabaseService } from '../../../../database/database.service';
import { SubscriptionMapper } from '../../../domain/mappers/subscription.mapper';

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(subscription: Subscription): Promise<void> {
    const model = await this.databaseService.rankTrackerSubscription.findUnique(
      {
        where: { id: subscription.getSubscriptionId() },
      },
    );

    if (model) {
      await this.databaseService.rankTrackerSubscription.update({
        where: { id: subscription.getSubscriptionId() },
        data: {
          priceId: subscription.getPriceId(),
          amount: subscription.getAmount(),
          name: subscription.getName(),
          maxKeywordsQty: subscription.getMaxKeywordsQty(),
          maxSearchedPages: subscription.getMaxSearchedPages(),
        },
      });
      return;
    }

    await this.databaseService.rankTrackerSubscription.create({
      data: {
        id: subscription.getSubscriptionId(),
        name: subscription.getName(),
        amount: subscription.getAmount(),
        maxKeywordsQty: subscription.getMaxKeywordsQty(),
        priceId: subscription.getPriceId(),
        maxSearchedPages: subscription.getMaxSearchedPages(),
      },
    });
  }

  async existsByPriceId(priceId: string): Promise<boolean> {
    const model = await this.databaseService.rankTrackerSubscription.findUnique(
      {
        where: { priceId },
      },
    );
    return !!model;
  }

  async findById(subscriptionId: string): Promise<Subscription | null> {
    const model = await this.databaseService.rankTrackerSubscription.findUnique(
      {
        where: { id: subscriptionId },
      },
    );
    if (!model) return null;
    return SubscriptionMapper.toDomain(model);
  }
}
