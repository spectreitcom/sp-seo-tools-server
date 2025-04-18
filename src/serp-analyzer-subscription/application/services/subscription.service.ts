import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CreateSubscriptionCommand } from '../commands/create-subscription.command';
import { GetSubscriptionsQuery } from '../queries/get-subscriptions.query';
import { SubscriptionReadModel } from '../../infrastructure/read-models/subscription.read-model';
import { GetCurrentUserPlanQuery } from '../queries/get-current-user-plan.query';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSubscription(payload: CreateSubscriptionDto) {
    await this.commandBus.execute<CreateSubscriptionCommand, void>(
      new CreateSubscriptionCommand(
        payload.name,
        payload.amount,
        payload.searchedPages,
        payload.analysisPerMonth,
        payload.priceId,
      ),
    );
  }

  async getSubscriptions() {
    return this.queryBus.execute<
      GetSubscriptionsQuery,
      SubscriptionReadModel[]
    >(new GetSubscriptionsQuery());
  }

  async getCurrentUserPlan(userId: string) {
    return this.queryBus.execute<
      GetCurrentUserPlanQuery,
      SubscriptionReadModel | null
    >(new GetCurrentUserPlanQuery(userId));
  }
}
