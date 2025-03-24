import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SubscriptionCreatedEvent } from '../../domain/events/subscription-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(SubscriptionCreatedEvent)
export class SubscriptionCreatedEventHandler
  implements IEventHandler<SubscriptionCreatedEvent>
{
  private readonly logger = new Logger(SubscriptionCreatedEvent.name);

  handle(event: SubscriptionCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
  }
}
