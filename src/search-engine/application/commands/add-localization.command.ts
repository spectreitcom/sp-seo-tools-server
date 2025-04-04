import { ICommand } from '@nestjs/cqrs';

export class AddLocalizationCommand implements ICommand {
  constructor(
    public readonly countryCode: string,
    public readonly name: string,
  ) {}
}
