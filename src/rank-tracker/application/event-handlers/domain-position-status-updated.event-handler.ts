import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DomainPositionStatusUpdatedEvent } from '../../domain/events/domain-position-status-updated.event';
import { Logger } from '@nestjs/common';

@EventsHandler(DomainPositionStatusUpdatedEvent)
export class DomainPositionStatusUpdatedEventHandler
  implements IEventHandler<DomainPositionStatusUpdatedEvent>
{
  private readonly logger = new Logger(DomainPositionStatusUpdatedEvent.name);

  handle(event: DomainPositionStatusUpdatedEvent) {
    this.logger.debug(JSON.stringify(event));
  }
}
