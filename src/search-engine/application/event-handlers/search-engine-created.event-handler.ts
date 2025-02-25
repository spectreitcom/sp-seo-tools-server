import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SearchEngineCreatedEvent } from '../../domain/events/search-engine-created.event';
import { Logger } from '@nestjs/common';
import { SearchEngineCreatedIntegrationEvent } from '../integration-events/search-engine-created.integration-event';

@EventsHandler(SearchEngineCreatedEvent)
export class SearchEngineCreatedEventHandler
  implements IEventHandler<SearchEngineCreatedEvent>
{
  private readonly logger = new Logger(SearchEngineCreatedEvent.name);

  constructor(private readonly eventBus: EventBus) {}

  handle(event: SearchEngineCreatedEvent) {
    this.logger.debug(JSON.stringify(event));
    this.eventBus.publish(
      new SearchEngineCreatedIntegrationEvent(
        event.searchEngineId,
        event.engineKey,
        event.engineName,
      ),
    );
  }
}
