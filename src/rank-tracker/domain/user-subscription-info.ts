import { AggregateRoot } from '@nestjs/cqrs';
import { UserSubscriptionActivatedEvent } from './events/user-subscription-activated.event';

export class UserSubscriptionInfo extends AggregateRoot {
  constructor(
    private userSubscriptionInfoId: string,
    private userId: string,
    private active: boolean,
    private maxKeywordsQty: number,
    private maxSearchedPages: number,
  ) {
    super();
  }

  activate() {
    this.active = true;
    this.apply(new UserSubscriptionActivatedEvent());
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
