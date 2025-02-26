import { IEvent } from '@nestjs/cqrs';

export class SubscriptionDeactivatedEvent implements IEvent {
  constructor(
    public readonly userSubscriptionId: string,
    public readonly userId: string,
  ) {}
}
