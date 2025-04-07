import { ICommand } from '@nestjs/cqrs';

export class CreateAnalysisCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly keyword: string,
    public readonly localizationId: string,
    public readonly device: string,
  ) {}
}
