import { ICommand } from '@nestjs/cqrs';

export class CreateSubscriptionCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly maxKeywordsQty: number,
    public readonly priceId: string,
    public readonly maxSearchedPages: number,
  ) {}
}
