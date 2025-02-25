import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { LocalizationRepository } from '../ports/localization.repository';
import { LocalizationFactory } from '../../domain/factories/localization.factory';
import { SearchEngineRepository } from '../ports/search-engine.repository';
import { LocalizationCreatedIntegrationEvent } from '../../../search-engine/application/integration-events/localization-created.integration-event';

@EventsHandler(LocalizationCreatedIntegrationEvent)
export class LocalizationCreatedEventHandler
  implements IEventHandler<LocalizationCreatedIntegrationEvent>
{
  private readonly logger = new Logger(
    LocalizationCreatedIntegrationEvent.name,
  );

  constructor(
    private readonly localizationRepository: LocalizationRepository,
    private readonly searchEngineRepository: SearchEngineRepository,
  ) {}

  async handle(event: LocalizationCreatedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));

    const { searchEngineId, localizationId, domainParam, countryCode, name } =
      event;

    const searchEngine =
      await this.searchEngineRepository.findBySeSearchEngineId(searchEngineId);

    if (!searchEngine) return;

    const localization = LocalizationFactory.create(
      domainParam,
      searchEngine.seSearchEngineId,
      localizationId,
      countryCode,
      name,
    );

    await this.localizationRepository.save(localization);
  }
}
