import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LocalizationSyncIntegrationEvent } from '../../../search-engine/application/integration-events/localization-sync.integration-event';
import { LocalizationRepository } from '../ports/localization.repository';
import { LocalizationFactory } from '../../domain/factories/localization.factory';
import { Logger } from '@nestjs/common';

@EventsHandler(LocalizationSyncIntegrationEvent)
export class LocalizationSyncEventHandler
  implements IEventHandler<LocalizationSyncIntegrationEvent>
{
  private readonly logger = new Logger(LocalizationSyncIntegrationEvent.name);

  constructor(
    private readonly localizationRepository: LocalizationRepository,
  ) {}

  async handle(event: LocalizationSyncIntegrationEvent) {
    this.logger.debug(JSON.stringify(event));

    const { localizations } = event;

    for (const localization of localizations) {
      const _localization = await this.localizationRepository.findByCountryCode(
        localization.countryCode,
      );

      if (!_localization) {
        const newLocalization = LocalizationFactory.create(
          localization.countryCode,
          localization.name,
        );
        await this.localizationRepository.save(newLocalization);
      }
    }
  }
}
