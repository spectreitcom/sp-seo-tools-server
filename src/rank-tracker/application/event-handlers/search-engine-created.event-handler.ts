import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SearchEngineRepository } from '../ports/search-engine.repository';
import { SearchEngineFactory } from '../../domain/factories/search-engine.factory';
import { SearchEngineCreatedIntegrationEvent } from '../../../search-engine/application/integration-events/search-engine-created.integration-event';

@EventsHandler(SearchEngineCreatedIntegrationEvent)
export class SearchEngineCreatedEventHandler
  implements IEventHandler<SearchEngineCreatedIntegrationEvent>
{
  private readonly logger: Logger = new Logger(
    SearchEngineCreatedIntegrationEvent.name,
  );

  constructor(
    private readonly searchEngineRepository: SearchEngineRepository,
  ) {}

  async handle(event: SearchEngineCreatedIntegrationEvent) {
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
