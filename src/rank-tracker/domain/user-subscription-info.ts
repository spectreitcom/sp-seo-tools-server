import { AggregateRoot } from '@nestjs/cqrs';
import { UserSubscriptionActivatedEvent } from './events/user-subscription-activated.event';
import { UserSubscriptionDeactivatedEvent } from './events/user-subscription-deactivated.event';

export class UserSubscriptionInfo extends AggregateRoot {
  constructor(
    private readonly userSubscriptionInfoId: string,
    private readonly userId: string,
    private active: boolean,
    private readonly maxKeywordsQty: number,
    private readonly maxSearchedPages: number,
  ) {
    super();
  }

  activate() {
    this.active = true;
    this.apply(new UserSubscriptionActivatedEvent());
  }

  deactivate() {
    this.active = false;
    this.apply(new UserSubscriptionDeactivatedEvent());
  }

  getUserSubscriptionInfoId() {
    return this.userSubscriptionInfoId;
  }

  getUserId() {
    return this.userId;
  }

  getActive() {
    return this.active;
  }

  getMaxKeywordsQty() {
    return this.maxKeywordsQty;
  }

  getMaxSearchedPages() {
    return this.maxSearchedPages;
  }
}
