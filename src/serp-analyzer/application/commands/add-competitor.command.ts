import { ICommand } from '@nestjs/cqrs';

export class AddCompetitorCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly analysisId: string,
    public readonly url: string,
  ) {}
}
