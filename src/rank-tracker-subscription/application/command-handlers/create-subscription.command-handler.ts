import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateSubscriptionCommand } from '../commands/create-subscription.command';
import { SubscriptionRepository } from '../ports/subscription.repository';
import { BadRequestException } from '@nestjs/common';
import { SubscriptionFactory } from '../../domain/factories/subscription.factory';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand, void>
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateSubscriptionCommand): Promise<void> {
    const { priceId, name, maxKeywordsQty, amount, maxSearchedPages } = command;

    const exists = await this.subscriptionRepository.existsByPriceId(priceId);

    if (exists) {
      throw new BadRequestException('Subscription already exists');
    }

    const subscription = SubscriptionFactory.create(
      name,
      amount,
      maxKeywordsQty,
      priceId,
      maxSearchedPages,
    );

    subscription.create();
    this.eventPublisher.mergeObjectContext(subscription);
    await this.subscriptionRepository.save(subscription);
    subscription.commit();
  }
}
