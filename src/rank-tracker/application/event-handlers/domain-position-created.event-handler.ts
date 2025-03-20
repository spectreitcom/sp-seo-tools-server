import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DomainPositionCreatedEvent } from '../../domain/events/domain-position-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(DomainPositionCreatedEvent)
export class DomainPositionCreatedEventHandler
  implements IEventHandler<DomainPositionCreatedEvent>
{
  private readonly logger = new Logger(DomainPositionCreatedEvent.name);

  handle(event: DomainPositionCreatedEvent): void {
    this.logger.debug(JSON.stringify(event));
  }
}
