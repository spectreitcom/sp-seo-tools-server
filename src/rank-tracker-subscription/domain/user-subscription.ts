import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionActivatedEvent } from './events/subscription-activated.event';
import { SubscriptionDeactivatedEvent } from './events/subscription-deactivated.event';

export class UserSubscription extends AggregateRoot {
  constructor(
    private readonly userSubscriptionId: string,
    private readonly userId: string,
    private readonly subscriptionId: string,
    private sessionId: string,
    private customerId: string,
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

  deactivate() {
    this.active = false;
    this.apply(
      new SubscriptionDeactivatedEvent(this.userSubscriptionId, this.userId),
    );
  }

  updateCustomerId(customerId: string) {
    this.customerId = customerId;
  }

  updateSessionId(sessionId: string) {
    this.sessionId = sessionId;
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

  getCustomerId() {
    return this.customerId;
  }
}
