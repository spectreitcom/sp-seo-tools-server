import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionDeactivatedIntegrationEvent } from '../../../serp-analyzer-subscription/application/integration-events/subscription-deactivated.integration-event';
import { Logger } from '@nestjs/common';
import { UserSubscriptionInfoRepository } from '../ports/user-subscription-info.repository';

@EventsHandler(SubscriptionDeactivatedIntegrationEvent)
export class SubscriptionDeactivatedEventHandler
  implements IEventHandler<SubscriptionDeactivatedIntegrationEvent>
{
  private readonly logger = new Logger(
    SubscriptionDeactivatedIntegrationEvent.name,
  );

  constructor(
    private readonly userSubscriptionInfoRepository: UserSubscriptionInfoRepository,
  ) {}

  async handle(event: SubscriptionDeactivatedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));
    const { userId } = event;
    const userSubscriptionInfo =
      await this.userSubscriptionInfoRepository.findByUser(userId);
    if (!userSubscriptionInfo) return;
    userSubscriptionInfo.deactivate();
    await this.userSubscriptionInfoRepository.save(userSubscriptionInfo);
  }
}
