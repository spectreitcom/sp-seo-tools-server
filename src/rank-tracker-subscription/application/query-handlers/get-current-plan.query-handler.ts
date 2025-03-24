import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrentPlanQuery } from '../queries/get-current-plan.query';
import { SubscriptionListItemDto } from '../dto/subscription-list-item.dto';
import { SubscriptionsListRepository } from '../ports/subscriptions-list.repository';

@QueryHandler(GetCurrentPlanQuery)
export class GetCurrentPlanQueryHandler
  implements IQueryHandler<GetCurrentPlanQuery, SubscriptionListItemDto>
{
  constructor(
    private readonly subscriptionsListRepository: SubscriptionsListRepository,
  ) {}

  execute(query: GetCurrentPlanQuery): Promise<SubscriptionListItemDto> {
    const { userId } = query;
    return this.subscriptionsListRepository.getActivePlanByUser(userId);
  }
}
