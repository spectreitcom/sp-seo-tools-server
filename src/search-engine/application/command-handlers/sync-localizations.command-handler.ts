import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SyncLocalizationsCommand } from '../commands/sync-localizations.command';
import { LocalizationRepository } from '../ports/localization.repository';
import { LocalizationSyncIntegrationEvent } from '../integration-events/localization-sync.integration-event';

@CommandHandler(SyncLocalizationsCommand)
export class SyncLocalizationsCommandHandler
  implements ICommandHandler<SyncLocalizationsCommand, void>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly localizationRepository: LocalizationRepository,
  ) {}

  async execute(): Promise<void> {
    const localizations = await this.localizationRepository.findAll();

    this.eventBus.publish(
      new LocalizationSyncIntegrationEvent(
        localizations.map((item) => ({
          ...item,
        })),
      ),
    );
  }
}
