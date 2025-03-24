import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSubscriptionsQuery } from '../queries/get-subscriptions.query';
import { SubscriptionListItemDto } from '../dto/subscription-list-item.dto';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';
import { SubscriptionsListRepository } from '../ports/subscriptions-list.repository';

export type GetSubscriptionsQueryResponse = SubscriptionListItemDto[];

@QueryHandler(GetSubscriptionsQuery)
export class GetSubscriptionsQueryHandler
  implements IQueryHandler<GetSubscriptionsQuery, GetSubscriptionsQueryResponse>
{
  constructor(
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly subscriptionsListRepository: SubscriptionsListRepository,
  ) {}

  async execute(
    query: GetSubscriptionsQuery,
  ): Promise<GetSubscriptionsQueryResponse> {
    const { userId } = query;

    const hasActiveSubscription =
      await this.userSubscriptionRepository.hasUserActiveSubscription(userId);

    if (hasActiveSubscription) return [];

    return this.subscriptionsListRepository.findAll();
  }
}
