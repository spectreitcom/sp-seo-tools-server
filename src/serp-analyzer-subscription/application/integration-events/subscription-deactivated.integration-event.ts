import { IEvent } from '@nestjs/cqrs';

export class SubscriptionDeactivatedIntegrationEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
