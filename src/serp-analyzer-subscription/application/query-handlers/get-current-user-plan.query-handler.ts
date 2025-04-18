import { GetCurrentUserPlanQuery } from '../queries/get-current-user-plan.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubscriptionReadModel } from '../../infrastructure/read-models/subscription.read-model';
import { SubscriptionReadRepository } from '../ports/subscription-read.repository';

@QueryHandler(GetCurrentUserPlanQuery)
export class GetCurrentUserPlanQueryHandler
  implements
    IQueryHandler<GetCurrentUserPlanQuery, SubscriptionReadModel | null>
{
  constructor(
    private readonly subscriptionReadRepository: SubscriptionReadRepository,
  ) {}

  async execute(
    query: GetCurrentUserPlanQuery,
  ): Promise<SubscriptionReadModel | null> {
    const { userId } = query;
    return await this.subscriptionReadRepository.findByUser(userId);
  }
}
