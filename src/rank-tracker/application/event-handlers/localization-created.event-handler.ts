import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LocalizationCreatedEvent } from '../../../search-engine/domain/events/localization-created.event';
import { Logger } from '@nestjs/common';
import { LocalizationRepository } from '../ports/localization.repository';
import { LocalizationFactory } from '../../domain/factories/localization.factory';
import { SearchEngineRepository } from '../ports/search-engine.repository';

@EventsHandler(LocalizationCreatedEvent)
export class LocalizationCreatedEventHandler
  implements IEventHandler<LocalizationCreatedEvent>
{
  private readonly logger = new Logger(LocalizationCreatedEvent.name);

  constructor(
    private readonly localizationRepository: LocalizationRepository,
    private readonly searchEngineRepository: SearchEngineRepository,
  ) {}

  async handle(event: LocalizationCreatedEvent) {
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
