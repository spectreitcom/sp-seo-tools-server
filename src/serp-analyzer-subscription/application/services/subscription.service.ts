import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { CreateSubscriptionCommand } from '../commands/create-subscription.command';

@Injectable()
export class SubscriptionService {
  constructor(private readonly commandBus: CommandBus) {}

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
}
