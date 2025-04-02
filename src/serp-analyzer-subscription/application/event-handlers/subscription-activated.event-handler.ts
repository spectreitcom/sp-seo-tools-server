import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionActivatedEvent } from '../../domain/events/subscription-activated.event';
import { Logger } from '@nestjs/common';
import { SubscriptionActivatedIntegrationEvent } from '../integration-events/subscription-activated.integration-event';
import { SubscriptionRepository } from '../ports/subscription.repository';

@EventsHandler(SubscriptionActivatedEvent)
export class SubscriptionActivatedEventHandler
  implements IEventHandler<SubscriptionActivatedEvent>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  private readonly logger = new Logger(SubscriptionActivatedEvent.name);

  async handle(event: SubscriptionActivatedEvent) {
    this.logger.debug(JSON.stringify(event));

    const { subscriptionId, userId } = event;

    const subscription =
      await this.subscriptionRepository.findById(subscriptionId);

    if (!subscription) return;

    this.eventBus.publish(
      new SubscriptionActivatedIntegrationEvent(
        userId,
        subscription.getSearchedPages(),
        subscription.getAnalysisPerMonth(),
      ),
    );
  }
}
