import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LocalizationCreatedEvent } from '../../domain/events/localization-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(LocalizationCreatedEvent)
export class LocalizationCreatedEventHandler
  implements IEventHandler<LocalizationCreatedEvent>
{
  private readonly logger = new Logger(LocalizationCreatedEvent.name);

  handle(event: LocalizationCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
  }
}
