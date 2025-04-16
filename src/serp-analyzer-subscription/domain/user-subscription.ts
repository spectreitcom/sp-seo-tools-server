import { AggregateRoot } from '@nestjs/cqrs';
import { SubscriptionActivatedEvent } from './events/subscription-activated.event';
import { SubscriptionDeactivatedEvent } from './events/subscription-deactivated.event';

export class UserSubscription extends AggregateRoot {
  constructor(
    private readonly userSubscriptionId: string,
    private readonly subscriptionId: string,
    private active: boolean,
    private readonly userId: string,
    private sessionId: string,
    private customerId: string,
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

  getUserSubscriptionId() {
    return this.userSubscriptionId;
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

  getUserId() {
    return this.userId;
  }

  getCustomerId() {
    return this.customerId;
  }

  updateCustomerId(customerId: string) {
    this.customerId = customerId;
  }

  updateSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
}
