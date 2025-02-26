import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionDeactivatedIntegrationEvent } from '../../../rank-tracker-subscription/application/integration-events/subscription-deactivated.integration-event';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@EventsHandler(SubscriptionDeactivatedIntegrationEvent)
export class SubscriptionDeactivatedEventHandler
  implements IEventHandler<SubscriptionDeactivatedIntegrationEvent>
{
  constructor(
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async handle(event: SubscriptionDeactivatedIntegrationEvent) {
    const { userId } = event;

    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);

    if (userSubscriptionInfo) {
      this.eventPublisher.mergeObjectContext(userSubscriptionInfo);
      userSubscriptionInfo.deactivate();
      await this.userSubscriptionInfoRepository.save(userSubscriptionInfo);
      userSubscriptionInfo.commit();
    }
  }
}
