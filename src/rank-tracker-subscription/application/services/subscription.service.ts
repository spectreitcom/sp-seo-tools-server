import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSubscriptionCommand } from '../commands/create-subscription.command';
import { GetSubscriptionsQuery } from '../queries/get-subscriptions.query';
import { GetSubscriptionsQueryResponse } from '../query-handlers/get-subscriptions.query-handler';
import { GetCurrentPlanQuery } from '../queries/get-current-plan.query';
import { SubscriptionListItemDto } from '../dto/subscription-list-item.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createSubscription(payload: CreateSubscriptionDto) {
    return this.commandBus.execute<CreateSubscriptionCommand, void>(
      new CreateSubscriptionCommand(
        payload.name,
        payload.amount,
        payload.maxKeywordsQty,
        payload.priceId,
        payload.maxSearchedPages,
      ),
    );
  }

  getSubscriptions(userId: string) {
    return this.queryBus.execute<
      GetSubscriptionsQuery,
      GetSubscriptionsQueryResponse
    >(new GetSubscriptionsQuery(userId));
  }

  getCurrentPlan(userId: string) {
    return this.queryBus.execute<GetCurrentPlanQuery, SubscriptionListItemDto>(
      new GetCurrentPlanQuery(userId),
    );
  }
}
