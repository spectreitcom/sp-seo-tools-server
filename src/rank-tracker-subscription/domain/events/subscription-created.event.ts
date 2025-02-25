import { IEvent } from '@nestjs/cqrs';

export class SubscriptionCreatedEvent implements IEvent {
  constructor(
    public readonly subscriptionId: string,
    public readonly name: string,
    public readonly amount: number,
    public readonly maxKeywordsQty: number,
    public readonly priceId: string,
    public readonly maxSearchedPages: number,
  ) {}
}
