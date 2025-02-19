import { ICommand } from '@nestjs/cqrs';

export class AddLocalizationCommand implements ICommand {
  constructor(
    public readonly domainParam: string,
    public readonly searchEngineId: string,
    public readonly countryCode: string,
    public readonly name: string,
  ) {}
}
