import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubscriptionCommand } from '../commands/create-subscription.command';
import { SubscriptionRepository } from '../ports/subscription.repository';
import { SubscriptionFactory } from '../../domain/factories/subscription.factory';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand, void>
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(command: CreateSubscriptionCommand): Promise<void> {
    const { name, amount, searchedPages, analysisPerMonth, priceId } = command;

    const existingSubscription =
      await this.subscriptionRepository.findByPriceId(priceId);

    if (existingSubscription) {
      throw new BadRequestException('There is a plan with given priceId');
    }

    const subscription = SubscriptionFactory.create(
      name,
      amount,
      searchedPages,
      analysisPerMonth,
      priceId,
    );

    await this.subscriptionRepository.save(subscription);
  }
}
