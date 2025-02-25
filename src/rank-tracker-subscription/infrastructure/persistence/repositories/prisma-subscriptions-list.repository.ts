import { Injectable } from '@nestjs/common';
import { SubscriptionsListRepository } from '../../../application/ports/subscriptions-list.repository';
import { SubscriptionListItemDto } from 'src/rank-tracker-subscription/application/dto/subscription-list-item.dto';
import { DatabaseService } from '../../../../database/database.service';

@Injectable()
export class PrismaSubscriptionsListRepository
  implements SubscriptionsListRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<SubscriptionListItemDto[]> {
    const models =
      await this.databaseService.rankTrackerSubscription.findMany();

    return models.map(
      (model) =>
        new SubscriptionListItemDto(
          model.id,
          model.name,
          model.amount,
          model.maxKeywordsQty,
          model.maxSearchedPages,
        ),
    );
  }

  async findByUserId(userId: string): Promise<SubscriptionListItemDto> {
    const model =
      await this.databaseService.rankTrackerUserSubscription.findUnique({
        where: { userId },
        include: {
          subscription: true,
        },
      });

    if (!model) return null;

    return new SubscriptionListItemDto(
      model.subscription.id,
      model.subscription.name,
      model.subscription.amount,
      model.subscription.maxKeywordsQty,
      model.subscription.maxSearchedPages,
    );
  }
}
