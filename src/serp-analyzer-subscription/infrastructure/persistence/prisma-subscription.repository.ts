import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../../application/ports/subscription.repository';
import { Subscription } from '../../domain/subscription';
import { DatabaseService } from '../../../database/database.service';
import { SubscriptionMapper } from '../../domain/mappers/subscription.mapper';

@Injectable()
export class PrismaSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async save(subscription: Subscription): Promise<void> {
    const subscriptionModel =
      await this.databaseService.saSubscription.findUnique({
        where: {
          id: subscription.getSubscriptionId(),
        },
      });

    if (subscriptionModel) {
      await this.databaseService.saSubscription.update({
        where: {
          id: subscription.getSubscriptionId(),
        },
        data: {
          name: subscription.getName(),
          amount: subscription.getAmount(),
          searchedPages: subscription.getSearchedPages(),
          analysisPerMonth: subscription.getAnalysisPerMonth(),
          priceId: subscription.getPriceId(),
        },
      });
      return;
    }

    await this.databaseService.saSubscription.create({
      data: {
        id: subscription.getSubscriptionId(),
        name: subscription.getName(),
        amount: subscription.getAmount(),
        searchedPages: subscription.getSearchedPages(),
        analysisPerMonth: subscription.getAnalysisPerMonth(),
        priceId: subscription.getPriceId(),
      },
    });
  }

  async findByPriceId(priceId: string): Promise<Subscription> {
    const model = await this.databaseService.saSubscription.findUnique({
      where: { priceId },
    });
    if (!model) return null;
    return SubscriptionMapper.toDomain(model);
  }

  async findById(subscriptionId: string): Promise<Subscription> {
    const model = await this.databaseService.saSubscription.findUnique({
      where: { id: subscriptionId },
    });
    if (!model) return null;
    return SubscriptionMapper.toDomain(model);
  }
}
