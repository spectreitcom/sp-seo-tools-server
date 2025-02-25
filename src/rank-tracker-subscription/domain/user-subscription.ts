import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionActivatedEvent } from './events/subscription-activated.event';

export class UserSubscription extends AggregateRoot {
  constructor(
    private userSubscriptionId: string,
    private userId: string,
    private subscriptionId: string,
    private sessionId: string,
    private active = false,
  ) {
    super();
  }

  activate() {
    this.active = true;
    this.apply(
      new SubscriptionActivatedEvent(
        this.userSubscriptionId,
        this.userId,
        this.subscriptionId,
      ),
    );
  }

  getUserSubscriptionId() {
    return this.userSubscriptionId;
  }

  getUserId() {
    return this.userId;
  }

  getSubscriptionId() {
    return this.subscriptionId;
  }

  getActive() {
    return this.active;
  }

  getSessionId() {
    return this.sessionId;
  }
}
