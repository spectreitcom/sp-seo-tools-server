import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LocalizationCreatedEvent } from '../../domain/events/localization-created.event';
import { Logger } from '@nestjs/common';
import { LocalizationCreatedIntegrationEvent } from '../integration-events/localization-created.integration-event';

@EventsHandler(LocalizationCreatedEvent)
export class LocalizationCreatedEventHandler
  implements IEventHandler<LocalizationCreatedEvent>
{
  private readonly logger = new Logger(LocalizationCreatedEvent.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: LocalizationCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
    this.eventBus.publish(
      new LocalizationCreatedIntegrationEvent(
        event.localizationId,
        event.countryCode,
        event.name,
      ),
    );
  }
}
