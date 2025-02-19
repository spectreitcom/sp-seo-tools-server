import { ICommand } from '@nestjs/cqrs';

export class AddKeywordCommand implements ICommand {
  constructor(
    public readonly domainId: string,
    public readonly text: string,
    public readonly userId: string,
    public readonly searchEngineId: string,
    public readonly device: string,
    public readonly localizationId: string,
  ) {}
}
