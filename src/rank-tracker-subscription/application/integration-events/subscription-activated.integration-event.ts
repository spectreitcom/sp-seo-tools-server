import { IEvent } from '@nestjs/cqrs';

export class SubscriptionActivatedIntegrationEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly maxKeywordsQty: number,
    public readonly maxSearchedPages: number,
  ) {}
}
