import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionDeactivatedEvent } from '../../domain/events/subscription-deactivated.event';
import { Logger } from '@nestjs/common';
import { SubscriptionDeactivatedIntegrationEvent } from '../integration-events/subscription-deactivated.integration-event';

@EventsHandler(SubscriptionDeactivatedEvent)
export class SubscriptionDeactivatedEventHandler
  implements IEventHandler<SubscriptionDeactivatedEvent>
{
  private readonly logger = new Logger(SubscriptionDeactivatedEvent.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: SubscriptionDeactivatedEvent) {
    this.logger.debug(JSON.stringify(event));
    const { userId } = event;
    this.eventBus.publish(new SubscriptionDeactivatedIntegrationEvent(userId));
  }
}
