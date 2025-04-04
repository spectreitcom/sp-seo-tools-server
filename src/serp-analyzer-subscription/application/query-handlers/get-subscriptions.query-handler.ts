import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSubscriptionsQuery } from '../queries/get-subscriptions.query';
import { SubscriptionReadModel } from '../../infrastructure/read-models/subscription.read-model';
import { SubscriptionReadRepository } from '../ports/subscription-read.repository';

@QueryHandler(GetSubscriptionsQuery)
export class GetSubscriptionsQueryHandler
  implements IQueryHandler<GetSubscriptionsQuery, SubscriptionReadModel[]>
{
  constructor(
    private readonly subscriptionReadRepository: SubscriptionReadRepository,
  ) {}

  async execute(): Promise<SubscriptionReadModel[]> {
    return this.subscriptionReadRepository.findAll();
  }
}
