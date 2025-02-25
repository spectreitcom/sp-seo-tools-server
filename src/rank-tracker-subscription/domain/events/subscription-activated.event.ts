import { IEvent } from '@nestjs/cqrs';

export class SubscriptionActivatedEvent implements IEvent {
  constructor(
    public readonly userSubscriptionId: string,
    public readonly userId: string,
    public readonly subscriptionId: string,
  ) {}
}
