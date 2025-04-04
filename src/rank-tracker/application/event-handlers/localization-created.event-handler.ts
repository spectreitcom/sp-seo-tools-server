import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { LocalizationRepository } from '../ports/localization.repository';
import { LocalizationFactory } from '../../domain/factories/localization.factory';
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
  ) {}

  async handle(event: LocalizationCreatedIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));

    const { countryCode, name } = event;

    const localization = LocalizationFactory.create(countryCode, name);

    await this.localizationRepository.save(localization);
  }
}
