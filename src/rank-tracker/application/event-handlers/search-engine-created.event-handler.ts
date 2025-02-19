import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SearchEngineCreatedEvent } from '../../../search-engine/domain/events/search-engine-created.event';
import { Logger } from '@nestjs/common';
import { SearchEngineRepository } from '../ports/search-engine.repository';
import { SearchEngineFactory } from '../../domain/factories/search-engine.factory';

@EventsHandler(SearchEngineCreatedEvent)
export class SearchEngineCreatedEventHandler
  implements IEventHandler<SearchEngineCreatedEvent>
{
  private readonly logger: Logger = new Logger(SearchEngineCreatedEvent.name);

  constructor(
    private readonly searchEngineRepository: SearchEngineRepository,
  ) {}

  async handle(event: SearchEngineCreatedEvent) {
    this.logger.debug(JSON.stringify(event));

    const { searchEngineId, engineKey, engineName } = event;

    const searchEngine = SearchEngineFactory.create(
      engineName,
      searchEngineId,
      engineKey,
    );

    await this.searchEngineRepository.save(searchEngine);
  }
}
