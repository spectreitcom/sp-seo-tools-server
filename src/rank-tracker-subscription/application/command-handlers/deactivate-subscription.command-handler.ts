import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeactivateSubscriptionCommand } from '../commands/deactivate-subscription.command';
import { UserSubscriptionRepository } from '../ports/user-subscription.repository';

@CommandHandler(DeactivateSubscriptionCommand)
export class DeactivateSubscriptionCommandHandler
  implements ICommandHandler<DeactivateSubscriptionCommand, void>
{
  constructor(
    private readonly userSubscriptionRepository: UserSubscriptionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: DeactivateSubscriptionCommand): Promise<void> {
    const { customerId } = command;

    const userSubscription =
      await this.userSubscriptionRepository.findByCustomer(customerId);

    if (userSubscription) {
      this.eventPublisher.mergeObjectContext(userSubscription);
      userSubscription.deactivate();
      await this.userSubscriptionRepository.save(userSubscription);
      userSubscription.commit();
    }
  }
}
