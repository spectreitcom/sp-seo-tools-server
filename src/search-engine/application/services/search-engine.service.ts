import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddLocalizationCommand } from '../commands/add-localization.command';
import { AddLocalizationDto } from '../dto/add-localization.dto';
import { SyncLocalizationsCommand } from '../commands/sync-localizations.command';

@Injectable()
export class SearchEngineService {
  constructor(private readonly commandBus: CommandBus) {}

  async addLocalization(payload: AddLocalizationDto) {
    const { countryCode, name } = payload;
    return await this.commandBus.execute<AddLocalizationCommand, void>(
      new AddLocalizationCommand(countryCode, name),
    );
  }

  async syncLocalizations() {
    return await this.commandBus.execute<SyncLocalizationsCommand, void>(
      new SyncLocalizationsCommand(),
    );
  }
}
