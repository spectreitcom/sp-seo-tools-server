import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddSearchEngineCommand } from '../commands/add-search-engine.command';
import { AddLocalizationCommand } from '../commands/add-localization.command';
import { AddSearchEngineDto } from '../dto/add-search-engine.dto';
import { AddLocalizationDto } from '../dto/add-localization.dto';

@Injectable()
export class SearchEngineService {
  constructor(private readonly commandBus: CommandBus) {}

  async addSearchEngine(payload: AddSearchEngineDto) {
    const { engineKey, name } = payload;
    return await this.commandBus.execute<AddSearchEngineCommand, void>(
      new AddSearchEngineCommand(name, engineKey),
    );
  }

  async addLocalization(searchEngineId: string, payload: AddLocalizationDto) {
    const { domainParam, countryCode, name } = payload;
    return await this.commandBus.execute<AddLocalizationCommand, void>(
      new AddLocalizationCommand(
        domainParam,
        searchEngineId,
        countryCode,
        name,
      ),
    );
  }
}
