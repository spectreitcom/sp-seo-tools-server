import { SubscriptionListItemDto } from '../dto/subscription-list-item.dto';

export abstract class SubscriptionsListRepository {
  abstract findAll(): Promise<SubscriptionListItemDto[]>;
  abstract findByUserId(userId: string): Promise<SubscriptionListItemDto>;
  abstract getActivePlanByUser(
    userId: string,
  ): Promise<SubscriptionListItemDto>;
}
