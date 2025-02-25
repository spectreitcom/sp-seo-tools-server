import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ActivateSubscriptionCommand } from '../commands/activate-subscription.command';
import { UserSubscriptionFactory } from '../../domain/factories/user-subscription.factory';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';

@CommandHandler(ActivateSubscriptionCommand)
export class ActivateSubscriptionCommandHandler
  implements ICommandHandler<ActivateSubscriptionCommand, void>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
  ) {}

  async execute(command: ActivateSubscriptionCommand): Promise<void> {
    const { subscriptionId, userId, sessionId } = command;
    const userSubscription = UserSubscriptionFactory.create(
      userId,
      subscriptionId,
      sessionId,
    );
    this.eventPublisher.mergeObjectContext(userSubscription);
    userSubscription.activate();
    await this.userSubscriptionRepository.save(userSubscription);
    userSubscription.commit();
  }
}
