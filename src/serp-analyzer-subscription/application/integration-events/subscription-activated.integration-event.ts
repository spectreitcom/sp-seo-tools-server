import { IEvent } from '@nestjs/cqrs';

export class SubscriptionActivatedIntegrationEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly searchedPages: number,
    public readonly analysisPerMonth: number,
  ) {}
}
