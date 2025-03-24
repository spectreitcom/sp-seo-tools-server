import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddLocalizationCommand } from '../commands/add-localization.command';
import { AddLocalizationDto } from '../dto/add-localization.dto';

@Injectable()
export class SearchEngineService {
  constructor(private readonly commandBus: CommandBus) {}

  async addLocalization(payload: AddLocalizationDto) {
    const { domainParam, countryCode, name } = payload;
    return await this.commandBus.execute<AddLocalizationCommand, void>(
      new AddLocalizationCommand(domainParam, countryCode, name),
    );
  }
}
