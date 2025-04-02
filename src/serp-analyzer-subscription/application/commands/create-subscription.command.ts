import { ICommand } from '@nestjs/cqrs';

export class CreateSubscriptionCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly searchedPages: number,
    public readonly analysisPerMonth: number,
    public readonly priceId: string,
  ) {}
}
