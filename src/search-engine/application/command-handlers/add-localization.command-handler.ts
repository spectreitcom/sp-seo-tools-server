import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddLocalizationCommand } from '../commands/add-localization.command';
import { LocalizationRepository } from '../ports/localization.repository';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LocalizationFactory } from '../../domain/factories/localization.factory';

@CommandHandler(AddLocalizationCommand)
export class AddLocalizationCommandHandler
  implements ICommandHandler<AddLocalizationCommand, void>
{
  constructor(
    private readonly localizationRepository: LocalizationRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: AddLocalizationCommand): Promise<void> {
    const { domainParam, countryCode, name } = command;

    const localizationExistsForSearchEngineExists =
      await this.localizationRepository.localizationExists(countryCode);

    if (localizationExistsForSearchEngineExists) {
      throw new BadRequestException('Localization already exists');
    }

    try {
      const localization = LocalizationFactory.create(
        domainParam,
        countryCode,
        name,
      );
      localization.create();
      this.eventPublisher.mergeObjectContext(localization);
      await this.localizationRepository.save(localization);
      localization.commit();
    } catch (_) {
      throw new InternalServerErrorException();
    }
  }
}
