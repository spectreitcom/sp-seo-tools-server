import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SearchEngineCreatedEvent } from '../../domain/events/search-engine-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(SearchEngineCreatedEvent)
export class SearchEngineCreatedEventHandler
  implements IEventHandler<SearchEngineCreatedEvent>
{
  private readonly logger = new Logger(SearchEngineCreatedEvent.name);

  handle(event: SearchEngineCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
  }
}
